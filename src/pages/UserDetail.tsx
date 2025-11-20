import { useEffect, useMemo, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiLoader,
  FiAlertCircle,
  FiArrowLeft,
  FiSearch,
  FiPlus,
  FiMail,
  FiPhone,
  FiGlobe,
} from "react-icons/fi";
import { MdOutlineApartment } from "react-icons/md";
import type { Post, User } from "../types";
import { useTheme } from "../context/ThemeContext";
import { validation } from "../utils/validation";
import PostItem from "../components/PostItem";
import ConfirmModal from "../components/ConfirmModal";
import EditPostModal from "../components/EditPostModal";

const PAGE_SIZE = 5;

const UserDetail = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);
  const [createPostErrors, setCreatePostErrors] = useState<{ title?: string; body?: string }>({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const t = setTimeout(() => {
      Promise.all([fetch("/data/users.json"), fetch("/data/posts.json")])
        .then(async ([r1, r2]) => {
          if (!r1.ok) throw new Error("Failed to load users");
          if (!r2.ok) throw new Error("Failed to load posts");
          const users: User[] = await r1.json();
          const postsData: Post[] = await r2.json();
          const u = users.find((x) => x.id === userId) || null;
          if (u) {
            setUser(u);
          }
          setPosts(postsData.filter((p) => p.userId === userId));
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(t);
  }, [userId]);

  const filtered = useMemo(() => {
    if (!query.trim()) return posts;
    return posts.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [posts, query]);

  const visiblePosts = filtered.slice(0, visibleCount);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 120
      ) {
        setVisibleCount((v) => Math.min(filtered.length, v + PAGE_SIZE));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [filtered.length]);

  const onAdd = () => {
    const title = titleRef.current?.value?.trim() || "";
    const body = bodyRef.current?.value?.trim() || "";
    
    const newErrors: { title?: string; body?: string } = {};
    const titleError = validation.title.validate(title);
    if (titleError) newErrors.title = titleError;
    
    const bodyError = validation.body.validate(body);
    if (bodyError) newErrors.body = bodyError;
    
    if (Object.keys(newErrors).length > 0) {
      setCreatePostErrors(newErrors);
      return;
    }
    
    setCreatePostErrors({});
    const nextId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    const newPost: Post = { id: nextId, userId, title, body };
    setPosts((s) => [newPost, ...s]);
    if (titleRef.current) titleRef.current.value = "";
    if (bodyRef.current) bodyRef.current.value = "";
    setVisibleCount((v) => v + 1);
    toast.success("Post created successfully!");
  };

  const onSaveEdit = (title: string, body: string) => {
    if (!editingPost) return;
    
    setPosts((s) =>
      s.map((p) => (p.id === editingPost.id ? { ...p, title, body } : p))
    );
    setEditingPost(null);
    toast.success("Post updated successfully!");
  };

  const onDeleteConfirm = (postId: number) => {
    setDeletePostId(postId);
    setShowDeleteModal(true);
  };

  const onDeletePost = () => {
    if (deletePostId === null) return;
    setPosts((s) => s.filter((p) => p.id !== deletePostId));
    setShowDeleteModal(false);
    setDeletePostId(null);
    toast.success("Post deleted successfully!");
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <FiLoader
            className={`w-16 h-16 animate-spin ${
              theme === "light" ? "text-blue-600" : "text-blue-400"
            }`}
          />
        </div>
        <p
          className={`text-lg font-medium mt-4 ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          Loading user details...
        </p>
      </div>
    );
  if (error)
    return (
      <div
        className={`p-6 rounded-lg border ${
          theme === "light"
            ? "bg-red-50 border-red-300 text-red-700"
            : "bg-red-900/20 border-red-800 text-red-400"
        }`}
      >
        <div className="flex items-start gap-3">
          <FiAlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Error loading user</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  if (!user)
    return (
      <div
        className={`p-6 rounded-lg border ${
          theme === "light"
            ? "bg-yellow-50 border-yellow-300 text-yellow-700"
            : "bg-yellow-900/20 border-yellow-800 text-yellow-400"
        }`}
      >
        <div className="flex items-start gap-3">
          <FiAlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">User Not Found</h3>
            <p>The user you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="space-y-8">
      <div
        className={`rounded-xl shadow-md p-6 md:p-8 border ${
          theme === "light"
            ? "bg-white border-gray-200"
            : "bg-gray-800 border-gray-700"
        }`}
      >
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-4 mb-6">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
              ) : (
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg ${
                    theme === "light"
                      ? "bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-600"
                      : "bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700"
                  }`}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h1
                  className={`text-3xl md:text-4xl font-bold mb-1 ${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }`}
                >
                  {user.name}
                </h1>
                <p
                  className={
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }
                >
                  User ID: #{user.id}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                className={`p-4 rounded-lg border ${
                  theme === "light"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-blue-900/20 border-blue-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FiMail
                    className={`w-4 h-4 ${
                      theme === "light" ? "text-blue-600" : "text-blue-400"
                    }`}
                  />
                  <p
                    className={`text-xs uppercase tracking-widest font-semibold ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    Email
                  </p>
                </div>
                <p
                  className={`font-medium truncate text-sm ${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }`}
                >
                  {user.email}
                </p>
              </div>
              <div
                className={`p-4 rounded-lg border ${
                  theme === "light"
                    ? "bg-green-50 border-green-200"
                    : "bg-green-900/20 border-green-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FiPhone
                    className={`w-4 h-4 ${
                      theme === "light" ? "text-green-600" : "text-green-400"
                    }`}
                  />
                  <p
                    className={`text-xs uppercase tracking-widest font-semibold ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    Phone
                  </p>
                </div>
                <p
                  className={`font-medium text-sm ${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }`}
                >
                  {user.phone || "N/A"}
                </p>
              </div>
              <div
                className={`p-4 rounded-lg border ${
                  theme === "light"
                    ? "bg-purple-50 border-purple-200"
                    : "bg-purple-900/20 border-purple-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FiGlobe
                    className={`w-4 h-4 ${
                      theme === "light" ? "text-purple-600" : "text-purple-400"
                    }`}
                  />
                  <p
                    className={`text-xs uppercase tracking-widest font-semibold ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    Website
                  </p>
                </div>
                <p
                  className={`font-medium truncate text-sm ${
                    theme === "light" ? "text-purple-600" : "text-purple-400"
                  }`}
                >
                  {user.website || "N/A"}
                </p>
              </div>
              <div
                className={`p-4 rounded-lg border ${
                  theme === "light"
                    ? "bg-orange-50 border-orange-200"
                    : "bg-orange-900/20 border-orange-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MdOutlineApartment
                    className={`w-4 h-4 ${
                      theme === "light" ? "text-orange-600" : "text-orange-400"
                    }`}
                  />
                  <p
                    className={`text-xs uppercase tracking-widest font-semibold ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    Company
                  </p>
                </div>
                <p
                  className={`font-medium truncate text-sm ${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }`}
                >
                  {user.company || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded-lg transition shadow-lg ${
              theme === "light"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Users
          </button>
        </div>
      </div>

      <div
        className={`rounded-xl shadow-md p-6 md:p-8 border ${
          theme === "light"
            ? "bg-white border-gray-200"
            : "bg-gray-800 border-gray-700"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          <FiPlus className="w-6 h-6 text-green-600" />
          Create New Post
        </h2>
        <div className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}
            >
              Post Title * <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>(3-200 characters)</span>
            </label>
            <input
              ref={titleRef}
              placeholder="Enter an engaging post title..."
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition ${
                createPostErrors.title
                  ? theme === "light"
                    ? "border-red-500 focus:ring-red-500 bg-red-50 "
                    : "border-red-600 focus:ring-red-600 bg-red-900/10 text-white"
                  : theme === "light"
                  ? "border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-blue-500"
                  : "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-400"
              }`}
            />
            {createPostErrors.title && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                <FiAlertCircle size={16} />
                <span>{createPostErrors.title}</span>
              </div>
            )}
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}
            >
              Post Body <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>(max 5000 characters)</span>
            </label>
            <textarea
              ref={bodyRef}
              placeholder="Share your thoughts and ideas..."
              rows={5}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none transition ${
                createPostErrors.body
                  ? theme === "light"
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : "border-red-600 focus:ring-red-600 bg-red-900/10"
                  : theme === "light"
                  ? "border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-blue-500"
                  : "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-400"
              }`}
            />
            {createPostErrors.body && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                <FiAlertCircle size={16} />
                <span>{createPostErrors.body}</span>
              </div>
            )}
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={onAdd}
              className={`px-6 py-2 text-white font-medium rounded-lg transition shadow-lg flex items-center gap-2 ${
                theme === "light"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              <FiPlus className="w-4 h-4" />
              Publish Post
            </button>
          </div>
        </div>
      </div>

      <div>
        <label
          className={`flex items-center gap-2 text-sm font-medium mb-3 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          <FiSearch
            className={`w-4 h-4 ${
              theme === "light" ? "text-blue-600" : "text-blue-400"
            }`}
          />
          Search Posts
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by post title..."
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition ${
            theme === "light"
              ? "border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-blue-500"
              : "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-400"
          }`}
        />
        {query && (
          <p
            className={`text-sm mt-2 ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Found{" "}
            <span
              className={`font-semibold ${
                theme === "light" ? "text-blue-600" : "text-blue-400"
              }`}
            >
              {filtered.length}
            </span>{" "}
            post(s)
          </p>
        )}
      </div>

      <div>
        <h2
          className={`text-2xl font-bold mb-6 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          Posts{" "}
          <span
            className={theme === "light" ? "text-blue-600" : "text-blue-400"}
          >
            ({filtered.length})
          </span>
        </h2>
        {visiblePosts.length > 0 ? (
          <>
            {visiblePosts.map((p) => (
              <PostItem
                key={p.id}
                post={p}
                onEdit={(post) => {
                  setEditingPost(post);
                  setShowEditModal(true);
                }}
                onDelete={onDeleteConfirm}
              />
            ))}

            {visiblePosts.length < filtered.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() =>
                    setVisibleCount((v) =>
                      Math.min(filtered.length, v + PAGE_SIZE)
                    )
                  }
                  className={`px-8 py-3 font-medium rounded-lg border transition shadow-md ${
                    theme === "light"
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-300"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                  }`}
                >
                  Load More Posts
                </button>
              </div>
            )}
          </>
        ) : (
          <div
            className={`p-8 rounded-lg text-center border ${
              theme === "light"
                ? "bg-gray-50 border-gray-200"
                : "bg-gray-700/30 border-gray-700"
            }`}
          >
            <p
              className={`text-lg ${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              }`}
            >
              No posts found. Start creating one!
            </p>
          </div>
        )}
      </div>

      <EditPostModal
        isOpen={showEditModal}
        post={editingPost!}
        onSave={onSaveEdit}
        onClose={() => {
          setShowEditModal(false);
          setEditingPost(null);
        }}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDanger
        onConfirm={onDeletePost}
        onCancel={() => {
          setShowDeleteModal(false);
          setDeletePostId(null);
        }}
      />
    </div>
  );
};

export default UserDetail;

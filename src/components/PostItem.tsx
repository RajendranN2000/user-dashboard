import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import type { Post } from "../types";

type Props = {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
};

const PostItem = ({ post, onEdit, onDelete }: Props) => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-5 rounded-xl shadow-md border mb-4 hover:shadow-lg transition-all duration-300 group ${
        theme === "light"
          ? "bg-white border-gray-200 hover:bg-blue-50"
          : "bg-gray-800 border-gray-700 hover:bg-gray-700"
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h4
            className={`font-bold text-base mb-2 line-clamp-2 transition ${
              theme === "light"
                ? "text-gray-800 group-hover:text-blue-600"
                : "text-white group-hover:text-blue-400"
            }`}
          >
            {post.title}
          </h4>
          <p
            className={`text-sm leading-relaxed line-clamp-3 ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            {post.body}
          </p>
        </div>
        <div className="ml-4 flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(post)}
            className={`inline-flex items-center gap-2 text-xs px-3 py-2 font-medium rounded-lg transition shadow-md ${
              theme === "light"
                ? "bg-amber-500/90 hover:bg-amber-500 text-white"
                : "bg-amber-600/90 hover:bg-amber-600 text-white"
            }`}
            title="Edit post"
          >
            <FiEdit2 className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className={`inline-flex items-center gap-2 text-xs px-3 py-2 font-medium rounded-lg transition shadow-md ${
              theme === "light"
                ? "bg-red-500/90 hover:bg-red-500 text-white"
                : "bg-red-600/90 hover:bg-red-600 text-white"
            }`}
            title="Delete post"
          >
            <FiTrash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

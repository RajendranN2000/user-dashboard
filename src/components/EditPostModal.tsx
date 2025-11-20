import { useRef, useEffect, useState } from "react";
import { FiX, FiSave, FiAlertCircle } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { validation } from "../utils/validation";
import type { Post } from "../types";

type Props = {
  isOpen: boolean;
  post: Post;
  onSave: (title: string, body: string) => void;
  onClose: () => void;
};

const EditPostModal = ({ isOpen, post, onSave, onClose }: Props) => {
  const { theme } = useTheme();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  useEffect(() => {
    if (isOpen && titleRef.current && bodyRef.current) {
      titleRef.current.value = post.title;
      bodyRef.current.value = post.body;
      titleRef.current.focus();
      setErrors({});
    }
  }, [isOpen, post]);

  if (!isOpen) return null;

  const handleSave = () => {
    const title = titleRef.current?.value?.trim() || "";
    const body = bodyRef.current?.value?.trim() || "";
    const newErrors: { title?: string; body?: string } = {};

    const titleError = validation.title.validate(title);
    if (titleError) newErrors.title = titleError;

    const bodyError = validation.body.validate(body);
    if (bodyError) newErrors.body = bodyError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSave(title, body);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-xl shadow-2xl max-w-2xl w-full animate-in ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <div
          className={`flex items-center justify-between p-6 border-b ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <h2
            className={`text-2xl font-bold ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            Edit Post
          </h2>
          <button
            onClick={onClose}
            className={`transition ${
              theme === "light"
                ? "text-gray-400 hover:text-gray-600"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
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
              placeholder="Enter post title..."
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition ${
                errors.title
                  ? theme === "light"
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : "border-red-600 focus:ring-red-600 bg-red-900/10"
                  : theme === "light"
                  ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                  : "border-gray-600 bg-gray-700 text-white focus:ring-blue-400"
              }`}
            />
            {errors.title && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                <FiAlertCircle size={16} />
                <span>{errors.title}</span>
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
              placeholder="Write your post content here..."
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none transition ${
                errors.body
                  ? theme === "light"
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : "border-red-600 focus:ring-red-600 bg-red-900/10"
                  : theme === "light"
                  ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                  : "border-gray-600 bg-gray-700 text-white focus:ring-blue-400"
              }`}
            />
            {errors.body && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                <FiAlertCircle size={16} />
                <span>{errors.body}</span>
              </div>
            )}
          </div>
        </div>

        <div
          className={`flex gap-3 justify-end p-6 border-t ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <button
            onClick={onClose}
            className={`px-6 py-2 font-medium rounded-lg transition ${
              theme === "light"
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-6 py-2 text-white font-medium rounded-lg transition shadow-lg flex items-center gap-2 ${
              theme === "light"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            <FiSave className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;

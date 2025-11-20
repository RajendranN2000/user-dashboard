import { useEffect } from "react";
import { FiX, FiSave, FiAlertCircle } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import type { Post } from "../types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type Props = {
  isOpen: boolean;
  post: Post;
  onSave: (title: string, body: string) => void;
  onClose: () => void;
};

const EditPostModal = ({ isOpen, post, onSave, onClose }: Props) => {
  const { theme } = useTheme();

  useEffect(() => {
  }, [isOpen, post]);

  if (!isOpen) return null;

  const EditSchema = Yup.object({
    title: Yup.string()
      .trim()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters")
      .max(200, "Title must not exceed 200 characters"),
    body: Yup.string().trim().max(5000, "Body must not exceed 5000 characters"),
  });

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

        <Formik
          initialValues={{ title: post.title, body: post.body }}
          validationSchema={EditSchema}
          onSubmit={(values: { title: string; body: string }) => {
            onSave(values.title.trim(), values.body.trim());
            onClose();
          }}
        >
          {({ errors, touched }: { errors: { [k: string]: string }; touched: { [k: string]: boolean } }) => (
            <Form>
              <div className="p-6 space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    Post Title * <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>(3-200 characters)</span>
                  </label>
                  <Field
                    name="title"
                    as="input"
                    placeholder="Enter post title..."
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      errors.title && touched.title
                        ? theme === "light"
                          ? "border-red-500 focus:ring-red-500 bg-red-50"
                          : "border-red-600 focus:ring-red-600 bg-red-900/10 text-white"
                        : theme === "light"
                        ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                        : "border-gray-600 bg-gray-700 text-white focus:ring-blue-400"
                    }`}
                  />
                  <ErrorMessage name="title">{(msg: string) => (
                    <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                      <FiAlertCircle size={16} />
                      <span>{msg}</span>
                    </div>
                  )}</ErrorMessage>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    Post Body
                  </label>
                  <Field
                    name="body"
                    as="textarea"
                    placeholder="Write your post content here..."
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none transition ${
                      errors.body && touched.body
                        ? theme === "light"
                          ? "border-red-500 focus:ring-red-500 bg-red-50"
                          : "border-red-600 focus:ring-red-600 bg-red-900/10"
                        : theme === "light"
                        ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                        : "border-gray-600 bg-gray-700 text-white focus:ring-blue-400"
                    }`}
                  />
                  <ErrorMessage name="body">{(msg: string) => (
                    <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                      <FiAlertCircle size={16} />
                      <span>{msg}</span>
                    </div>
                  )}</ErrorMessage>
                </div>
              </div>

              <div
                className={`flex gap-3 justify-end p-6 border-t ${
                  theme === "light" ? "border-gray-200" : "border-gray-700"
                }`}
              >
                <button
                  type="button"
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
                  type="submit"
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditPostModal;
 

import { FiAlertTriangle, FiX } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = false,
  onConfirm,
  onCancel,
}: Props) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-lg shadow-2xl max-w-sm w-full animate-in ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <div
          className={`flex items-start justify-between p-6 border-b ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-full ${
                isDanger
                  ? theme === "light"
                    ? "bg-red-100"
                    : "bg-red-900/30"
                  : theme === "light"
                  ? "bg-blue-100"
                  : "bg-blue-900/30"
              }`}
            >
              <FiAlertTriangle
                className={
                  isDanger
                    ? theme === "light"
                      ? "text-red-600"
                      : "text-red-400"
                    : theme === "light"
                    ? "text-blue-600"
                    : "text-blue-400"
                }
                size={20}
              />
            </div>
            <h2
              className={`text-lg font-bold ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
            >
              {title}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className={`transition ${
              theme === "light"
                ? "text-gray-400 hover:text-gray-600"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
            {message}
          </p>
        </div>

        <div
          className={`flex gap-3 justify-end p-6 border-t ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              theme === "light"
                ? "text-gray-700 bg-gray-200 hover:bg-gray-300"
                : "text-gray-200 bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-lg font-medium transition ${
              isDanger
                ? "bg-red-500 hover:bg-red-600"
                : theme === "light"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

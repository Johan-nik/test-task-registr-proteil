import type { ErrorModalProps } from "../types/types";

const ErrorModal = ({ isOpen, onClose, message }: ErrorModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-8 border border-red-500/50 bg-[#131C2D] bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-lg shadow-2xl shadow-red-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors text-2xl leading-none"
        >
          &times;
        </button>

        <div className="text-center">
          <div className="mb-4 text-5xl">❌</div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Что-то пошло не так
          </h3>
          <p className="text-white/80 mb-6">
            {message || "Сервер временно недоступен. Пожалуйста, попробуйте позже."}
          </p>

          <button
            onClick={onClose}
            className="cursor-pointer pt-[0.8rem] pb-[0.8rem] pr-[1.5rem] pl-[1.5rem] border border-red-500/50 text-white min-w-full bg-[#131C2D] bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
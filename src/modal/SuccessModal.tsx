import type { SuccessModalProps } from "../types/types";


const SuccessModal = ({ isOpen, onClose, data }: SuccessModalProps) => {
  if (!isOpen || !data) return null;

  const firstName = data.username?.split(" ")[0] || "коллега";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-8 border border-[#75C9EA] bg-[#131C2D] bg-gradient-to-r from-[#006DEF]/10 to-[#72C7FC]/20 rounded-lg shadow-2xl shadow-blue-500/10"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors text-2xl leading-none"
        >
          &times;
        </button>

        <div className="text-center">
          <div className="mb-4 text-5xl">✅</div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Регистрация прошла успешно!
          </h3>
          <p className="text-white/80 mb-6">
            Спасибо, {firstName}! Ваши данные приняты.
          </p>

          {/* Блок с введёнными данными */}
          <div className="text-left bg-[#000C1480] rounded-lg p-4 mb-6">
            <ul className="space-y-1 text-sm text-white/70">
              <li><span className="font-medium text-white">ФИО:</span> {data.username}</li>
              <li><span className="font-medium text-white">Телефон:</span> {data.phonenumber}</li>
              <li><span className="font-medium text-white">Компания:</span> {data.company}</li>
              <li><span className="font-medium text-white">Должность:</span> {data.supervisor}</li>
              <li><span className="font-medium text-white">Email:</span> {data.email}</li>
              {data.textarea && (
                <li><span className="font-medium text-white">Вопросы:</span> {data.textarea}</li>
              )}
            </ul>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer pt-[0.8rem] pb-[0.8rem] pr-[1.5rem] pl-[1.5rem] border border-[#77CDDDCC] text-white min-w-full bg-[#131C2D] bg-gradient-to-r from-[#006DEF]/30 to-[#72C7FC]/30 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
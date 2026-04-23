import "./App.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FormData } from "../src/types/types";
import SuccessModal from "../src/modal/SuccessModal"
import ErrorModal from "../src/modal/ErrorModal"


function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

   const onSubmit = (data: FormData) => {
    console.log(data);
    // Имитация ошибки сервера с вероятностью 30%, ругается, но для теста
    const isServerError = Math.random() < 0.5;

    if (isServerError) {
      setErrorMessage("Сервер временно недоступен. Пожалуйста, попробуйте позже.");
      setIsErrorOpen(true);
      setIsSuccessOpen(false);  
    } else {
      setSubmittedData(data);
      setIsSuccessOpen(true);
      setIsErrorOpen(false);
      reset();
    }
  };

  const closeSuccess = () => {
    setIsSuccessOpen(false);
    setSubmittedData(null);
  };

  const closeError = () => {
    setIsErrorOpen(false);
    setErrorMessage("");
  };

  return (
    <>
      <section className="flex flex-col gap-[3rem] min-w-sm max-w-lg">
        <h2 className="pr-[3rem] pl-[3rem] text-center font-[Montserrat] text-4xl font-semibold text-white leading-[3rem] tracking-[-0.5%]">
          Регистрация на лекторий
        </h2>
        <div className="border border-[#75C9EA] bg-[#131C2D] bg-gradient-to-r from-[#006DEF]/10 to-[#72C7FC]/20 rounded-lg p-[3rem] flex flex-col gap-[3rem]">
          <form
            id="registrForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[1.5rem]"
          >
            {/* ФИО */}
            <label className="text-base text-white font-normal leading-[1.5rem]">
              ФИО*<br />
              <input
                {...register("username", {
                  required: "ФИО обязательно",
                  minLength: {
                    value: 6,
                    message: "ФИО должно быть не короче 6 символов",
                  },
                })}
                className={`min-w-full mt-[0.5rem] bg-[#000C1480] p-[0.5rem] rounded-lg font-[Montserrat] font-normal text-sm ${
                  errors.username ? "border border-red-500 text-red-400" : "text-white/30"
                }`}
                placeholder="Иванов Иван Иванович"
              />
              {/* Ошибка для username */}
              {errors.username && (
                <p className="mt-1 text-xs text-red-400">{errors.username.message}</p>
              )}
            </label>

            {/* Телефон */}
            <label className="text-base text-white font-normal leading-[1.5rem]">
              Телефон*<br />
              <input
                className={`min-w-full mt-[0.5rem] bg-[#000C1480] p-[0.5rem] rounded-lg font-[Montserrat] font-normal text-sm ${
                  errors.phonenumber ? "border border-red-500 text-red-400" : "text-white/30"
                }`}
                {...register("phonenumber", {
                  required: "Номер телефона обязателен",
                  pattern: {
                    value: /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/,
                    message: "Введите номер в формате +7 (987) 654-32-10",
                  },
                })}
                placeholder="+7 (987) 654-32-10"
              />
              {errors.phonenumber && (
                <p className="mt-1 text-xs text-red-400">{errors.phonenumber.message}</p>
              )}
            </label>

            {/* Компания */}
            <label className="text-base text-white font-normal leading-[1.5rem]">
              Компания*<br />
              <input
                className={`min-w-full mt-[0.5rem] bg-[#000C1480] p-[0.5rem] rounded-lg font-[Montserrat] font-normal text-sm ${
                  errors.company ? "border border-red-500 text-red-400" : "text-white/30"
                }`}
                {...register("company", {
                  required: "Название компании обязательно",
                })}
                placeholder="Название компании"
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-400">{errors.company.message}</p>
              )}
            </label>

            {/* Должность */}
            <label className="text-base text-white font-normal leading-[1.5rem]">
              Должность*<br />
              <input
                className={`min-w-full mt-[0.5rem] bg-[#000C1480] p-[0.5rem] rounded-lg font-[Montserrat] font-normal text-sm ${
                  errors.supervisor ? "border border-red-500 text-red-400" : "text-white/30"
                }`}
                {...register("supervisor", {
                  required: "Должность обязательна",
                })}
                placeholder="Руководитель отдела..."
              />
              {errors.supervisor && (
                <p className="mt-1 text-xs text-red-400">{errors.supervisor.message}</p>
              )}
            </label>

            {/* Email */}
            <label className="text-base text-white font-normal leading-[1.5rem]">
              Email*<br />
              <input
                className={`min-w-full mt-[0.5rem] bg-[#000C1480] p-[0.5rem] rounded-lg font-[Montserrat] font-normal text-sm ${
                  errors.email ? "border border-red-500 text-red-400" : "text-white/30"
                }`}
                {...register("email", {
                  required: "Email обязателен",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Неверный формат email",
                  },
                })}
                placeholder="example@company.ru"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </label>

            {/* Текстовое поле */}
            <label className="text-base text-white font-normal leading-[1.5rem]">
              Ваши вопросы к обсуждению<br />
              <textarea
                rows={6}
                className="min-w-full mt-[0.5rem] bg-[#000C1480] p-[0.5rem] rounded-lg font-[Montserrat] font-normal text-sm text-white/30"
                {...register("textarea")}
                placeholder="Какие темы вам особенно интересны?"
              ></textarea>
            </label>

            <p className="font-[Montserrat] font-normal text-base text-white">
              Выбрано{" "}
              <span className="text-lg text-[#75C9EA]">N</span> лекции
            </p>
          </form>

          <div className="flex flex-col gap-[0.5rem]">
            <button
              className="cursor-pointer pt-[0.8rem] pb-[0.8rem] pr-[1.5rem] pl-[1.5rem] border border-[#77CDDDCC] text-white min-w-full bg-[#131C2D] bg-gradient-to-r from-[#006DEF]/30 to-[#72C7FC]/30 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
              type="submit"
              form="registrForm"
            >
              Зарегистрироваться
            </button>
            <p className="font-[Montserrat] font-normal text-sm text-center text-white/50">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <span className="underline">
                политикой обработки персональных данных
              </span>
              .
            </p>
          </div>
        </div>
      </section>

       <SuccessModal
        isOpen={isSuccessOpen}
        onClose={closeSuccess}
        data={submittedData}
      />
      <ErrorModal
        isOpen={isErrorOpen}
        onClose={closeError}
        message={errorMessage}
      />
    </>
  );
}

export default App;
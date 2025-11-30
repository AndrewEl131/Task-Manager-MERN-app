import React from "react";
import Header from "../../Component/Header/Header";
import useLangStore from "../../store/useLangStore";
import { useEffect } from "react";

const Rules = () => {
  
  useEffect(() => {
    document.title = `Rules`;
  }, []);

  const { lang } = useLangStore();
  return (
    <main className="w-full min-h-screen">
      <div className="w-full h-[70vh] flex justify-center items-center">
        <div className="w-[120vmin] h-full mt-[20vmin]">
          <div className="w-full text-center text-3xl">
            <h1>
              {lang == "en"
                ? "🔥 RULES OF THIS SITE 🔥 "
                : "🔥 საიტის წესები 🔥"}
            </h1>
          </div>

          <div className="w-full h-[95%] flex flex-col gap-[3vmin] mt-[2vmin]">
            <div className="w-full lg:text-2xl pl-2">
              <h1>
                {lang == "en"
                  ? "1. Respect the Space – Keep it positive. No spam, hate, or unnecessary negativity."
                  : "1. პატივი ეცით სივრცეს – შეინარჩუნეთ პოზიტიური განწყობა. არანაირი სპამი, სიძულვილი ან ზედმეტი ნეგატივი."}
              </h1>
            </div>
            <div className="w-full lg:text-2xl pl-2">
              <h1>
                {lang == "en"
                  ? "2. Stay Organized – Create tasks with purpose. This platform is built to help you grow, not clutter your mind."
                  : "2. იყავით ორგანიზებული – შექმენით მიზანმიმართული ტასკები. ეს პლატფორმა შექმნილია იმისთვის, რომ დაგეხმაროთ განვითარებაში და არა გონების გადატვირთვაში."}
              </h1>
            </div>
            <div className="w-full lg:text-2xl pl-2">
              <h1>
                {lang == "en"
                  ? "3. Be Honest – Your progress is yours. Don’t fake achievements — earn them."
                  : "3. იყავით გულწრფელი – თქვენი პროგრესი თქვენია. ნუ გააყალბებთ მიღწევებს — დაიმსახურეთ ისინი."}
              </h1>
            </div>
            <div className="w-full lg:text-2xl pl-2">
              <h1>
                {lang == "en"
                  ? "4. Protect Your Privacy – Never share personal information you"
                  : "4. დაიცავით თქვენი კონფიდენციალურობა - არასოდეს გააზიაროთ პირადი ინფორმაცია, რომლის საჯაროდ გამოქვეყნებაც არ გსურთ"}
              </h1>
            </div>
            <div className="w-full lg:text-2xl pl-2">
              <h1>
                {lang == "en"
                  ? "5. Use It Creatively – Customize, experiment, and explore different ways to manage your goals."
                  : "5. გამოიყენეთ იგი შემოქმედებითად – გამოიყენეთ პერსონალიზება, ექსპერიმენტი ჩაატარეთ და შეისწავლეთ თქვენი მიზნების მართვის სხვადასხვა გზები."}
              </h1>
            </div>
            <div className="w-full lg:text-2xl pl-2">
              <h1>
                {lang == "en"
                  ? "6. No Harmful Content – Keep everything clean and safe for everyone."
                  : "6. მავნე კონტენტის გარეშე – შეინარჩუნეთ ყველაფერი სუფთად და უსაფრთხოდ ყველასთვის."}
              </h1>
            </div>
            <div className="w-full lg:text-2xl pl-2">
              <h1>
                {lang == "en"
                  ? "7. Enjoy the Process – This isn’t just a task manager — it’s your digital workspace for focus, freedom, and fun."
                  : "7. ისიამოვნეთ პროცესით – ეს არ არის მხოლოდ დავალებების მენეჯერი — ეს არის თქვენი ციფრული სამუშაო სივრცე ფოკუსირებისთვის, თავისუფლებისა და გართობისთვის."}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Rules;

import React from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import Task from "../../Component/Task";
import { Link } from "react-router-dom";
import useLangStore from "../../store/useLangStore";

const Home = () => {
  const { lang } = useLangStore();

  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <Header />
      <div className="w-full lg:h-[153vmin] h-[90vh] flex justify-center">
        <div className="w-[125vmin] mt-5 h-full flex flex-col lg:gap-[3vmin] gap-[5vmin] pt-[3vmin]">
          <div className="w-full h-[10vh] text-4xl flex justify-evenly items-center">
            <div className="shadow-dance-container">
              <h1 className="shadow-dance-text">Task Manager</h1>
            </div>
          </div>

          <div className="w-full h-[65vmin] flex flex-col gap-[4vmin] mt-[3vmin]">
            <div className='w-full lg:text-6xl text-2xl text-center mt-3 font-["BBH_Sans_Bogle",_sans-serif]'>
              <h1>
                {lang == "en" ? "What can you do?" : "რა შეგიძლია გააკეთო?"}
              </h1>
            </div>
            <div className="w-full h-[90%] lg:text-3xl text-[14px] flex flex-col items-center justify-center space-y-[2vmin]">
              <div className="w-full p-[2vmin] pl-[10vmin] bg-[#420a18cc] hover:bg-[#551726cc] hover:pl-[12vmin] transition-all duration-200 cursor-context-menu rounded-t-3xl">
                <h1 className="text-slide-right glow-amber">
                  {lang == "en"
                    ? "Create projects, And Enjoy Your Show "
                    : "შექმენით პროექტები და ისიამოვნეთ თქვენი შოუთი "}
                </h1>
              </div>
              <div className="w-full p-[2vmin] bg-[#420a3fcc] pr-[10vmin] text-end hover:bg-[#501a4dcc] hover:pr-[12vmin] transition-all duration-200 cursor-context-menu">
                <h1 className="text-slide-left glow-cyan text-slide-delay">
                  {lang == "en"
                    ? "Creative Tasks, And Hard working"
                    : "შემოქმედებითი დავალებები და შრომისმოყვარეობა"}
                </h1>
              </div>
              <div className="w-full p-[2vmin] bg-[#420a18cc] pl-[10vmin] hover:bg-[#551726cc] hover:pl-[12vmin] transition-all duration-200 cursor-context-menu">
                <h1 className="text-slide-right glow-blue text-slide-delay">
                  {lang == "en"
                    ? "Knowable UI, A Beautiful User Interface"
                    : "გასაგები ინტერფეისი, ლამაზი მომხმარებლის ინტერფეისი"}
                </h1>
              </div>
              <div className="w-full p-[2vmin] bg-[#420a3fcc] pr-[10vmin] text-end hover:bg-[#501a4dcc] hover:pr-[12vmin] transition-all duration-200 cursor-context-menu rounded-b-3xl">
                <h1 className="text-slide-left glow-amber text-slide-delay">
                  {lang == "en"
                    ? "Easy To Understand, Everything Is Easy"
                    : "ადვილად გასაგები, ყველაფერი მარტივია"}
                </h1>
              </div>
            </div>

            <div className="w-full flex justify-center lg:mt-0 mt-[3vmin]">
              <Link to={"/Rules"}>
                <button className="lg:w-[18vmin] w-[30vmin] p-[1.5vmin] border border-blue-300 text-blue-300 font-light rounded-[6px]  hover:border-amber-50 hover:text-amber-50 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer">
                  {lang == "en" ? "Learn more" : "გაიგე მეტი"}
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full lg:h-[40vh] flex flex-wrap justify-center lg:items-center lg:space-x-10 space-x-[4vmin] lg:space-y-0 space-y-2 lg:mt-0 mt-[25vmin]">
            <Task status={"To Do"} />
            <Task status={"In Progress"} />
            <Task status={"Done"} />
          </div>

          <div className="w-full lg:h-[45vh] flex flex-col gap-5 lg:mt-0 ">
            <div className="w-full lg:text-2xl text-center">
              {lang == "en"
                ? "🔥 THIS IS HOW YOUR TASK GONNA LOOK LIKE — ENJOY! 🔥"
                : "🔥 ესე გამოიყურება შენი ტასკი - ისიამოვნე 🔥"}
            </div>

            <div className="w-full flex justify-center">
              <div className="w-[70%]">
                <p>
                  {lang == "en"
                    ? "Welcome to your productivity playground — a place where creativity meets control. Here, you can create your tasks exactly how you want them. Customize, organize, and manage every detail effortlessly."
                    : "კეთილი იყოს თქვენი მობრძანება თქვენი პროდუქტიულობის სათამაშო მოედანზე — ადგილას, სადაც კრეატიულობა კონტროლს ხვდება. აქ თქვენ შეგიძლიათ შექმნათ თქვენი დავალებები ზუსტად ისე, როგორც გსურთ. ყველა დეტალის პერსონალიზება, ორგანიზება და მართვა ძალისხმევის გარეშე."}
                </p>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-[70%]">
                <p>
                  {lang == "en"
                    ? "🧠 Need to plan your goals? Do it."
                    : "🧠 გჭირდებათ თქვენი მიზნების დაგეგმვა? გააკეთეთ ეს."}
                  <br />
                  {lang == "en"
                    ? "⚙️ Want to track your progress step by step? Easy."
                    : "⚙️ გსურთ თქვენი პროგრესის ეტაპობრივად თვალყურის დევნება? მარტივია."}
                  <br />
                  {lang == "en"
                    ? "🎨 Prefer a touch of style while you work? We’ve got you covered."
                    : "🎨 გსურთ, მუშაობისას სტილი უფრო შესამჩნევი გახადოთ? ჩვენ ყველაფერი გვაქვს თქვენთვის."}
                </p>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-[70%]">
                <p>
                  {lang == "en"
                    ? "My site gives you every luxury to build, modify, and finish your tasks your way — smooth, fast, and fun. So relax, take charge, and enjoy the experience of turning ideas into achievements. 🚀"
                    : "ჩემი საიტი გაძლევთ ყველა იმ ფუფუნებას, რაც გჭირდებათ თქვენი ამოცანების შესაქმნელად, მოდიფიცირებისა და დასრულებისთვის თქვენივე გზით — შეუფერხებლად, სწრაფად და სახალისო. ასე რომ, დაისვენეთ, აიღეთ პასუხისმგებლობა და ისიამოვნეთ იდეების მიღწევებად გადაქცევის გამოცდილებით. 🚀"}
                </p>
              </div>
            </div>

            <div className="w-full h-[10vh] flex justify-center">
              <div className="w-[70%] h-full flex justify-evenly items-center lg:gap-0 gap-3">
                <button className="w-[8.5rem] p-3 border border-red-600 text-red-600 font-light rounded-[6px]  hover:border-red-500 hover:text-red-500 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer">
                  {lang == "en" ? "Get Started" : "დაიწყე"}
                </button>
                <button className="w-[8.5rem] p-3 border border-blue-300 text-blue-300 font-light rounded-[6px] hover:border-amber-50 hover:text-amber-50 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer">
                  {lang == "en" ? "Learn more" : "გაიგე მეტი"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

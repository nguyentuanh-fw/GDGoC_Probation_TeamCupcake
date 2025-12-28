import React from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import background from "../../assets/background.png";
import bronze_drum from "../../assets/bronze-drum-1.png"
import image from "../../assets/image.png"
import bronze_drum_1 from "../../assets/bronze-drum.png"
const navItems = [
  { label: "HOME", active: true },
  { label: "Q&A", active: false },
  { label: "HISTORY", active: false },
  { label: "AI CHAT", active: false },
  { label: "MENU", active: false },
];

export const Home = (): JSX.Element => {
  return (
    <div
      className="bg-white overflow-hidden w-full min-h-screen relative"
      data-model-id="5:6"
    >
      <img
        className="absolute top-0 left-0 w-full h-full"
        alt="Background"
        src={background}
      />

      <div className="absolute top-[-17vh] left-[19vw] w-[480px] h-[480px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <img
          className="absolute top-[-96px] left-0 w-[480px] h-[480px] rounded-[240px] object-cover"
          alt="Bronze drum"
          src={bronze_drum_1}
        />

        <div className="w-[480px] h-[480px] bg-[#e2c8afa3] rounded-[240px] absolute top-[-96px] left-0" />
      </div>

      <div className="top-[13vh] left-[35vw] w-[29vw] bg-white shadow-[8px_8px_16px_#ffffff3d] absolute h-[74vh] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
        <img
          className="top-0 left-[0.5vw] w-[25vw] absolute h-[74vh]"
          alt="Image"
          src={image}
        />

        <div className="w-[29vw] h-[74vh] bg-[#d7d7d73d] absolute top-0 left-0" />
      </div>

      <div className="absolute top-[76vh] left-[60vw] w-[6vw] h-[6vw] bg-[#c3423f] rounded-full shadow-[8px_8px_16px_#12121266] animate-fade-in opacity-0 [--animation-delay:800ms]" />

      <div className="absolute top-[18.5vh] left-[11vw] [text-shadow:16px_16px_32px_#1212123d] [font-family:'Bebas_Neue',Helvetica] font-normal text-[#c3423f] text-[7.5vw] tracking-[5.76px] leading-[normal] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        BRIEF HISTORY
        <br />
        OF VIETNAM
      </div>

      <div className="flex flex-col items-start gap-4 absolute w-[22vw] h-[25vh] top-[52vh] left-[11vw] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <p className="relative [font-family:'Urbanist',Helvetica] font-medium text-[#eee4da] text-2xl text-left leading-8">
          In the course of historical development, Vietnam is located in one of
          the areas considered the cradle of mankind.
        </p>

        <p className="relative [font-family:'Urbanist',Helvetica] font-medium text-[#eee4da] text-2xl text-left leading-8">
          Experiencing a vast history, the country of Vietnam we are today is
          thanks to a strength of the whole nation, people of a country who
          share the same flag colors in their hearts.
        </p>
      </div>

      <footer className="absolute top-[93vh] left-[80vw] w-[18vw] h-[3.5vh] flex items-center animate-fade-in opacity-0 [--animation-delay:1000ms]">
        <div className="w-2 h-2 bg-[#c3423f] rounded" />

        <div className="flex items-center justify-center w-[70%] h-[3.5vh] ml-[8%] [font-family:'Bebas_Neue',Helvetica] font-normal text-transparent text-[1.7vw] text-center leading-[normal] whitespace-nowrap tracking-[0.4em]">
          <span className="text-black tracking-[0.5em]">V </span>
          <span className="text-[#c3423f] tracking-[0.5em]">I</span>
          <span className="text-black tracking-[0.5em]"> E </span>
          <span className="text-[#c3423f] tracking-[0.5em]">T</span>
          <span className="text-black tracking-[0.5em]"> N </span>
          <span className="text-[#c3423f] tracking-[0.5em]">A</span>
          <span className="text-black tracking-[0.5em]"> M</span>
        </div>

        <div className="ml-7 w-2 h-2 bg-[#c3423f] rounded" />
      </footer>

      <div className="absolute top-[65vh] left-[94vw] w-[12vw] h-[12vw] shadow-[4px_4px_16px_#ffffff66] animate-fade-in opacity-0 [--animation-delay:800ms]">
        <img
          className="absolute top-0 left-0 w-[12vw] h-[12vw] rounded-full object-cover"
          alt="Bronze drum"
          src={bronze_drum}
        />

        <div className="w-[12vw] h-[12vw] bg-[#12121266] rounded-full absolute top-0 left-0" />
      </div>

      <nav className="flex w-full h-[13vh] items-center justify-end gap-[3vw] px-[5vw] py-11 absolute top-0 left-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        {navItems.map((item, index) => (
          <Button
            key={item.label}
            variant="ghost"
            asChild
            className={`h-auto p-0 [text-shadow:8px_8px_24px_#12121229] [font-family:'Bebas_Neue',Helvetica] font-normal text-[2vw] tracking-[1.60px] leading-[normal] whitespace-nowrap hover:bg-transparent transition-colors ${
              item.active
                ? "text-[#c3423f]"
                : "text-[#121212] hover:text-[#c3423f]"
            }`}
          >
            <Link to={item.label === "HOME" ? "/" : `/${item.label.toLowerCase().replace(/[&\s]/g, "-")}`}>
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  );
};

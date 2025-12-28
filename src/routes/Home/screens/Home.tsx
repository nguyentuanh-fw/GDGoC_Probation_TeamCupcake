import React from "react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";

const navigationItems = [
  { label: "HOME", active: true },
  { label: "Q&A", active: false },
  { label: "HISTORY", active: false },
  { label: "AI CHAT", active: false },
  { label: "MENU", active: false },
];

const timelineIndicators = [
  { active: true },
  { active: false },
  { active: false },
  { active: false },
  { active: false },
  { active: false },
];

const vietnamLetters = [
  { letter: "V", color: "text-black", spacing: "tracking-[0]" },
  { letter: "I", color: "text-[#c3423f]", spacing: "tracking-[4.10px]" },
  { letter: "E", color: "text-black", spacing: "tracking-[0]" },
  { letter: "T", color: "text-[#c3423f]", spacing: "tracking-[4.10px]" },
  { letter: "N", color: "text-black", spacing: "tracking-[0]" },
  { letter: "A", color: "text-[#c3423f]", spacing: "tracking-[4.10px]" },
  { letter: "M", color: "text-black", spacing: "tracking-[0]" },
];

export const Home = (): JSX.Element => {
  return (
    <div className="bg-white overflow-hidden w-full min-h-screen relative">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="Background"
        src="https://c.animaapp.com/mh3n3pje4lkOrl/img/background.png"
      />

      <div className="absolute top-[-80px] left-12 md:left-32 lg:left-48 w-80 h-80 lg:w-96 lg:h-96 shadow-[4px_4px_16px_#ffffff66] hidden sm:block">
        <img
          className="absolute top-[38%] left-0 w-full h-[62%] rounded-[800px] object-cover"
          alt="Bronze drum"
          src="https://c.animaapp.com/mh3n3pje4lkOrl/img/bronze-drum.png"
        />

        <div className="w-full h-full bg-[#e2c8afa3] rounded-[50%] absolute top-0 left-0" />
      </div>

      <div className="top-[15vh] left-20 md:left-1/4 lg:left-1/3 w-11/12 md:w-1/2 lg:w-5/12 max-w-2xl bg-white shadow-[8px_8px_16px_#ffffff3d] absolute h-[60vh] md:h-[70vh] lg:h-[74vh] hidden sm:block">
        <img
          className="top-0 left-[7%] w-[86%] absolute h-full object-cover"
          alt="Image"
          src="https://c.animaapp.com/mh3n3pje4lkOrl/img/image.png"
        />

        <div className="w-full h-full bg-[#d7d7d73d] absolute top-0 left-0" />
      </div>

      <div className="absolute bottom-[15vh] right-20 lg:right-1/3 w-32 h-32 md:w-40 md:h-40 bg-[#c3423f] rounded-[50%] shadow-[8px_8px_16px_#12121266] hidden md:block" />

      <div className="absolute top-[12vh] md:top-[18.5vh] left-8 md:left-20 lg:left-24 max-w-2xl [text-shadow:16px_16px_32px_#1212123d] [font-family:'Times',Helvetica] font-normal text-[#c3423f] text-5xl md:text-6xl lg:text-7xl tracking-wide leading-[1.1]">
        BRIEF HISTORY
        <br />
        OF VIETNAM
      </div>

      <div className="flex flex-col items-start gap-4 absolute w-11/12 md:w-7/12 lg:w-5/12 max-w-xl top-[52vh] md:top-[52vh] left-8 md:left-20 lg:left-24">
        <p
          className="font-sans font-medium text-[#eee4da] text-base md:text-lg lg:text-xl leading-[1.4]"
          style={{ textAlign: 'left', letterSpacing: '0', wordSpacing: '0.25em' }}
        >
          In the course of historical development, Vietnam is located in one of
          the areas considered the cradle of mankind.
        </p>

        <p
          className="font-sans font-medium text-[#eee4da] text-base md:text-lg lg:text-xl leading-[1.4]"
          style={{ textAlign: 'left', letterSpacing: '0', wordSpacing: '0.25em' }}
        >
          Experiencing a vast history, the country of Vietnam we are today is
          thanks to a strength of the whole nation, people of a country who
          share the same flag colors in their hearts.
        </p>
      </div>

      <div className="fixed bottom-8 right-8 flex items-center gap-4 z-50">
        <div className="w-2 h-2 bg-[#c3423f] rounded" />

        <div className="flex items-center justify-center [font-family:'Times',Helvetica] font-normal text-lg md:text-xl lg:text-2xl text-center leading-[normal] whitespace-nowrap">
          {vietnamLetters.map((item, index) => (
            <span key={index} className={`${item.color} ${item.spacing}`}>
              {item.letter}
              {index < vietnamLetters.length - 1 && " "}
            </span>
          ))}
        </div>

        <div className="w-2 h-2 bg-[#c3423f] rounded" />
      </div>

      <div className="absolute bottom-[18vh] right-8 lg:right-20 w-64 h-64 lg:w-80 lg:h-80 shadow-[4px_4px_16px_#ffffff66] hidden lg:block">
        <img
          className="absolute top-0 left-0 w-[42.5%] h-full object-cover"
          alt="Bronze drum"
          src="https://c.animaapp.com/mh3n3pje4lkOrl/img/bronze-drum-1.png"
        />

        <div className="w-full h-full bg-[#12121266] rounded-[50%] absolute top-0 left-0" />
      </div>

      <nav className="flex w-full h-[10vh] md:h-[13vh] items-center justify-end gap-4 md:gap-6 lg:gap-8 px-6 md:px-12 py-4 md:py-11 absolute top-0 left-0 overflow-x-auto">
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            asChild
            className={`h-auto p-0 [text-shadow:8px_8px_24px_#12121229] [font-family:'Times',Helvetica] font-normal text-xl md:text-2xl lg:text-3xl tracking-wide leading-[normal] whitespace-nowrap hover:bg-transparent transition-colors ${
              item.active ? "text-[#c3423f]" : "text-[#121212] hover:text-[#c3423f]"
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

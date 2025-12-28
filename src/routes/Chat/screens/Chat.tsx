import React from "react";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";

const chatListData = [
  {
    name: "Nguyễn Tú Anh",
    message: "Hi",
    time: "03:12",
  },
  {
    name: "Nguyễn Huy Hoàng",
    message: "Ơi em",
    time: "02:11",
  },
  {
    name: "CUPCAKE - GDGOC",
    message: "Nguyễn Tú: dậy chạy deadline đi ae",
    time: "00:23",
  },
  {
    name: "Group CINETOUR",
    message: "QTV: 7h sáng mai có mặt nhé @mọi người",
    time: "SAT",
  },
  {
    name: "Hà",
    message: "Hihihi",
    time: "THUR",
  },
  {
    name: "Nguyễn Chính",
    message: "alo b",
    time: "27/09",
  },
  {
    name: "Group Bảo tàng",
    message: "Mem 1: Hí anh em",
    time: "TUES",
  },
];

const navigationItems = [
  { label: "HOME", active: false },
  { label: "Q&A", active: false },
  { label: "HISTORY", active: false },
  { label: "AI CHAT", active: true },
  { label: "MENU", active: false },
];

const timelineDots = [
  { top: "top-[168px]" },
  { top: "top-[192px]" },
  { top: "top-[216px]" },
  { top: "top-[240px]" },
  { top: "top-[264px]" },
];

export const Chat = (): JSX.Element => {
  return (
    <div className="bg-white overflow-hidden w-full min-w-[1920px] min-h-[1080px] relative">
      <div className="absolute top-0 left-0 w-[1920px] h-[1080px] flex bg-[url(https://c.animaapp.com/mhadz0ghHkHQ1V/img/paper-texture-background.png)] bg-[100%_100%]">
        <div className="w-[1920px] flex bg-[url(https://c.animaapp.com/mhadz0ghHkHQ1V/img/background-image.png)] bg-[100%_100%]">
          <div className="w-[1920px] h-[1080px] bg-[#eee4da] opacity-40" />
        </div>
      </div>

      <div className="absolute top-[-184px] left-[368px] w-[480px] h-[480px] shadow-[4px_4px_16px_#ffffff66]">
        <img
          className="absolute top-[184px] left-0 w-[480px] h-[296px] rounded-[800px] object-cover"
          alt="Bronze drum"
          src="https://c.animaapp.com/mhadz0ghHkHQ1V/img/bronze-drum.png"
        />
        <div className="w-[480px] h-[480px] bg-[#e2c8afa3] rounded-[240px] absolute top-0 left-0" />
      </div>

      <div className="absolute top-[1003px] left-[1539px] w-[343px] h-[38px] flex items-center">
        <div className="w-2 h-2 bg-[#c3423f] rounded" />
        <div className="flex items-center justify-center w-[270px] h-[38px] ml-[27px] [font-family:'Bebas_Neue',Helvetica] font-normal text-transparent text-[32px] text-center leading-[normal] whitespace-nowrap">
          <span className="text-black tracking-[0]">V </span>
          <span className="text-[#c3423f] tracking-[4.10px]">I</span>
          <span className="text-black tracking-[0]"> E </span>
          <span className="text-[#c3423f] tracking-[4.10px]">T</span>
          <span className="text-black tracking-[0]"> N </span>
          <span className="text-[#c3423f] tracking-[4.10px]">A</span>
          <span className="text-black tracking-[0]"> M</span>
        </div>
        <div className="ml-7 w-2 h-2 bg-[#c3423f] rounded" />
      </div>

      <div className="absolute top-[645px] left-[1784px] w-80 h-80 shadow-[4px_4px_16px_#ffffff66]">
        <img
          className="absolute top-0 left-0 w-[136px] h-80"
          alt="Bronze drum"
          src="https://c.animaapp.com/mhadz0ghHkHQ1V/img/bronze-drum-1.png"
        />
        <div className="w-80 h-80 bg-[#12121266] rounded-[160px] absolute top-0 left-0" />
      </div>

      <nav className="absolute top-0 left-0 w-[1928px] h-[140px] flex items-center justify-end gap-[71px] pr-[256px]">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            className={`h-12 [text-shadow:8px_8px_24px_#12121229] [font-family:'Bebas_Neue',Helvetica] font-normal text-[40px] tracking-[1.60px] leading-[normal] whitespace-nowrap ${
              item.active ? "text-[#c3423f]" : "text-[#121212]"
            }`}
            onClick={() => {
              if (item.label === "HOME") {
                window.location.href = "/";
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className="absolute top-[164px] left-[40px] w-[822px] h-[916px] flex flex-col">
        <header className="w-[820px] h-[264px] bg-[#ffcc92] flex items-center justify-center">
          <h1 className="w-[759px] h-[194px] flex items-center justify-center bg-[linear-gradient(90deg,rgba(227,54,41,1)_0%,rgba(195,66,63,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Bebas_Neue',Helvetica] font-normal text-transparent text-9xl text-center tracking-[5.12px] leading-[normal]">
            CUPCAKE
          </h1>
        </header>

        <ScrollArea className="w-[820px] h-[624px]">
          <div className="w-[820px] flex flex-col">
            {chatListData.map((chat, index) => (
              <button
                key={index}
                className="w-[820px] h-[124px] bg-[linear-gradient(180deg,rgba(211,173,130,1)_0%,rgba(163,139,113,0.8)_100%)] flex items-center px-[30px] hover:opacity-90 transition-opacity"
              >
                <div className="w-full flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="[font-family:'Be_Vietnam',Helvetica] font-normal text-black text-2xl tracking-[0.96px] leading-[normal]">
                      {chat.name}
                    </span>
                    <span className="[font-family:'Be_Vietnam',Helvetica] font-normal text-black text-2xl tracking-[0.96px] leading-[normal]">
                      {chat.time}
                    </span>
                  </div>
                  <p className="[font-family:'Be_Vietnam',Helvetica] font-normal text-black text-2xl tracking-[0.96px] leading-[normal] text-left">
                    {chat.message}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </section>

      <img
        className="absolute top-10 left-[1052px] w-[820px] h-[1040px]"
        alt="Image removebg"
        src="https://c.animaapp.com/mhadz0ghHkHQ1V/img/image-removebg-preview-1.png"
      />

      <section className="absolute top-[708px] left-[1108px] w-[603px] flex flex-col gap-6">
        <div className="flex justify-end">
          <time className="[font-family:'Be_Vietnam_Pro',Helvetica] font-normal text-black text-xl text-center tracking-[0.80px] leading-[normal] whitespace-nowrap">
            29/01
          </time>
        </div>

        <div className="w-[433px] h-20 bg-[#eaded2] rounded-[30px] flex items-center px-4">
          <p className="w-full [font-family:'Be_Vietnam_Pro',Helvetica] font-normal text-black text-2xl tracking-[0.96px] leading-[normal]">
            Con gì đó xin chào, bạn muốn tìm hiểu điều gì?
          </p>
        </div>

        <div className="w-[560px] h-16 bg-[#eaded2] rounded-[30px] flex items-center px-[21px] ml-[43px]">
          <Input
            placeholder="Nhập câu hỏi của bạn..."
            className="w-full h-12 bg-transparent border-0 [font-family:'Be_Vietnam_Pro',Helvetica] font-normal text-black text-2xl tracking-[0.96px] leading-[normal] placeholder:text-black focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </section>
    </div>
  );
};
import React from "react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import Backgrounds from "../../../assets/Cream Background Image.png";
const navigationItems = [
  { label: "HOME", active: false },
  { label: "Q&A", active: false },
  { label: "HISTORY", active: false },
  { label: "AI CHAT", active: false },
  { label: "MENU", active: true },
];

const menuSections = [
  {
    title: "TRANG CHÍNH",
    items: [
      { label: "Trang chủ", path: "/", description: "Giới thiệu về lịch sử Việt Nam" },
      { label: "Lịch sử", path: "/history", description: "Timeline tương tác các sự kiện" },
      { label: "Q&A", path: "/q-a", description: "Hỏi đáp về lịch sử" },
      { label: "AI Chat", path: "/ai-chat", description: "Trò chuyện với AI về lịch sử" },
    ]
  },
  {
    title: "VỀ WEBSITE",
    items: [
      { label: "Giới thiệu", description: "Website lịch sử Việt Nam tương tác" },
      { label: "Công nghệ", description: "React, TypeScript, Tailwind CSS, Gemini AI" },
      { label: "Dữ liệu", description: "52 sự kiện lịch sử từ 2879 TCN đến 2007" },
    ]
  }
];

export const Menu = (): JSX.Element => {
  return (
    <div className="bg-white overflow-hidden w-full min-h-screen relative">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="Background"
        src={Backgrounds}
      />

      <div className="absolute top-[12vh] md:top-[18.5vh] left-[5vw] md:left-[11vw] [text-shadow:16px_16px_32px_#1212123d] [font-family:'Bebas_Neue',Helvetica] font-normal text-[#c3423f] text-[15vw] md:text-[10vw] lg:text-[7.5vw] tracking-[0.04em] leading-[1.1]">
        MENU
      </div>

      <div className="flex flex-col items-start gap-8 absolute w-[90vw] md:w-[70vw] lg:w-[60vw] top-[35vh] md:top-[40vh] left-[5vw] md:left-[11vw] max-h-[50vh] overflow-y-auto">
        {menuSections.map((section, idx) => (
          <div key={idx} className="w-full">
            <h2 className="[font-family:'Times New Roman',Helvetica] text-[#eee4da] text-[6vw] md:text-[4vw] lg:text-[2.5vw] mb-4 tracking-wider">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, i) => (
                item.path ? (
                  <Link key={i} to={item.path} className="group">
                    <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all p-4 md:p-6 rounded-xl border border-white/20">
                      <h3 className="[font-family:'Times',Helvetica] text-[#c3423f] text-2xl md:text-3xl lg:text-4xl mb-2 group-hover:text-[#a72e2b] transition-colors">
                        {item.label}
                      </h3>
                      <p className="[font-family:'Urbanist',Helvetica] font-medium text-[#eee4da] text-sm md:text-base lg:text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div key={i} className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20">
                    <h3 className="[font-family:'Times',Helvetica] text-[#c3423f] text-2xl md:text-3xl lg:text-4xl mb-2">
                      {item.label}
                    </h3>
                    <p className="[font-family:'Urbanist',Helvetica] font-medium text-[#eee4da] text-sm md:text-base lg:text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )
              ))}
            </div>
          </div>
        ))}

        {/* <div className="w-full mt-8 p-6 bg-gradient-to-r from-[#c3423f]/20 to-transparent rounded-xl border border-[#c3423f]/30">
          <h3 className="[font-family:'Bebas_Neue',Helvetica] text-[#c3423f] text-[5vw] md:text-[3vw] lg:text-[1.8vw] mb-3">
            Hướng dẫn sử dụng AI Chat
          </h3>
          <ul className="[font-family:'Urbanist',Helvetica] font-medium text-[#eee4da] text-[3.5vw] md:text-[2vw] lg:text-[1vw] space-y-2 leading-relaxed">
            <li>1. Tạo file .env và thêm VITE_GEMINI_API_KEY</li>
            <li>2. Lấy API key miễn phí tại: makersuite.google.com/app/apikey</li>
            <li>3. Xem chi tiết trong file AI_SETUP.md</li>
          </ul>
        </div> */}
      </div>

      <footer className="fixed bottom-8 right-8 flex items-center gap-4 z-50">
        <div className="w-2 h-2 bg-[#c3423f] rounded" />
        <div className="flex items-center justify-center [font-family:'Bebas_Neue',Helvetica] font-normal text-lg md:text-xl lg:text-2xl text-center leading-[normal] whitespace-nowrap">
          <span className="text-black tracking-[0]">V </span>
          <span className="text-[#c3423f] tracking-[4.10px]">I</span>
          <span className="text-black tracking-[0]"> E </span>
          <span className="text-[#c3423f] tracking-[4.10px]">T</span>
          <span className="text-black tracking-[0]"> N </span>
          <span className="text-[#c3423f] tracking-[4.10px]">A</span>
          <span className="text-black tracking-[0]"> M</span>
        </div>
        <div className="w-2 h-2 bg-[#c3423f] rounded" />
      </footer>

      <nav className="flex w-full h-[10vh] md:h-[13vh] items-center justify-end gap-4 md:gap-6 lg:gap-8 px-6 md:px-12 py-4 md:py-11 absolute top-0 left-0 overflow-x-auto">
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            asChild
            className={`h-auto p-0 [text-shadow:8px_8px_24px_#12121229] [font-family:'Bebas_Neue',Helvetica] font-normal text-xl md:text-2xl lg:text-3xl tracking-wide leading-[normal] whitespace-nowrap hover:bg-transparent transition-colors ${
              item.active ? "text-[#c3423f]" : "text-[#fdfdfd] hover:text-[#c3423f]"
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

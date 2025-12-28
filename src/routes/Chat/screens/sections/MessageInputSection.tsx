import React from "react";
import { ScrollArea } from "../../components/ui/scroll-area";

export const MessageInputSection = (): JSX.Element => {
  const messages = [
    { id: 1, text: "a để ghép ak?", align: "right", marginLeft: "ml-[171px]" },
    { id: 2, text: "a nghĩ the", align: "left", marginLeft: "" },
    { id: 3, text: "ok ạ", align: "right", marginLeft: "ml-[171px]" },
    { id: 4, text: "e cx nghĩ the", align: "right", marginLeft: "ml-[172px]" },
  ];

  const messagesAfterDate = [
    {
      id: 5,
      text: "Tbao trong dis nhé a",
      align: "right",
      marginLeft: "ml-[173px]",
    },
    { id: 6, text: "Ok", align: "left", marginLeft: "ml-px" },
  ];

  const messagesAfterTime1 = [
    { id: 7, text: "A oi", align: "right", marginLeft: "ml-[173px]" },
  ];

  const messagesAfterTime2 = [
    { id: 8, text: "Ơi em", align: "left", marginLeft: "ml-px" },
  ];

  return (
    <section className="w-full h-full flex overflow-hidden">
      <ScrollArea className="w-full h-full">
        <div className="w-full flex flex-col py-4 px-2">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`w-[433px] h-20 relative ${message.marginLeft} ${index > 0 ? "mt-7" : ""}`}
            >
              <div className="absolute top-0 left-0 w-[431px] h-20 bg-[#eaded2] rounded-[30px]" />
              <div
                className={`absolute top-4 left-4 w-[400px] h-12 flex items-center justify-center [font-family:'Be_Vietnam_Pro',Helvetica] font-normal text-black text-2xl tracking-[0.96px] leading-[normal] ${message.align === "right" ? "text-right" : ""}`}
              >
                {message.text}
              </div>
            </div>
          ))}

          <time className="mt-[52px] flex items-center justify-center ml-[229px] w-[157px] h-[23px] [font-family:'Be_Vietnam_Pro',Helvetica] font-normal text-black text-xl text-center tracking-[0.80px] leading-[normal] whitespace-nowrap">
            03/10
          </time>

          {messagesAfterDate.map((message, index) => (
            <div
              key={message.id}
              className={`w-[433px] h-20 relative ${message.marginLeft} ${index === 0 ? "mt-9" : "mt-[38px]"}`}
            >
              <div className="absolute top-0 left-0 w-[431px] h-20 bg-[#eaded2] rounded-[30px]" />
              <div
                className={`absolute top-4 left-4 w-[400px] h-12 flex items-center justify-center [font-family:'Be_Vietnam_Pro',Helvetica] font-normal text-black text-2xl tracking-[0.96px] leading-[normal] ${message.align === "right" ? "text-right" : ""}`}
              >
                {message.text}
              </div>
            </div>
          ))}

          <time className="mt-[23px] flex items-center justify-center ml-[229px] w-[157px] h-[23px] [font-family:'Be_Vietnam_Pro',Helvetica] font-normal text-black text-xl text-center tracking-[0.80px] leading-[normal] whitespace-nowrap">
            01:12
          </time>

          {messagesAfterTime1.map((message) => (
            <div
              key={message.id}
              className={`w-[433px] h-20 relative ${message.marginLeft} mt-[22px]`}
            >
              <div className="absolute top-0 left-0 w-[431px] h-20 bg-[#eaded2] rounded-[30px]" />
              <div
                className={`absolute top-4 left-4 w-[400px] h-12 flex items-center justify-center [font-family:'Be_Vietnam_Pro',Helvetica] font-normal text-black text-2xl tracking-[0.96px] leading-[normal] ${message.align === "right" ? "text-right" : ""}`}
              >
                {message.text}
              </div>
            </div>
          ))}

          <time className="mt-[22px] flex items-center justify-center ml-[229px] w-[157px] h-[23px] [font-family:'Be_Vietnam_Pro',Helvetica] font-normal text-black text-xl text-center tracking-[0.80px] leading-[normal] whitespace-nowrap">
            02:11
          </time>

          {messagesAfterTime2.map((message) => (
            <div
              key={message.id}
              className={`w-[433px] h-20 relative ${message.marginLeft} mt-[22px]`}
            >
              <div className="absolute top-0 left-0 w-[431px] h-20 bg-[#eaded2] rounded-[30px]" />
              <div
                className={`absolute top-4 left-4 w-[400px] h-12 flex items-center justify-center [font-family:'Be_Vietnam_Pro',Helvetica] font-normal text-black text-2xl tracking-[0.96px] leading-[normal] ${message.align === "right" ? "text-right" : ""}`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

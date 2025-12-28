import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";

const chatData = [
  {
    name: "Nguyễn Tú Anh",
    message: "Hi",
    time: "03:12",
    isBold: false,
  },
  {
    name: "Nguyễn Huy Hoàng",
    message: "Ơi em",
    time: "02:11",
    isBold: true,
  },
  {
    name: "CUPCAKE - GDGOC",
    message: "Nguyễn Tú: dậy chạy deadline đi ae",
    time: "00:23",
    isBold: false,
  },
  {
    name: "Group CINETOUR",
    message: "QTV: 7h sáng mai có mặt nhé @mọi người",
    time: "SAT",
    isBold: false,
  },
  {
    name: "Hà",
    message: "Hihihi",
    time: "THUR",
    isBold: false,
  },
  {
    name: "Nguyễn Chính",
    message: "alo b",
    time: "27/09",
    isBold: false,
  },
  {
    name: "Group Bảo tàng",
    message: "Sa Khiếu:",
    time: "TUES",
    isBold: false,
  },
];

export const ChatSection = (): JSX.Element => {
  return (
    <ScrollArea className="w-full h-full">
      <div className="flex flex-col gap-0">
        {chatData.map((chat, index) => (
          <Card
            key={index}
            className="rounded-none border-0 bg-[linear-gradient(180deg,rgba(211,173,130,1)_0%,rgba(163,139,113,0.8)_100%)] hover:opacity-90 transition-opacity cursor-pointer"
          >
            <CardContent className="p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div
                    className={`[font-family:'Be_Vietnam',Helvetica] text-black text-2xl tracking-[0.96px] leading-[normal] mb-1 ${
                      chat.isBold
                        ? "font-bold tracking-[0.23px]"
                        : "font-normal"
                    }`}
                  >
                    {chat.name}
                  </div>
                  <div
                    className={`[font-family:'Be_Vietnam',Helvetica] text-black text-2xl leading-[normal] ${
                      chat.isBold ? "tracking-[0.23px]" : "tracking-[0.96px]"
                    } ${chat.isBold ? "font-normal" : "font-normal"}`}
                  >
                    {chat.message}
                  </div>
                </div>
                <div className="[font-family:'Be_Vietnam',Helvetica] font-normal text-black text-2xl tracking-[0.96px] leading-[normal] whitespace-nowrap">
                  {chat.time}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

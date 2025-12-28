import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { ScrollArea } from "../../../components/ui/scroll-area";
import background from "../../../assets/background.png";
import bronzeDrum from "../../../assets/bronze-drum.png";
import { sendMessageToGemini } from "../../../services/gemini";

const chatListData = [
  { id: "ai", name: "CUPCAKE", message: "Cupcake xin chào, bạn muốn tìm hiểu điều gì?", time: "29/01", active: true },
  { id: "tuanh", name: "Nguyễn Tú Anh", message: "Hi", time: "03:12" },
  { id: "huyhoang", name: "Nguyễn Huy Hoàng", message: "Ơi em", time: "02:11" },
  { id: "cupcake", name: "CUPCAKE - GDGOC", message: "Nguyễn Tú: dậy chạy deadline đi ae", time: "00:23" },
  { id: "cinetour", name: "Group CINETOUR", message: "QTV: 7h sáng mai có mặt nhé @mọi người", time: "SAT" },
];

const initialMessages = [
    { id: 1, text: "Cupcake xin chào, bạn muốn tìm hiểu điều gì?", sender: "ai" },
    { id: 2, text: "Lịch sử của trống đồng Đông Sơn?", sender: "me" },
    { id: 3, text: "Trống đồng Đông Sơn là một loại trống đồng tiêu biểu cho Văn hóa Đông Sơn (thế kỷ VII TCN - thế kỷ I SCN) của người Việt cổ. Loại trống này có kích thước và hình dáng đa dạng, được trang trí hoa văn phong phú, phản ánh đời sống vật chất và tinh thần của cư dân thời bấy giờ.", sender: "ai" },
];

const parseMarkdown = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return <span key={index} className="bg-yellow-200 text-gray-900 px-1 rounded">{content}</span>;
    }
    return <span key={index}>{part}</span>;
  });
};

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="max-w-lg rounded-2xl px-5 py-3 shadow-md bg-[#F0E5D9]">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

const TypewriterText = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{parseMarkdown(displayedText)}</span>;
};

const Header = () => (
  <nav className="z-[100] flex w-full h-[13vh] items-center justify-end gap-4 md:gap-6 lg:gap-8 px-6 md:px-12 py-11 absolute top-0 left-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
    {["HOME", "Q&A", "HISTORY", "AI CHAT", "MENU"].map((label) => (
      <Button
        key={label}
        variant="ghost"
        className={`h-auto p-0 flex items-center gap-1 [text-shadow:8px_8px_24px_#12121229] [font-family:'Bebas_Neue',Helvetica] font-normal text-xl md:text-2xl lg:text-3xl tracking-wide leading-[normal] whitespace-nowrap hover:bg-transparent transition-colors ${
          label === "AI CHAT" ? "text-[#c3423f]" : "text-white hover:text-[#c3423f]"
        }`}
        asChild
      >
        <Link to={label === "HOME" ? "/" : `/${label.toLowerCase().replace(/[&\s]/g, "-")}`}>{label}</Link>
      </Button>
    ))}
  </nav>
);

const ChatListItem = ({ chat, onSelect, isActive }: { chat: typeof chatListData[0], onSelect: () => void, isActive: boolean }) => (
    <button
        onClick={onSelect}
        className={`w-full text-left p-4 transition-colors rounded-lg ${isActive ? 'bg-[#D3AD82]/50' : 'hover:bg-[#D3AD82]/20'}`}
    >
        <div className="flex justify-between items-baseline">
            <h3 className="font-bold font-vietnam text-stone-800">{chat.name}</h3>
            <time className="text-xs text-stone-500 font-vietnam">{chat.time}</time>
        </div>
        <p className="text-sm text-stone-600 truncate font-vietnam">{chat.message}</p>
    </button>
);

const MessageBubble = ({ message, isNew }: { message: typeof initialMessages[0], isNew?: boolean }) => {
    const isMe = message.sender === 'me';
    const isAI = message.sender === 'ai';

    return (
        <div
            className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fade-in ${
                isNew ? 'animate-slide-up' : ''
            }`}
            style={{
                animation: isNew ? 'fadeInSlide 0.4s ease-out' : undefined
            }}
        >
            <div
                className={`max-w-lg rounded-2xl px-5 py-3 shadow-md transition-all duration-300 hover:shadow-lg ${
                    isMe
                        ? 'bg-white text-stone-800'
                        : 'bg-[#F0E5D9] text-stone-800'
                }`}
            >
                <p className="font-vietnam text-base">
                    {isAI && isNew ? (
                        <TypewriterText text={message.text} speed={20} />
                    ) : isAI ? (
                        parseMarkdown(message.text)
                    ) : (
                        message.text
                    )}
                </p>
            </div>
        </div>
    );
};


// --- MAIN AIChat COMPONENT --- //

export const AIChat = (): JSX.Element => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [activeChat, setActiveChat] = useState("ai");
  const [isLoading, setIsLoading] = useState(false);
  const [latestMessageId, setLatestMessageId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInSlide {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, text: userMessage, sender: "me" }]);
    setLatestMessageId(userMsgId);
    setInput("");
    setIsLoading(true);

    try {
      // Lấy lịch sử hội thoại để AI có context
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === "me" ? "user" : "model",
        text: msg.text
      }));

      // Gọi Gemini API
      const aiResponse = await sendMessageToGemini(userMessage, conversationHistory);

      const aiMsgId = Date.now();
      setMessages(prev => [...prev, {
        id: aiMsgId,
        text: aiResponse,
        sender: "ai"
      }]);
      setLatestMessageId(aiMsgId);
    } catch (error) {
      console.error("Error:", error);
      const errorMsgId = Date.now();
      setMessages(prev => [...prev, {
        id: errorMsgId,
        text: "⚠️ Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.",
        sender: "ai"
      }]);
      setLatestMessageId(errorMsgId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-fixed font-sans"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Header />

      {/* Main Content */}
      <main className="h-full pt-36 flex">
        {/* Decorative Bronze Drum */}
        <div className="absolute top-[-150px] left-[15%] w-[480px] h-[480px] bg-[#E2C8AF]/60 rounded-full shadow-lg" />
        <img
          src={bronzeDrum}
          alt="Bronze Drum"
          className="absolute top-[-150px] left-[15%] w-[480px] h-[480px] pointer-events-none object-cover rounded-full"
        />

        {/* Chat Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 px-12 pb-12 h-full">
          
          {/* Chat List */}
          <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-stone-300/50">
                <h2 className="font-bebas text-5xl text-[#C3423F] tracking-wider">CUPCAKE</h2>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-1">
                    {chatListData.map(chat => (
                        <ChatListItem 
                            key={chat.id} 
                            chat={chat} 
                            onSelect={() => setActiveChat(chat.id)}
                            isActive={activeChat === chat.id}
                        />
                    ))}
                </div>
            </ScrollArea>
          </div>

          {/* Chat Window */}
          <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg flex flex-col h-full">
            <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                <div className="space-y-6">
                    {messages.map(msg => (
                        <MessageBubble
                            key={msg.id}
                            message={msg}
                            isNew={msg.id === latestMessageId}
                        />
                    ))}
                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-stone-300/50">
              <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                <Input
                  type="text"
                  placeholder="Nhập câu hỏi của bạn..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="flex-1 bg-white/50 border-2 border-stone-300/70 rounded-full px-6 py-3 h-14 text-base font-vietnam placeholder:text-stone-500 focus:ring-2 focus:ring-[#C3423F] focus:border-[#C3423F]"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#C3423F] hover:bg-[#a72e2b] text-white rounded-full h-14 w-14 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                      <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
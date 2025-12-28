import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import decorationImage from "../../../assets/Decoration 6.png";
import background_cream from "../../../assets/Cream Background Image.png"
import { sendMessageToGemini } from "../../../services/gemini";

// Helper function to parse markdown bold and convert to highlighted text
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

export const QA: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<{role: string, text: string}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = input.trim();

      // Add user message to UI
      setMessages(prev => [...prev, {text: userMessage, isUser: true}]);
      setInput('');
      setIsLoading(true);

      try {
        // Call Gemini API
        const aiResponse = await sendMessageToGemini(userMessage, conversationHistory);

        // Add AI response to UI
        setMessages(prev => [...prev, {text: aiResponse, isUser: false}]);

        // Update conversation history
        setConversationHistory(prev => [
          ...prev,
          { role: 'user', text: userMessage },
          { role: 'assistant', text: aiResponse }
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prev => [...prev, {
          text: '⚠️ Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại.',
          isUser: false
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const questions = [
    {
      title: 'Vì sao vua Hùng được xem là người lập nên nước Việt đầu tiên?',
      desc: 'Liệu khái niệm "nhà nước" thời Hùng Vương có thực sự tồn tại?',
      answers: [
        { user: 'Shark Bình', time: '10 mins ago', avatar: 'https://randomuser.me/api/portraits/men/40.jpg', text: 'Vua Hùng thống nhất bộ lạc.' },
        { user: 'Trung Kiên', time: '7 hours ago', avatar: 'https://randomuser.me/api/portraits/men/35.jpg', text: 'Nhà nước Hùng Vương là bước đầu.' }
      ]
    },
    {
      title: 'Vì sao Mỹ chọn Ngô Đình Diệm làm lãnh đạo Việt Nam Cộng Hòa?',
      desc: 'Quyết định này dựa trên khả năng, lý tưởng, hay chỉ vì Diệm chống cộng mạnh mẽ...?',
      answers: [
        { user: 'Shark Bình', time: '10 mins ago', avatar: 'https://randomuser.me/api/portraits/men/40.jpg', text: 'Diệm chống cộng kiên định.' },
        { user: 'Trung Kiên', time: '7 hours ago', avatar: 'https://randomuser.me/api/portraits/men/35.jpg', text: 'Diệm là lựa chọn ổn định.' }
      ]
    },
    {
      title: 'Vì sao dù được Mỹ viện trợ khổng lồ, Việt Nam Cộng Hòa vẫn không giữ được miền Nam?',
      desc: 'Nguyên nhân thất bại của chính quyền miền Nam dù có viện trợ lớn từ Mỹ.',
      answers: [
        { user: 'Shark Bình', time: '10 mins ago', avatar: 'https://randomuser.me/api/portraits/men/40.jpg', text: 'Thiếu hỗ trợ dân sự.' },
        { user: 'Trung Kiên', time: '7 hours ago', avatar: 'https://randomuser.me/api/portraits/men/35.jpg', text: 'Mất lòng tin dân chúng.' }
      ]
    }
  ];
  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ backgroundImage: `url(${background_cream})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Header */}
      <nav className="absolute top-0 left-0 z-50 flex w-full h-[13vh] items-center justify-end gap-4 md:gap-6 lg:gap-8 px-6 md:px-12 py-11 absolute top-0 left-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        {['HOME', 'Q&A', 'HISTORY', 'AI CHAT', 'MENU'].map((label) => (
          <Button
            key={label}
            variant="ghost"
            asChild
            className={`h-auto p-0 flex items-center gap-1 [text-shadow:8px_8px_24px_#12121229] [font-family:'Bebas_Neue',Helvetica] font-normal text-xl md:text-2xl lg:text-3xl tracking-wide leading-[normal] whitespace-nowrap hover:bg-transparent transition-colors ${
              label === 'Q&A' ? 'text-[#c3423f]' : 'text-white hover:text-[#c3423f]'
            }`}
          >
            <Link to={label === "HOME" ? "/" : `/${label.toLowerCase().replace(/[&\s]/g, "-")}`}>
              {label === 'AI CHAT' ? (
                <>
                 
                  {label}
                </>
              ) : (
                label
              )}
            </Link>
          </Button>
        ))}
      </nav>

      {/* Title */}
      <h1 className="absolute top-[16.5vh] left-[5vw] text-5xl md:text-6xl lg:text-7xl font-bebas text-[#c3423f] tracking-wider translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] z-10">
        QUESTIONS
      </h1>

      <img
        src={decorationImage}
        alt="Decoration"
        className="absolute left-[30vw] w-[480px] h-[480px] z-10 animate-fade-in opacity-0 [--animation-delay:300ms]"
        style={{ top: '-240px' }}
      />

      

      {/* Ask button */}

      
      {/* Ask button */}
      {!showChat && (
        <div className="border-run absolute top-[32vh] right-[10vw]">
          <Button onClick={() => setShowChat(true)} className="bg-[#c3423f] hover:bg-[#a72e2b] rounded-md text-[1.5vw] px-8 py-4 animate-fade-in opacity-0 [--animation-delay:400ms] flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="white"/>
            </svg>
            ASK QUESTION
          </Button>
        </div>
      )}      {/* Question cards */}
      {expanded !== null ? (() => {
        const q = questions[expanded];
        return (
          <div className="absolute top-[35vh] left-[5vw] w-[50vw] bg-white p-6 rounded-2xl shadow-md">
            <Button onClick={() => setExpanded(null)} className="mb-4 bg-[#c3423f] hover:bg-[#a72e2b] text-white px-4 py-2">← Back</Button>
            <h2 className="text-[1.5vw] font-semibold text-[#121212] mb-2">{q.title}</h2>
            <p className="text-[1.2vw] text-[#121212b3] mb-4">{q.desc}</p>
            <div className="space-y-4">
              {q.answers.map((a, i) => (
                <div key={i} className="bg-[#f5f5f5] p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={a.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                    <span className="text-[1vw] text-[#121212]">{a.user} - {a.time}</span>
                  </div>
                  <p className="text-[1.2vw] text-[#121212]">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })() : (
        <div className="absolute top-[35vh] left-[5vw] flex flex-col gap-8 w-[50vw] h-[60vh] overflow-y-auto translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {questions.map((q, i) => (
            <div
              key={i}
              className="bg-[#f5f5f5] p-6 rounded-2xl shadow-md hover:scale-[1.01] transition-all cursor-pointer"
              onClick={() => setExpanded(i)}
            >
              <h2 className="text-[1.5vw] font-semibold text-[#121212]" onClick={() => setExpanded(i)}>{q.title}</h2>
              <p className="text-[1.2vw] text-[#121212b3] mt-2">{q.desc}</p>
              <div className="flex items-center justify-end mt-4 gap-2 text-[1vw] text-[#121212]">
                <img src={q.answers[0].avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                <span>{q.answers[0].user} - {q.answers[0].time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer text */}
      <footer className="absolute top-[93vh] left-[80vw] w-[18vw] h-[3.5vh] flex items-center animate-fade-in opacity-0 [--animation-delay:1000ms]">
        <div className="w-2 h-2 bg-[#c3423f] rounded" />
        <div className="flex items-center justify-center w-[70%] h-[3.5vh] ml-[8%] [font-family:'Bebas_Neue',Helvetica] font-normal text-transparent text-[1.7vw] text-center leading-[normal] whitespace-nowrap tracking-[0.5em]">
          <span className="text-white tracking-[0.5em]">V </span>
          <span className="text-[#c3423f] tracking-[0.5em]">I</span>
          <span className="text-white tracking-[0.5em]"> E </span>
          <span className="text-[#c3423f] tracking-[0.5em]">T</span>
          <span className="text-white tracking-[0.5em]"> N </span>
          <span className="text-[#c3423f] tracking-[0.5em]">A</span>
          <span className="text-white tracking-[0.5em]"> M</span>
        </div>
        <div className="ml-7 w-2 h-2 bg-[#c3423f] rounded" />
      </footer>

      {showChat && (
        <div className="absolute bottom-20 right-8 w-96 h-[32rem] bg-white rounded-lg shadow-lg flex flex-col z-50 animate-fade-in transform scale-110 translate-y-[-10px] transition-all duration-300">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <button onClick={() => window.location.href = '/ai-chat'} className="hover:bg-gray-100 p-1 rounded">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="currentColor"/>
                </svg>
              </button>
              <h3 className="font-semibold">AI Chat</h3>
            </div>
            <Button onClick={() => setShowChat(false)} variant="ghost" size="sm">X</Button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="text-sm">Hỏi AI về lịch sử Việt Nam</p>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`mb-3 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      msg.isUser
                        ? 'bg-[#c3423f] text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}>
                      {msg.isUser ? msg.text : parseMarkdown(msg.text)}
                    </span>
                  </div>
                ))}
                {isLoading && (
                  <div className="mb-3 text-left">
                    <span className="inline-block p-3 rounded-lg bg-gray-100 rounded-bl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
              disabled={isLoading}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c3423f] disabled:bg-gray-100"
              placeholder="Hỏi về lịch sử Việt Nam..."
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-[#c3423f] hover:bg-[#a72e2b] disabled:opacity-50 disabled:cursor-not-allowed px-6"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Gửi'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

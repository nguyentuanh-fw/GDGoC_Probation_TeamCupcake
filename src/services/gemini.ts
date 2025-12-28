import { GoogleGenerativeAI } from "@google/generative-ai";

// Khởi tạo Gemini AI
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

// Context về lịch sử Việt Nam để AI có kiến thức chính xác
const VIETNAM_HISTORY_CONTEXT = `
Bạn là một chuyên gia về lịch sử Việt Nam với kiến thức sâu rộng về:
- Thời kỳ Hồng Bàng và các vua Hùng (2879 TCN - 258 TCN)
- Thời kỳ Bắc thuộc và các cuộc khởi nghĩa (111 TCN - 938)
- Các triều đại phong kiến: Ngô, Đinh, Tiền Lê, Lý, Trần, Hồ, Lê, Mạc, Tây Sơn, Nguyễn
- Thời kỳ Pháp thuộc và kháng chiến (1858-1954)
- Chiến tranh Việt Nam và thống nhất đất nước (1954-1975)
- Thời kỳ đổi mới và hội nhập (1986-nay)

Hãy trả lời các câu hỏi về lịch sử Việt Nam một cách chính xác, khách quan và dễ hiểu.
Nếu người dùng hỏi về chủ đề khác ngoài lịch sử Việt Nam, hãy lịch sự đề nghị họ hỏi về lịch sử Việt Nam.
`;

export async function sendMessageToGemini(
  userMessage: string,
  conversationHistory: { role: string; text: string }[] = []
): Promise<string> {
  try {
    // Kiểm tra API key
    if (!API_KEY) {
      return "⚠️ Chưa cấu hình API key. Vui lòng tạo file .env và thêm VITE_GEMINI_API_KEY. Xem hướng dẫn trong file .env.example";
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Tạo prompt với context và lịch sử hội thoại
    let fullPrompt = VIETNAM_HISTORY_CONTEXT + "\n\n";

    // Thêm lịch sử hội thoại
    if (conversationHistory.length > 0) {
      fullPrompt += "Lịch sử hội thoại:\n";
      conversationHistory.forEach((msg) => {
        fullPrompt += `${msg.role === "user" ? "Người dùng" : "AI"}: ${msg.text}\n`;
      });
      fullPrompt += "\n";
    }

    fullPrompt += `Người dùng: ${userMessage}\n\nAI:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return text || "Xin lỗi, tôi không thể trả lời câu hỏi này.";
  } catch (error: any) {
    console.error("Lỗi khi gọi Gemini API:", error);

    if (error.message?.includes("API_KEY_INVALID")) {
      return "⚠️ API key không hợp lệ. Vui lòng kiểm tra lại VITE_GEMINI_API_KEY trong file .env";
    }

    return `⚠️ Đã xảy ra lỗi: ${error.message || "Không thể kết nối với AI"}. Vui lòng thử lại sau.`;
  }
}

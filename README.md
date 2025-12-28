# Website Lịch Sử Việt Nam

Website tương tác về lịch sử Việt Nam với timeline, AI chat, và Q&A.

## ✨ Tính năng chính

### 1. 📚 Dữ liệu lịch sử đầy đủ
- **52 sự kiện lịch sử** từ 2879 TCN đến 2007
- Bao phủ tất cả triều đại: Hồng Bàng, Ngô, Đinh, Lê, Lý, Trần, Hồ, Lê Sơ, Mạc, Tây Sơn, Nguyễn
- Thời kỳ Pháp thuộc, kháng chiến, và đổi mới

### 2. 🤖 AI Chat thực sự
- Tích hợp **Google Gemini AI**
- Trả lời câu hỏi về lịch sử Việt Nam
- Context-aware với lịch sử hội thoại
- **MIỄN PHÍ** (60 requests/phút)

### 3. 📱 Responsive Design
- Hỗ trợ desktop, tablet, và mobile
- Sử dụng Tailwind CSS với breakpoints
- Viewport units (vw/vh) cho scaling linh hoạt
- Animations mượt mà

### 4. 🗺️ Timeline tương tác
- Drill-down vào các khoảng thời gian cụ thể
- Filter theo độ quan trọng của sự kiện
- Hiển thị ảnh và thông tin chi tiết
- Navigation trực quan

## 🚀 Cài đặt và chạy

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Cấu hình AI Chat (tùy chọn)
1. Tạo file `.env` trong thư mục gốc
2. Thêm API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```
3. Lấy API key miễn phí tại: https://makersuite.google.com/app/apikey

Xem chi tiết trong file `AI_SETUP.md`

### Bước 3: Chạy development server
```bash
npm run dev
```

### Bước 4: Build cho production
```bash
npm run build
```

## 📁 Cấu trúc project

```
src/
├── routes/
│   ├── Home/          # Trang chủ
│   ├── History/       # Timeline lịch sử (52 sự kiện)
│   ├── QA/            # Trang hỏi đáp
│   ├── AIChat/        # Chat với AI (Gemini)
│   ├── Chat/          # Chat page
│   └── Menu/          # Menu navigation
├── services/
│   └── gemini.ts      # Gemini AI service
├── components/
│   └── ui/            # UI components (Shadcn)
└── assets/            # Hình ảnh và tài nguyên
```

## 🛠️ Công nghệ sử dụng

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Google Gemini AI** - AI chatbot
- **Shadcn UI** - UI components

## 🎨 Thiết kế

- Màu chủ đạo: `#c3423f` (đỏ Việt Nam)
- Font chính: **Bebas Neue** (headings), **Urbanist** (body)
- Responsive breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

## 📝 Các trang chính

### Trang chủ (/)
Giới thiệu về lịch sử Việt Nam với văn bản và hình ảnh đẹp mắt.

### Lịch sử (/history)
Timeline tương tác với 52 sự kiện lịch sử. Click vào khoảng thời gian để xem chi tiết.

### Q&A (/q-a)
Trang hỏi đáp về các chủ đề lịch sử, có thể mở chat AI để hỏi thêm.

### AI Chat (/ai-chat)
Chat trực tiếp với AI để tìm hiểu về lịch sử Việt Nam. Cần cấu hình API key.

### Menu (/menu)
Navigation và thông tin về website.

## 🔧 Cải thiện đã thực hiện

### ✅ Dữ liệu
- Thêm 37 sự kiện lịch sử mới (từ 15 lên 52 sự kiện)
- Bao phủ từ 2879 TCN đến 2007
- Cập nhật fullRange cho timeline

### ✅ AI Integration
- Cài đặt `@google/generative-ai`
- Tạo service `gemini.ts` với context về lịch sử VN
- Cập nhật AIChat component với loading states
- Thêm error handling và API key validation

### ✅ Responsive Design
- Xóa `min-w-[1920px]` cố định
- Thay đổi fixed pixels sang viewport units (vw/vh)
- Thêm breakpoints: sm, md, lg
- Tối ưu cho mobile/tablet

### ✅ UI/UX
- Thêm animations với `animate-fade-in`
- Cải thiện hover states
- Backdrop blur effects
- Better spacing và typography

## 📄 License

This project is for educational purposes.

## 👨‍💻 Phát triển bởi

GDGoC Probation Project - Enhanced by Claude Code

---

**Ghi chú:** Nếu bạn gặp lỗi với AI Chat, hãy đảm bảo đã cấu hình đúng API key trong file `.env`. Xem `AI_SETUP.md` để biết chi tiết.

# Hướng dẫn cấu hình AI Chat

Website đã được tích hợp Google Gemini AI để trả lời các câu hỏi về lịch sử Việt Nam.

## Bước 1: Lấy API Key miễn phí

1. Truy cập: https://makersuite.google.com/app/apikey
2. Đăng nhập bằng Google account
3. Click "Create API Key"
4. Copy API key vừa tạo

## Bước 2: Cấu hình API Key

1. Tạo file `.env` trong thư mục gốc của project (cùng cấp với file `package.json`)
2. Thêm nội dung sau vào file `.env`:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

3. Thay `your_api_key_here` bằng API key bạn vừa copy

## Bước 3: Khởi động lại server

```bash
npm run dev
```

## Kiểm tra

- Truy cập trang **AI CHAT**
- Hỏi một câu hỏi về lịch sử Việt Nam
- AI sẽ trả lời dựa trên kiến thức được huấn luyện

## Lưu ý

- API key là **MIỄN PHÍ** với giới hạn 60 requests/phút
- Nếu thấy lỗi "API_KEY_INVALID", kiểm tra lại file `.env`
- File `.env` không được commit lên Git (đã có trong `.gitignore`)

## Ví dụ câu hỏi

- "Kể về trận Bạch Đằng năm 1288"
- "Vì sao nhà Trần chiến thắng được quân Mông Cổ?"
- "Lịch sử Cách mạng tháng Tám 1945"
- "Điện Biên Phủ có ý nghĩa gì?"

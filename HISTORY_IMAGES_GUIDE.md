# Hướng Dẫn Tìm và Thay Ảnh Lịch Sử Việt Nam

## 🖼️ Nguồn Ảnh Miễn Phí & Hợp Pháp

### 1. **Wikimedia Commons** (Đề xuất cao nhất)
- URL: https://commons.wikimedia.org/wiki/Category:History_of_Vietnam
- Ảnh Public Domain hoặc Creative Commons
- Chất lượng cao, có ghi chú nguồn gốc

### 2. **Vietnam Museums Online**
- Bảo tàng Lịch sử Quốc gia
- Bảo tàng Hồ Chí Minh
- Bảo tàng Mỹ thuật Việt Nam

### 3. **Pexels**
- URL: https://www.pexels.com/search/vietnam%20history/
- Miễn phí 100%, không cần credit

### 4. **Unsplash**
- URL: https://unsplash.com/s/photos/vietnam-temple
- Miễn phí, chất lượng cao

## 📝 Danh Sách Sự Kiện Cần Ảnh

### Thời Hồng Bàng (2879 TCN - 258 TCN)
| ID | Sự kiện | Gợi ý keyword tìm ảnh |
|---|---|---|
| van-lang-thanh-lap | Thành lập Văn Lang | "dong son drum", "hung temple", "bronze drum vietnam" |
| thoi-hong-bang | Thời kỳ Hồng Bàng | "ancient vietnam", "red river delta", "vietnamese bronze age" |
| au-lac-an-duong-vuong | Âu Lạc | "co loa citadel", "ancient fortress vietnam" |

### Bắc Thuộc (111 TCN - 938)
| ID | Sự kiện | Gợi ý keyword |
|---|---|---|
| trung-quoc-tham-chiem | Hán thôn tính | "han dynasty vietnam", "ancient chinese rule" |
| hai-ba-trung | Hai Bà Trưng | "trung sisters", "vietnamese heroines", "elephant warriors" |
| ly-bi | Lý Bí khởi nghĩa | "early ly dynasty", "vietnamese independence" |

### Độc Lập - Nhà Lý (938 - 1225)
| ID | Sự kiện | Gợi ý keyword |
|---|---|---|
| ngo-quyen | Ngô Quyền | "bach dang river", "naval battle vietnam" |
| dinh-tien-hoang | Đinh Bộ Lĩnh | "hoa lu ancient capital" |
| thang-long | Dời đô Thăng Long | "hanoi thang long citadel", "imperial citadel hanoi" |

### Nhà Trần (1225 - 1400)
| ID | Sự kiện | Gợi ý keyword |
|---|---|---|
| mong-co-1/2/3 | Chiến thắng Mông Cổ | "tran dynasty", "mongol invasion vietnam", "tran hung dao" |

### Nhà Lê & Kháng Chiến (1428 - 1975)
| ID | Sự kiện | Gợi ý keyword |
|---|---|---|
| le-loi-khoi-nghia | Lê Lợi | "le loi vietnam", "lam son uprising" |
| dien-bien-phu | Điện Biên Phủ | "dien bien phu battle", "vietnam french war" |
| giai-phong-mien-nam | 30/4/1975 | "fall of saigon", "reunification palace", "liberation 1975" |

### Thời Đổi Mới (1986 - nay)
| ID | Sự kiện | Gợi ý keyword |
|---|---|---|
| doi-moi | Đổi Mới | "vietnam economic reform", "modern vietnam" |
| gia-nhap-wto | Gia nhập WTO | "vietnam wto", "vietnam development" |

## 🔧 Cách Thay Ảnh

### Option 1: Thay trực tiếp trong code
```typescript
{
  id: "van-lang-thanh-lap",
  year: -2879,
  title: "Thành lập nhà nước Văn Lang",
  image: "YOUR_IMAGE_URL_HERE", // Thay URL ở đây
  ...
}
```

### Option 2: Lưu ảnh local
1. Tạo folder: `src/assets/history/`
2. Download ảnh và đặt tên theo ID sự kiện
3. Import và sử dụng:
```typescript
import vanLang from "../../../assets/history/van-lang-thanh-lap.jpg";

{
  id: "van-lang-thanh-lap",
  image: vanLang,
  ...
}
```

## ⚖️ Lưu Ý Bản Quyền

✅ **AN TOÀN:**
- Ảnh Public Domain
- Creative Commons Zero (CC0)
- Creative Commons BY (CC-BY) - cần ghi nguồn
- Ảnh từ Pexels, Unsplash

❌ **TRÁNH:**
- Ảnh có watermark
- Ảnh từ báo, tạp chí không rõ nguồn
- Google Images random (có thể vi phạm bản quyền)

## 🎨 Yêu Cầu Kỹ Thuật

- **Kích thước đề xuất:** 900x600px hoặc tỷ lệ 3:2
- **Format:** JPG hoặc PNG
- **Dung lượng:** < 500KB (để tối ưu tốc độ load)
- **Chất lượng:** Rõ nét, không bị mờ

## 📞 Cần Hỗ Trợ?

Nếu cần giúp tìm ảnh cho sự kiện cụ thể, hãy cho biết:
1. Tên sự kiện
2. Năm xảy ra
3. Phong cách ảnh mong muốn (cổ điển, hiện đại, minh họa, v.v.)

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import background_cream from "../../../assets/Cream Background Image.png";
import { HISTORY_IMAGES } from "../constants/historyImages";

/* =========================
   Types
========================= */
export type TimelineEvent = {
  id: string;
  year: number;                 
  year_start?: number | null;   
  year_end?: number | null;
  title?: string;
  caption?: string;
  image?: string;
  importance?: number;          
  side?: "above" | "below";
  era?: string;                 
  color?: string;              
};

const RAW_EVENTS: TimelineEvent[] = [
  // Thời kỳ Hồng Bàng - Âu Lạc
  { id: "van-lang-thanh-lap", year: -2879, title: "Thành lập nhà nước Văn Lang", caption: "Vua Hùng Vương", importance: 5, image: HISTORY_IMAGES.VAN_LANG, era: "Hồng Bàng", color: "#8B4513" },
  { id: "thoi-hong-bang", year: -700, year_start: -2879, year_end: -258, title: "Thời kỳ Hồng Bàng", caption: "Khoảng 2879–258 TCN", importance: 3, image: HISTORY_IMAGES.HONG_BANG, era: "Hồng Bàng", color: "#8B4513" },
  { id: "au-lac-an-duong-vuong", year: -257, title: "Thành lập nước Âu Lạc", caption: "An Dương Vương", importance: 4, image: HISTORY_IMAGES.AU_LAC, era: "Âu Lạc", color: "#CD853F" },
  { id: "trieu-da-xam-luot", year: -179, title: "Nam Việt thôn tính Âu Lạc", caption: "Triệu Đà", importance: 4, image: HISTORY_IMAGES.HAN_INVASION, era: "Bắc thuộc", color: "#696969" },

  // Bắc thuộc
  { id: "trung-quoc-tham-chiem", year: -111, title: "Hán thôn tính Nam Việt", caption: "Bắc thuộc lần I", importance: 5, image: "https://static.minhchantuong.com/img/2021/11/han-vu-de-minhchantuong.jpg", era: "Bắc thuộc", color: "#696969" },
  { id: "hai-ba-trung", year: 40, title: "Hai Bà Trưng nổi dậy", caption: "Khởi nghĩa chống Hán", importance: 5, image: "https://i0.wp.com/lichsu.blog/wp-content/uploads/2024/03/Hai_Ba_Trung_danh_duoi_giac_Han.webp?fit=2048%2C1512&ssl=1", era: "Bắc thuộc", color: "#696969" },
  { id: "ma-vien", year: 43, title: "Mã Viện đánh bại Hai Bà", caption: "Phục hồi ách Hán", importance: 3, image: "https://images.squarespace-cdn.com/content/v1/55b6b656e4b02f9283ad1d54/1551839432318-T8GC2DWVUYQ1W0PGPQT5/cuoc-khoi-nghia-hai-ba-trung-1.jpg", era: "Bắc thuộc", color: "#696969" },
  { id: "si-nhiep", year: 187, year_start: 187, year_end: 226, title: "Sĩ Nhiếp cai trị Giao Châu", caption: "187–226", importance: 2, image: "https://trithucvn2.net/wp-content/uploads/2020/07/Si-Nhiep-giup-Giao-Chau-binh-yen-01.jpg", era: "Bắc thuộc", color: "#696969" },
  { id: "ly-bi", year: 542, title: "Lý Bí khởi nghĩa", caption: "Thành lập Vạn Xuân", importance: 4, image: "https://nhn.1cdn.vn/2023/10/18/ly-bi.jpg", era: "Bắc thuộc", color: "#696969" },
  { id: "bac-thuoc-3", year: 602, year_start: 602, year_end: 905, title: "Bắc thuộc lần III", caption: "602–905", importance: 3, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Tang_Dynasty_Map_%28vi_version%29.jpg/500px-Tang_Dynasty_Map_%28vi_version%29.jpg", era: "Bắc thuộc", color: "#696969" },

  // Độc lập - Nhà Ngô, Đinh, Lê, Lý
  { id: "ngo-quyen", year: 938, title: "Ngô Quyền đánh bại Nam Hán", caption: "Trận Bạch Đằng (938)", importance: 5, image: "https://bachdanggiang.vn/wp-content/uploads/2019/12/su-kien-ls-1-1.png", era: "Ngô-Đinh-Tiền Lê", color: "#4169E1" },
  { id: "dinh-tien-hoang", year: 968, title: "Đinh Bộ Lĩnh thống nhất", caption: "Nhà Đinh", importance: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48mQWFrJTWe0saVnJ2szLt1MQhY1hM6cNsg&s", era: "Ngô-Đinh-Tiền Lê", color: "#4169E1" },
  { id: "le-hoan", year: 981, title: "Lê Hoàn thắng Tống", caption: "Chiến thắng Tống", importance: 3, image: "https://gamego.vn/wp-content/uploads/2025/06/147888222811704-c12.webp", era: "Ngô-Đinh-Tiền Lê", color: "#4169E1" },
  { id: "ly-cong-uan", year: 1009, title: "Lý Công Uẩn lên ngôi", caption: "Nhà Lý", importance: 4, image: "https://danviet.ex-cdn.com/files/f1/thumb_w/650/296231569849192448/2022/12/16/ly-cong-uan-01-16711975477381121130115.jpg", era: "Nhà Lý", color: "#FFD700" },
  { id: "thang-long", year: 1010, title: "Dời đô Thăng Long", caption: "Đô thành mới", importance: 5, image: "https://cloudcdnvod.tek4tv.vn/Mam/attach/upload/11022024015202/015205_coverCDD.jpg", era: "Nhà Lý", color: "#FFD700" },

  // Nhà Trần
  { id: "tran-thu-do", year: 1225, title: "Trần Thủ Độ lập nhà Trần", caption: "Nhà Trần (1225-1400)", importance: 4, image: "https://static-images.vnncdn.net/files/publish/thai-su-tran-thu-do-cong-than-hiem-co-cua-vuong-trieu-tran-dai-viet-d1bc9206f2b54eb08f5d0eb4a030e227.jpg", era: "Nhà Trần", color: "#DC143C" },
  { id: "mong-co-1", year: 1258, title: "Chiến thắng Mông Cổ lần I", caption: "Trận Đông Bộ Đầu", importance: 4, image: "https://baotanglichsu.vn/DataFiles/Uploaded/image/DATA%20HUONG/KN%20755%20chien%20thang%20quan%20nguyen%20mong%20lan%20thu%201/1.jpg", era: "Nhà Trần", color: "#DC143C" },
  { id: "mong-co-2", year: 1285, title: "Chiến thắng Mông Cổ lần II", caption: "Trận Hàm Tử - Trần Quốc Tuấn", importance: 5, image: "https://baotanglichsu.vn/DataFiles/Uploaded/image/DATA%20HUONG/KN%20755%20chien%20thang%20quan%20nguyen%20mong%20lan%20thu%201/1.jpg", era: "Nhà Trần", color: "#DC143C" },
  { id: "bach-dang-1288", year: 1288, title: "Chiến thắng Mông Cổ lần III", caption: "Trận Bạch Đằng - Trần Hưng Đạo", importance: 5, image: "https://baotanglichsu.vn/DataFiles/Uploaded/image/DATA%20HUONG/KN%20755%20chien%20thang%20quan%20nguyen%20mong%20lan%20thu%201/1.jpg", era: "Nhà Trần", color: "#DC143C" },

  // Nhà Hồ & Minh thuộc
  { id: "nha-ho", year: 1400, title: "Hồ Quý Ly lập nhà Hồ", caption: "Cải cách sâu rộng", importance: 3, image: "https://lh6.googleusercontent.com/proxy/aZJiA7Dl_pb_aNJJHTOIsZ2r-6pQIrcZAC_6PxfhiuIukxZ3hHkgeYoJKxH3jplrO7TnQSpF7neLmOHVJER2EpFvVyoZbd7wxVTM8cokJO1axuN07hmwYIgT7rMCIfbs3w", era: "Nhà Hồ", color: "#FF6347" },
  { id: "minh-thuoc", year: 1407, year_start: 1407, year_end: 1427, title: "Minh thuộc", caption: "1407–1427", importance: 4, image: "https://vietnamtourism.vn/imguploads/tourist/2014/VNDatNuocConNguoi/01Khaiquatchung/02Lichsu/13ThoikythuocMinh/01Thuocminh.jpg", era: "Minh thuộc", color: "#2F4F4F" },
  { id: "le-loi-khoi-nghia", year: 1418, title: "Lê Lợi khởi nghĩa Lam Sơn", caption: "Khởi nghĩa Lam Sơn", importance: 5, image: "https://vcdn1-vnexpress.vnecdn.net/2017/04/20/le-loi-va-lam-son-4504-1492677842.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=hBCSIxvmFGl_sUcPfVTxLw", era: "Minh thuộc", color: "#2F4F4F" },
  { id: "chien-thang-tot-dong", year: 1427, title: "Chiến thắng Chi Lăng", caption: "Đuổi quân Minh", importance: 5, image: "https://nguonluc.com.vn/uploads/images/2023/04/25/62-1682407440.jpg", era: "Nhà Lê", color: "#32CD32" },
  { id: "nha-le-so", year: 1428, title: "Thành lập nhà Lê Sơ", caption: "Lê Lợi lên ngôi", importance: 4, image: "https://sohanews.sohacdn.com/2019/1/17/photo-1-15477312810471281456024.jpg", era: "Nhà Lê", color: "#32CD32" },

  // Nhà Mạc & Lê Trung Hưng
  { id: "mac-dang-dung", year: 1527, title: "Mạc Đăng Dung cướp ngôi", caption: "Nhà Mạc (1527-1592)", importance: 3, image: "https://nhn.1cdn.vn/2023/10/28/mac-dang-dung.jpeg", era: "Nhà Mạc", color: "#8B008B" },
  { id: "trinh-nguyen-phan-tranh", year: 1592, year_start: 1592, year_end: 1777, title: "Trịnh-Nguyễn phân tranh", caption: "1592–1777", importance: 4, image: "https://www.kidsup.net/wp-content/uploads/2025/08/trinh-nguyen-phan-tranh-1.jpg", era: "Trịnh-Nguyễn", color: "#BA55D3" },

  // Tây Sơn
  { id: "tay-son-khoi-nghia", year: 1771, title: "Tây Sơn khởi nghĩa", caption: "Ba anh em Tây Sơn", importance: 4, image: "https://www.kidsup.net/wp-content/uploads/2025/08/khoi-nghia-tay-son.jpg", era: "Tây Sơn", color: "#FF4500" },
  { id: "quang-trung", year: 1788, title: "Quang Trung đánh tan Thanh", caption: "Chiến thắng Ngọc Hồi-Đống Đa", importance: 5, image: "https://lichsuvietnam.org/wp-content/uploads/2025/06/quang-trung-dai-pha-quan-thanh-1789-1.png", era: "Tây Sơn", color: "#FF4500" },

  // Nhà Nguyễn
  { id: "nguyen-anh", year: 1802, title: "Nguyễn Ánh lập nhà Nguyễn", caption: "Gia Long - Thống nhất đất nước", importance: 5, image: "https://sohanews.sohacdn.com/2019/1/29/photo-2-15487701571181094549891.jpg", era: "Nhà Nguyễn", color: "#FFD700" },
  { id: "minh-mang", year: 1820, year_start: 1820, year_end: 1841, title: "Minh Mạng trị vì", caption: "Củng cố triều đình", importance: 2, image: "https://i.ex-cdn.com/danviet.vn/files/news/2025/04/24/vua-minh-mang-nha-nguyen-la-ong-vua-thu-2-vuong-trieu-co-nhieu-vo-nhat-1216.png", era: "Nhà Nguyễn", color: "#FFD700" },

  // Pháp thuộc
  { id: "phap-tan-cong", year: 1858, title: "Pháp tấn công Đà Nẵng", caption: "Bắt đầu xâm lược", importance: 5, image: "https://sohanews.sohacdn.com/2019/1/31/photo-1-1548944224110428365062.jpg", era: "Pháp thuộc", color: "#191970" },
  { id: "phap-chiem-nam-ky", year: 1867, title: "Pháp chiếm Nam Kỳ", caption: "Ký hiệp ước Nhâm Tuất", importance: 4, image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/French_capture_of_Danang_1858.jpg", era: "Pháp thuộc", color: "#191970" },
  { id: "phap-chiem-toan-quoc", year: 1884, title: "Pháp chiếm toàn Việt Nam", caption: "Hiệp ước Giáp Thân", importance: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSfzSYaBsfMvk_ZyIZSvDBkUYiQATBZCDoGw&s", era: "Pháp thuộc", color: "#191970" },
  { id: "thanh-lap-dang", year: 1930, title: "Thành lập Đảng Cộng sản VN", caption: "Hồ Chí Minh sáng lập", importance: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzdlR-xaO7Dfa_EOoYT8rG2W0CVhCo8zIksw&s", era: "Pháp thuộc", color: "#191970" },
  { id: "cach-mang-thang-8", year: 1945, title: "Cách mạng tháng Tám", caption: "Giành chính quyền", importance: 5, image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/C%C3%A1ch_m%E1%BA%A1ng_th%C3%A1ng_8_b.jpg", era: "Kháng chiến", color: "#C3423F" },
  { id: "doc-lap", year: 1945, title: "Tuyên bố Độc lập", caption: "2/9/1945 - Quốc khánh", importance: 5, image: "https://cdnphoto.dantri.com.vn/W2ILj-ESBho5IOmTh1JXTT5aLdk=/thumb_w/990/2021/08/30/tuyen-ngon-doc-lap-1-1630296961771.jpg", era: "Kháng chiến", color: "#C3423F" },

  // Kháng chiến
  { id: "khang-chien-phap", year: 1946, year_start: 1946, year_end: 1954, title: "Kháng chiến chống Pháp", caption: "1946–1954", importance: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr5dJXMi_V2Gh1_vf045ENaKxs5IjdbdVI0A&s", era: "Kháng chiến", color: "#C3423F" },
  { id: "dien-bien-phu", year: 1954, title: "Chiến thắng Điện Biên Phủ", caption: "Chiến thắng lừng lẫy", importance: 5, image: "https://media.baothaibinh.com.vn/upload/news/5_2025/anh_cover_08452307052025.jpg", era: "Kháng chiến", color: "#C3423F" },
  { id: "hiep-dinh-geneva", year: 1954, title: "Ký kết Hiệp định Geneva", caption: "Tạm chia đôi đất nước", importance: 4, image: "https://cdn-i.vtcnews.vn/resize/th/files/f1/2014/07/15/vi_tuyen_17jpg.jpg", era: "Kháng chiến", color: "#C3423F" },
  { id: "khang-chien-my", year: 1965, year_start: 1965, year_end: 1975, title: "Kháng chiến chống Mỹ", caption: "1965–1975", importance: 5, image: "https://cdn.thuvienphapluat.vn/uploads/tintuc/2024/12/20/khang-chien-chong-my.jpg", era: "Kháng chiến", color: "#C3423F" },
  { id: "giai-phong-mien-nam", year: 1975, title: "Giải phóng hoàn toàn miền Nam", caption: "30/4/1975", importance: 5, image: "https://congdoantkv.vn/data/images/1(2214).jpg", era: "Kháng chiến", color: "#C3423F" },

  // Thời kỳ đổi mới
  { id: "thong-nhat", year: 1976, title: "Thống nhất đất nước", caption: "Nước Việt Nam Xã hội chủ nghĩa", importance: 5, image: "https://utt.edu.vn/uploads/file-manager/images/image001(45).jpg", era: "Đổi mới", color: "#228B22" },
  { id: "doi-moi", year: 1986, title: "Đổi mới", caption: "Đại hội VI - Đổi mới kinh tế", importance: 5, image: "https://i2-vnexpress.vnecdn.net/2016/12/21/4475-1482311449.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Y3HOWS2mMtZm0Z9JuOHAmQ", era: "Đổi mới", color: "#228B22" },
  { id: "binh-thuong-hoa-my", year: 1995, title: "Bình thường hóa quan hệ với Mỹ", caption: "Mở rộng quan hệ quốc tế", importance: 4, image: "https://i.ytimg.com/vi/KnFnPwHsjWI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAChkpRqrbnN8ZORAeGIoQ0BgDYXA", era: "Đổi mới", color: "#228B22" },
  { id: "gia-nhap-wto", year: 2007, title: "Gia nhập WTO", caption: "Hội nhập kinh tế thế giới", importance: 4, image: "https://media.vov.vn/sites/default/files/styles/large/public/2022-01/8f52c48066f99aed1afdf5b5000d6e7d.jpg", era: "Đổi mới", color: "#228B22" }
];


const sortKey = (e: TimelineEvent) => (e.year_start ?? e.year);
const fmtYear = (y: number) => (y < 0 ? `${Math.abs(y)} TCN` : `${y}`);
const formatEventYear = (e: TimelineEvent) => {
  if (e.year_start != null && e.year_end != null) {
    const bothBCE = e.year_start < 0 && e.year_end < 0;
    if (bothBCE) return `${Math.abs(e.year_start)}–${Math.abs(e.year_end)} TCN`;
    return `${fmtYear(e.year_start)} – ${fmtYear(e.year_end)}`;
  }
  return fmtYear(e.year);
};


type Range = { start: number; end: number };

function filterEventsByRange(
  events: TimelineEvent[],
  range: Range,
  minImportance: number
) {
  return events
    .filter((e) => e.year >= range.start && e.year <= range.end)
    .filter((e) => (e.importance ?? 1) >= minImportance)
    .sort((a, b) => a.year - b.year);
}

function computePositions(events: TimelineEvent[], range: Range) {
  const span = Math.max(1, range.end - range.start);
  return events.map((e) => ({
    id: e.id,
    pct: ((e.year - range.start) / span) * 100
  }));
}

const useAlternateSides = (events: TimelineEvent[]) => {
  return useMemo(() => {
    return events.map((e, i) => ({
      ...e,
      _computedSide: e.side ?? (i % 2 === 0 ? "above" : "below")
    }));
  }, [events]);
};

const TimelineLevel: React.FC<{
  range: Range;
  events: TimelineEvent[];
  onClickSegment?: (seg: { start: number; end: number }) => void;
  showClickableZones?: boolean;
}> = ({ range, events, onClickSegment, showClickableZones = true }) => {
  const evsWithSide = useAlternateSides(events);
  const positions = computePositions(events, range);

  return (
    <div className="relative w-full h-[500px]">
      <div className="absolute left-0 right-0 top-[250px] h-[2px] bg-white/90 z-10" />

      <div className="absolute left-0 top-[230px] text-white text-[24px] font-[800] [font-family:'Times',Helvetica] [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
        {range.start}
      </div>
      <div className="absolute right-0 top-[230px] text-white text-[24px] font-[800] [font-family:'Times',Helvetica] [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
        {range.end}
      </div>

      {showClickableZones &&
        onClickSegment &&
        positions.map((p, i) => {
          if (i === positions.length - 1) return null;
          const leftPct = p.pct;
          const rightPct = positions[i + 1].pct;
          const widthPct = rightPct - leftPct;
          const leftYear = events[i].year;
          const rightYear = events[i + 1].year;

          return (
            <button
              key={`zone-${i}`}
              className="absolute top-[230px] h-[40px] bg-transparent hover:bg-white/10 transition-all group"
              style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
              onClick={() => onClickSegment({ start: leftYear, end: rightYear })}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-[#c3423f] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Chi tiết {leftYear} → {rightYear}
                </div>
              </div>
            </button>
          );
        })}

      {evsWithSide.map((e, i) => {
        const pct = positions[i].pct;
        const above = e._computedSide === "above";
        return (
          <div key={e.id} className="absolute top-[250px] z-20" style={{ left: `${pct}%` }}>
            <div className={`absolute left-0 w-[2px] bg-white/80 ${above ? "h-[90px] bottom-0" : "h-[90px] top-0"}`} />
            {e.image && (
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-[160px] h-[100px] rounded-md overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-shadow duration-300 ${ 
                  above ? "bottom-[105px]" : "top-[105px]"
                }`}
              >
                <img src={e.image} alt={e.title || String(e.year)} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            )}
            <div className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${above ? "bottom-[210px]" : "top-[210px]"}`}>
              <div className="text-white text-[28px] font-[800] [font-family:'Times',Helvetica] [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
                {fmtYear(e.year)}
              </div>
            </div>
            {e.caption && (
              <div className={`absolute left-1/2 -translate-x-1/2 text-center w-[160px] ${above ? "bottom-[240px]" : "top-[240px]"}`}>
                <div className="text-white/90 text-[13px] font-bold [font-family:'Times',Helvetica] leading-tight [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]">
                  {e.caption}
                </div>
              </div>
            )}
            {e.title && (
              <div className={`absolute left-1/2 -translate-x-1/2 text-center w-[180px] ${above ? "bottom-[270px]" : "top-[270px]"}`}>
                <div className="text-white/60 text-[10px] leading-tight [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]">{e.title}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};


const DrilldownTimeline: React.FC<{
  allEvents: TimelineEvent[];
  initialRange: Range;
  initialImportance?: number;
}> = ({ allEvents, initialRange, initialImportance = 5 }) => {
  const [zoomStack, setZoomStack] = useState<
    Array<{ range: Range; minImportance: number }>
  >([{ range: initialRange, minImportance: initialImportance }]);

  useEffect(() => {
    setZoomStack([{ range: initialRange, minImportance: initialImportance }]);
  }, [initialRange.start, initialRange.end, initialImportance]);

  const currentLevel = zoomStack[zoomStack.length - 1];
  const currentEvents = useMemo(
    () => filterEventsByRange(allEvents, currentLevel.range, currentLevel.minImportance),
    [allEvents, currentLevel]
  );

  const handleDrillDown = (segment: { start: number; end: number }) => {
    const nextImportance = Math.max(1, currentLevel.minImportance - 1);
    setZoomStack((stack) => [...stack, { range: segment, minImportance: nextImportance }]);
  };

  const canDrillDeeper = currentLevel.minImportance > 1;

  return (
    <div className="space-y-4">
      <div className="w-full max-w-[1200px] overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          <TimelineLevel
            range={currentLevel.range}
            events={currentEvents}
            onClickSegment={canDrillDeeper ? handleDrillDown : undefined}
            showClickableZones={canDrillDeeper && currentEvents.length >= 2}
          />
        </div>
      </div>
      {currentEvents.length === 0 && (
        <div className="text-white/60 text-sm">Không có sự kiện nào trong khoảng thời gian này.</div>
      )}
    </div>
  );
};


function contextPaddingByEra(y: number): number {
  const ay = Math.abs(y);
  if (y < 0) return 500;      // cổ đại
  if (ay <= 600) return 250;  // đầu CN → trung đại sớm
  if (ay <= 1200) return 150;
  return 120;
}
function getContextRange(e: TimelineEvent): Range {
  if (e.year_start != null && e.year_end != null) {
    const mid = Math.floor((e.year_start + e.year_end) / 2);
    const pad = contextPaddingByEra(mid);
    return { start: mid - pad, end: mid + pad };
  }
  const pad = contextPaddingByEra(e.year);
  return { start: e.year - pad, end: e.year + pad };
}


export const History: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [focusEvent, setFocusEvent] = useState<TimelineEvent | null>(null);
  const [filterEra, setFilterEra] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  const fullRange = { start: -3000, end: 2010 };

  const uniqueEras = Array.from(new Set(RAW_EVENTS.map(e => e.era).filter(Boolean)));

  const filteredEvents = filterEra
    ? RAW_EVENTS.filter(e => e.era === filterEra)
    : RAW_EVENTS;

  useEffect(() => {
    if (!isAutoPlay || expanded || filteredEvents.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredEvents.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [isAutoPlay, expanded, filteredEvents.length]);

  const openFocus = (e: TimelineEvent) => {
    setFocusEvent(e);
    setExpanded(true);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredEvents.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredEvents.length) % filteredEvents.length);
    setIsAutoPlay(false);
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundImage: `url(${background_cream})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <nav className="flex w-full h-[13vh] items-center justify-end gap-4 md:gap-6 lg:gap-8 px-6 md:px-12 py-11 absolute top-0 left-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        {["HOME", "Q&A", "HISTORY", "AI-CHAT", "MENU"].map((label) => (
          <Button
            key={label}
            variant="ghost"
            className={`h-auto p-0 flex items-center gap-1 [text-shadow:8px_8px_24px_#12121229] [font-family:'Bebas_Neue',Helvetica] font-normal text-xl md:text-2xl lg:text-3xl tracking-wide leading-[normal] whitespace-nowrap hover:bg-transparent transition-colors ${
              label === "HISTORY" ? "text-[#c3423f]" : "text-white hover:text-[#c3423f]"
            }`}
            asChild
          >
            <Link to={label === "HOME" ? "/" : `/${label.toLowerCase().replace(/[&\\s]/g, "-")}`}>{label}</Link>
          </Button>
        ))}
      </nav>

      {/* Title Above TV */}
      {!expanded && (
        <div className="absolute top-[14vh] left-8 md:left-12 lg:left-16 z-10 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <h1 className="text-3xl md:text-4xl lg:text-5xl [font-family:'Times',Helvetica] text-[#c3423f] tracking-wider relative inline-flex items-center gap-2">
            LỊCH SỬ VIỆT NAM
            {/* Star icon decoration */}
            <svg className="w-6 h-6 md:w-7 md:h-7 text-[#FFD700] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </h1>
        </div>
      )}

      {/* Content */}
      {!expanded ? (
        <>
          {/* TV Screen Container */}
          <div className="absolute top-[22vh] left-8 md:left-12 lg:left-16 right-8 md:right-12 lg:right-16 w-auto translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:500ms]">
            {/* TV Frame */}
            <div className="relative bg-gradient-to-br from-[#2a1810] via-[#3d2318] to-[#2a1810] rounded-3xl shadow-2xl p-6 md:p-8 border-8 border-[#1a0f08] mx-auto max-w-[1200px]">
              {/* Screen Bezel */}
              <div className="relative bg-black rounded-2xl p-4 shadow-inner">
                {/* Carousel Container */}
                <div className="relative w-full h-[45vh] md:h-[50vh] bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden">
                  {/* Slides */}
                  {filteredEvents.length > 0 && filteredEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className={`absolute inset-0 transition-all duration-700 ${
                        index === currentSlide
                          ? 'opacity-100 translate-x-0'
                          : index < currentSlide
                          ? 'opacity-0 -translate-x-full'
                          : 'opacity-0 translate-x-full'
                      }`}
                    >
                      {/* Background Image with Overlay */}
                      {event.image && (
                        <div className="absolute inset-0">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        </div>
                      )}

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                        {/* Era Badge */}
                        {event.era && (
                          <div className="mb-4">
                            <span
                              className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg"
                              style={{ backgroundColor: event.color }}
                            >
                              {event.era}
                            </span>
                          </div>
                        )}

                        {/* Year */}
                        <div className="text-[#FFD700] text-3xl md:text-4xl font-bold [font-family:'Bebas_Neue',Helvetica] mb-2">
                          {formatEventYear(event)}
                        </div>

                        {/* Title */}
                        <h2 className="text-white text-3xl md:text-5xl font-bold [font-family:'Times',Helvetica] mb-3 leading-tight">
                          {event.title}
                        </h2>

                        {/* Caption */}
                        {event.caption && (
                          <p className="text-white/90 text-lg md:text-xl mb-4 max-w-3xl">
                            {event.caption}
                          </p>
                        )}

                        {/* View Details Button */}
                        <button
                          onClick={() => openFocus(event)}
                          className="self-start bg-[#c3423f] hover:bg-[#a72e2b] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          Xem chi tiết →
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {filteredEvents.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* TV Screen Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-xl" />
              </div>

              {/* TV Control Panel (decorative) */}
              <div className="absolute bottom-4 right-8 flex gap-2">
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    isAutoPlay ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-red-500 shadow-lg shadow-red-500/50'
                  }`}
                  title={isAutoPlay ? 'Auto-play ON' : 'Auto-play OFF'}
                />
                <div className="w-3 h-3 rounded-full bg-gray-600" />
                <div className="w-3 h-3 rounded-full bg-gray-600" />
              </div>
            </div>

            {/* Era Filter Buttons (Below TV) */}
            <div className="mt-6 mb-8 flex flex-wrap justify-center gap-2 md:gap-3 px-4">
              <button
                onClick={() => { setFilterEra(null); setCurrentSlide(0); }}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                  filterEra === null
                    ? 'bg-[#c3423f] text-white shadow-lg scale-110'
                    : 'bg-white/80 backdrop-blur-sm text-[#121212] hover:bg-white hover:scale-105'
                }`}
              >
                Tất cả
              </button>
              {uniqueEras.map((era) => {
                const eraColor = RAW_EVENTS.find(e => e.era === era)?.color || '#c3423f';
                return (
                  <button
                    key={era}
                    onClick={() => { setFilterEra(era); setCurrentSlide(0); }}
                    className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                      filterEra === era
                        ? 'text-white shadow-lg scale-110'
                        : 'bg-white/80 backdrop-blur-sm text-[#121212] hover:bg-white hover:scale-105'
                    }`}
                    style={filterEra === era ? { backgroundColor: eraColor } : {}}
                  >
                    {era}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="absolute top-[28vh] left-8 md:left-12 lg:left-16 right-8 md:right-12 lg:right-16 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          {/* TIÊU ĐỀ Ở TRÊN HẲN THANH NÚT */}
          {focusEvent && (
            <h2 className="[font-family:'Times',Helvetica] text-[#c3423f] text-3xl md:text-4xl lg:text-5xl leading-none mb-3">
              {focusEvent.title} ({formatEventYear(focusEvent)})
            </h2>
          )}

          {/* Hàng nút phía dưới tiêu đề */}
          <div className="mb-4 flex items-center gap-3">
            <Button onClick={() => setExpanded(false)} className="bg-[#c3423f] hover:bg-[#a72e2b] text-white px-4 py-2">
              ← Back
            </Button>
            <Button
              className="h-9 px-3 bg-white/10 hover:bg-white/20 text-white"
              onClick={() => setFocusEvent(null)}
            >
              Hiển thị toàn bộ giai đoạn
            </Button>
          </div>

          {/* Timeline chi tiết */}
          <DrilldownTimeline
            allEvents={RAW_EVENTS}
            initialRange={focusEvent ? getContextRange(focusEvent) : fullRange}
            initialImportance={focusEvent ? 4 : 5}
          />
        </div>
      )}

      {/* Footer */}
      {!expanded && (
        <footer className="fixed bottom-4 right-8 flex items-center animate-fade-in opacity-0 [--animation-delay:1000ms] z-50">
          <div className="w-2 h-2 bg-[#c3423f] rounded" />
          <div className="flex items-center justify-center px-4 [font-family:'Times',Helvetica] font-normal text-transparent text-[1.2rem] md:text-[1.5rem] text-center leading-[normal] whitespace-nowrap tracking-[0.3em]">
            <span className="text-white tracking-[0.3em]">V </span>
            <span className="text-[#c3423f] tracking-[0.3em]">I</span>
            <span className="text-white tracking-[0.3em]"> E </span>
            <span className="text-[#c3423f] tracking-[0.3em]">T</span>
            <span className="text-white tracking-[0.3em]"> N </span>
            <span className="text-[#c3423f] tracking-[0.3em]">A</span>
            <span className="text-white tracking-[0.3em]"> M</span>
          </div>
          <div className="w-2 h-2 bg-[#c3423f] rounded" />
        </footer>
      )}
    </div>
  );
};

export default History;
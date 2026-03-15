import { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const FEATURES = [
  {
    title: "Lá trà đủ tuổi",
    desc: "Chọn lá trà đủ năm để vị đậm và hậu sâu tự nhiên.",
    icon: "🍃",
  },
  {
    title: "Chế biến thủ công",
    desc: "Sao sấy thủ công, tôn trọng nhịp điệu của từng mẻ trà.",
    icon: "🔥",
  },
  {
    title: "Giữ vị nguyên bản",
    desc: "Không hương liệu. Không phụ gia. Không che lấp bản tính của lá.",
    icon: "✦",
  },
  {
    title: "Trung thực nguồn gốc",
    desc: "Rõ vùng trồng, rõ cách làm, rõ tiêu chuẩn.",
    icon: "📍",
  },
  {
    title: "Gắn bó thiên nhiên",
    desc: "Làm trà giữa môi trường núi rừng, nơi khí hậu và thời gian định hình hương vị.",
    icon: "🌿",
  },
  {
    title: "Bền vững dài hạn",
    desc: "Theo đuổi chất lượng ổn định, không đánh đổi vì số lượng.",
    icon: "♻",
  },
];

export default function ProductList() {
  const [activeStep, setActiveStep] = useState(0);

  const row1 = FEATURES.slice(0, 3);
  const row2 = FEATURES.slice(3);

  const renderRow = (items, startIdx) => (
    <div className="process-row">
      {/* SVG connector line */}
      <svg className="process-row__line" preserveAspectRatio="none" viewBox="0 0 900 4">
        <line x1="60" y1="2" x2="840" y2="2" stroke="rgba(134,180,63,0.2)" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="2" x2="840" y2="2" stroke="url(#processGrad)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray="780"
          strokeDashoffset={activeStep >= startIdx && activeStep < startIdx + items.length
            ? Math.max(0, 780 - ((activeStep - startIdx + 1) / items.length) * 780)
            : activeStep >= startIdx + items.length ? 0 : 780}
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.22,1,0.36,1)" }}
        />
        <defs>
          <linearGradient id="processGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a8d450" />
            <stop offset="100%" stopColor="#5a8a2e" />
          </linearGradient>
        </defs>
      </svg>

      {items.map((f, i) => {
        const globalIdx = startIdx + i;
        const isActive = activeStep === globalIdx;
        return (
          <div
            className={`process-node ${isActive ? "process-node--active" : ""}`}
            key={f.title}
            onClick={() => setActiveStep(globalIdx)}
          >
            {/* Circle with number */}
            <div className="process-node__circle">
              <span className="process-node__num">{String(globalIdx + 1).padStart(2, "0")}</span>
              {isActive && <span className="process-node__emoji">{f.icon}</span>}
            </div>

            {/* Title always visible */}
            <div className="process-node__label">{f.title}</div>

            {/* Detail content — only rendered when active */}
            {isActive && (
              <div className="process-node__detail">
                <p className="process-node__desc">{f.desc}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="ps" id="about-section">
      <div className="ps__inner">
        <p className="ps__kicker scroll-reveal">TRIẾT LÝ MEDITEA</p>
        <h2 className="ps__title scroll-reveal">Giá Trị Nguyên Bản</h2>
        <p className="ps__desc scroll-reveal">
          Chúng tôi tin rằng giá trị của trà không nằm ở việc làm khác đi, mà ở
          việc để lá đủ năm trên cây, quá trình chế biến đủ chậm và hương vị đủ
          thật khi đến tay người dùng.
        </p>

        <div className="process-timeline scroll-reveal">
          {renderRow(row1, 0)}
          <div className="process-timeline__bridge">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <path d="M20 8 L20 28 M12 22 L20 30 L28 22" fill="none" stroke="rgba(134,180,63,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {renderRow(row2, 3)}
        </div>

        <Link to="/bancha-detail" className="ps__btn scroll-reveal">
          Tìm hiểu chi tiết <span className="ps__btn-dot" aria-hidden="true" />
        </Link>
      </div>

      {/* ── Feature 2: Full-width Parallax hero image + overlay info (TRẢI NGHIỆM) ── */}
      <div className="collection__parallax" style={{ backgroundImage: 'url(/images/bandia.png)' }}>
        <div className="collection__parallax-content scroll-reveal-left">
          <h2 className="collection__parallax-title">TRẢI NGHIỆM</h2>
          <p className="collection__parallax-desc">
            MediTea là một thế giới trong lòng thế giới với giai điệu, cuộc sống và những vận động của riêng mình. Đi trek đường mòn xuyên rừng già, thư giãn trên mặt hồ, hay thiền tịnh tại đồi cao... mỗi trải nghiệm không chỉ để cảm nhận vẻ đẹp vùng Tây Bắc mà còn là hành trình tìm thấy chính mình giữa thiên nhiên.
          </p>
          <a href="/experience" className="collection__parallax-link">TÌM HIỂU THÊM</a>
        </div>
      </div>
    </section>
  );
}

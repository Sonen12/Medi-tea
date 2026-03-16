import "../App.css";

export default function Footer() {
  return (
    <footer className="ft">
      {/* Top Section */}
      <div className="ft__top-wrap">
        {/* Logo icon */}
        <div className="ft__logo">
          <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
            <path d="M20 4C15 4 10 8 10 14c0 4 2 7 5 9l-1 8h12l-1-8c3-2 5-5 5-9 0-6-5-10-10-10z" fill="none" stroke="#f5f0eb" strokeWidth="1.5"/>
            <path d="M20 8c2 0 4 1 5 3s1 4 0 6" fill="none" stroke="#f5f0eb" strokeWidth="1"/>
            <circle cx="20" cy="12" r="2" fill="#f5f0eb" opacity="0.8"/>
            <path d="M16 36h8" stroke="#f5f0eb" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Navigation links */}
        <nav className="ft__nav">
          <a href="/contact">Liên hệ</a>
          <a href="/media">Tư liệu truyền thông</a>
          <a href="/privacy">Chính sách bảo mật</a>
          <a href="/terms">Điều khoản và điều kiện</a>
          <a href="/blog">Blog</a>
          <a href="/faq">Câu hỏi thường gặp</a>
        </nav>

        {/* Email subscribe */}
        <div className="ft__subscribe-wrap">
          <div className="ft__subscribe">
            <input type="email" placeholder="Your email" className="ft__input" />
            <button className="ft__submit" aria-label="Subscribe">→</button>
          </div>
        </div>

        {/* Social icons */}
        <div className="ft__socials">
          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24"><path d="M14 8.6V7.2c0-.7.5-1.2 1.2-1.2H17V3h-2.2A4.3 4.3 0 0 0 10.5 7.2v1.4H8v3h2.5V21h3.5v-9.4h2.8l.5-3H14Z" /></svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-5 3.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5ZM17.6 7.4a.8.8 0 1 1-.8.8.8.8 0 0 1 .8-.8Z" /></svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg viewBox="0 0 24 24"><path d="M19.6 3.2H4.4A2.4 2.4 0 0 0 2 5.6v12.8A2.4 2.4 0 0 0 4.4 20.8h15.2a2.4 2.4 0 0 0 2.4-2.4V5.6a2.4 2.4 0 0 0-2.4-2.4ZM10 15.5V8.5l6 3.5Z" /></svg>
          </a>
          <a href="#" aria-label="Zalo">
            <svg viewBox="0 0 24 24"><text x="7" y="17" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">Z</text></svg>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="ft__divider" />

      {/* Bottom info */}
      <div className="ft__info">
        <div className="ft__info-left">
          <p>@ 2026 MediTEA</p>
          <p>Thạch Thất, Hà Nội, Việt Nam</p>
          <p>inquiries@meditea.vn &nbsp;&nbsp; 0247 3024 868</p>
        </div>
        <div className="ft__info-right">
          <p><strong>Công Ty TNHH MediTEA</strong></p>
          <p>Số giấy chứng nhận đăng ký doanh nghiệp: 123456789</p>
          <p>Đăng ký lần đầu: 20/11/2026</p>
          <p>Nơi cấp: Sở Kế hoạch Đầu tư TP Hà Nội</p>
        </div>
      </div>
    </footer>
  );
}

import "../../App.css";

export default function About() {
  return (
    <section className="story" id="about-section">
      {/* ── Quote Block ── */}
      <div className="story__quote scroll-reveal">
        <span className="story__quote-mark">"</span>
        <blockquote className="story__blockquote">
          Trà ngon không đến từ sự vội vàng,
          <br />
          mà đến từ thời gian và sự kiên nhẫn.
        </blockquote>
        <span className="story__quote-mark story__quote-mark--end">"</span>
        <p className="story__quote-author">—— MEDITEA</p>
      </div>

      {/* ── Story Grid — asymmetric editorial layout ── */}
      <div className="story__grid">
        {/* Left column: text */}
        <div className="story__text scroll-reveal" style={{ transitionDelay: "0.1s" }}>
          <h2 className="story__heading">
            CÂU CHUYỆN
            <br />
            MEDITEA
          </h2>
          <p className="story__paragraph">
            Khi bắt đầu hành trình với trà, những người sáng lập MediTEA không hề
            nghĩ mình sẽ xây dựng một thương hiệu. Họ chỉ có một suy nghĩ đơn giản:
            "Lá trà già trên núi cao đáng được tôn trọng, giữ nguyên bản tính và
            chia sẻ đến những người yêu trà đích thực."
          </p>
          <p className="story__paragraph">
            Khởi sinh từ tình yêu với thiên nhiên, từ những chuyến đi lên vùng cao
            tìm kiếm nguồn trà nguyên bản, ý tưởng về MediTEA ra đời sau nhiều
            năm tích lũy và chiêm nghiệm.
          </p>
          <a href="/about" className="story__link">TÌM HIỂU THÊM</a>
        </div>

        {/* Right column: asymmetric images */}
        <div className="story__images">
          <div className="story__img story__img--top scroll-reveal-left" style={{ transitionDelay: "0.2s" }}>
            <img src="/images/tea_leaves.png" alt="Tea leaves close-up" />
          </div>
          <div className="story__img story__img--right scroll-reveal-right" style={{ transitionDelay: "0.4s" }}>
            <img src="/images/anh3.png" alt="Tea plantation vista" />
          </div>
          <div className="story__img story__img--bottom scroll-reveal-left" style={{ transitionDelay: "0.6s" }}>
            <img src="/images/tea_plantation.png" alt="Misty tea hills" />
          </div>
        </div>
      </div>
    </section>
  );
}

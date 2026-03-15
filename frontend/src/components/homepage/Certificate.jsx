import "../../App.css";

export default function Certificate() {
  return (
    <section className="commitment" id="certificate-section">
      <div className="commitment__inner">
        <div className="commitment__text scroll-reveal">
          <h2 className="commitment__heading">CAM KẾT CHẤT LƯỢNG</h2>
          <p className="commitment__desc">
            MediTEA tự hào đạt các chứng nhận uy tín về chất lượng sản phẩm
            và quy trình sản xuất. Mỗi lá trà đều kể câu chuyện
            về sự tận tâm và trách nhiệm với thiên nhiên.
          </p>
          <div className="commitment__badges">
            <div className="commitment__badge scroll-reveal" style={{ transitionDelay: "0.1s" }}>
              <div className="commitment__badge-icon">✓</div>
              <div>
                <h4>An toàn Thực phẩm</h4>
                <p>Đạt tiêu chuẩn vệ sinh an toàn thực phẩm quốc gia</p>
              </div>
            </div>
            <div className="commitment__badge scroll-reveal" style={{ transitionDelay: "0.2s" }}>
              <div className="commitment__badge-icon">✓</div>
              <div>
                <h4>Chứng nhận Hữu cơ</h4>
                <p>Sản phẩm đạt tiêu chuẩn hữu cơ quốc tế</p>
              </div>
            </div>
            <div className="commitment__badge scroll-reveal" style={{ transitionDelay: "0.3s" }}>
              <div className="commitment__badge-icon">✓</div>
              <div>
                <h4>Nguồn gốc Minh bạch</h4>
                <p>Truy xuất rõ ràng từ vùng trồng đến tay người dùng</p>
              </div>
            </div>
          </div>
          <a href="/about" className="commitment__link">XEM CHỨNG NHẬN</a>
        </div>
        <div className="commitment__img scroll-reveal-right" style={{ transitionDelay: "0.3s" }}>
          <img src="/images/chungchi1.png" alt="Quality commitment" />
        </div>
      </div>
    </section>
  );
}

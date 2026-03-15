import "../../App.css";

export default function ProductMain() {
  return (
    <>
      <section className="experience" id="product-main-section">
        <div className="experience__header scroll-reveal">
          <h2 className="experience__heading">Bộ Sưu Tập Trà</h2>
          <p className="experience__desc">
           Không phải lá non hái sớm. MediTEA chọn lá trà 1–3 năm tuổi từ vùng cao – nơi sương gió và khí hậu khắc nghiệt giúp lá trà dày, đậm vị và tích tụ hương tự nhiên.
          </p>
        </div>

        {/* 3-column image showcase */}
        <div className="experience__gallery">
          {/* Product 1: Bản lẻ 100g */}
          <div className="experience__card scroll-reveal-left" style={{ transitionDelay: "0.1s" }}>
            <div className="experience__card-img">
              <img src="/images/sp1.png" alt="Trà lá già MediTEA – Bản lẻ 100g" />
            </div>
            <h3 className="experience__card-title-bottom">Trà lá già Bản lẻ 100g</h3>
            <div className="experience__card-hover-content">
              <h3 className="experience__card-title">Trà lá già MediTEA – Bản lẻ 100g</h3>
              <p className="experience__card-desc">
                Đây là dòng sản phẩm cốt lõi, đóng gói 100g dành cho khách hàng cá nhân. Trà được sao thủ công từ lá già Bancha, giữ vị đậm vừa phải, hậu ngọt sâu và hương trầm mộc đặc trưng. Phiên bản 100g phù hợp cho việc thưởng trà hằng ngày, cho những khoảnh khắc tĩnh lặng cá nhân hoặc làm quà nhỏ tinh tế. Đây là sản phẩm xây dựng mối kết nối trực tiếp giữa người uống và tinh thần “lá già, vị yên” mà MediTEA theo đuổi.
              </p>
            </div>
          </div>

          {/* Product 2: Gift Set */}
          <div className="experience__card scroll-reveal" style={{ transitionDelay: "0.3s" }}>
            <div className="experience__card-img">
              <img src="/images/sp3.png" alt="Gift Set MediTEA – Trà & Trải nghiệm" />
            </div>
            <h3 className="experience__card-title-bottom">Gift Set<br/>Trà & Trải nghiệm</h3>
            <div className="experience__card-hover-content">
              <h3 className="experience__card-title">Gift Set MediTEA – Trà & Trải nghiệm</h3>
              <p className="experience__card-desc">
                Dòng quà tặng kết hợp trà lá già 100g cùng phụ kiện được tuyển chọn như cốc gốm mộc hoặc bình lọc cá nhân. Không chỉ là một sản phẩm tiêu dùng, gift set là một gợi ý về cách thưởng trà. Thiết kế tối giản, tinh tế và mang tính biểu tượng giúp sản phẩm phù hợp cho dịp tri ân, lễ tết hoặc quà tặng doanh nghiệp. Đây là dòng sản phẩm gia tăng giá trị cảm nhận, nơi MediTEA không chỉ bán trà mà bán một trải nghiệm chậm rãi và có chiều sâu.
              </p>
            </div>
          </div>

          {/* Product 3: Bản sỉ 500g */}
          <div className="experience__card scroll-reveal-right" style={{ transitionDelay: "0.5s" }}>
            <div className="experience__card-img">
              <img src="/images/sp2.png" alt="Trà lá già MediTEA – Bản sỉ 500g (B2B)" />
            </div>
            <h3 className="experience__card-title-bottom">Trà lá già Bản sỉ 500g</h3>
            <div className="experience__card-hover-content">
              <h3 className="experience__card-title">Trà lá già MediTEA – Bản sỉ 500g (B2B)</h3>
              <p className="experience__card-desc">
                Được thiết kế dành cho doanh nghiệp, văn phòng hoặc không gian dịch vụ có nhu cầu sử dụng trà ổn định. Quy cách 500g giúp tối ưu chi phí trên mỗi đơn vị, đồng thời đảm bảo nguồn cung đều đặn. Bao bì được tinh giản để tập trung vào chất lượng trà bên trong. Dòng B2B không chỉ phục vụ nhu cầu tiêu dùng nội bộ, mà còn có thể trở thành một phần của văn hóa doanh nghiệp – một lựa chọn chăm sóc nhân sự hoặc tiếp khách mang tính bền vững và tinh tế.
              </p>
            </div>
          </div>
        </div>

        <div className="scroll-reveal" style={{ textAlign: "center", marginTop: "60px" }}>
          <a href="/products" className="story__link">VỀ SẢN PHẨM CỦA MEDITEA</a>
        </div>
      </section>

      {/* NEW SECTION: LÁ TRÀ GIÀ NGUYÊN BẢN */}
      <section className="core-values">
        <div className="core-values__container">
          {/* Left side: text, grid, buttons */}
          <div className="core-values__left scroll-reveal-left">
            <h2 className="core-values__title">MEDITEA – LÁ TRÀ GIÀ<br/>NGUYÊN BẢN</h2>
            <p className="core-values__desc">
              Không phải lá non hái sớm. MediTEA chọn lá trà 1–3 năm tuổi từ vùng cao – nơi sương gió và khí hậu khắc nghiệt giúp lá trà dày, đậm vị và tích tụ hương tự nhiên.
            </p>

            <div className="core-values__grid">
              <div className="core-value-item">
                <span className="core-value-item__num">1</span>
                <span className="core-value-item__text">Thu hái lá già vùng cao</span>
              </div>
              <div className="core-value-item">
                <span className="core-value-item__num">2</span>
                <span className="core-value-item__text">Sao sấy thủ công từng mẻ nhỏ</span>
              </div>
              <div className="core-value-item">
                <span className="core-value-item__num">3</span>
                <span className="core-value-item__text">Vị trà nguyên bản – dậy hương tự nhiên</span>
              </div>
              <div className="core-value-item">
                <span className="core-value-item__num">4</span>
                <span className="core-value-item__text">Khám phá hành trình làm trà</span>
              </div>
            </div>

            <div className="core-values__actions">
              <a href="/journey" className="core-values__btn core-values__btn--dark">
                Khám phá hành trình làm trà
                <span className="core-values__btn-icon">›</span>
              </a>
              <a href="/3d-products" className="core-values__btn core-values__btn--light">
                Thư viện sản phẩm 3D
                <span className="core-values__btn-icon">›</span>
              </a>
            </div>
          </div>

          {/* Right side: images */}
          <div className="core-values__right">
            <div className="core-values__img-small scroll-reveal-right">
              <img src="/images/tea_leaves.png" alt="Thu hái lá trà" />
            </div>
            <div className="core-values__img-large scroll-reveal">
              <img src="/images/tea_plantation.png" alt="Xưởng trà" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

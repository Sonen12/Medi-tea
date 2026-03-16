import React, { useEffect, useState, useRef } from "react";
import "./AboutPage.css";

// SVG Blob Components for Background (Colors now controlled via CSS Fill or direct props)
const BlobPaleBlue = ({ className, style }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={`organic-blob ${className}`} style={style}>
    <path d="M47.5,-73.4C60.2,-64.8,68.2,-50,73.1,-35.1C77.9,-20.1,79.8,-5,75.9,8.5C72.1,22.1,62.4,34,51.8,44C41.3,53.9,29.9,62,-10.1,75.6C-50.1,89.1,-63.9,51.4,-70.7,31.7C-77.5,12,-87,-9.6,-83.4,-26.7C-79.8,-43.8,-63,-56.3,-46.8,-63.9C-30.7,-71.4,-15.3,-74.1,1.1,-75.6C17.5,-77.1,34.9,-82,47.5,-73.4Z" transform="translate(100 100)" />
  </svg>
);

const BlobSoftMint = ({ className, style }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={`organic-blob ${className}`} style={style}>
    <path d="M38.1,-60.7C52.4,-54.6,68.9,-48.5,76.6,-36.4C84.3,-24.3,83.1,-6.1,77.9,9.4C72.7,24.9,63.4,37.8,52.2,46.5C41,55.2,27.8,59.8,13.7,64.9C-0.3,70.1,-15.2,75.8,-27.1,71.5C-38.9,67.1,-47.8,52.8,-57.4,40.1C-67,27.3,-77.3,16,-79.1,3.8C-80.9,-8.5,-74.2,-21.7,-64.5,-32.1C-54.8,-42.6,-42.1,-50.2,-29.7,-57.1C-17.3,-63.9,-5.3,-70,6.5,-80.1C18.4,-90.1,36,-80.3,38.1,-60.7Z" transform="translate(100 100)" />
  </svg>
);

const BlobPaleSeafoam = ({ className, style }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={`organic-blob ${className}`} style={style}>
    <path d="M30.7,-48.8C42,-37.9,55.1,-29.4,62.7,-16.9C70.3,-4.4,72.4,12.1,65.8,24.1C59.2,36.1,43.9,43.6,30.2,49.4C16.5,55.2,4.4,59.3,-8.4,59.7C-21.2,60.1,-34.7,56.8,-42.1,47.5C-49.5,38.2,-50.8,22.9,-54.6,7.6C-58.4,-7.7,-64.7,-23,-59.5,-34C-54.3,-45,-37.6,-51.7,-23.4,-53.4C-9.2,-55.1,2.5,-51.8,12.9,-51.2C23.3,-50.6,30.4,-52.7,30.7,-48.8Z" transform="translate(100 100)" />
  </svg>
);

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const elementsRef = useRef([]);

  useEffect(() => {
    // Scroll listener for parallax backgrounds and images
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intersection Observer for Text and Image Fade-ins/Slide-ins
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elementsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <div className="story-scroll-page">
      
      {/* ===== BACKGROUND ORGANIC BLOBS ===== */}
      <div className="blob-container">
        <BlobPaleBlue className="blob-top-left" style={{ transform: `translateY(${scrollY * 0.15}px)` }} />
        <BlobSoftMint className="blob-middle-right" style={{ transform: `translateY(${-(scrollY * 0.05)}px)` }} />
        <BlobPaleSeafoam className="blob-bottom-right" style={{ transform: `translateY(${-(scrollY * 0.1)}px)` }} />
      </div>

      {/* ===== PARALLAX FLOATING TEA LEAVES ===== */}
      {/* Replaced assorted objects with different falling tea leaves */}
      <div 
        className="parallax-item p-leaf-1" 
        style={{ top: "15%", left: "5%", transform: `translateY(${-(scrollY * 0.4)}px) rotate(${scrollY * 0.1}deg)` }}>
        <span style={{ fontSize: '6rem'}}>🌿</span>
      </div>

      <div 
        className="parallax-item p-leaf-2" 
        style={{ top: "45%", right: "8%", transform: `translateY(${-(scrollY * 0.25)}px) rotate(${scrollY * -0.2}deg)` }}>
        <span style={{ fontSize: '4.5rem'}}>🍃</span>
      </div>

      <div 
        className="parallax-item p-leaf-3" 
        style={{ top: "75%", left: "10%", transform: `translateY(${-(scrollY * 0.5)}px) rotate(${scrollY * 0.15}deg)` }}>
         <span style={{ fontSize: '5rem'}}>🌱</span>
      </div>

      <div 
        className="parallax-item p-leaf-4" 
        style={{ top: "90%", right: "5%", transform: `translateY(${-(scrollY * 0.3)}px) rotate(${scrollY * -0.1}deg)` }}>
         <span style={{ fontSize: '6rem', opacity: 0.8}}>🌿</span>
      </div>


      {/* ===== HERO IMAGE INTRO (Fills Top Void) ===== */}
      <section className="about-hero" ref={addToRefs}>
        <div className="about-hero__bg">
          <img src="/images/tea_plantation.png" alt="Đồi chè MediTEA" />
          <div className="about-hero__overlay"></div>
        </div>
        <div className="about-hero__content">
          <h1 className="about-hero__title">Câu chuyện của MediTEA</h1>
          <p className="about-hero__subtitle">
            Khơi nguồn từ những lá trà già trên vùng núi cao, mang trong mình nắng gió và thời gian.
          </p>
        </div>
      </section>

      {/* ===== DETAILED STORY BLOCKS ===== */}

      {/* Block 1: Khởi Nguồn - Image slides from RIGHT */}
      <section className="story-split-section">
        <div className="story-text-block" ref={addToRefs}>
          <h2 className="story-heading">Khởi nguồn</h2>
          <p className="story-paragraph">
            Mọi thứ bắt đầu trong một lần đứng giữa vùng cao, nơi những gốc Shan Tuyết lặng lẽ vươn mình trong sương. Trên những tán cây ấy, những lá trà già vẫn ở lại, dày, đậm, và mang trong mình trọn vẹn sức sống của đất trời.
          </p>
          <p className="story-paragraph">
            Người ta thường chỉ chọn búp non, còn những lá già khụ thì bị lãng quên. Chính lúc ấy, chúng tôi nhận ra mình đã tìm thấy một nguồn nguyên liệu đáng trân trọng. Chẳng phải vì nó hiếm, mà bởi nó mang một giá trị nguyên bản chưa được nhìn nhận đúng nghĩa.
          </p>
        </div>
        <div className="story-image-block" ref={addToRefs}>
          <img src="/images/anh3.png" alt="Cây trà Shan Tuyết trong sương" style={{ transform: `translateY(${scrollY * 0.05}px)` }} />
        </div>
      </section>

      {/* Block 2: Giá Trị Của Lá Già (Reverse) - Image slides from LEFT */}
      <section className="story-split-section reverse">
        <div className="story-text-block" ref={addToRefs}>
          <h2 className="story-heading">Giá trị của lá già</h2>
          <p className="story-paragraph">
            Những chiếc lá đã đi qua nhiều mùa nắng mưa, bền bỉ hứng chịu sương gió để trở nên đậm đà, sâu sắc hơn về cả hương lẫn vị. Lá già không mềm mại nịnh nọt như búp non, nhưng chính sự cứng cáp ấy lại lưu giữ được cấu trúc hậu vị bền lâu khi pha chế.
          </p>
          <p className="story-paragraph">
            Nếu được sao sấy đúng cách, chúng hoàn toàn không hề thô ráp. Ngược lại, chúng còn toát lên một chiều sâu tĩnh lặng — thứ cảm giác lắng đọng mãi trong cổ họng và nấn ná lại trong sự thảnh thơi của tâm trí.
          </p>
        </div>
        <div className="story-image-block" ref={addToRefs}>
          <img src="/images/tea_leaves.png" alt="Lá trà già MediTEA" style={{ transform: `translateY(${-(scrollY * 0.05)}px)` }} />
        </div>
      </section>

      {/* Block 3: Đời Sống Tềnh Toàng - Image slides from RIGHT */}
      <section className="story-split-section">
        <div className="story-text-block" ref={addToRefs}>
           <h2 className="story-heading" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)"}}>Đời sống tềnh toàng, <br/>ly trà đậm sâu</h2>
          <p className="story-paragraph">
             MediTEA ra đời từ mong muốn trọn vẹn hóa giá trị của lá cổ thụ. Thưởng trà không nhất thiết phải là một nghi thức cầu kỳ tách biệt khỏi đời sống. Một chén trà hoàn toàn có thể hiện diện mộc mạc trên bàn làm việc, giữa những phút tản mạn buổi trưa, hay khi chiều buông nhường chỗ cho một khoảng lặng.
          </p>
          <div className="story-quote-box">
            Tên gọi MediTEA là sự giao thoa giữa <strong>Meditation</strong> và <strong>Tea</strong>. Mỗi ngụm trà như một hình thức thiền định thu nhỏ, điều chỉnh nhịp thở, đưa ta về với hiện tại bình an.
          </div>
        </div>
        <div className="story-image-block" ref={addToRefs}>
          <img src="/images/sp1.png" alt="Sản phẩm trà MediTEA" style={{ transform: `matrix(1, 0, 0, 1, 0, ${(scrollY * 0.08) - 100})` }} />
        </div>
      </section>

      {/* Block 4: Chế Tác Thủ Công (Reverse) - Image slides from LEFT */}
      <section className="story-split-section reverse">
        <div className="story-text-block" ref={addToRefs}>
          <h2 className="story-heading">Chế tác thủ công</h2>
          <p className="story-paragraph">
            Mỗi mẻ trà của MediTEA được sao sấy hoàn toàn thủ công trong một không gian mở gần gũi thiên nhiên. Ánh sáng tự nhiên, nền nhiệt và không khí thoáng đãng là những nhân tố không thể thiếu trong quy trình của chúng tôi. Chúng tôi nói "Không" với việc sản xuất đại trà bằng dây chuyền cơ khí lạnh lẽo.
          </p>
          <p className="story-paragraph">
            Sản xuất quy mô nhỏ giúp nghệ nhân cảm nhận chính xác khoảnh khắc hương vừa dậy, lá chuyển đúng màu tệp. Đó là lúc chúng tôi biết mình đã lưu giữ trọn vẹn món quà sinh khí mà thiên nhiên đã hào phóng ban tặng.
          </p>
        </div>
        <div className="story-image-block" ref={addToRefs}>
          <img src="/images/sp2.png" alt="Quá trình sao sấy thủ công" style={{ transform: `translateY(${-(scrollY * 0.03)}px)` }} />
        </div>
      </section>


      {/* ===== BOTTOM CTA (Fills Bottom Void) ===== */}
      <section className="story-cta" ref={addToRefs}>
        <img src="/images/sp1.png" alt="Sản phẩm MediTEA" className="story-cta-image" />
        <p className="story-text">
          Sẵn sàng khám phá vị trà của riêng bạn?
        </p>
        <a href="/3d-products" className="core-values__btn">
          Khám Phá Sản Phẩm 3D
        </a>
      </section>

    </div>
  );
}

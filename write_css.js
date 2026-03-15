const fs = require('fs');
const cssPath = 'd:/Learning FPT/PRJEXE/Medi-Tea - Copy/frontend/src/App.css';
const content = fs.readFileSync(cssPath, 'utf8');
const lines = content.split(/\r?\n/);
const kept = lines.slice(0, 598);

const newCSS = `
/* ===== SCROLL REVEAL ANIMATIONS ===== */
.scroll-reveal {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
}
.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
.scroll-reveal-left {
  opacity: 0;
  transform: translateX(-60px);
  transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
}
.scroll-reveal-left.revealed {
  opacity: 1;
  transform: translateX(0);
}
.scroll-reveal-right {
  opacity: 0;
  transform: translateX(60px);
  transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
}
.scroll-reveal-right.revealed {
  opacity: 1;
  transform: translateX(0);
}

.homepage-wrapper {
  position: relative;
  overflow: hidden;
}

/* ===== STORY (ABOUT) ===== */
.story {
  background: #f5f0eb;
  padding: 100px 40px;
}
.story__quote {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 80px;
}
.story__quote::before {
  content: '';
  display: block;
  width: 1px;
  height: 60px;
  background: #b8a08a;
  margin: 0 auto 40px;
}
.story__quote-mark {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 64px;
  color: #b8a08a;
  line-height: 0.5;
  display: inline-block;
  vertical-align: top;
  margin: 0 8px;
}
.story__quote-mark--end { vertical-align: bottom; }
.story__blockquote {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 28px;
  font-weight: 600;
  font-style: italic;
  color: #3d2e1e;
  line-height: 1.7;
  margin: 0;
  display: inline;
}
.story__quote-author {
  margin: 20px 0 0;
  font-size: 13px;
  letter-spacing: 3px;
  color: #b8a08a;
}
.story__grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 60px;
  align-items: start;
}
.story__heading {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 36px;
  font-weight: 700;
  color: #3d2e1e;
  line-height: 1.3;
  margin: 0 0 30px;
  letter-spacing: 2px;
}
.story__paragraph {
  font-size: 15px;
  color: #6b5b4f;
  line-height: 1.9;
  margin: 0 0 18px;
}
.story__link {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 28px;
  border: 1.5px solid #3d2e1e;
  color: #3d2e1e;
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 600;
  transition: all 0.3s ease;
}
.story__link:hover {
  background: #3d2e1e;
  color: #f5f0eb;
}
.story__images {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
}
.story__img {
  overflow: hidden;
  border-radius: 4px;
}
.story__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
}
.story__img:hover img { transform: scale(1.05); }
.story__img--top { grid-column: 1/2; grid-row: 1/2; height: 280px; }
.story__img--right { grid-column: 2/3; grid-row: 1/3; height: 100%; min-height: 400px; }
.story__img--bottom { grid-column: 1/2; grid-row: 2/3; height: 260px; }
@media (max-width: 768px) {
  .story { padding: 60px 20px; }
  .story__grid { grid-template-columns: 1fr; gap: 40px; }
  .story__images { grid-template-columns: 1fr 1fr; }
  .story__blockquote { font-size: 22px; }
  .story__heading { font-size: 28px; }
}

/* ===== COLLECTION (PRODUCT LIST) ===== */
.collection {
  background: #faf6f1;
  padding: 100px 40px;
}
.collection__quote {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 80px;
}
.collection__quote-line {
  width: 1px;
  height: 50px;
  background: #b8a08a;
  margin: 0 auto 30px;
}
.collection__qm {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 52px;
  color: #b8a08a;
  line-height: 0.5;
  vertical-align: top;
}
.collection__qm--end { vertical-align: bottom; }
.collection__blockquote {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 24px;
  font-weight: 600;
  font-style: italic;
  color: #3d2e1e;
  line-height: 1.7;
  margin: 0;
}
.collection__quote-author {
  margin: 20px 0 0;
  font-size: 12px;
  letter-spacing: 3px;
  color: #b8a08a;
}
.collection__showcase { max-width: 1100px; margin: 0 auto; }
.collection__feature { margin-bottom: 50px; }
.collection__feature-img {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  height: 500px;
}
.collection__feature-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s cubic-bezier(0.22,1,0.36,1);
}
.collection__feature:hover .collection__feature-img img { transform: scale(1.04); }
.collection__feature-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.15);
  transition: background 0.4s ease;
}
.collection__feature:hover .collection__feature-overlay { background: rgba(0,0,0,0.25); }
.collection__feature-tag {
  padding: 14px 36px;
  border: 2px solid rgba(255,255,255,0.85);
  color: #fff;
  font-size: 16px;
  letter-spacing: 4px;
  font-weight: 600;
  font-family: "Playfair Display", Georgia, serif;
  transition: all 0.3s ease;
}
.collection__feature:hover .collection__feature-tag {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(4px);
}
.collection__row {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 50px;
  align-items: center;
  margin-bottom: 50px;
}
.collection__row-heading {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  color: #3d2e1e;
  margin: 0 0 20px;
  letter-spacing: 2px;
}
.collection__row-desc {
  font-size: 15px;
  color: #6b5b4f;
  line-height: 1.9;
  margin: 0 0 24px;
}
.collection__row-desc strong { color: #3d2e1e; }
.collection__row-link {
  display: inline-block;
  padding: 12px 28px;
  border: 1.5px solid #3d2e1e;
  color: #3d2e1e;
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 600;
  transition: all 0.3s ease;
}
.collection__row-link:hover { background: #3d2e1e; color: #faf6f1; }
.collection__row-img {
  overflow: hidden;
  border-radius: 4px;
  height: 400px;
}
.collection__row-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
}
.collection__row-img:hover img { transform: scale(1.04); }
@media (max-width: 768px) {
  .collection { padding: 60px 20px; }
  .collection__feature-img { height: 300px; }
  .collection__row { grid-template-columns: 1fr; gap: 30px; }
  .collection__row-img { height: 280px; }
  .collection__blockquote { font-size: 20px; }
}

/* ===== EXPERIENCE (PRODUCT MAIN) ===== */
.experience {
  background: #fff;
  padding: 100px 40px;
}
.experience__header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
}
.experience__heading {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 32px;
  font-weight: 700;
  color: #3d2e1e;
  letter-spacing: 4px;
  margin: 0 0 20px;
}
.experience__desc {
  font-size: 15px;
  color: #6b5b4f;
  line-height: 1.8;
  font-style: italic;
  margin: 0;
}
.experience__gallery {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.experience__card {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
}
.experience__card-img {
  height: 500px;
  overflow: hidden;
}
.experience__card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s cubic-bezier(0.22,1,0.36,1);
}
.experience__card:hover .experience__card-img img { transform: scale(1.06); }
.experience__card-title {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  writing-mode: vertical-lr;
  text-orientation: mixed;
  font-family: "Playfair Display", Georgia, serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 4px;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  margin: 0;
  white-space: nowrap;
}
@media (max-width: 768px) {
  .experience { padding: 60px 20px; }
  .experience__gallery { grid-template-columns: 1fr; gap: 16px; }
  .experience__card-img { height: 350px; }
  .experience__card-title { writing-mode: horizontal-tb; bottom: 20px; }
}

/* ===== COMMITMENT (CERTIFICATE) ===== */
.commitment {
  background: #f5f0eb;
  padding: 100px 40px;
}
.commitment__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
.commitment__heading {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 30px;
  font-weight: 700;
  color: #3d2e1e;
  letter-spacing: 3px;
  margin: 0 0 20px;
}
.commitment__desc {
  font-size: 15px;
  color: #6b5b4f;
  line-height: 1.8;
  margin: 0 0 30px;
}
.commitment__badges {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}
.commitment__badge {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 20px;
  background: rgba(255,255,255,0.7);
  border-radius: 8px;
  border: 1px solid rgba(184,160,138,0.15);
}
.commitment__badge h4 {
  margin: 0 0 4px;
  font-size: 15px;
  color: #3d2e1e;
  font-weight: 600;
}
.commitment__badge p {
  margin: 0;
  font-size: 13px;
  color: #8a7b6f;
  line-height: 1.5;
}
.commitment__badge-icon {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  background: #3d2e1e;
  color: #f5f0eb;
  display: grid;
  place-items: center;
  font-size: 16px;
  font-weight: 700;
}
.commitment__link {
  display: inline-block;
  padding: 12px 28px;
  border: 1.5px solid #3d2e1e;
  color: #3d2e1e;
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 600;
  transition: all 0.3s ease;
}
.commitment__link:hover { background: #3d2e1e; color: #f5f0eb; }
.commitment__img {
  overflow: hidden;
  border-radius: 4px;
  height: 500px;
}
.commitment__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
}
.commitment__img:hover img { transform: scale(1.04); }
@media (max-width: 768px) {
  .commitment { padding: 60px 20px; }
  .commitment__inner { grid-template-columns: 1fr; gap: 40px; }
  .commitment__img { height: 350px; }
}

/* ===== FOOTER ===== */
.ft {
  position: relative;
  background: #1a1410;
  color: #d4c8bc;
  padding: 60px 40px 40px;
}
.ft__top, .ft__bottom {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}
.ft__brand { flex: 1; min-width: 200px; }
.ft__brand h3 {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 22px;
  color: #f5f0eb;
  margin: 0 0 10px;
}
.ft__brand p { font-size: 14px; color: #8a7b6f; line-height: 1.7; }
.ft__col { min-width: 140px; }
.ft__col h4 {
  font-size: 13px;
  letter-spacing: 2px;
  color: #f5f0eb;
  margin: 0 0 14px;
  text-transform: uppercase;
}
.ft__col a {
  display: block;
  color: #8a7b6f;
  text-decoration: none;
  font-size: 14px;
  padding: 4px 0;
  transition: color 0.2s;
}
.ft__col a:hover { color: #f5f0eb; }
.ft__bottom {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(184,160,138,0.15);
  justify-content: space-between;
  align-items: center;
}
.ft__copy { font-size: 13px; color: #6b5b4f; }
.ft__socials { display: flex; gap: 12px; }
.ft__socials a {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(184,160,138,0.2);
  display: grid;
  place-items: center;
  color: #8a7b6f;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}
.ft__socials a:hover { border-color: #f5f0eb; color: #f5f0eb; }
`;

const result = kept.join('\r\n') + '\r\n' + newCSS;
fs.writeFileSync(cssPath, result, 'utf8');
console.log('Done! Lines:', result.split(/\r?\n/).length);

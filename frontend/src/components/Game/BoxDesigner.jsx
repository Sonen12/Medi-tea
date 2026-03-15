import React, { useState } from "react";
import TeaBox3D from "./TeaBox3D";

/**
 * BoxDesigner — Màn hình thiết kế hộp trà
 * 3 mẫu hộp mặc định + tùy chỉnh chi tiết (ribbons, stamps, stickers, patterns)
 */

const BOX_TEMPLATES = [
  {
    id: "classic",
    name: "Hộp Cổ Điển",
    description: "Thanh lịch, phù hợp làm quà tặng",
    emoji: "🎁",
    bgColor: "#faf5eb",
    borderColor: "#d4a017",
    textColor: "#6b4f1d",
    pattern: "classic",
  },
  {
    id: "nature",
    name: "Hộp Thiên Nhiên",
    description: "Mộc mạc, gần gũi thiên nhiên",
    emoji: "🌿",
    bgColor: "#f0f5ea",
    borderColor: "#6a9e35",
    textColor: "#2d5016",
    pattern: "nature",
  },
  {
    id: "luxury",
    name: "Hộp Cao Cấp",
    description: "Sang trọng, ấn tượng đặc biệt",
    emoji: "✨",
    bgColor: "#1a1a2e",
    borderColor: "#e0c068",
    textColor: "#f0e6cc",
    pattern: "luxury",
  },
];

const DECORATIONS = {
  ribbons: [
    { id: "ribbon-gold", label: "Ruy băng vàng", emoji: "🎀" },
    { id: "ribbon-red", label: "Ruy băng đỏ", emoji: "🎗️" },
    { id: "ribbon-green", label: "Ruy băng xanh lá", emoji: "💚" },
  ],
  stamps: [
    { id: "stamp-leaf", label: "Dấu lá trà", emoji: "🍃" },
    { id: "stamp-seal", label: "Dấu sáp", emoji: "🔴" },
    { id: "stamp-star", label: "Dấu ngôi sao", emoji: "⭐" },
  ],
  stickers: [
    { id: "sticker-heart", label: "Trái tim", emoji: "❤️" },
    { id: "sticker-flower", label: "Hoa", emoji: "🌸" },
    { id: "sticker-butterfly", label: "Bướm", emoji: "🦋" },
    { id: "sticker-bamboo", label: "Trúc", emoji: "🎋" },
  ],
  messages: [
    { id: "msg-thanks", label: "Cảm ơn bạn", emoji: "💌" },
    { id: "msg-health", label: "Chúc sức khoẻ", emoji: "💪" },
    { id: "msg-love", label: "Yêu thương", emoji: "💕" },
  ],
};

const PATTERN_SVG = {
  classic: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%23d4a017' stroke-width='0.5'/%3E%3C/svg%3E")`,
  nature: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c-2 3-6 8-6 12s4 6 6 6 6-2 6-6-4-9-6-12z' fill='%236a9e35' fill-opacity='0.15'/%3E%3C/svg%3E")`,
  luxury: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='1' fill='%23e0c068' fill-opacity='0.2'/%3E%3C/svg%3E")`,
};

export default function BoxDesigner({ selectedIngredients, onClose }) {
  const [activeBox, setActiveBox] = useState(BOX_TEMPLATES[0].id);
  const [selectedDecors, setSelectedDecors] = useState(new Set());

  const currentBox = BOX_TEMPLATES.find((b) => b.id === activeBox);

  const toggleDecor = (decorId) => {
    setSelectedDecors((prev) => {
      const next = new Set(prev);
      if (next.has(decorId)) {
        next.delete(decorId);
      } else {
        next.add(decorId);
      }
      return next;
    });
  };

  // Gather selected decorations for preview
  const activeDecorEmojis = [];
  Object.values(DECORATIONS)
    .flat()
    .forEach((d) => {
      if (selectedDecors.has(d.id)) activeDecorEmojis.push(d.emoji);
    });

  return (
    <div className="box-designer-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="box-designer-modal">
        {/* Header */}
        <div className="bd-header">
          <h2>📦 Thiết Kế Hộp Trà</h2>
          <button className="bd-close" onClick={onClose}>✕</button>
        </div>

        <div className="bd-body">
          {/* Step 1: Chọn hộp */}
          <h3 className="bd-section-title">1. Chọn kiểu hộp</h3>
          <p className="bd-section-desc">Chọn mẫu hộp phù hợp với phong cách của bạn</p>

          <div className="bd-box-options">
            {BOX_TEMPLATES.map((box) => (
              <div
                key={box.id}
                className={`bd-box-card ${activeBox === box.id ? "active" : ""}`}
                onClick={() => setActiveBox(box.id)}
              >
                <div
                  className="bd-box-visual"
                  style={{
                    background: box.bgColor,
                    border: `2px solid ${box.borderColor}`,
                    color: box.textColor,
                    borderRadius: 12,
                  }}
                >
                  <span>{box.emoji}</span>
                </div>
                <div className="bd-box-name">{box.name}</div>
                <div className="bd-box-desc">{box.description}</div>
              </div>
            ))}
          </div>

          {/* Step 2: Tùy chỉnh */}
          <div className="bd-customization">
            <h3 className="bd-section-title">2. Thêm chi tiết trang trí</h3>
            <p className="bd-section-desc">Chọn các chi tiết để cá nhân hóa hộp trà của bạn</p>

            <div className="bd-custom-grid">
              {Object.entries(DECORATIONS).map(([category, items]) => {
                const categoryLabels = {
                  ribbons: "🎀 Ruy Băng",
                  stamps: "🔴 Con Dấu",
                  stickers: "🌸 Sticker",
                  messages: "💌 Lời Nhắn",
                };
                return (
                  <div key={category} className="bd-custom-section">
                    <h4>{categoryLabels[category]}</h4>
                    <div className="bd-decor-options">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          className={`bd-decor-btn ${selectedDecors.has(item.id) ? "active" : ""}`}
                          onClick={() => toggleDecor(item.id)}
                        >
                          <span className="bd-decor-emoji">{item.emoji}</span>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          <div className="bd-preview-section">
            <h3 className="bd-section-title">👁️ Xem trước hộp trà</h3>
            <p className="bd-section-desc">Hộp trà của bạn sẽ trông như thế này</p>

            <div className="bd-preview-box">
              {/* React Three Fiber 3D Canvas */}
              <TeaBox3D activeBox={activeBox} selectedDecors={selectedDecors} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bd-footer">
          <button className="bd-btn-cancel" onClick={onClose}>
            Huỷ
          </button>
          <button className="bd-btn-save" onClick={onClose}>
            ✓ Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
}

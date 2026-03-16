import React from "react";

/**
 * ResultPanel — Hiển thị kết quả pha trà
 * Bao gồm: điểm hài hoà, hương vị, công dụng, combo, CẢNH BÁO & tác dụng phụ
 */
export default function ResultPanel({
  combinedFlavors,
  benefits,
  specialCombos,
  harmonyScore,
  hasIngredients,
  warnings,
  sideEffects,
  totalCaffeine,
}) {
  if (!hasIngredients) {
    return (
      <div className="result-panel empty-result">
        <h3 className="panel-title">📊 Kết Quả Pha Trà</h3>
        <p className="empty-hint">Thêm nguyên liệu để xem phân tích chi tiết</p>
      </div>
    );
  }

  const flavorLabels = {
    bitter: { label: "Đắng", emoji: "😣" },
    sweet: { label: "Ngọt", emoji: "😋" },
    floral: { label: "Thơm hoa", emoji: "🌺" },
    earthy: { label: "Đậm đà", emoji: "🌰" },
    fresh: { label: "Tươi mát", emoji: "❄️" },
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#6a9e35";
    if (score >= 50) return "#d4a017";
    return "#c44536";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Tuyệt hảo!";
    if (score >= 60) return "Khá tốt";
    if (score >= 40) return "Tạm ổn";
    if (score >= 20) return "Chưa hài hoà";
    return "Cần cải thiện";
  };

  const getCaffeineLabel = (level) => {
    if (level === 0) return { text: "Không caffeine", color: "#6a9e35" };
    if (level <= 2) return { text: "Thấp", color: "#6a9e35" };
    if (level <= 4) return { text: "Trung bình", color: "#d4a017" };
    if (level <= 6) return { text: "Cao", color: "#e08c3a" };
    return { text: "Rất cao ⚠️", color: "#c44536" };
  };

  const caffeineInfo = getCaffeineLabel(totalCaffeine || 0);

  return (
    <div className="result-panel">
      <h3 className="panel-title">📊 Kết Quả Pha Trà</h3>

      {/* Điểm hài hoà */}
      <div className="harmony-section">
        <div
          className="harmony-score"
          style={{ "--score-color": getScoreColor(harmonyScore) }}
        >
          <div className="score-circle">
            <span className="score-number">{harmonyScore}</span>
            <span className="score-unit">/100</span>
          </div>
          <span className="score-label">{getScoreLabel(harmonyScore)}</span>
        </div>
      </div>

      {/* Caffeine meter */}
      <div className="caffeine-section">
        <div className="caffeine-row">
          <span className="caffeine-label">☕ Caffeine:</span>
          <span className="caffeine-value" style={{ color: caffeineInfo.color }}>
            {caffeineInfo.text} ({totalCaffeine || 0}/10)
          </span>
        </div>
        <div className="caffeine-bar-track">
          <div
            className="caffeine-bar-fill"
            style={{
              width: `${((totalCaffeine || 0) / 10) * 100}%`,
              background: caffeineInfo.color,
            }}
          />
        </div>
      </div>

      {/* ⚠️ CẢNH BÁO — điểm xấu */}
      {warnings && warnings.length > 0 && (
        <div className="warnings-section">
          <h4>⚠️ Lưu Ý Khi Pha</h4>
          <div className="warnings-list">
            {warnings.map((w, i) => (
              <div key={i} className={`warning-card severity-${w.severity}`}>
                <p>{w.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Biểu đồ hương vị */}
      <div className="flavor-section">
        <h4>Hương vị</h4>
        <div className="flavor-bars">
          {Object.entries(combinedFlavors).map(([key, value]) => (
            <div key={key} className="flavor-row">
              <span className="flavor-label">
                {flavorLabels[key]?.emoji} {flavorLabels[key]?.label}
              </span>
              <div className="flavor-bar-track">
                <div
                  className="flavor-bar-fill"
                  style={{ width: `${(value / 5) * 100}%` }}
                />
              </div>
              <span className="flavor-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Công dụng */}
      {benefits.length > 0 && (
        <div className="benefits-section">
          <h4>💚 Công Dụng</h4>
          <div className="benefits-list">
            {benefits.map((b, i) => (
              <span key={i} className="benefit-tag">
                {b}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Combo đặc biệt */}
      {specialCombos.length > 0 && (
        <div className="combos-section">
          <h4>⭐ Combo Đặc Biệt</h4>
          {specialCombos.map((combo) => (
            <div key={combo.id} className="combo-card">
              <strong>{combo.name}</strong>
              <p>{combo.bonus}</p>
              {combo.bonusBenefits && (
                <div className="combo-bonus-benefits">
                  {combo.bonusBenefits.map((b, i) => (
                    <span key={i} className="benefit-tag bonus">
                      ✨ {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tác dụng phụ */}
      {sideEffects && sideEffects.length > 0 && (
        <div className="side-effects-section">
          <h4>💊 Tác Dụng Phụ Cần Biết</h4>
          <div className="side-effects-list">
            {sideEffects.map((se, i) => (
              <div key={i} className="side-effect-item">
                <span className="se-ingredient">{se.ingredient}:</span>
                <span className="se-text">{se.effect}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";

/**
 * SuggestionPanel — Gợi ý nguyên liệu bổ sung phù hợp
 */
export default function SuggestionPanel({ suggestions, onAddIngredient, disableAdd }) {
  if (suggestions.length === 0) return null;

  return (
    <div className="suggestion-panel">
      <h4 className="suggestion-title">💡 Gợi Ý Bổ Sung</h4>
      <p className="suggestion-subtitle">
        Những nguyên liệu hợp với combo hiện tại của bạn
      </p>
      <div className="suggestion-list">
        {suggestions.map((ing) => (
          <button
            key={ing.id}
            className="suggestion-item"
            onClick={() => onAddIngredient(ing.id)}
            disabled={disableAdd}
            title={ing.description}
          >
            <span className="suggestion-emoji">{ing.emoji}</span>
            <div className="suggestion-info">
              <span className="suggestion-name">{ing.name}</span>
              <span className="suggestion-desc">{ing.description}</span>
            </div>
            <span className="suggestion-add">+</span>
          </button>
        ))}
      </div>
    </div>
  );
}

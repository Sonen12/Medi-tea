import React, { useState } from "react";

/**
 * MixingBowl — Drop zone + nút Đóng Gói
 */
export default function MixingBowl({
  selectedIngredients,
  maxIngredients,
  onRemoveIngredient,
  onAddIngredient,
  onReset,
  onPackage,
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const ingredientId = e.dataTransfer.getData("ingredientId");
    if (ingredientId) {
      onAddIngredient(ingredientId);
    }
  };

  const isEmpty = selectedIngredients.length === 0;

  return (
    <div
      className={`mixing-bowl ${isDragOver ? "drag-over" : ""} ${isEmpty ? "empty" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="bowl-header">
        <h3 className="panel-title">🫖 Bát Pha Trà</h3>
        <span className="ingredient-count">
          {selectedIngredients.length}/{maxIngredients}
        </span>
      </div>

      {isEmpty ? (
        <div className="bowl-placeholder">
          <div className="bowl-icon">🍃</div>
          <p>Thả nguyên liệu vào đây để bắt đầu pha trà</p>
        </div>
      ) : (
        <div className="bowl-ingredients">
          {selectedIngredients.map((ing) => (
            <div
              key={ing.id}
              className="bowl-item"
              style={{ "--item-color": ing.color }}
            >
              <span className="bowl-item-emoji">{ing.emoji}</span>
              <span className="bowl-item-name">{ing.name}</span>
              <button
                className="bowl-item-remove"
                onClick={() => onRemoveIngredient(ing.id)}
                title="Xoá nguyên liệu"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {!isEmpty && (
        <div className="bowl-actions">
          <button className="reset-btn" onClick={onReset}>
            🔄 Làm lại
          </button>
          <button className="package-btn" onClick={onPackage}>
            📦 Đóng gói
          </button>
        </div>
      )}
    </div>
  );
}

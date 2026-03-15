import React from "react";

/**
 * IngredientPanel — Panel hiển thị danh sách nguyên liệu có thể kéo/click để thêm
 */
export default function IngredientPanel({
  ingredients,
  selectedIds,
  onAddIngredient,
  disableAdd,
}) {
  const categories = [...new Set(ingredients.map((ing) => ing.category))];

  const categoryLabels = {
    base: "🍵 Trà Nền",
    herb: "🌿 Thảo Mộc",
    flower: "🌸 Hoa",
    spice: "🫚 Gia Vị",
    fruit: "🍑 Trái Cây",
    sweetener: "🍯 Chất Tạo Ngọt",
  };

  return (
    <div className="ingredient-panel">
      <h3 className="panel-title">Nguyên Liệu</h3>
      <p className="panel-subtitle">Click hoặc kéo thả vào bát pha trà</p>

      {categories.map((cat) => (
        <div key={cat} className="ingredient-category">
          <h4 className="category-label">{categoryLabels[cat] || cat}</h4>
          <div className="ingredient-grid">
            {ingredients
              .filter((ing) => ing.category === cat)
              .map((ing) => {
                const isSelected = selectedIds.includes(ing.id);
                return (
                  <button
                    key={ing.id}
                    className={`ingredient-card ${isSelected ? "selected" : ""} ${disableAdd && !isSelected ? "disabled" : ""}`}
                    onClick={() => !isSelected && !disableAdd && onAddIngredient(ing.id)}
                    disabled={isSelected || disableAdd}
                    draggable={!isSelected && !disableAdd}
                    onDragStart={(e) => {
                      e.dataTransfer.setData("ingredientId", ing.id);
                      e.currentTarget.classList.add("dragging");
                    }}
                    onDragEnd={(e) => {
                      e.currentTarget.classList.remove("dragging");
                    }}
                    title={ing.description}
                  >
                    <span className="ingredient-emoji">{ing.emoji}</span>
                    <span className="ingredient-name">{ing.name}</span>
                    {isSelected && <span className="check-mark">✓</span>}
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

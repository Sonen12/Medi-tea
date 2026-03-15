import React, { useState } from "react";
import { useTeaMixer } from "./hooks/useTeaMixer";
import IngredientPanel from "./IngredientPanel";
import MixingBowl from "./MixingBowl";
import ResultPanel from "./ResultPanel";
import SuggestionPanel from "./SuggestionPanel";
import BoxDesigner from "./BoxDesigner";
import "./TeaMixer.css";

/**
 * TeaMixerBoard — Component chính
 * Layout: [IngredientPanel] [MixingBowl + Suggestions] [ResultPanel]
 * + BoxDesigner modal khi nhấn "Đóng gói"
 */
export default function TeaMixerBoard() {
  const {
    allIngredients,
    selectedIngredients,
    maxIngredients,
    combinedFlavors,
    benefits,
    specialCombos,
    suggestions,
    harmonyScore,
    addIngredient,
    removeIngredient,
    resetMix,
  } = useTeaMixer();

  const [showBoxDesigner, setShowBoxDesigner] = useState(false);

  const selectedIds = selectedIngredients.map((ing) => ing.id);
  const isFull = selectedIngredients.length >= maxIngredients;

  return (
    <div className="tea-mixer-page">
      {/* Header */}
      <div className="tea-mixer-header">
        <h1 className="tea-mixer-title">
          <span className="tea-mixer-title-leaf">🍃</span>
          Phối Trà Medi-Tea
        </h1>
        <p className="tea-mixer-subtitle">
          Kéo thả nguyên liệu để tạo ra công thức trà hoàn hảo của riêng bạn
        </p>
        <div className="tea-mixer-divider">
          <span>✦</span>
        </div>
      </div>

      {/* Main Board */}
      <div className="tea-mixer-board">
        {/* Left */}
        <IngredientPanel
          ingredients={allIngredients}
          selectedIds={selectedIds}
          onAddIngredient={addIngredient}
          disableAdd={isFull}
        />

        {/* Center */}
        <div className="tea-mixer-center">
          <MixingBowl
            selectedIngredients={selectedIngredients}
            maxIngredients={maxIngredients}
            onRemoveIngredient={removeIngredient}
            onAddIngredient={addIngredient}
            onReset={resetMix}
            onPackage={() => setShowBoxDesigner(true)}
          />

          <SuggestionPanel
            suggestions={suggestions}
            onAddIngredient={addIngredient}
            disableAdd={isFull}
          />
        </div>

        {/* Right */}
        <ResultPanel
          combinedFlavors={combinedFlavors}
          benefits={benefits}
          specialCombos={specialCombos}
          harmonyScore={harmonyScore}
          hasIngredients={selectedIngredients.length > 0}
        />
      </div>

      {/* Box Designer Modal */}
      {showBoxDesigner && (
        <BoxDesigner
          selectedIngredients={selectedIngredients}
          onClose={() => setShowBoxDesigner(false)}
        />
      )}
    </div>
  );
}

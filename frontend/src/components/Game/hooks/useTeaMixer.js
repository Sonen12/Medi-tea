import { useState, useMemo, useCallback } from "react";
import { ingredients } from "../data/ingredients";
import {
  calculateCombinedFlavors,
  aggregateBenefits,
} from "../data/mixRules";

const MAX_INGREDIENTS = 4; // allow up to 4 for some flexibility, but encourage 3

// ─── Simple Audio Manager ────────────────────────────────
const sfx = {
  click: typeof Audio !== "undefined" ? new Audio('/audio/click.mp3') : null,
  pour: typeof Audio !== "undefined" ? new Audio('/audio/pour.mp3') : null,
  success: typeof Audio !== "undefined" ? new Audio('/audio/success.mp3') : null,
};

const playSound = (type) => {
  if (sfx[type]) {
    sfx[type].currentTime = 0;
    sfx[type].play().catch(() => {}); // catch and ignore if browser blocks autoplay
  }
};

export function useTeaMixer() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewResult, setBrewResult] = useState(null);

  // ─── Derived state ────────────────────────────────────
  const combinedFlavors = useMemo(
    () => calculateCombinedFlavors(selectedIngredients),
    [selectedIngredients]
  );

  const benefits = useMemo(
    () => aggregateBenefits(selectedIngredients),
    [selectedIngredients]
  );

  // ─── Actions ──────────────────────────────────────────

  const addIngredient = useCallback(
    (ingredientId) => {
      if (selectedIngredients.length >= MAX_INGREDIENTS) return false;

      const ingredient = ingredients.find((ing) => ing.id === ingredientId);
      if (!ingredient) return false;

      if (selectedIngredients.some((ing) => ing.id === ingredientId)) return false;

      // Limit to 1 Base Tea
      if (ingredient.category === "base") {
        const hasBase = selectedIngredients.some((ing) => ing.category === "base");
        if (hasBase) return false;
      }

      playSound('click');
      setSelectedIngredients((prev) => [...prev, ingredient]);
      return true;
    },
    [selectedIngredients]
  );

  const removeIngredient = useCallback((ingredientId) => {
    playSound('click');
    setSelectedIngredients((prev) =>
      prev.filter((ing) => ing.id !== ingredientId)
    );
  }, []);

  const resetMix = useCallback(() => {
    playSound('click');
    setSelectedIngredients([]);
    setBrewResult(null);
    setIsBrewing(false);
  }, []);

  const evaluateMix = useCallback(() => {
    playSound('click');
    playSound('pour');
    setIsBrewing(true);

    setTimeout(() => {
      const ids = selectedIngredients.map(ing => ing.id);
      let rank = "C";
      let feedback = "";
      let voucher = "5%";

      // Hạng S: Cổ Thụ + Hoa Nhài + Cúc Chi
      const isRankS = ids.includes("co-thu") && ids.includes("jasmine") && ids.includes("chrysanthemum");
      
      // Hạng A: Trà Đen + Vỏ Cam (tran-bi) + Nụ Hồng (rose)
      const isRankA = ids.includes("black-tea") && ids.includes("tran-bi") && ids.includes("rose");

      // Logic rules
      if (isRankS) {
        rank = "S";
        voucher = "25%";
        feedback = "Cực phẩm! Vị trà đậm đà quyện cùng hương nhài thanh tao. Bạn quả là một nghệ nhân thực thụ! Tặng bạn Voucher để rinh ngay bộ nguyên liệu này về nhà.";
      } else if (isRankA) {
        rank = "A";
        voucher = "15%";
        feedback = "Chà chà, một sự kết hợp độc đáo! Trà đen ấm áp đi kèm chút the mát của vỏ cam giúp an thần rất tốt. Đáng để thử nghiệm đấy!";
      } else {
        // Hạng C: Thảm họa / Kỳ quặc
        rank = "C";
        voucher = "5%";
        feedback = "Úi chà! Vị này hơi... 'đột phá' quá mức rồi. Các hương vị đang đánh nhau chan chát trong ấm kìa. Lão Trà gợi ý bạn thử bỏ bớt nguyên liệu ra xem sao nhé. Tặng bạn mã giảm giá nhỏ để thử sức lại!";
      }

      if (rank === "S" || rank === "A") {
        playSound('success');
      }

      setBrewResult({ rank, feedback, voucher });
      setIsBrewing(false);
    }, 3000); // 3s brewing animation
  }, [selectedIngredients]);

  return {
    allIngredients: ingredients,
    selectedIngredients,
    maxIngredients: MAX_INGREDIENTS,

    combinedFlavors,
    benefits,
    
    isBrewing,
    brewResult,

    addIngredient,
    removeIngredient,
    resetMix,
    evaluateMix
  };
}

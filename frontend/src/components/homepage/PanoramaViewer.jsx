import { useEffect, useRef, useState } from "react";
import "./PanoramaViewer.css";

function PanoramaViewer({ onClose }) {
  const viewerRef = useRef(null);
  const pannellumInstance = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Prevent body scroll while panorama is open
    document.body.style.overflow = "hidden";

    // Initialize Pannellum viewer
    if (viewerRef.current && window.pannellum) {
      pannellumInstance.current = window.pannellum.viewer(viewerRef.current, {
        type: "equirectangular",
        panorama: "/images/panorama_tea_hills.png",
        autoLoad: true,
        autoRotate: -2,
        autoRotateInactivityDelay: 3000,
        compass: false,
        showControls: true,
        showFullscreenCtrl: false,
        showZoomCtrl: true,
        mouseZoom: true,
        hfov: 110,
        minHfov: 50,
        maxHfov: 120,
        pitch: 0,
        yaw: 0,
        onLoad: () => {
          setIsLoading(false);
        },
      });

      // Fallback: hide loading after 3s even if onLoad doesn't fire
      const fallback = setTimeout(() => setIsLoading(false), 3000);
      return () => {
        clearTimeout(fallback);
        if (pannellumInstance.current) {
          pannellumInstance.current.destroy();
        }
        document.body.style.overflow = "";
      };
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 350);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className={`panorama-overlay ${isClosing ? "panorama-overlay--closing" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="panorama-container">
        {/* Loading State */}
        {isLoading && (
          <div className="panorama-loading">
            <div className="panorama-loading__spinner" />
            <span className="panorama-loading__text">Đang tải không gian 360°…</span>
          </div>
        )}

        {/* Pannellum Viewer */}
        <div ref={viewerRef} className="panorama-viewer" />

        {/* Close Button */}
        <button className="panorama-close" onClick={handleClose} aria-label="Đóng">
          ✕
        </button>

        {/* Drag Hint */}
        {!isLoading && (
          <div className="panorama-hint">
            <span className="panorama-hint__icon">👆</span>
            Kéo để khám phá không gian 360°
          </div>
        )}

        {/* Info Overlay */}
        <div className="panorama-info">
          <div className="panorama-info__badge">
            <span>🌿</span> KHÔNG GIAN THỰC TẾ
          </div>
          <h3 className="panorama-info__title">Đồi trà Medi Tea</h3>
          <p className="panorama-info__desc">
            Khám phá vùng nguyên liệu đồi trà xanh mướt — nơi những búp trà tươi ngon nhất được chọn lựa cho từng sản phẩm.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PanoramaViewer;

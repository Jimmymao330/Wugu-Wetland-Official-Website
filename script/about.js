// ============================================================
// ABOUT.JS — 五股濕地生態園區 關於我們頁面專屬邏輯
// ============================================================

(function () {
  'use strict';

  // ──────────────────────────────────────────────
  // 1. MAP CONTAINER — Keyboard interaction
  //    規格：不開新分頁、不做 hover zoom
  //    此處僅預留 Enter/Space 鍵盤事件給未來互動擴充
  // ──────────────────────────────────────────────
  function initMapInteraction() {
    const mapContainer = document.getElementById('about-map-container');
    if (!mapContainer) return;

    mapContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // 預留：未來可觸發地圖互動 Modal 或外連
        // 目前為靜態展示，無動作
      }
    });
  }

  // ──────────────────────────────────────────────
  // 2. INIT
  // ──────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initMapInteraction();
  });

})();

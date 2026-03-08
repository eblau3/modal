/**
 * モーダルウィンドウの初期化
 */
const initializeModal = () => {
  const MODAL_ACTIVE_CLASS = "is-active";

  const openButtons = document.querySelectorAll(".js-modal-open");
  const closeButtons = document.querySelectorAll(".js-modal-close");

  /**
   * スクロール位置を固定する
   */
  const lockScroll = () => {
    const scrollPosition = window.scrollY;

    // インラインスタイルを適用する
    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollPosition}px`,
      width: "100%",
      overflowY: "scroll",
    });
  };

  /**
   * スクロール固定を解除する
   */
  const unlockScroll = () => {
    const scrollPosition = parseInt(document.body.style.top || "0", 10) * -1;

    // インラインスタイルをリセットする
    Object.assign(document.body.style, {
      position: "",
      top: "",
      width: "",
      overflowY: "",
    });
    window.scrollTo(0, scrollPosition);
  };

  /**
   * モーダルを開く
   * @param {HTMLElement | null} targetModal - 開く対象のモーダル要素
   * @param {HTMLElement | null} triggerButton - クリックされたボタン要素
   */
  const openModal = (targetModal, triggerButton) => {
    if (!targetModal) return;

    lockScroll();
    targetModal.classList.add(MODAL_ACTIVE_CLASS);

    // ARIA属性を更新する
    targetModal.setAttribute("aria-hidden", "false");
    if (triggerButton) {
      triggerButton.setAttribute("aria-expanded", "true");
    }
  };

  /**
   * モーダルを閉じる
   * @param {HTMLElement | null} targetModal - 閉じる対象のモーダル要素
   */
  const closeModal = (targetModal) => {
    // 既に閉じている、または要素がない場合は処理しない
    if (!targetModal || !targetModal.classList.contains(MODAL_ACTIVE_CLASS)) return;

    targetModal.classList.remove(MODAL_ACTIVE_CLASS);

    // ARIA属性を更新する
    targetModal.setAttribute("aria-hidden", "true");

    // 開くトリガーとなったボタンの状態を戻す
    const triggerButton = document.querySelector(`[data-target="${targetModal.id}"]`);
    if (triggerButton) {
      triggerButton.setAttribute("aria-expanded", "false");
    }

    unlockScroll();
  };

  // --- 開くボタンのクリック時 ---
  openButtons.forEach((openButton) => {
    openButton.addEventListener("click", () => {
      const targetId = openButton.dataset.target;
      const targetModal = document.getElementById(targetId);
      openModal(targetModal, openButton);
    });
  });

  // --- 閉じるボタン（オーバーレイ含む）のクリック時 ---
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", (event) => {
      const targetModal = event.currentTarget.closest(".js-modal");
      closeModal(targetModal);
    });
  });

  // --- キーボード操作（Escキー）の検知時 ---
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const activeModal = document.querySelector(`.js-modal.${MODAL_ACTIVE_CLASS}`);
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });
};

window.addEventListener("DOMContentLoaded", initializeModal);
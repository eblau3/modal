const modal = () => {
  const fixScroll = () => {
    const target = document.querySelector('body');
    const scrollPos = window.scrollY;
    target.style.position = 'fixed';
    target.style.top = `-${scrollPos}px`;
    target.style.left = '0';
  };

  const cancelFixScroll = () => {
    const target = document.querySelector('body');
    const fixedPos = Number(target.style.top.replace(/px|-/g, ''));
    target.style.position = 'static';
    window.scrollTo(0, fixedPos);
  };

  const modal = document.querySelector('.js-modal');
  const overlay = document.querySelector('.js-modal-overlay');
  const open = document.querySelector('.js-modal-open');
  const close = document.querySelector('.js-modal-close');

  const openModal = () => {
    modal.classList.add('is-active');
    cancelFixScroll();
  }

  const closeModal = () => {
    fixScroll();    
    modal.classList.remove('is-active');
  };

  open.addEventListener('click', () => openModal());
  close.addEventListener('click', () => closeModal());
  overlay.addEventListener('click', () => closeModal());
};

window.addEventListener('load', () => modal());
import React from 'react';

function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className="scroll-to-top-button" onClick={scrollToTop}>
      Scroll to Top
    </button>
  );
}

export default ScrollToTopButton;

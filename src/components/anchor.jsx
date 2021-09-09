import React from 'react';

const Anchor = ({ text = "", className = '', anchor }) => {
  const anchorRef = React.useRef(null);

  const scrollToNext = () => {
    const item = document.querySelector(anchor);
    window.scrollTo({ top: item.offsetTop, behavior: 'smooth' });
  };

  return (
    <span ref={anchorRef} className={`pointer ${className}`} onClick={scrollToNext} >{text}</span>
  )
}

export default Anchor;
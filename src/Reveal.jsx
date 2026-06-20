import React, { useEffect, useRef, useState, forwardRef } from 'react';

// Wraps a section so it fades + rises into place the first time it
// crosses into the viewport. Cheap, no dependency, respects
// prefers-reduced-motion via the CSS side (animation gets neutralized there).
const Reveal = forwardRef(function Reveal({ children, className = '', as = 'div', delay = 0 }, forwardedRef) {
  const innerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const Tag = as;

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={innerRef}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
});

export default Reveal;

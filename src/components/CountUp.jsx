import { useEffect, useRef, useState } from 'react';

const CountUp = ({ target, duration = 2000, className = '' }) => {
  const counterRef = useRef(null); // Reference to the DOM element
  const [hasAnimated, setHasAnimated] = useState(false); // Track if count-up has started

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    // Create an IntersectionObserver to watch when the element is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only start animation if 40% is visible and it hasn't animated yet
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4 && !hasAnimated) {
          animateCount();
          setHasAnimated(true); // prevent repeat
          observer.disconnect(); // stop observing once animation starts
        }
      },
      {
        threshold: [0, 0.4, 1], // Trigger callback at 0%, 40%, and 100% visibility
      }
    );

    observer.observe(el); // Start observing the element

    return () => observer.disconnect(); // Clean up observer when component unmounts
  }, [target, duration, hasAnimated]);

  // Function to animate the count-up
  const animateCount = () => {
    const el = counterRef.current;
    const frameRate = 60; // 60 frames per second
    const totalFrames = Math.round(duration / (1000 / frameRate)); // total frames over duration
    let current = 0;
    const increment = target / totalFrames;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        el.textContent = Math.round(current);
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target; // ensure exact target value
      }
    };

    requestAnimationFrame(updateCount); // Start the animation
  };

  return (
    <div ref={counterRef} className={className}>
      0
    </div>
  );
};

export default CountUp;
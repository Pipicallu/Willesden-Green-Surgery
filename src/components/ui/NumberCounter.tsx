import { useEffect, useRef, useState } from "react";

export interface NumberCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
  reverse?: boolean;
}

export default function NumberCounter({
  target,
  duration = 2000,
  suffix = "",
  className = "",
  reverse = false,
}: NumberCounterProps) {
  const [count, setCount] = useState(reverse ? 100 : 0); // Start at 100 if reverse, else 0
  const [hasAnimated, setHasAnimated] = useState(false); // Prevents re-animation
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);

          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            if (reverse) {
              setCount(Math.floor(100 - progress * (100 - target)));
            } else {
              setCount(Math.floor(progress * target));
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [target, duration, hasAnimated, reverse]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}

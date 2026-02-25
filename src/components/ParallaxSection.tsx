import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // Positive = slower, Negative = faster
  className?: string;
}

export default function ParallaxSection({ children, speed = 0.2, className = '' }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

// Floating parallax element for decorative backgrounds
export function ParallaxFloat({ 
  children, 
  speed = 0.5, 
  className = '' 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={ref} 
      style={{ y, opacity }} 
      className={`absolute pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
}

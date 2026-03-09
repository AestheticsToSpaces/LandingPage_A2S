import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

import Scene3D from './Scene3D';
import { useEffect, useRef, useState } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };

    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>;
}

function CountdownTimer() {
  const targetDate = new Date('2026-03-29T12:00:00+05:30').getTime();
  
  // Initialize with calculated values to prevent CLS flash
  const getTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };
  
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/20 rounded-xl px-3 py-2 min-w-[52px]">
        <span className="font-display text-xl md:text-2xl font-bold text-primary">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="font-body text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1 }}
      className="mt-8"
    >
      <div className="inline-flex items-center gap-2 mb-3">
        <Clock size={14} className="text-copper" />
        <span className="font-body text-xs text-muted-foreground">Launching in</span>
      </div>
      <div className="flex items-center justify-center gap-2 md:gap-3">
        <TimeUnit value={timeLeft.days} label="Days" />
        <span className="font-display text-xl text-muted-foreground/50 mt-[-16px]">:</span>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <span className="font-display text-xl text-muted-foreground/50 mt-[-16px]">:</span>
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <span className="font-display text-xl text-muted-foreground/50 mt-[-16px]">:</span>
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
      <p className="font-body text-[11px] text-muted-foreground/70 mt-3">March 29, 2026 · 12:00 PM IST</p>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ minHeight: '100vh' }}>
      <Scene3D />

      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-[1]" />

      <div className="relative z-10 container mx-auto px-6 text-center pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-border bg-card/80 backdrop-blur-sm mb-6 md:mb-8 shadow-sm"
        >
          <Sparkles size={14} className="text-copper" />
          <span className="text-[10px] md:text-xs font-body text-muted-foreground tracking-wide">
            Launching March 29, 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.5 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.3
            }
          }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-gradient-hero">Design Your</span>
          <br />
          <span className="text-gradient-teal">Perfect Space</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          India's first AI-powered design infrastructure. Room-specific catalogs,
          cross-platform price intelligence, and an AI assistant that builds your
          dream room from a single prompt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#waitlist"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-base hover:bg-teal-light transition-all duration-300 bg-glow-teal"
          >
            Join the Waitlist
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#demo"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-display font-medium text-base hover:bg-muted transition-all duration-300"
          >
            See Product Demo
          </a>
        </motion.div>

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Only provable/verifiable facts from their exec summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          <div className="text-center">
            <div className="font-display text-xl md:text-2xl font-bold text-gradient-copper">
              <AnimatedCounter target={28000} suffix="+" />
            </div>
            <div className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">
              Products at Launch
            </div>
          </div>
          <div className="text-center">
            <div className="font-display text-xl md:text-2xl font-bold text-gradient-copper">
              AI-Powered
            </div>
            <div className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">
              Design Assistant
            </div>
          </div>
          <div className="text-center">
            <div className="font-display text-xl md:text-2xl font-bold text-gradient-copper">
              Cross-Platform
            </div>
            <div className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">
              Price Intelligence
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

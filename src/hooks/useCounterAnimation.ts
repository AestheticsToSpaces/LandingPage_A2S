import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export function useCounterAnimation(target: number, duration = 2000, suffix = '') {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let startTime: number | null = null;
        const start = 0;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(start + (target - start) * eased));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
        };

        requestAnimationFrame(step);
    }, [inView, target, duration]);

    return { ref, display: `${count.toLocaleString('en-IN')}${suffix}` };
}

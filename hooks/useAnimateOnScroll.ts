
import { useState, useEffect } from 'react';

interface AnimateOnScrollOptions {
    threshold?: number;
    triggerOnce?: boolean;
}

export const useAnimateOnScroll = (passedOptions: AnimateOnScrollOptions = {}) => {
    const options = { threshold: 0.1, triggerOnce: true, ...passedOptions };
    const [ref, setRef] = useState<Element | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (options.triggerOnce) {
                    observer.unobserve(entry.target);
                }
            }
        }, { threshold: options.threshold });

        observer.observe(ref);
        return () => {
            if (ref) observer.unobserve(ref);
        };
    }, [ref, options.threshold, options.triggerOnce]);

    return [setRef, isVisible] as const;
};

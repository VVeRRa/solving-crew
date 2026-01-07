'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    fullWidth?: boolean;
}

export function FadeIn({
    children,
    className = "",
    delay = 0,
    direction = 'up',
    fullWidth = false
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.7,
                ease: [0.21, 0.47, 0.32, 0.98], // graceful ease-out
                delay: delay
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={fullWidth ? `w-full ${className}` : className}
        >
            {children}
        </motion.div>
    );
}

export function FadeInStagger({
    children,
    className = "",
    faster = false
}: {
    children: React.ReactNode;
    className?: string;
    faster?: boolean;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ staggerChildren: faster ? 0.08 : 0.15 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeInItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const variants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div variants={variants} className={className}>
            {children}
        </motion.div>
    );
}

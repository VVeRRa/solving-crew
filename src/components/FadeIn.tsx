'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    fullWidth?: boolean;
    viewportMargin?: string;
    amount?: number | "some" | "all";
}

export function FadeIn({
    children,
    className = "",
    delay = 0,
    direction = 'up',
    fullWidth = false,
    viewportMargin = "-10%",
    amount = "some"
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: viewportMargin as any, amount });

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
            x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.9,
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
            style={{ willChange: "transform, opacity, filter" }}
        >
            {children}
        </motion.div>
    );
}

export function FadeInStagger({
    children,
    className = "",
    faster = false,
    viewportMargin = "-10%",
    amount = "some"
}: {
    children: React.ReactNode;
    className?: string;
    faster?: boolean;
    viewportMargin?: string;
    amount?: number | "some" | "all";
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: viewportMargin as any, amount });

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
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <motion.div variants={variants} className={className}>
            {children}
        </motion.div>
    );
}

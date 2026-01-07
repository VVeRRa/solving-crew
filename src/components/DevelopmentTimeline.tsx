'use client';

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';

interface TimelineItem {
    id: string;
    title: string;
    text: string;
}

interface DevelopmentTimelineProps {
    items: TimelineItem[];
    title?: string;
    stepLabel?: string;
}

export function DevelopmentTimeline({ items, title, stepLabel = "Step" }: DevelopmentTimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    // Scroll progress for the line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Calculate active step based on scroll position more precisely
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const cards = containerRef.current.querySelectorAll('.timeline-card-trigger');
            const triggerPoint = window.innerHeight * 0.6;

            let found = -1;
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                if (rect.top < triggerPoint) {
                    found = index;
                }
            });

            if (found !== -1 && found !== activeStep) {
                setActiveStep(found + 1);
            } else if (found === -1 && activeStep !== 0) {
                setActiveStep(0);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeStep]);

    return (
        <div ref={containerRef} className="relative py-12 px-4 md:px-10 overflow-hidden">

            {/* Amber Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
                <div className="w-[80%] h-[80%] opacity-50 dark:opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.5)_0%,transparent_70%)] blur-3xl" />
            </div>

            {title && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 mb-12 text-center"
                >
                    <h2 className="brand-font text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">
                        {title}
                    </h2>
                </motion.div>
            )}

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Central Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-neutral-800 transform md:-translate-x-1/2">
                    {/* Animated Fill Line */}
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-blue-600 dark:bg-blue-500 origin-top"
                        style={{ height: useTransform(smoothProgress, [0.1, 0.9], ["0%", "100%"]) }}
                    />
                </div>

                <div className="space-y-8 md:space-y-12">
                    {items.map((item, index) => {
                        return (
                            <TimelineCard
                                key={item.id}
                                item={item}
                                index={index}
                                isActive={index < activeStep}
                                isNext={index === activeStep - 1}
                                stepLabel={stepLabel}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function TimelineCard({ item, index, isActive, isNext, stepLabel }: { item: TimelineItem, index: number, isActive: boolean, isNext: boolean, stepLabel: string }) {
    const isEven = index % 2 === 0;

    return (
        <div className={cn(
            "timeline-card-trigger relative flex items-center md:justify-between group",
            isEven ? "md:flex-row" : "md:flex-row-reverse"
        )}>
            {/* Node */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ margin: "-100px" }}
                className="absolute left-6 md:left-1/2 w-4 h-4 -ml-[7px] md:-ml-2 rounded-full border-2 border-white dark:border-neutral-900 bg-slate-200 dark:bg-neutral-800 z-10 transition-colors duration-500"
                style={{
                    borderColor: isActive || isNext ? 'currentColor' : undefined, // Handeled by class
                }}
            >
                <div className={cn(
                    "w-full h-full rounded-full transition-colors duration-500",
                    isActive || isNext ? "bg-blue-600 dark:bg-blue-500" : "bg-transparent"
                )} />
            </motion.div>

            {/* Spacer */}
            <div className="hidden md:block w-1/2" />

            {/* Card Content */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="ml-16 md:ml-0 md:w-[42%] relative"
            >
                <Card variant="glass" className="p-8 h-full hover:shadow-lg transition-all border-slate-200/60 dark:border-neutral-800/60">
                    <div className="flex items-start justify-between mb-4">
                        <span className={cn(
                            "text-4xl font-bold font-mono transition-colors",
                            isActive || isNext ? "text-blue-600 dark:text-blue-500" : "text-slate-300 dark:text-neutral-700"
                        )}>
                            0{index + 1}
                        </span>
                        <Badge variant="outline" className="border-slate-200 dark:border-neutral-700 text-slate-500 dark:text-neutral-400 bg-white/50 dark:bg-neutral-900/50">
                            {stepLabel} 0{index + 1}
                        </Badge>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                        {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-neutral-400 leading-relaxed text-lg">
                        {item.text}
                    </p>
                </Card>
            </motion.div>
        </div>
    );
}

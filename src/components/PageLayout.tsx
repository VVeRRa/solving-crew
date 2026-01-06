
export default function PageLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            {/* top hero glow */}
            <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[440px] bg-gradient-to-b from-cyan-100 via-amber-50 to-transparent dark:from-cyan-950/25 dark:via-amber-950/10" />
            {/* subtle bottom glow */}
            <div className="pointer-events-none absolute inset-x-0 -bottom-0 -z-10 h-[420px] bg-gradient-to-t from-blue-100/50 via-transparent to-transparent dark:from-blue-950/25" />

            {children}
        </div>
    );
}

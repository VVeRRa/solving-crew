import {cn} from '@/lib/cn';
import {Badge} from '@/components/ui/badge';

export default function SectionHeader({
  title,
  lead,
  className
}: {
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <header className={cn('space-y-3', className)}>
      
      <h1 className="brand-font text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>

      {lead ? (
        <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl">{lead}</p>
      ) : null}
    </header>
  );
}

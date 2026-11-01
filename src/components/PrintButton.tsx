"use client";

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export default function PrintButton({
  label = "Nyomtatás / Mentés PDF-ként",
  className = "",
}: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.print();
        }
      }}
      data-no-print="true"
      className={`inline-flex items-center gap-2 rounded-full border border-forest-900/20 bg-white/80 px-4 py-2 text-xs font-medium text-forest-900 shadow-sm transition hover:bg-forest-900/5 hover:border-forest-900/40 dark:border-sand-50/20 dark:bg-forest-800/80 dark:text-sand-50 dark:hover:bg-forest-800 ${className}`}
      aria-label={label}
    >
      <span aria-hidden="true">🖨️</span>
      <span>{label}</span>
    </button>
  );
}

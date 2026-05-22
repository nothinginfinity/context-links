"use client";

// components/CopyButton.tsx

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = "Copy link" }: CopyButtonProps) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="text-xs text-gray-500 hover:text-gray-800 border border-gray-200 rounded px-2 py-1 transition-colors"
    >
      {label}
    </button>
  );
}

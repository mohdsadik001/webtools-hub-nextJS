import { useState } from 'react';

export default function useClipboard(timeout = 1500) {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch {
      setCopied(false);
    }
  };

  return { copied, copy };
}

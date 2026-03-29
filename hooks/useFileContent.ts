'use client';

import { useState, useEffect } from 'react';
import { fetchFileContent } from '@/lib/github';

interface UseFileContentReturn {
  content: string | null;
  loading: boolean;
  error: Error | null;
}

export function useFileContent(rawUrl: string | null): UseFileContentReturn {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!rawUrl) {
      setContent(null);
      setError(null);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        setContent(null);

        const fileContent = await fetchFileContent(rawUrl);
        setContent(fileContent);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch content')
        );
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [rawUrl]);

  return { content, loading, error };
}

import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
}

export const useSeo = ({ title, description }: SeoOptions) => {
  useEffect(() => {
    document.title = title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description);
    }
  }, [title, description]);
};

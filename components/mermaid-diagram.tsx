'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            // Use a light primary so the default text (dark) stays readable everywhere
            primaryColor: '#f5f0e8',
            primaryTextColor: '#1c1917',
            primaryBorderColor: '#b8860b',
            lineColor: '#b8860b',
            secondaryColor: '#e8e0d5',
            tertiaryColor: '#faf8f4',
            tertiaryTextColor: '#1c1917',
            background: '#ffffff',
            mainBkg: '#f5f0e8',
            nodeBorder: '#b8860b',
            clusterBkg: '#faf8f4',
            clusterBorder: '#d4c9b8',
            titleColor: '#1c1917',
            edgeLabelBackground: '#fff8ed',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontSize: '13px',
            labelTextColor: '#1c1917',
          },
        });

        if (!ref.current || cancelled) return;

        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          // Make SVG responsive
          const svgEl = ref.current.querySelector('svg');
          if (svgEl) {
            svgEl.removeAttribute('height');
            svgEl.style.width = '100%';
            svgEl.style.maxWidth = '100%';
          }
        }
      } catch (err) {
        if (!cancelled) setError(String(err));
      }
    }

    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) {
    return (
      <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg border border-red-200">
        Failed to render diagram: {error}
      </div>
    );
  }

  return <div ref={ref} className="w-full" />;
}

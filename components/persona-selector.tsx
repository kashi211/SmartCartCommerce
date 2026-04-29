'use client';

import { cn } from '@/lib/utils';
import type { Persona } from '@/lib/types';

const PERSONAS: Array<{
  id: Persona;
  label: string;
  description: string;
  icon: string;
}> = [
  {
    id: 'customer',
    label: 'Customer',
    description: 'Shopping support & policies',
    icon: '◈',
  },
  {
    id: 'concierge',
    label: 'Concierge',
    description: 'Internal team playbooks',
    icon: '◉',
  },
  {
    id: 'brand-partner',
    label: 'Brand Partner',
    description: 'Seller operations & admin',
    icon: '◇',
  },
];

interface PersonaSelectorProps {
  value: Persona;
  onChange: (p: Persona) => void;
}

export function PersonaSelector({ value, onChange }: PersonaSelectorProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-stone-400 uppercase tracking-widest px-1 mb-2">
        View as
      </p>
      {PERSONAS.map((p) => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={cn(
            'w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 group',
            value === p.id
              ? 'bg-brand-gold/20 border border-brand-gold/40'
              : 'border border-transparent hover:bg-white/8'
          )}
        >
          <div className="flex items-start gap-2.5">
            <span
              className={cn(
                'text-base mt-0.5 flex-shrink-0',
                value === p.id ? 'text-brand-gold' : 'text-stone-500'
              )}
            >
              {p.icon}
            </span>
            <div>
              <p
                className={cn(
                  'text-sm font-medium',
                  value === p.id ? 'text-white' : 'text-stone-300'
                )}
              >
                {p.label}
              </p>
              <p className="text-xs text-stone-500 mt-0.5">{p.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

import React from 'react';
import { cn } from '@/lib/cn';

interface ManchesterLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { icon: 32, text: 'text-sm' },
  md: { icon: 40, text: 'text-base' },
  lg: { icon: 48, text: 'text-lg' },
};

export const ManchesterLogo: React.FC<ManchesterLogoProps> = ({
  size = 'md',
  showText = true,
  className,
}) => {
  const { icon, text } = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Manchester Technologies"
        role="img"
      >
        <rect width="40" height="40" rx="10" fill="#050505" />
        <rect
          x="0.5"
          y="0.5"
          width="39"
          height="39"
          rx="9.5"
          stroke="#F5B800"
          strokeOpacity="0.4"
        />
        <path
          d="M10 28V12L20 7L30 12V28L20 33L10 28Z"
          stroke="#F5B800"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
        <path d="M20 7V33" stroke="#F5B800" strokeWidth="1.5" strokeOpacity="0.5" />
        <path d="M10 12L20 17L30 12" stroke="#F5B800" strokeWidth="1.5" strokeOpacity="0.5" />
        <circle cx="20" cy="17" r="3" fill="#FFD54A" />
      </svg>

      {showText && (
        <div className="min-w-0">
          <p className={cn('font-bold text-mt-text leading-tight tracking-tight', text)}>
            Manchester
          </p>
          <p className="text-[10px] font-medium text-mt-gold tracking-wide uppercase">
            Technologies
          </p>
        </div>
      )}
    </div>
  );
};

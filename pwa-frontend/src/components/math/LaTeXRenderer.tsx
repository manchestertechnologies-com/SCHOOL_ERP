'use client';

import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface LaTeXRendererProps {
  content: string;
  block?: boolean;
  className?: string;
}

/**
 * Normalizes double-escaped backslashes and cleans up raw LaTeX string.
 */
function cleanLaTeX(input: string): string {
  if (!input) return '';
  let str = input;

  // Handle double backslashes in JS string literals (e.g. \\frac -> \frac)
  str = str.replace(/\\\\([a-zA-Z0-9_\{\}\(\)\[\]\|<>\+\-\*\/=,.:;\\ \^\$])/g, '\\$1');
  
  // Replace multiple backslashes (\\\\frac -> \frac)
  str = str.replace(/\\{2,}/g, '\\');

  return str.trim();
}

/**
 * Strips $ and $$ delimiters from the start and end of a math string.
 */
function stripMathDelimiters(input: string): string {
  let str = input.trim();
  if (str.startsWith('$$') && str.endsWith('$$') && str.length >= 4) {
    str = str.slice(2, -2).trim();
  } else if (str.startsWith('$') && str.endsWith('$') && str.length >= 2) {
    str = str.slice(1, -1).trim();
  }
  return cleanLaTeX(str);
}

/**
 * Safe InlineMath wrapper that catches rendering errors gracefully without throwing.
 */
const SafeInlineMath: React.FC<{ math: string }> = ({ math }) => {
  const cleaned = cleanLaTeX(math);
  if (!cleaned) return null;
  try {
    return <InlineMath math={cleaned} />;
  } catch (e) {
    return <span className="text-mt-gold-bright font-mono text-xs">{cleaned}</span>;
  }
};

/**
 * Safe BlockMath wrapper that catches rendering errors gracefully without throwing.
 */
const SafeBlockMath: React.FC<{ math: string }> = ({ math }) => {
  const cleaned = cleanLaTeX(math);
  if (!cleaned) return null;
  try {
    return <BlockMath math={cleaned} />;
  } catch (e) {
    return <div className="py-2 text-center text-mt-gold-bright font-mono text-xs overflow-x-auto">{cleaned}</div>;
  }
};

/**
 * Checks if a plain string chunk looks like a raw LaTeX formula without $ delimiters
 * (e.g., "F = \frac{1}{4\pi\varepsilon_0} \frac{|q_1 q_2|}{r^2}").
 */
function isRawLaTeX(str: string): boolean {
  return /\\(frac|sqrt|vec|varepsilon|mu|pi|theta|lambda|Delta|sum|int|hat|cdot|approx|lim|times|alpha|beta|gamma|sigma|omega|phi|psi|rho|tau|infty|partial)/.test(str);
}

export const LaTeXRenderer: React.FC<LaTeXRendererProps> = ({ content, block = false, className = '' }) => {
  if (!content || typeof content !== 'string') return null;

  // 1. If explicit block flag is set, render entire content as BlockMath
  if (block) {
    const rawMath = stripMathDelimiters(content);
    return (
      <div className={`overflow-x-auto py-2 my-1 text-center font-sans text-mt-text dark:text-slate-100 ${className}`}>
        <SafeBlockMath math={rawMath} />
      </div>
    );
  }

  // 2. Check if the entire content is wrapped in $$...$$ (block equation)
  const trimmed = content.trim();
  if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length >= 4 && !trimmed.slice(2, -2).includes('$$')) {
    const math = stripMathDelimiters(trimmed);
    return (
      <div className={`overflow-x-auto py-2 my-1 text-center font-sans text-mt-text dark:text-slate-100 ${className}`}>
        <SafeBlockMath math={math} />
      </div>
    );
  }

  // 3. Parse mixed content: split by $$...$$ and $...$
  const regex = /(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g;
  const parts = content.split(regex);

  return (
    <span className={`inline-wrap text-mt-text dark:text-slate-100 ${className}`}>
      {parts.map((part, index) => {
        if (!part) return null;

        // Check for block math ($$...$$)
        if (part.startsWith('$$') && part.endsWith('$$') && part.length >= 4) {
          const math = stripMathDelimiters(part);
          return (
            <span key={index} className="block overflow-x-auto py-2 my-1 text-center">
              <SafeBlockMath math={math} />
            </span>
          );
        }

        // Check for inline math ($...$)
        if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
          const math = stripMathDelimiters(part);
          return <SafeInlineMath key={index} math={math} />;
        }

        // Check if raw text chunk contains un-delimited LaTeX formula commands
        if (isRawLaTeX(part)) {
          return <SafeInlineMath key={index} math={part} />;
        }

        // Plain text chunk
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};


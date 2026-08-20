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
 * Normalizes delimiter formats:
 * - \[...\] -> $$...$$
 * - \(...\) -> $...$
 * Also handles double-escaped backslashes.
 */
function normalizeDelimiters(input: string): string {
  if (!input) return '';
  let str = input;

  // Replace \[ ... \] with $$ ... $$
  str = str.replace(/\\\[([\s\S]+?)\\\]/g, '$$$$$1$$$$');

  // Replace \( ... \) with $ ... $
  str = str.replace(/\\\(([\s\S]+?)\\\)/g, '$$$1$$');

  return str;
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
  return /\\(frac|sqrt|vec|varepsilon|mu|pi|theta|lambda|Delta|sum|int|hat|cdot|approx|lim|times|alpha|beta|gamma|sigma|omega|phi|psi|rho|tau|infty|partial|text|quad)/.test(str);
}

/**
 * Render plain text chunk with basic Markdown support (**bold**, *italic*, `code`, \n).
 */
const FormattedTextChunk: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  // Split by newlines
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, lIdx) => {
        if (!line && lIdx < lines.length - 1) {
          return <br key={lIdx} />;
        }

        // Simple bold (**bold**) split
        const parts = line.split(/(\*\*[^\*]+\*\*|\*[^\*]+\*|`[^`]+`)/g);

        return (
          <React.Fragment key={lIdx}>
            {parts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
                return <strong key={pIdx} className="font-semibold text-mt-text">{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
                return <em key={pIdx} className="italic text-mt-text-secondary">{part.slice(1, -1)}</em>;
              }
              if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
                return <code key={pIdx} className="px-1.5 py-0.5 bg-mt-elevated text-mt-gold-bright rounded text-xs font-mono">{part.slice(1, -1)}</code>;
              }
              return <span key={pIdx}>{part}</span>;
            })}
            {lIdx < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </>
  );
};

export const LaTeXRenderer: React.FC<LaTeXRendererProps> = ({ content, block = false, className = '' }) => {
  if (!content || typeof content !== 'string') return null;

  const normalized = normalizeDelimiters(content);

  // 1. If explicit block flag is set, render entire content as BlockMath
  if (block) {
    const rawMath = stripMathDelimiters(normalized);
    return (
      <div className={`overflow-x-auto py-2 my-1 text-center font-sans text-mt-text dark:text-slate-100 ${className}`}>
        <SafeBlockMath math={rawMath} />
      </div>
    );
  }

  // 2. Check if the entire content is wrapped in $$...$$ (block equation)
  const trimmed = normalized.trim();
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
  const parts = normalized.split(regex);

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

        // Plain text chunk with markdown formatting
        return <FormattedTextChunk key={index} text={part} />;
      })}
    </span>
  );
};

// Aliases for unified mathematical rendering across the application
export const MathText = LaTeXRenderer;
export const MarkdownMathRenderer = LaTeXRenderer;
export const MathFormula = LaTeXRenderer;



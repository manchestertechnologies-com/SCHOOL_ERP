'use client';

import React, { useState } from 'react';
import { useCurriculum } from '@/lib/curriculumContext';
import { Sparkles, Send, Bot, User, HelpCircle, Lightbulb, BookOpen } from 'lucide-react';
import { LaTeXRenderer } from '@/components/math/LaTeXRenderer';

interface AITutorPanelProps {
  conceptTitle?: string;
}

export const AITutorPanel: React.FC<AITutorPanelProps> = ({ conceptTitle }) => {
  const { activeBoard, activeClass, activeSubject } = useCurriculum();
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello! I am your curriculum-aware AI Tutor for **${activeBoard.shortCode} • ${activeClass} ${activeSubject}**. How can I help you master a concept today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { sender: 'user' as const, text: textToSend }];
    setMessages(newMsgs);
    if (!queryText) setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let reply = `Here is a simplified explanation for **${activeBoard.shortCode} ${activeClass} ${activeSubject}**:\n\n`;

      if (textToSend.toLowerCase().includes('kirchhoff')) {
        reply += `**Kirchhoff's Junction Law (KCL)** states that total charge entering a node equals total charge leaving ($\sum I = 0$). This is based on **Conservation of Charge**.\n\n**Loop Law (KVL)** states that net EMF in a closed loop equals net potential drops ($\sum V = 0$), based on **Conservation of Energy**.`;
      } else if (textToSend.toLowerCase().includes('coulomb')) {
        reply += `**Coulomb's Law** states that electrostatic force between two stationary point charges $q_1, q_2$ at distance $r$ is:\n\n$$F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2}$$\n\nWhere $\\frac{1}{4\\pi\\varepsilon_0} \\approx 8.99 \\times 10^9 \\text{ N}\\cdot\\text{m}^2/\\text{C}^2$.`;
      } else {
        reply += `According to the official **${activeBoard.shortCode}** blueprint for **${activeClass} ${activeSubject}**, this concept frequently appears in 3-mark and 5-mark examination questions. Focus on core formulas and step-by-step assumptions!`;
      }

      setMessages([...newMsgs, { sender: 'ai', text: reply }]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-mt-border pb-3">
        <div className="flex items-center gap-2 text-mt-gold-bright font-semibold text-sm">
          <Sparkles className="w-4 h-4 text-mt-gold-bright" /> Board-Aware AI Tutor
        </div>
        <span className="text-[10px] bg-mt-elevated text-mt-gold-bright border border-mt-gold/20 px-2.5 py-1 rounded-full font-medium">
          {activeBoard.shortCode} • Class {activeClass}
        </span>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
        {[
          'Explain Kirchhoff laws simply',
          'Why is Gauss law useful?',
          'Give me a 5-mark derivation hint',
          'Explain Coulomb law formula',
        ].map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 bg-mt-card hover:bg-mt-elevated text-mt-text-secondary hover:text-mt-gold-bright rounded-xl border border-mt-border text-xs whitespace-nowrap min-h-touch transition-all duration-premium hover:border-mt-gold/30"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1 no-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1.5 ${
              msg.sender === 'user'
                ? 'bg-mt-elevated border-mt-gold/30 text-mt-text ml-6'
                : 'bg-mt-card border-mt-border text-mt-text-secondary mr-6'
            }`}
          >
            <div className="flex items-center gap-2 text-[10px] font-semibold text-mt-gold-bright uppercase tracking-wider">
              {msg.sender === 'user' ? (
                <User className="w-3.5 h-3.5 text-mt-gold-bright" />
              ) : (
                <Bot className="w-3.5 h-3.5 text-mt-gold" />
              )}
              <span>{msg.sender === 'user' ? 'You' : 'AI Tutor'}</span>
            </div>
            <div className="leading-relaxed">
              <LaTeXRenderer content={msg.text} />
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="p-3 bg-mt-card rounded-2xl border border-mt-border text-xs text-mt-gold-bright font-medium animate-pulse">
            AI Tutor is reflecting on the {activeBoard.shortCode} curriculum...
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 pt-2 border-t border-mt-border">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI Tutor to explain a concept or derivation..."
          className="flex-1 mt-input text-xs"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="mt-btn-primary px-4 py-2.5 text-xs disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5 text-mt-bg" />
        </button>
      </div>
    </div>
  );
};

'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Plus, Minus, Info } from 'lucide-react';

interface Charge {
  id: number;
  x: number;
  y: number;
  q: number; // charge in microcoulombs
}

export const ElectricFieldSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [charges, setCharges] = useState<Charge[]>([
    { id: 1, x: 200, y: 150, q: 5 },
    { id: 2, x: 400, y: 150, q: -5 },
  ]);
  const [selectedCharge, setSelectedCharge] = useState<number>(1);
  const [showVectors, setShowVectors] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear Canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Draw Vector Field Grid if enabled
    if (showVectors) {
      const step = 30;
      for (let x = 20; x < width; x += step) {
        for (let y = 20; y < height; y += step) {
          let Ex = 0;
          let Ey = 0;

          charges.forEach((c) => {
            const dx = x - c.x;
            const dy = y - c.y;
            const distSq = dx * dx + dy * dy;
            if (distSq > 100) {
              const dist = Math.sqrt(distSq);
              const E = (c.q * 1000) / distSq;
              Ex += E * (dx / dist);
              Ey += E * (dy / dist);
            }
          });

          const EMag = Math.sqrt(Ex * Ex + Ey * Ey);
          if (EMag > 0.01) {
            const angle = Math.atan2(Ey, Ex);
            const len = Math.min(14, EMag * 5);

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.strokeStyle = `rgba(99, 102, 241, ${Math.min(0.8, EMag * 0.4)})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(len, 0);
            // Arrowhead
            ctx.lineTo(len - 4, -3);
            ctx.moveTo(len, 0);
            ctx.lineTo(len - 4, 3);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }

    // Draw Charges
    charges.forEach((c) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, 18, 0, 2 * Math.PI);
      ctx.fillStyle = c.q > 0 ? '#ef4444' : '#3b82f6';
      ctx.fill();
      ctx.lineWidth = selectedCharge === c.id ? 4 : 2;
      ctx.strokeStyle = selectedCharge === c.id ? '#fbbf24' : '#ffffff';
      ctx.stroke();

      // Sign
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(c.q > 0 ? `+${c.q}` : `${c.q}`, c.x, c.y);
    });
  }, [charges, selectedCharge, showVectors]);

  const handleCanvasTouch = (e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    // Check if clicked near charge to select/move
    const clicked = charges.find((c) => Math.hypot(c.x - x, c.y - y) < 30);
    if (clicked) {
      setSelectedCharge(clicked.id);
    } else {
      // Move selected charge to tapped spot
      setCharges((prev) =>
        prev.map((c) => (c.id === selectedCharge ? { ...c, x: Math.round(x), y: Math.round(y) } : c))
      );
    }
  };

  const updateSelectedChargeMagnitude = (delta: number) => {
    setCharges((prev) =>
      prev.map((c) => (c.id === selectedCharge ? { ...c, q: Math.min(20, Math.max(-20, c.q + delta)) } : c))
    );
  };

  const resetSimulation = () => {
    setCharges([
      { id: 1, x: 200, y: 150, q: 5 },
      { id: 2, x: 400, y: 150, q: -5 },
    ]);
    setSelectedCharge(1);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            Interactive Electric Field Visualizer
          </h3>
          <p className="text-xs text-slate-400">Tap anywhere on the grid to move the selected point charge</p>
        </div>
        <button
          onClick={resetSimulation}
          className="p-2 min-h-touch min-w-touch text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center transition-colors"
          title="Reset Simulation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          onClick={handleCanvasTouch}
          onTouchStart={handleCanvasTouch}
          className="w-full max-w-[600px] h-[260px] touch-none cursor-pointer"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-slate-850 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300 font-medium">Selected Charge ({selectedCharge}):</span>
          <button
            onClick={() => updateSelectedChargeMagnitude(-1)}
            className="p-2 min-h-touch min-w-touch bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-bold flex items-center justify-center"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 text-sm font-bold text-amber-400">
            {charges.find((c) => c.id === selectedCharge)?.q ?? 0} µC
          </span>
          <button
            onClick={() => updateSelectedChargeMagnitude(1)}
            className="p-2 min-h-touch min-w-touch bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-bold flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer min-h-touch">
            <input
              type="checkbox"
              checked={showVectors}
              onChange={(e) => setShowVectors(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 accent-indigo-500"
            />
            Show Field Vectors
          </label>
        </div>
      </div>
    </div>
  );
};

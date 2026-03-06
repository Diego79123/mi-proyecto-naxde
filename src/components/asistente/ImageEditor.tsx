'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Line } from 'react-konva';
import useImage from 'use-image';
import { X, Check, Undo, Eraser, Paintbrush, Minus, Plus } from 'lucide-react';

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  onClose: () => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ imageUrl, onSave, onClose }) => {
  const [image] = useImage(imageUrl);
  const [lines, setLines] = useState<any[]>([]);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [brushSize, setBrushSize] = useState(20);
  const stageRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (image) {
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.7;
      let width = image.width;
      let height = image.height;

      const ratio = Math.min(maxWidth / width, maxHeight / height);
      setDimensions({
        width: width * ratio,
        height: height * ratio
      });
    }
  }, [image]);

  const handleMouseDown = (e: any) => {
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y], strokeWidth: brushSize }]);
  };

  const handleMouseMove = (e: any) => {
    if (e.evt.buttons !== 1) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    if (!lastLine) return;
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines]);
  };

  const handleUndo = () => {
    setLines(lines.slice(0, -1));
  };

  const handleSave = () => {
    if (stageRef.current) {
      const dataUrl = stageRef.current.toDataURL();
      onSave(dataUrl);
    }
  };

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-w-full max-h-full border border-zinc-800">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-4">
            <h3 className="text-white font-medium">Editor de Imagen</h3>
            <div className="flex items-center bg-zinc-800 rounded-lg p-1">
              <button
                onClick={() => setTool('pen')}
                className={`p-2 rounded-md transition-colors ${tool === 'pen' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                <Paintbrush className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTool('eraser')}
                className={`p-2 rounded-md transition-colors ${tool === 'eraser' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                <Eraser className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-1">
              <button onClick={() => setBrushSize(Math.max(5, brushSize - 5))} className="text-zinc-400 hover:text-white"><Minus className="w-3 h-3" /></button>
              <span className="text-xs text-white w-6 text-center">{brushSize}</span>
              <button onClick={() => setBrushSize(Math.min(100, brushSize + 5))} className="text-zinc-400 hover:text-white"><Plus className="w-3 h-3" /></button>
            </div>
            <button onClick={handleUndo} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"><Undo className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            <button onClick={handleSave} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Check className="w-4 h-4" /> Aplicar
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-zinc-950 flex items-center justify-center p-8">
          <div className="shadow-2xl border border-zinc-800 bg-white">
            <Stage
              width={dimensions.width}
              height={dimensions.height}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              ref={stageRef}
            >
              <Layer>
                <KonvaImage image={image} width={dimensions.width} height={dimensions.height} />
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.tool === 'eraser' ? '#000' : '#4f46e5'}
                    strokeWidth={line.strokeWidth}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                    opacity={line.tool === 'eraser' ? 1 : 0.6}
                  />
                ))}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
};

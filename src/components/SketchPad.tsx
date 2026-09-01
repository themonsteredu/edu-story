import { useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
  onChange: (dataUrl: string) => void;
};

export default function SketchPad({ value, onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#fffdf7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (value) {
      const image = new Image();
      image.onload = () => ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      image.src = value;
    }
  }, []);

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    canvas.setPointerCapture(event.pointerId);
    const ctx = canvas.getContext('2d')!;
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.strokeStyle = '#243c43';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setDrawing(true);
  };

  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const ctx = canvasRef.current!.getContext('2d')!;
    const p = point(event);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };

  const stop = () => {
    if (!drawing) return;
    setDrawing(false);
    const dataUrl = canvasRef.current!.toDataURL('image/jpeg', 0.72);
    onChange(dataUrl);
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#fffdf7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    onChange('');
  };

  return (
    <div className="sketch-pad">
      <div className="sketch-toolbar">
        <strong>내가 떠올린 장면을 간단히 그려 보세요.</strong>
        <button type="button" className="text-button" onClick={clear}>지우기</button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={420}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={stop}
        onPointerCancel={stop}
        aria-label="내가 상상한 장면을 그리는 칸"
      />
    </div>
  );
}

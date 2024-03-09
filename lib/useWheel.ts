import React from "react";

export const useWheel = (
  items: number[],
  wheel: React.RefObject<HTMLCanvasElement>,
) => {
  const { length } = items;
  const ctx = wheel.current?.getContext("2d")!;
  const dia = ctx.canvas.width;
  const radius = dia / 2;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / length;

  const drawSector = (sector: any, i: any) => {
    const ang = arc * i;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = i % 2 === 0 ? "#fff" : "#1e3a8a";
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, ang, ang + arc);
    ctx.lineTo(radius, radius);
    ctx.fill();
    ctx.translate(radius, radius);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = i % 2 === 0 ? "#dc2626" : "#fff";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText(sector.label, radius - 60, 10);
    //
    ctx.restore();
  };

  items.forEach((item, index) => drawSector({ label: item }, index));
};

import React from 'react';

interface SparklineProps {
  data: number[];
  isPositive: boolean;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  isPositive,
  width = 80,
  height = 24,
  className = '',
  fill = false,
}) => {
  if (!data || data.length < 2) {
    return null;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // normalize to viewBox width (100) and height (30)
  const vbWidth = 100;
  const vbHeight = 30;
  const padding = 3;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * vbWidth;
    // inverse y: high price is lower y in svg
    // in raw data, smaller values were closer to bottom or top depending on representation
    // Let's ensure if isPositive = true, trend finishes higher on right
    const norm = (val - min) / range;
    const y = vbHeight - padding - norm * (vbHeight - 2 * padding);
    return { x, y };
  });

  // Build smooth bezier path
  let pathD = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const mx = (p0.x + p1.x) / 2;
    pathD += ` Q ${p0.x.toFixed(1)} ${p0.y.toFixed(1)}, ${mx.toFixed(1)} ${((p0.y + p1.y) / 2).toFixed(1)} T ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }

  const strokeColor = isPositive ? '#089981' : '#F23645';
  const fillColor = isPositive ? 'rgba(8, 153, 129, 0.08)' : 'rgba(242, 54, 69, 0.08)';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      className={`inline-block overflow-visible ${className}`}
    >
      {fill && (
        <path
          d={`${pathD} L ${vbWidth} ${vbHeight} L 0 ${vbHeight} Z`}
          fill={fillColor}
        />
      )}
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

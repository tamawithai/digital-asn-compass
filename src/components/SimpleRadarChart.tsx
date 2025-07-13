import React from "react";

interface RadarChartProps {
  data: Array<{
    area: string;
    score: number;
    fullMark: number;
  }>;
}

export const SimpleRadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const levels = 5;

  // Calculate points for each data item
  const points = data.map((item, index) => {
    const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
    const value = (item.score / item.fullMark) * radius;
    return {
      x: center + Math.cos(angle) * value,
      y: center + Math.sin(angle) * value,
      labelX: center + Math.cos(angle) * (radius + 20),
      labelY: center + Math.sin(angle) * (radius + 20),
      area: item.area,
      score: item.score
    };
  });

  // Create path string for the filled area
  const pathString = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ') + ' Z';

  return (
    <div className="flex justify-center">
      <svg width={size + 100} height={size + 100} className="text-sm">
        <g>
          {/* Grid circles */}
          {Array.from({ length: levels }, (_, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={(radius * (i + 1)) / levels}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.3}
            />
          ))}
          
          {/* Grid lines */}
          {data.map((_, index) => {
            const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
            const endX = center + Math.cos(angle) * radius;
            const endY = center + Math.sin(angle) * radius;
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity={0.3}
              />
            );
          })}
          
          {/* Data area */}
          <path
            d={pathString}
            fill="hsl(var(--primary))"
            fillOpacity="0.2"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="hsl(var(--primary))"
            />
          ))}
          
          {/* Labels */}
          {points.map((point, index) => (
            <g key={index}>
              <text
                x={point.labelX}
                y={point.labelY - 5}
                textAnchor="middle"
                className="text-xs font-medium fill-foreground"
              >
                {point.area}
              </text>
              <text
                x={point.labelX}
                y={point.labelY + 10}
                textAnchor="middle"
                className="text-xs fill-muted-foreground"
              >
                {point.score}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};
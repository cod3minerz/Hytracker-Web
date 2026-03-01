"use client";

import * as React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface SparklineChartProps {
  data: { hour: number; online: number }[];
  className?: string;
  /** Цвет линии/заливки, по умолчанию --vote */
  color?: string;
}

export function SparklineChart({
  data,
  className = "",
  color = "var(--vote)",
}: SparklineChartProps) {
  const id = React.useId().replace(/:/g, "");

  return (
    <div className={className} style={{ minHeight: 32 }}>
      <ResponsiveContainer width="100%" height={32}>
        <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`sparkline-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
        <Area
          type="monotone"
          dataKey="online"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#sparkline-${id})`}
          isAnimationActive={true}
          animationDuration={800}
          baseValue={0}
        />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}

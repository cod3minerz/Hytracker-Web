"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";

const chartConfig = {
  online: {
    label: "Онлайн",
    color: "var(--vote)",
  },
  hour: {
    label: "Час",
  },
} satisfies ChartConfig;

const formatHour = (n: number) => {
  if (n === 0) return "00:00";
  if (n === 12) return "12:00";
  if (n === 23) return "23:00";
  return `${String(n).padStart(2, "0")}:00`;
};

interface OnlineChartProps {
  data: { hour: number; online: number }[];
  className?: string;
}

export function OnlineChart({ data, className }: OnlineChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    hourLabel: formatHour(d.hour),
  }));

  return (
    <ChartContainer config={chartConfig} className={className}>
      <AreaChart
        data={chartData}
        margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
      >
        <defs>
          <linearGradient id="fillOnline" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--vote)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--vote)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
        <XAxis
          dataKey="hour"
          tickFormatter={formatHour}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          dataKey="online"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          allowDecimals={false}
          width={28}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) => [`${value} игроков`, "Онлайн"]}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.hourLabel ?? ""
              }
            />
          }
        />
        <Area
          type="monotone"
          dataKey="online"
          stroke="var(--vote)"
          strokeWidth={2}
          fill="url(#fillOnline)"
        />
      </AreaChart>
    </ChartContainer>
  );
}

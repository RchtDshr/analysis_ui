import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartData } from "@/data/mockData";

interface ChannelChartProps {
  data: ChartData[];
}

export function ChannelChart({ data }: ChannelChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          Channel Performance
        </CardTitle>
        <CardDescription className="text-sm">
          Revenue by marketing channel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300} className="sm:h-[350px]">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="text-xs sm:text-sm"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              className="text-xs sm:text-sm"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "transparent" }} // removes hover highlight bar
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md max-w-xs">
                      <div className="grid grid-cols-1 gap-2">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {label}
                        </span>
                        <span className="font-bold text-xs sm:text-sm dark:text-white">
                          Revenue: ${payload[0]?.value?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="value"
              fill="#007AFF"
              radius={[8, 8, 0, 0]}
              activeBar={false} // <-- disables white glow behind hovered bar
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

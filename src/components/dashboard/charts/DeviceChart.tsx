import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartData } from "@/data/mockData";

interface DeviceChartProps {
  data: ChartData[];
}

const COLORS = ["#007AFF", "#34C759", "#FF9500"];

export function DeviceChart({ data }: DeviceChartProps) {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Device Usage</CardTitle>
        <CardDescription className="text-sm">
          Traffic distribution by device type
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <ResponsiveContainer width="100%" height={300} className="sm:h-[350px]">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              // labelLine={false}
              // label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md max-w-xs">
                      <div className="grid grid-cols-1 gap-2">
                        <span
                          className="font-bold text-xs sm:text-sm"
                          style={{ color: payload[0]?.color }}
                        >
                          {payload[0]?.name}: {payload[0]?.value}%
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ paddingTop: "20px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

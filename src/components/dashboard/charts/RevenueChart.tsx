import {
  LineChart,
  Line,
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

interface RevenueChartProps {
  data: ChartData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Revenue Trend</CardTitle>
        <CardDescription className="text-sm">
          Monthly revenue and user acquisition
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300} className="sm:h-[350px]">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="text-xs sm:text-sm"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              className="text-xs sm:text-sm"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md max-w-xs">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {label}
                          </span>
                          {payload.map((entry, index) => (
                            <span
                              key={index}
                              className="font-bold text-xs sm:text-sm"
                              style={{ color: entry.color }}
                            >
                              {entry.name}:{" "}
                              {entry.name === "revenue" ? "$" : ""}
                              {entry.value?.toLocaleString()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              strokeWidth={3}
              stroke="#007AFF"
              fill="#007AFF"
              name="Revenue"
              dot={{ fill: "#007AFF", strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="users"
              strokeWidth={3}
              stroke="#34C759"
              fill="#34C759"
              name="Users"
              dot={{ fill: "#34C759", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

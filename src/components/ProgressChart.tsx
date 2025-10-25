import { Card } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", words: 12, time: 25 },
  { day: "Tue", words: 18, time: 35 },
  { day: "Wed", words: 8, time: 20 },
  { day: "Thu", words: 25, time: 45 },
  { day: "Fri", words: 32, time: 55 },
  { day: "Sat", words: 28, time: 48 },
  { day: "Sun", words: 35, time: 60 },
];

export const ProgressChart = () => {
  return (
    <Card className="p-4 border-none shadow-lg">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground mb-1">Weekly Progress</h2>
        <p className="text-xs text-muted-foreground">Your learning journey</p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
          <p className="text-[10px] text-muted-foreground mb-0.5">Words</p>
          <p className="text-lg font-bold text-foreground">158</p>
          <p className="text-[9px] text-accent">+35 week</p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5">
          <p className="text-[10px] text-muted-foreground mb-0.5">Time</p>
          <p className="text-lg font-bold text-foreground">4.8h</p>
          <p className="text-[9px] text-accent">+1.2h week</p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5">
          <p className="text-[10px] text-muted-foreground mb-0.5">Streak</p>
          <p className="text-lg font-bold text-foreground">12d</p>
          <p className="text-[9px] text-accent">Keep up!</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="day" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '10px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '10px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '11px',
            }}
          />
          <Area 
            type="monotone" 
            dataKey="words" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            fill="url(#colorWords)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

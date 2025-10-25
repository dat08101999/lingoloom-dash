import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AssistantCardProps {
  title: string;
  icon: LucideIcon;
  progress: number;
  lessons: number;
  color: "primary" | "secondary" | "accent" | "purple" | "orange";
}

const colorClasses = {
  primary: "from-primary/20 to-primary/5 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.25)]",
  secondary: "from-secondary/20 to-secondary/5 hover:shadow-[0_8px_30px_hsl(var(--secondary)/0.25)]",
  accent: "from-accent/20 to-accent/5 hover:shadow-[0_8px_30px_hsl(var(--accent)/0.25)]",
  purple: "from-[hsl(282,90%,68%)]/20 to-[hsl(282,90%,68%)]/5 hover:shadow-[0_8px_30px_hsl(282,90%,68%,0.25)]",
  orange: "from-[hsl(32,95%,60%)]/20 to-[hsl(32,95%,60%)]/5 hover:shadow-[0_8px_30px_hsl(32,95%,60%,0.25)]",
};

const iconColorClasses = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  purple: "text-[hsl(282,90%,68%)]",
  orange: "text-[hsl(32,95%,60%)]",
};

export const AssistantCard = ({ title, icon: Icon, progress, lessons, color }: AssistantCardProps) => {
  return (
    <Card 
      className={`relative overflow-hidden bg-gradient-to-br ${colorClasses[color]} border-none cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-background/80 backdrop-blur-sm ${iconColorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-foreground">{progress}%</span>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{lessons} lessons completed</p>
        
        <div className="mt-4 h-2 bg-background/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

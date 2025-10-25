import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AssistantCardProps {
  name: string;
  title: string;
  description: string;
  avatar: string;
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

export const AssistantCard = ({ name, title, description, avatar, icon: Icon, progress, lessons, color }: AssistantCardProps) => {
  return (
    <Card 
      className={`relative overflow-hidden bg-gradient-to-br ${colorClasses[color]} border-none cursor-pointer transition-all duration-300 active:scale-95 hover:scale-[1.02] shadow-lg`}
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-14 h-14 border-2 border-background/80 shadow-md">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className={iconColorClasses[color]}>
              <Icon className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground mb-0.5 leading-tight">{name}</h3>
            <p className="text-xs font-medium text-foreground/80">{title}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold text-foreground">{progress}%</span>
            <span className="text-[10px] text-muted-foreground">{lessons} done</span>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="h-1.5 bg-background/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

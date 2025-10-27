import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/talk?coach=${encodeURIComponent(name)}`);
  };

  return (
    <Card 
      onClick={handleClick}
      className={`relative overflow-hidden bg-gradient-to-br ${colorClasses[color]} border-none cursor-pointer transition-all duration-300 active:scale-95 hover:scale-[1.02] shadow-lg`}
    >
      <div className="p-3 flex items-center gap-3">
        <Avatar className="w-12 h-12 border-2 border-background/80 shadow-md flex-shrink-0">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className={iconColorClasses[color]}>
            <Icon className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-foreground leading-tight truncate">{name}</h3>
          <p className="text-[10px] font-medium text-foreground/80 truncate">{title}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1 bg-background/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-foreground whitespace-nowrap">{progress}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

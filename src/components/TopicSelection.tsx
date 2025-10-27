import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, Send, MessageSquare, Briefcase, Plane, Users, Heart, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TopicSelectionProps {
  onTopicSelect: (topic: string) => void;
  coachName: string;
}

const TopicSelection = ({ onTopicSelect, coachName }: TopicSelectionProps) => {
  const [customTopic, setCustomTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const suggestedTopics = [
    { text: "Ordering food at a restaurant", icon: MessageSquare, color: "text-orange-500" },
    { text: "Job interview preparation", icon: Briefcase, color: "text-blue-500" },
    { text: "Travel and asking for directions", icon: Plane, color: "text-purple-500" },
    { text: "Making small talk at a party", icon: Users, color: "text-pink-500" },
    { text: "Discussing hobbies and interests", icon: Heart, color: "text-red-500" },
    { text: "Shopping and bargaining", icon: ShoppingBag, color: "text-green-500" },
  ];

  const handleCustomGenerate = () => {
    if (!customTopic.trim()) {
      toast({
        title: "Please enter a topic",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      onTopicSelect(customTopic);
    }, 800);
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Welcome Message */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-4 border border-primary/10">
        <p className="text-sm text-foreground/80 leading-relaxed">
          Hi! I'm <span className="font-bold text-primary">{coachName}</span>. 
          Choose a topic below or create your own, and let's start practicing! 🎯
        </p>
      </div>

      {/* Custom Topic */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-base font-bold text-foreground">Create Custom Topic</h2>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., Negotiating a salary..."
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustomGenerate()}
            className="flex-1 h-11 bg-background/50 border-border/50 focus:border-primary transition-colors"
            disabled={isGenerating}
          />
          <Button 
            onClick={handleCustomGenerate}
            size="icon"
            className="flex-shrink-0 h-11 w-11 shadow-lg hover:shadow-xl transition-all"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </section>

      {/* Suggested Topics */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-foreground">Suggested Topics</h2>
        <div className="grid gap-3">
          {suggestedTopics.map((topic, index) => (
            <Card
              key={index}
              onClick={() => onTopicSelect(topic.text)}
              className="group p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:border-primary/30"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-background/80 transition-transform group-hover:scale-110`}>
                  <topic.icon className={`w-5 h-5 ${topic.color}`} />
                </div>
                <p className="text-sm font-medium text-foreground flex-1">{topic.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopicSelection;

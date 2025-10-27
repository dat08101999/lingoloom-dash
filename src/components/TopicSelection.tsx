import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TopicSelectionProps {
  onTopicSelect: (topic: string) => void;
}

const TopicSelection = ({ onTopicSelect }: TopicSelectionProps) => {
  const [customTopic, setCustomTopic] = useState("");
  const { toast } = useToast();

  const suggestedTopics = [
    "Ordering food at a restaurant",
    "Job interview preparation",
    "Travel and asking for directions",
    "Making small talk at a party",
    "Discussing hobbies and interests",
    "Shopping and bargaining",
  ];

  const handleCustomGenerate = () => {
    if (!customTopic.trim()) {
      toast({
        title: "Please enter a topic",
        variant: "destructive",
      });
      return;
    }
    onTopicSelect(customTopic);
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-6">
      {/* Custom Topic */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Create Custom Topic</h2>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type your topic here..."
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustomGenerate()}
            className="flex-1"
          />
          <Button 
            onClick={handleCustomGenerate}
            size="icon"
            className="flex-shrink-0"
          >
            <Send className="w-4 h-4" />
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
              onClick={() => onTopicSelect(topic)}
              className="p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 border-border bg-card hover:bg-accent/50"
            >
              <p className="text-sm font-medium text-foreground">{topic}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopicSelection;

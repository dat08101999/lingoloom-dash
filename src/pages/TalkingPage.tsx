import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TopicSelection from "@/components/TopicSelection";
import VoiceChat from "@/components/VoiceChat";

const TalkingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const coachName = searchParams.get("coach") || "AI Coach";
  
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 border-b border-border/50 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
            className="h-9 w-9 hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-9 w-9 border-2 border-primary/20">
            <AvatarImage src="/placeholder.svg" alt={coachName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {coachName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-base font-bold text-foreground">{coachName}</h1>
            <p className="text-xs text-muted-foreground">
              {selectedTopic ? "🎤 Voice Chat" : "📚 Choose a Topic"}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-hidden">
        {!selectedTopic ? (
          <TopicSelection onTopicSelect={setSelectedTopic} coachName={coachName} />
        ) : (
          <VoiceChat topic={selectedTopic} onBack={() => setSelectedTopic(null)} coachName={coachName} />
        )}
      </main>
    </div>
  );
};

export default TalkingPage;

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopicSelection from "@/components/TopicSelection";
import VoiceChat from "@/components/VoiceChat";

const TalkingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const coachName = searchParams.get("coach") || "AI Coach";
  
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">{coachName}</h1>
            <p className="text-xs text-muted-foreground">
              {selectedTopic ? "Voice Chat" : "Choose a Topic"}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-hidden">
        {!selectedTopic ? (
          <TopicSelection onTopicSelect={setSelectedTopic} />
        ) : (
          <VoiceChat topic={selectedTopic} onBack={() => setSelectedTopic(null)} />
        )}
      </main>
    </div>
  );
};

export default TalkingPage;

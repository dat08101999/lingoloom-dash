import { AssistantCard } from "@/components/AssistantCard";
import { ProgressChart } from "@/components/ProgressChart";
import { VocabularySection } from "@/components/VocabularySection";
import { ClipboardCheck, BookOpen, Drama, MessageCircleHeart, Coffee, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import examinerAvatar from "@/assets/avatar-examiner.png";
import vocabularyAvatar from "@/assets/avatar-vocabulary.png";
import roleplayAvatar from "@/assets/avatar-roleplay.png";
import coachAvatar from "@/assets/avatar-coach.png";
import casualAvatar from "@/assets/avatar-casual.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Mobile Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-[hsl(282,90%,68%)] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">AI Lingo</h1>
                <p className="text-[10px] text-muted-foreground">Speaking Practice</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/history")}
                className="h-9 w-9 hover:bg-primary/10"
              >
                <History className="h-5 w-5" />
              </Button>
              <div className="text-right">
                <p className="text-xs font-medium text-foreground">Day 12</p>
                <p className="text-[10px] text-muted-foreground flex items-center justify-end gap-1">
                  <span>🔥</span>
                  <span>Streak</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-4 pb-6 space-y-6">
        {/* Welcome Section */}
        <section className="animate-fade-in">
          <h2 className="text-lg font-bold text-foreground mb-0.5">Choose Your AI Coach</h2>
          <p className="text-xs text-muted-foreground">Practice speaking with expert assistants</p>
        </section>

        {/* Assistants Grid - Mobile Optimized */}
        <section className="space-y-2 animate-fade-in">
          <AssistantCard
            name="Dr. Emma Hayes"
            title="Examiner"
            description="Professional assessor who tests your English speaking skills with structured evaluations"
            avatar={examinerAvatar}
            icon={ClipboardCheck}
            progress={75}
            lessons={24}
            color="primary"
          />
          <AssistantCard
            name="Ms. Lily Chen"
            title="Vocabulary & Pronounce"
            description="Patient teacher specializing in pronunciation and building your vocabulary foundation"
            avatar={vocabularyAvatar}
            icon={BookOpen}
            progress={68}
            lessons={19}
            color="secondary"
          />
          <AssistantCard
            name="Max Sterling"
            title="Role Play"
            description="Creative actor who brings scenarios to life through immersive role-playing exercises"
            avatar={roleplayAvatar}
            icon={Drama}
            progress={82}
            lessons={31}
            color="accent"
          />
          <AssistantCard
            name="Coach Ryan Lee"
            title="Speaking Coach"
            description="Motivational guide who helps you develop confidence and fluency in your speaking"
            avatar={coachAvatar}
            icon={MessageCircleHeart}
            progress={60}
            lessons={15}
            color="purple"
          />
          <AssistantCard
            name="Jamie Park"
            title="Casual Talk"
            description="Friendly conversationalist for relaxed chats about everyday topics and interests"
            avatar={casualAvatar}
            icon={Coffee}
            progress={55}
            lessons={12}
            color="orange"
          />
        </section>

        {/* Progress Chart */}
        <section className="animate-fade-in">
          <ProgressChart />
        </section>

        {/* Vocabulary Section */}
        <section className="animate-fade-in">
          <VocabularySection />
        </section>
      </main>
    </div>
  );
};

export default Index;

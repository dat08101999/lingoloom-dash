import { AssistantCard } from "@/components/AssistantCard";
import { ProgressChart } from "@/components/ProgressChart";
import { VocabularySection } from "@/components/VocabularySection";
import { ClipboardCheck, BookOpen, Drama, MessageCircleHeart, Coffee } from "lucide-react";
import examinerAvatar from "@/assets/avatar-examiner.png";
import vocabularyAvatar from "@/assets/avatar-vocabulary.png";
import roleplayAvatar from "@/assets/avatar-roleplay.png";
import coachAvatar from "@/assets/avatar-coach.png";
import casualAvatar from "@/assets/avatar-casual.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(282,90%,68%)] flex items-center justify-center">
                <span className="text-white font-bold text-lg">AL</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Lingo</h1>
                <p className="text-xs text-muted-foreground">Master languages with AI</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Welcome back!</p>
                <p className="text-xs text-muted-foreground">Keep up your streak 🔥</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Assistants Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">AI Speaking Assistants</h2>
            <p className="text-muted-foreground">Choose your AI companion to practice English speaking</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
          </div>
        </section>

        {/* Progress Chart */}
        <section>
          <ProgressChart />
        </section>

        {/* Vocabulary Section */}
        <section>
          <VocabularySection />
        </section>
      </main>
    </div>
  );
};

export default Index;

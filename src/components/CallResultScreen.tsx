import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, TrendingUp, Award, Lightbulb, ArrowLeft } from "lucide-react";

interface SkillScore {
  name: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  advice: string;
}

interface CallResultScreenProps {
  topic: string;
  coachName: string;
  onContinue: () => void;
  onBack: () => void;
}

const CallResultScreen = ({ topic, coachName, onContinue, onBack }: CallResultScreenProps) => {
  // Mock data - will be replaced with actual data from AI
  const overallScore = 78;
  const skills: SkillScore[] = [
    {
      name: "Fluency",
      score: 75,
      strengths: [
        "Natural conversation flow",
        "Good response timing",
        "Consistent speaking pace"
      ],
      weaknesses: [
        "Some hesitation on complex topics",
        "Occasional use of filler words"
      ],
      advice: "Practice speaking about unfamiliar topics to reduce hesitation. Try recording yourself and listening back to identify areas where you pause or use filler words."
    },
    {
      name: "Vocabulary",
      score: 82,
      strengths: [
        "Good range of topic-specific vocabulary",
        "Appropriate word choices",
        "Effective use of expressions"
      ],
      weaknesses: [
        "Limited use of advanced vocabulary",
        "Some repetition of common words"
      ],
      advice: "Expand your vocabulary by reading articles on diverse topics. Create a personal word bank and practice using new words in conversations."
    },
    {
      name: "Grammar",
      score: 70,
      strengths: [
        "Correct use of basic tenses",
        "Good sentence structure in simple sentences"
      ],
      weaknesses: [
        "Errors in complex sentence structures",
        "Inconsistent use of articles",
        "Some issues with verb agreement"
      ],
      advice: "Focus on mastering complex sentence structures through targeted practice. Review grammar rules for articles and verb agreement, then apply them in speaking exercises."
    },
    {
      name: "Pronunciation",
      score: 85,
      strengths: [
        "Clear articulation of most words",
        "Good intonation patterns",
        "Natural rhythm and stress"
      ],
      weaknesses: [
        "Slight difficulty with certain consonant clusters",
        "Occasional mispronunciation of unfamiliar words"
      ],
      advice: "Practice tongue twisters to improve consonant clusters. Use pronunciation apps or dictionaries with audio to verify unfamiliar words before using them."
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-info";
    return "text-warning";
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "outline" => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 border-b border-border/50 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="h-9 w-9 hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-foreground">Session Results</h1>
            <p className="text-xs text-muted-foreground">
              {coachName} • {topic}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Overall Score Card */}
        <div className="bg-gradient-to-br from-card via-card to-primary/5 rounded-xl border border-border/50 shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Overall Score</h2>
            </div>
            <Badge variant={getScoreBadgeVariant(overallScore)} className="text-lg px-3 py-1">
              {overallScore}/100
            </Badge>
          </div>
          <Progress value={overallScore} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            {overallScore >= 80 ? "Excellent performance! Keep up the great work." :
             overallScore >= 60 ? "Good progress! Focus on the areas below to improve further." :
             "Keep practicing! Review the feedback below to improve your skills."}
          </p>
        </div>

        {/* Skill Breakdown */}
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-card rounded-xl border border-border/50 shadow-md p-5 space-y-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Skill Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
                  <span className={`text-2xl font-bold ${getScoreColor(skill.score)}`}>
                    {skill.score}
                  </span>
                </div>
                <Progress value={skill.score} className="h-2" />
              </div>

              <Separator className="bg-border/50" />

              {/* Strengths */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <h4 className="text-sm font-semibold text-success">Strengths</h4>
                </div>
                <ul className="space-y-1 ml-6">
                  {skill.strengths.map((strength, i) => (
                    <li key={i} className="text-sm text-muted-foreground list-disc">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-warning" />
                  <h4 className="text-sm font-semibold text-warning">Areas to Improve</h4>
                </div>
                <ul className="space-y-1 ml-6">
                  {skill.weaknesses.map((weakness, i) => (
                    <li key={i} className="text-sm text-muted-foreground list-disc">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advice */}
              <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-1">Improvement Tips</h4>
                    <p className="text-sm text-foreground leading-relaxed">{skill.advice}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 pb-4">
          <Button 
            onClick={onContinue}
            className="flex-1"
            size="lg"
          >
            Continue Practicing
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CallResultScreen;

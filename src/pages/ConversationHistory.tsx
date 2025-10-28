import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, MessageSquare, TrendingUp, Award, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import casualAvatar from "@/assets/avatar-casual.png";
import examinerAvatar from "@/assets/avatar-examiner.png";
import coachAvatar from "@/assets/avatar-coach.png";
import vocabularyAvatar from "@/assets/avatar-vocabulary.png";
import roleplayAvatar from "@/assets/avatar-roleplay.png";

// Mock conversation data with skills review
const mockConversations = [
  {
    id: 1,
    coachName: "Casual Conversation",
    avatar: casualAvatar,
    topic: "Travel experiences in Asia",
    lastMessage: "That sounds like an amazing trip! I'd love to hear more about...",
    messageCount: 15,
    date: "2024-01-15T10:30:00",
    duration: "12 min",
    overallScore: 85,
    skills: {
      fluency: 88,
      vocabulary: 82,
      grammar: 85,
      pronunciation: 84
    },
    feedback: "Great conversation flow! Try to use more descriptive adjectives when talking about places.",
    strengths: ["Natural speaking pace", "Good topic development"],
    improvements: ["Expand vocabulary range", "Work on past tense consistency"]
  },
  {
    id: 2,
    coachName: "IELTS Examiner",
    avatar: examinerAvatar,
    topic: "Speaking Test - Part 2",
    lastMessage: "Your fluency was good, but let's work on vocabulary range...",
    messageCount: 8,
    date: "2024-01-14T15:20:00",
    duration: "8 min",
    overallScore: 72,
    skills: {
      fluency: 75,
      vocabulary: 68,
      grammar: 74,
      pronunciation: 71
    },
    feedback: "Solid performance with room for improvement in lexical resource and coherence.",
    strengths: ["Clear pronunciation", "Good time management"],
    improvements: ["Use more linking words", "Develop ideas more fully"]
  },
  {
    id: 3,
    coachName: "Speaking Coach",
    avatar: coachAvatar,
    topic: "Pronunciation practice",
    lastMessage: "Great improvement on those difficult sounds!",
    messageCount: 22,
    date: "2024-01-13T09:15:00",
    duration: "18 min",
    overallScore: 91,
    skills: {
      fluency: 90,
      vocabulary: 88,
      grammar: 92,
      pronunciation: 94
    },
    feedback: "Excellent session! Your pronunciation has improved significantly, especially with 'th' sounds.",
    strengths: ["Excellent pronunciation", "Confident delivery", "Rich vocabulary"],
    improvements: ["Maintain this level", "Practice stress patterns in longer words"]
  },
  {
    id: 4,
    coachName: "Vocabulary Coach",
    avatar: vocabularyAvatar,
    topic: "Business English terms",
    lastMessage: "Let's review those idioms we learned...",
    messageCount: 12,
    date: "2024-01-12T14:45:00",
    duration: "10 min",
    overallScore: 78,
    skills: {
      fluency: 76,
      vocabulary: 85,
      grammar: 75,
      pronunciation: 76
    },
    feedback: "Good grasp of business terminology. Focus on using them in natural contexts.",
    strengths: ["Strong vocabulary retention", "Good comprehension"],
    improvements: ["Practice in real scenarios", "Work on sentence structure"]
  },
  {
    id: 5,
    coachName: "Role-play Partner",
    avatar: roleplayAvatar,
    topic: "Job interview practice",
    lastMessage: "Your answers were confident and well-structured...",
    messageCount: 18,
    date: "2024-01-11T11:00:00",
    duration: "15 min",
    overallScore: 82,
    skills: {
      fluency: 85,
      vocabulary: 80,
      grammar: 81,
      pronunciation: 82
    },
    feedback: "Confident delivery with good structure. Add more specific examples to strengthen answers.",
    strengths: ["Professional tone", "Clear structure", "Good eye contact simulation"],
    improvements: ["Use STAR method more", "Prepare more specific examples"]
  }
];

const ConversationHistory = () => {
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (id: number) => {
    setExpandedCards(prev => 
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-info";
    return "text-warning";
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "outline" => {
    if (score >= 85) return "default";
    if (score >= 70) return "secondary";
    return "outline";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Need Improvement";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 border-b border-border/50 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
            className="h-9 w-9 hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Conversation History</h1>
            <p className="text-sm text-muted-foreground">
              {mockConversations.length} conversations
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <ScrollArea className="h-[calc(100vh-73px)]">
        <main className="container max-w-4xl mx-auto px-4 py-6 space-y-4">
          {mockConversations.map((conversation) => {
            const isExpanded = expandedCards.includes(conversation.id);
            
            return (
              <Card
                key={conversation.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in"
              >
                <Collapsible open={isExpanded} onOpenChange={() => toggleCard(conversation.id)}>
                  {/* Collapsed View - Summary */}
                  <div className="p-5 bg-gradient-to-br from-card via-card to-primary/5">
                    <div className="flex gap-4">
                      <Avatar className="h-16 w-16 border-2 border-primary/30 shadow-md flex-shrink-0">
                        <AvatarImage src={conversation.avatar} alt={conversation.coachName} />
                        <AvatarFallback className="bg-primary/20 text-primary text-sm font-bold">
                          {conversation.coachName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-foreground text-base truncate">
                              {conversation.coachName}
                            </h3>
                            <p className="text-sm text-primary font-medium truncate">
                              {conversation.topic}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <div className="text-xs text-muted-foreground">
                              {formatDate(conversation.date)}
                            </div>
                            <div className={`text-2xl font-bold ${getScoreColor(conversation.overallScore)}`}>
                              {conversation.overallScore}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary" className="gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {conversation.messageCount}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <Clock className="h-3 w-3" />
                            {conversation.duration}
                          </Badge>
                          <Badge 
                            variant={getScoreBadgeVariant(conversation.overallScore)}
                            className="gap-1"
                          >
                            <Award className="h-3 w-3" />
                            {getScoreLabel(conversation.overallScore)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Button */}
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full mt-4 gap-2"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            View Detailed Review
                          </>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  {/* Expanded View - Detailed Review */}
                  <CollapsibleContent>
                    <div className="px-5 pb-5 space-y-4 animate-fade-in bg-gradient-to-br from-card via-card to-primary/5">
                      <Separator className="bg-border/50" />

                      {/* Skills Review Section */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <h4 className="text-sm font-semibold text-foreground">Skills Assessment</h4>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(conversation.skills).map(([skill, score]) => (
                            <div key={skill} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground capitalize">
                                  {skill}
                                </span>
                                <span className={`text-xs font-bold ${getScoreColor(score)}`}>
                                  {score}%
                                </span>
                              </div>
                              <Progress value={score} className="h-1.5" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Feedback Section */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div className="flex-1 space-y-2">
                            <h4 className="text-sm font-semibold text-foreground">AI Feedback</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {conversation.feedback}
                            </p>
                          </div>
                        </div>

                        {/* Strengths */}
                        <div className="pl-6 space-y-1">
                          <p className="text-xs font-semibold text-success">
                            ✓ Strengths:
                          </p>
                          <ul className="text-xs text-muted-foreground space-y-0.5">
                            {conversation.strengths.map((strength, idx) => (
                              <li key={idx}>• {strength}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Areas to Improve */}
                        <div className="pl-6 space-y-1">
                          <p className="text-xs font-semibold text-warning">
                            → Areas to Improve:
                          </p>
                          <ul className="text-xs text-muted-foreground space-y-0.5">
                            {conversation.improvements.map((improvement, idx) => (
                              <li key={idx}>• {improvement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Separator />

                      {/* Action Button */}
                      <Button
                        onClick={() => navigate(`/talk?coach=${encodeURIComponent(conversation.coachName)}`)}
                        className="w-full"
                      >
                        Continue with {conversation.coachName}
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </main>
      </ScrollArea>
    </div>
  );
};

export default ConversationHistory;

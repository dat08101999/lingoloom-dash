import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Mock conversation data
const mockConversations = [
  {
    id: 1,
    coachName: "Casual Conversation",
    avatar: "/placeholder.svg",
    topic: "Travel experiences in Asia",
    lastMessage: "That sounds like an amazing trip! I'd love to hear more about...",
    messageCount: 15,
    date: "2024-01-15T10:30:00",
    duration: "12 min"
  },
  {
    id: 2,
    coachName: "IELTS Examiner",
    avatar: "/placeholder.svg",
    topic: "Speaking Test - Part 2",
    lastMessage: "Your fluency was good, but let's work on vocabulary range...",
    messageCount: 8,
    date: "2024-01-14T15:20:00",
    duration: "8 min"
  },
  {
    id: 3,
    coachName: "Speaking Coach",
    avatar: "/placeholder.svg",
    topic: "Pronunciation practice",
    lastMessage: "Great improvement on those difficult sounds!",
    messageCount: 22,
    date: "2024-01-13T09:15:00",
    duration: "18 min"
  },
  {
    id: 4,
    coachName: "Vocabulary Coach",
    avatar: "/placeholder.svg",
    topic: "Business English terms",
    lastMessage: "Let's review those idioms we learned...",
    messageCount: 12,
    date: "2024-01-12T14:45:00",
    duration: "10 min"
  },
  {
    id: 5,
    coachName: "Role-play Partner",
    avatar: "/placeholder.svg",
    topic: "Job interview practice",
    lastMessage: "Your answers were confident and well-structured...",
    messageCount: 18,
    date: "2024-01-11T11:00:00",
    duration: "15 min"
  }
];

const ConversationHistory = () => {
  const navigate = useNavigate();

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
          {mockConversations.map((conversation) => (
            <Card
              key={conversation.id}
              className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in"
              onClick={() => navigate(`/talk?coach=${encodeURIComponent(conversation.coachName)}`)}
            >
              <div className="flex gap-4">
                <Avatar className="h-14 w-14 border-2 border-primary/20 flex-shrink-0">
                  <AvatarImage src={conversation.avatar} alt={conversation.coachName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                    {conversation.coachName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-foreground text-base truncate">
                        {conversation.coachName}
                      </h3>
                      <p className="text-sm text-primary font-medium truncate">
                        {conversation.topic}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground flex-shrink-0">
                      {formatDate(conversation.date)}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {conversation.lastMessage}
                  </p>

                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant="secondary" className="gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {conversation.messageCount} messages
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {conversation.duration}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </main>
      </ScrollArea>
    </div>
  );
};

export default ConversationHistory;

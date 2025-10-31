import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, X, Volume2, PhoneOff } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import CallResultScreen from "./CallResultScreen";

interface VoiceChatProps {
  topic: string;
  onBack: () => void;
  coachName: string;
}

interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const VoiceChat = ({ topic, onBack, coachName }: VoiceChatProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: `Great! Let's talk about "${topic}". I'm ready when you are. Hold the microphone button to speak.`,
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMicPress = () => {
    setIsRecording(true);
  };

  const handleMicRelease = () => {
    setIsRecording(false);
    // Simulate adding user message
    const userMessage: Message = {
      role: "user",
      content: "This is a sample user message (voice will be transcribed here)",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setIsAISpeaking(true);
    setTimeout(() => {
      const aiMessage: Message = {
        role: "ai",
        content: "This is a sample AI response. In the real version, AI will respond to your voice input.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsAISpeaking(false);
    }, 1500);
  };

  const handleEndCall = () => {
    setShowResults(true);
  };

  const handleContinue = () => {
    setShowResults(false);
    setMessages([
      {
        role: "ai",
        content: `Let's continue practicing "${topic}". I'm ready when you are!`,
        timestamp: new Date(),
      },
    ]);
  };

  if (showResults) {
    return (
      <CallResultScreen
        topic={topic}
        coachName={coachName}
        onContinue={handleContinue}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-background">
      {/* Topic Banner */}
      <div className="px-4 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-border/50 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="p-1.5 bg-primary/10 rounded-lg flex-shrink-0">
            <Volume2 className="w-3.5 h-3.5 text-primary" />
          </div>
          <p className="text-xs font-medium text-foreground truncate">
            <span className="text-muted-foreground">Topic:</span> {topic}
          </p>
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleEndCall}
            className="h-7 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
          >
            <PhoneOff className="w-3 h-3 mr-1" />
            End Call
          </Button>
          <Button variant="ghost" size="sm" onClick={onBack} className="h-7 w-7 p-0 hover:bg-destructive/10">
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex w-full gap-2 animate-fade-in",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {message.role === "ai" && (
              <Avatar className="h-8 w-8 border-2 border-primary/20 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {coachName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-4 py-3 shadow-md transition-all duration-200",
                message.role === "user"
                  ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-sm"
                  : "bg-card text-foreground border border-border/50 rounded-bl-sm"
              )}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p
                className={cn(
                  "text-[10px] mt-1.5 flex items-center gap-1",
                  message.role === "user"
                    ? "text-primary-foreground/70 justify-end"
                    : "text-muted-foreground"
                )}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {message.role === "user" && (
              <Avatar className="h-8 w-8 border-2 border-muted/20 flex-shrink-0">
                <AvatarFallback className="bg-muted text-muted-foreground text-xs font-bold">
                  U
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isAISpeaking && (
          <div className="flex gap-2 animate-fade-in">
            <Avatar className="h-8 w-8 border-2 border-primary/20 flex-shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                {coachName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="bg-card border border-border/50 rounded-2xl rounded-bl-sm px-4 py-3 shadow-md">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Microphone Button */}
      <div className="p-6 border-t border-border/50 bg-background/95 backdrop-blur-lg">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              isRecording ? "bg-destructive animate-pulse" : "bg-muted"
            )}></div>
            <p className={cn(
              "text-xs font-medium text-center transition-colors",
              isRecording ? "text-destructive" : "text-muted-foreground"
            )}>
              {isRecording ? "🎤 Recording... Release to send" : "Hold the button to speak"}
            </p>
          </div>
          <div className="relative">
            {isRecording && (
              <div className="absolute inset-0 rounded-full bg-destructive/30 animate-ping"></div>
            )}
            <button
              onMouseDown={handleMicPress}
              onMouseUp={handleMicRelease}
              onTouchStart={handleMicPress}
              onTouchEnd={handleMicRelease}
              className={cn(
                "relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl active:scale-90",
                isRecording
                  ? "bg-gradient-to-br from-destructive to-destructive/80 shadow-destructive/50"
                  : "bg-gradient-to-br from-primary to-primary/80 hover:shadow-2xl hover:shadow-primary/30"
              )}
            >
              <Mic className={cn(
                "w-8 h-8 text-primary-foreground transition-transform",
                isRecording && "scale-110"
              )} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;

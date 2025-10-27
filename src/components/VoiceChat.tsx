import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceChatProps {
  topic: string;
  onBack: () => void;
}

interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const VoiceChat = ({ topic, onBack }: VoiceChatProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: `Great! Let's talk about "${topic}". I'm ready when you are. Hold the microphone button to speak.`,
      timestamp: new Date(),
    },
  ]);

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
    setTimeout(() => {
      const aiMessage: Message = {
        role: "ai",
        content: "This is a sample AI response. In the real version, AI will respond to your voice input.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Topic Banner */}
      <div className="px-4 py-3 bg-primary/10 border-b border-border flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Topic: {topic}</p>
        <Button variant="ghost" size="sm" onClick={onBack}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex w-full",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card text-foreground border border-border rounded-bl-sm"
              )}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p
                className={cn(
                  "text-[10px] mt-1",
                  message.role === "user"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                )}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Microphone Button */}
      <div className="p-6 border-t border-border bg-background/95 backdrop-blur">
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-muted-foreground text-center">
            {isRecording ? "Recording... Release to send" : "Hold to speak"}
          </p>
          <button
            onMouseDown={handleMicPress}
            onMouseUp={handleMicRelease}
            onTouchStart={handleMicPress}
            onTouchEnd={handleMicRelease}
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95",
              isRecording
                ? "bg-destructive animate-pulse"
                : "bg-primary hover:bg-primary/90"
            )}
          >
            <Mic className="w-8 h-8 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;

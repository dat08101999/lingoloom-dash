import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  MessageCircle, 
  Target, 
  TrendingUp, 
  Mic, 
  Sparkles, 
  MapPin, 
  Rocket 
} from "lucide-react";

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  goal: string;
  level: string;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [isListening, setIsListening] = useState(false);

  const totalScreens = 7;
  const progress = (currentScreen / totalScreens) * 100;

  const handleNext = () => {
    if (currentScreen < totalScreens) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete({ goal, level });
    }
  };

  const handleSkip = () => {
    onComplete({ goal: "daily", level: "beginner" });
  };

  const simulateMicTest = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex flex-col">
      <div className="p-4">
        <Progress value={progress} className="h-1" />
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Screen 1 - Hook / Problem */}
          {currentScreen === 1 && (
            <Card className="p-8 text-center space-y-6 animate-fade-in bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
              <div className="flex justify-center">
                <div className="animate-pulse">
                  <MessageCircle className="w-16 h-16 text-primary" />
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-foreground">
                  Bạn ngại nói tiếng Anh?
                </h1>
                <p className="text-xl text-primary/90 font-medium">
                  Feeling shy to speak English?
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Đừng lo! Hàng ngàn người cũng từng như bạn. Giờ đây, bạn có một người bạn AI luôn sẵn sàng lắng nghe.
                </p>
                <p className="text-sm text-muted-foreground/80">
                  Don't worry! Thousands felt the same. Now you have an AI friend ready to listen.
                </p>
              </div>
              <Button 
                onClick={handleNext} 
                size="lg" 
                className="w-full hover-scale"
              >
                Bắt đầu thôi! / Let's Start!
              </Button>
            </Card>
          )}

          {/* Screen 2 - Learning Goals */}
          {currentScreen === 2 && (
            <Card className="p-8 space-y-6 animate-fade-in bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
              <div className="text-center space-y-3">
                <Target className="w-12 h-12 text-primary mx-auto" />
                <h1 className="text-3xl font-bold text-foreground">
                  Mục tiêu của bạn?
                </h1>
                <p className="text-primary/90 font-medium">
                  What's your goal?
                </p>
                <p className="text-sm text-muted-foreground">
                  Chọn để chúng tôi tạo lộ trình phù hợp nhất cho bạn
                </p>
              </div>
              
              <RadioGroup value={goal} onValueChange={setGoal} className="space-y-3">
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily" className="cursor-pointer flex-1">
                    <div className="font-medium">💬 Giao tiếp hàng ngày / Daily Conversation</div>
                    <div className="text-xs text-muted-foreground">Chat với bạn bè, mua sắm, xã giao</div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer">
                  <RadioGroupItem value="work" id="work" />
                  <Label htmlFor="work" className="cursor-pointer flex-1">
                    <div className="font-medium">💼 Công việc / Work & Career</div>
                    <div className="text-xs text-muted-foreground">Họp, thuyết trình, email chuyên nghiệp</div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer">
                  <RadioGroupItem value="travel" id="travel" />
                  <Label htmlFor="travel" className="cursor-pointer flex-1">
                    <div className="font-medium">✈️ Du lịch / Travel</div>
                    <div className="text-xs text-muted-foreground">Khách sạn, nhà hàng, hỏi đường</div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer">
                  <RadioGroupItem value="media" id="media" />
                  <Label htmlFor="media" className="cursor-pointer flex-1">
                    <div className="font-medium">📺 Phim & Media</div>
                    <div className="text-xs text-muted-foreground">Hiểu phim, nhạc, podcast tiếng Anh</div>
                  </Label>
                </div>
              </RadioGroup>

              <Button 
                onClick={handleNext} 
                disabled={!goal}
                size="lg" 
                className="w-full hover-scale"
              >
                Tiếp tục / Continue
              </Button>
            </Card>
          )}

          {/* Screen 3 - Current Level */}
          {currentScreen === 3 && (
            <Card className="p-8 space-y-6 animate-fade-in bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
              <div className="text-center space-y-3">
                <TrendingUp className="w-12 h-12 text-primary mx-auto" />
                <h1 className="text-3xl font-bold text-foreground">
                  Trình độ hiện tại?
                </h1>
                <p className="text-primary/90 font-medium">
                  Your current level?
                </p>
                <p className="text-sm text-muted-foreground">
                  Chọn cảm nhận của bạn, AI sẽ điều chỉnh phù hợp
                </p>
              </div>
              
              <RadioGroup value={level} onValueChange={setLevel} className="space-y-3">
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="cursor-pointer flex-1">
                    <div className="font-medium">🌱 Mới bắt đầu / Beginner</div>
                    <div className="text-xs text-muted-foreground">Tôi biết ít từ vựng, chưa tự tin nói</div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="cursor-pointer flex-1">
                    <div className="font-medium">🌿 Trung bình / Intermediate</div>
                    <div className="text-xs text-muted-foreground">Tôi hiểu cơ bản nhưng cần luyện nói nhiều hơn</div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="cursor-pointer flex-1">
                    <div className="font-medium">🌳 Khá tốt / Advanced</div>
                    <div className="text-xs text-muted-foreground">Tôi tự tin nhưng muốn trau dồi thêm</div>
                  </Label>
                </div>
              </RadioGroup>

              <Button 
                onClick={handleNext} 
                disabled={!level}
                size="lg" 
                className="w-full hover-scale"
              >
                Tiếp tục / Continue
              </Button>
            </Card>
          )}

          {/* Screen 4 - AI Magic */}
          {currentScreen === 4 && (
            <Card className="p-8 text-center space-y-6 animate-fade-in bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
              <div className="flex justify-center">
                <div className="relative">
                  <Sparkles className="w-16 h-16 text-primary animate-pulse" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-foreground">
                  AI lắng nghe & phản hồi
                </h1>
                <p className="text-xl text-primary/90 font-medium">
                  AI listens & responds
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Trò chuyện realtime với AI như người thật. Không cần soạn câu, chỉ cần nói tự nhiên!
                </p>
                <p className="text-sm text-muted-foreground/80">
                  Chat realtime with AI like a real person. No need to prepare, just speak naturally!
                </p>
              </div>
              
              <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">✅ Phát âm tự nhiên</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">✅ Phản hồi ngay lập tức</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">✅ Đánh giá chi tiết kỹ năng</span>
                </div>
              </div>

              <Button 
                onClick={handleNext} 
                size="lg" 
                className="w-full hover-scale"
              >
                Nghe hay quá! / Sounds Great!
              </Button>
            </Card>
          )}

          {/* Screen 5 - Interactive Demo */}
          {currentScreen === 5 && (
            <Card className="p-8 text-center space-y-6 animate-fade-in bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
              <div className="space-y-3">
                <Mic className="w-12 h-12 text-primary mx-auto" />
                <h1 className="text-3xl font-bold text-foreground">
                  Thử nói ngay nhé!
                </h1>
                <p className="text-primary/90 font-medium">
                  Try speaking now!
                </p>
                <p className="text-sm text-muted-foreground">
                  Nhấn mic và thử nói: "Hello, nice to meet you!"
                </p>
              </div>

              <div className="relative py-8">
                <Button
                  size="lg"
                  variant={isListening ? "default" : "outline"}
                  className={`w-32 h-32 rounded-full hover-scale ${isListening ? 'animate-pulse' : ''}`}
                  onClick={simulateMicTest}
                >
                  <Mic className="w-12 h-12" />
                </Button>
                
                {isListening && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 border-4 border-primary/30 rounded-full animate-ping"></div>
                  </div>
                )}
              </div>

              {isListening && (
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/30 animate-fade-in">
                  <p className="text-sm text-foreground font-medium">
                    🎙️ Đang lắng nghe... / Listening...
                  </p>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                💡 Mẹo: Nói rõ ràng, không cần quá nhanh. AI sẽ hiểu bạn!
              </p>

              <Button 
                onClick={handleNext} 
                size="lg" 
                variant="outline"
                className="w-full"
              >
                Bỏ qua / Skip
              </Button>
            </Card>
          )}

          {/* Screen 6 - Personalized Path */}
          {currentScreen === 6 && (
            <Card className="p-8 text-center space-y-6 animate-fade-in bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
              <div className="flex justify-center">
                <MapPin className="w-12 h-12 text-primary" />
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-foreground">
                  Lộ trình riêng cho bạn
                </h1>
                <p className="text-xl text-primary/90 font-medium">
                  Your personalized path
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Dựa trên mục tiêu và trình độ của bạn, chúng tôi đã chuẩn bị lộ trình học tập phù hợp nhất.
                </p>
                <p className="text-sm text-muted-foreground/80">
                  Based on your goals and level, we've prepared the perfect learning path for you.
                </p>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Chủ đề cơ bản / Basic Topics</p>
                    <p className="text-xs text-muted-foreground">Tự giới thiệu, hỏi thăm, thời tiết</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">2</div>
                  <div className="flex-1">
                    <p className="font-medium text-muted-foreground">Chủ đề nâng cao / Advanced Topics</p>
                    <p className="text-xs text-muted-foreground">Mở khóa sau 5 bài học</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg border border-border/30">
                  <div className="w-8 h-8 rounded-full bg-muted/50 text-muted-foreground flex items-center justify-center font-bold">3</div>
                  <div className="flex-1">
                    <p className="font-medium text-muted-foreground">Chuyên sâu / Expert Level</p>
                    <p className="text-xs text-muted-foreground">Mở khóa sau 15 bài học</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleNext} 
                size="lg" 
                className="w-full hover-scale"
              >
                Tuyệt vời! / Awesome!
              </Button>
            </Card>
          )}

          {/* Screen 7 - CTA / Start */}
          {currentScreen === 7 && (
            <Card className="p-8 text-center space-y-6 animate-fade-in bg-gradient-to-br from-card via-card to-primary/10 border-primary/30">
              <div className="flex justify-center">
                <div className="relative">
                  <Rocket className="w-20 h-20 text-primary animate-bounce" />
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  Sẵn sàng chưa?
                </h1>
                <p className="text-2xl text-primary font-medium">
                  Ready to Start?
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Hành trình tự tin nói tiếng Anh của bạn bắt đầu từ đây!
                </p>
                <p className="text-sm text-muted-foreground/80">
                  Your confident English speaking journey starts here!
                </p>
              </div>

              <div className="space-y-2 p-6 bg-primary/10 rounded-lg border-2 border-primary/30">
                <p className="text-sm font-medium text-foreground">🎯 Mục tiêu: {goal === 'daily' ? 'Giao tiếp hàng ngày' : goal === 'work' ? 'Công việc' : goal === 'travel' ? 'Du lịch' : 'Phim & Media'}</p>
                <p className="text-sm font-medium text-foreground">📊 Trình độ: {level === 'beginner' ? 'Mới bắt đầu' : level === 'intermediate' ? 'Trung bình' : 'Khá tốt'}</p>
              </div>

              <Button 
                onClick={handleNext} 
                size="lg" 
                className="w-full text-lg py-6 hover-scale animate-pulse"
              >
                🚀 Bắt đầu ngay! / Let's Go!
              </Button>

              <button 
                onClick={handleSkip}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Bỏ qua hướng dẫn / Skip tutorial
              </button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

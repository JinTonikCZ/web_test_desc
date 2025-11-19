import { useState } from "react";
import { X, ArrowLeft, Smile, Frown, Angry, Leaf, CloudLightning, Meh } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMOTIONS = [
  { id: "joy", label: "Joy", icon: Smile, color: "text-yellow-500", border: "border-yellow-400", bg: "bg-yellow-50" },
  { id: "sadness", label: "Sadness", icon: Frown, color: "text-blue-500", border: "border-blue-400", bg: "bg-blue-50" },
  { id: "anger", label: "Anger", icon: Angry, color: "text-red-500", border: "border-red-400", bg: "bg-red-50" },
  { id: "calmness", label: "Calmness", icon: Leaf, color: "text-emerald-500", border: "border-emerald-400", bg: "bg-emerald-50" },
  { id: "anxiety", label: "Anxiety", icon: CloudLightning, color: "text-purple-500", border: "border-purple-400", bg: "bg-purple-50" },
  { id: "neutral", label: "Neutral", icon: Meh, color: "text-gray-500", border: "border-gray-400", bg: "bg-gray-50" },
];

export function CheckInModal({ isOpen, onClose }: CheckInModalProps) {
  const [step, setStep] = useState(1);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const handleNext = () => {
    if (step === 1 && selectedEmotion) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = () => {
    console.log({ emotion: selectedEmotion, description });
    // Reset and close
    setStep(1);
    setSelectedEmotion(null);
    setDescription("");
    onClose();
  };

  const progress = step === 1 ? 50 : 100;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[850px] w-[95vw] p-0 overflow-hidden rounded-3xl bg-white shadow-2xl border-0 max-h-[90vh] flex flex-col">
        
        {/* Header / Progress */}
        <div className="px-4 md:px-8 pt-6 md:pt-8 pb-4 flex flex-col gap-4 md:gap-6 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="ml-4 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-500" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
             {step === 2 ? (
                <Button variant="ghost" onClick={handleBack} className="p-0 hover:bg-transparent text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm md:text-base">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Button>
             ) : (
                 <span className="text-xs md:text-sm font-medium text-gray-500">Step {step}/2</span>
             )}
          </div>
        </div>

        <div className="px-4 md:px-8 pb-6 md:pb-8 overflow-y-auto flex-1">
          <hr className="border-gray-100 mb-6 md:mb-8" />
          
          {/* Step 1: Emotion Selection */}
          {step === 1 && (
            <div className="flex flex-col items-center gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 text-center">
                Which category best describes your feeling?
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 w-full max-w-3xl">
                {EMOTIONS.map((emo) => {
                  const Icon = emo.icon;
                  const isSelected = selectedEmotion === emo.id;
                  return (
                    <button
                      key={emo.id}
                      onClick={() => setSelectedEmotion(emo.id)}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 md:gap-4 p-4 md:p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02]",
                        isSelected 
                          ? `${emo.border} ${emo.bg} shadow-sm` 
                          : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-colors",
                        isSelected ? "bg-white border-transparent" : "bg-white border-gray-100",
                        emo.color
                      )}>
                        <Icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
                      </div>
                      <span className={cn(
                        "text-sm md:text-lg font-semibold",
                        isSelected ? "text-gray-900" : "text-gray-600"
                      )}>
                        {emo.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="w-full flex justify-end mt-2 md:mt-4 pb-2">
                <Button 
                  onClick={handleNext} 
                  disabled={!selectedEmotion}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg font-semibold h-12 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Description */}
          {step === 2 && (
            <div className="flex flex-col items-center gap-6 md:gap-8 animate-in fade-in slide-in-from-right-8 duration-500 h-full">
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 text-center">
                Why do you feel this way?
              </h2>
              
              <div className="w-full max-w-2xl flex-1 min-h-[150px]">
                <Textarea
                  placeholder="Describe your feelings..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-full min-h-[200px] text-base md:text-lg p-4 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="w-full flex justify-end mt-2 md:mt-4 max-w-2xl pb-2">
                <Button 
                  onClick={handleSubmit}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg font-semibold h-12 px-8 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/30 hover:-translate-y-0.5"
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Link } from "wouter";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { DailyDetailsModal } from "@/components/daily-details-modal";
import { CheckInModal } from "@/components/check-in-modal";

const EMOTIONS = [
  { name: "Joy", color: "#facc15" },
  { name: "Sadness", color: "#60a5fa" },
  { name: "Anger", color: "#ef4444" },
  { name: "Calm", color: "#34d399" },
  { name: "Neutral", color: "#d5c7b4" },
  { name: "Anxiety", color: "#c084fc" },
];

const WEEKLY_DATA = [
  { day: "Mon", emotions: ["Calm", "Joy"], values: [40, 60] },
  { day: "Tue", emotions: ["Sadness", "Anxiety", "Joy"], values: [30, 30, 40] },
  { day: "Wed", emotions: ["Anger", "Neutral"], values: [20, 80] },
  { day: "Thu", emotions: ["Joy", "Calm"], values: [70, 30] },
  { day: "Fri", emotions: ["Anxiety", "Sadness"], values: [50, 50] },
  { day: "Sat", emotions: ["Joy", "Joy"], values: [100, 0] },
  { day: "Sun", emotions: ["Neutral", "Calm"], values: [60, 40] },
];

const DAY_DETAILS = [
  {
    time: "09:15 AM",
    emotion: "Sadness",
    description: "Feeling a bit down this morning after waking up. It's a quiet day, and I'm feeling the absence of company more than usual. Not sure why."
  },
  {
    time: "02:30 PM",
    emotion: "Joy",
    description: "Had a great, long call with a friend from college I haven't spoken to in ages. It really lifted my spirits! We're planning to meet up next month, feeling much better!"
  },
  {
    time: "08:00 PM",
    emotion: "Neutral",
    description: "Just a calm evening watching a movie."
  },
  {
    time: "08:00 PM",
    emotion: "Anxiety",
    description: "I have a panicc attack..."
  }
];

// Helper to get color for emotion
const getEmotionColor = (emotion: string) => EMOTIONS.find(e => e.name === emotion)?.color || "#ccc";

export default function AnalyticsPage() {
  const [currentMonth, setCurrentMonth] = useState("October 2023");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      {/* Modals */}
      <DailyDetailsModal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
      <CheckInModal isOpen={isCheckInOpen} onClose={() => setIsCheckInOpen(false)} />

      {/* Header */}
      <header className="w-full h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-10 bg-white shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            EF
          </div>
          <h1 className="font-bold text-gray-800 text-lg">Emotional Flow</h1>
        </div>
        <nav className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-gray-500 font-medium text-sm hover:text-gray-900">Dashboard</Link>
            <Link href="/analytics" className="text-blue-500 font-medium text-sm">Home</Link>
          </div>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-10 overflow-y-auto">
        <div className="w-full max-w-[1280px] flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Column: Calendar & Check-in */}
          <aside className="flex flex-col gap-6 w-full lg:w-[320px] shrink-0">
            
            {/* Calendar Widget */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-4">
              {/* Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {EMOTIONS.map((emo) => (
                  <div key={emo.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: emo.color }} />
                    <span className="text-sm font-medium text-gray-700">{emo.name}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 w-full my-2" />

              {/* Month Nav */}
              <div className="flex items-center justify-between">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-full">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="font-bold text-gray-900">{currentMonth}</h2>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-full">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center mt-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-xs font-bold text-gray-500 py-2">{day}</div>
                ))}
                {/* Placeholder for calendar days - mix of empty and filled */}
                {Array.from({ length: 31 }).map((_, i) => {
                    const day = i + 1;
                    // Mock random emotions for visualization
                    const hasEmotion = Math.random() > 0.5;
                    const emotionColor = hasEmotion ? EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)].color : null;
                    
                    return (
                        <button 
                            key={i} 
                            className={`
                                h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                                ${day === 5 ? 'bg-white shadow-md border border-gray-100 text-blue-600 font-bold scale-110 relative z-10' : 'hover:bg-gray-50 text-gray-700'}
                            `}
                        >
                            {day}
                            {emotionColor && day !== 5 && (
                                <span className="absolute bottom-1 w-1 h-1 rounded-full" style={{ backgroundColor: emotionColor }} />
                            )}
                        </button>
                    )
                })}
              </div>
            </div>

            {/* Start Check-in Widget */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
                <button 
                  onClick={() => setIsCheckInOpen(true)}
                  className="w-full bg-[#3655ea] hover:bg-[#2845d9] text-white font-bold h-12 rounded-xl shadow-sm transition-colors"
                >
                    Start Check-in
                </button>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Last check-in:</span>
                    <span className="w-3 h-3 rounded-full bg-[#c084fc]" />
                    <span className="font-medium text-gray-700">Feeling Anxious</span>
                </div>
            </div>
          </aside>

          {/* Right Column: Weekly Trends & Day Details */}
          <div className="flex-1 w-full flex flex-col gap-6">
            
            {/* Weekly Trends */}
            <section className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6 min-h-[500px]">
                <h2 className="font-bold text-gray-900 text-xl">Your Weekly Trends</h2>
                
                <div className="flex-1 w-full">
                    {/* Custom Visual Chart (Bar Chart Approximation of the design) */}
                    <div className="w-full h-[400px] flex items-end justify-between px-4 gap-4">
                        {WEEKLY_DATA.map((data, index) => (
                            <div key={index} className="flex flex-col items-center gap-3 flex-1 h-full justify-end group cursor-pointer">
                                {/* Stacked Bars Mockup */}
                                <div className="w-full max-w-[60px] flex flex-col gap-1 h-[80%] justify-end relative">
                                    {data.emotions.map((emotion, i) => (
                                        <div 
                                            key={i}
                                            className="w-full rounded-lg transition-all hover:opacity-90 hover:scale-[1.02]"
                                            style={{ 
                                                height: `${data.values[i]}%`, 
                                                backgroundColor: getEmotionColor(emotion),
                                                boxShadow: "0px 4px 12px rgba(0,0,0,0.05)"
                                            }}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors">{data.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Footer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                        <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">Top Emotion</span>
                        <div className="text-xl font-bold text-gray-900 mt-1">Joy</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Check-in Streak</span>
                        <div className="text-xl font-bold text-gray-900 mt-1">5 Days</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Weekly Mood</span>
                        <div className="text-xl font-bold text-gray-900 mt-1">Mixed</div>
                    </div>
                </div>
            </section>

            {/* Day Details Section */}
            <section className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-gray-900 text-xl">Day Details: October 5th</h2>
                    <button 
                      onClick={() => setIsDetailsOpen(true)}
                      className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        Read more
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {DAY_DETAILS.map((detail, index) => (
                        <article key={index} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                            <div className="w-24 shrink-0">
                                <time className="text-sm font-bold text-gray-900">{detail.time}</time>
                            </div>
                            
                            <div className="w-32 shrink-0 flex items-start">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-opacity-10" style={{ backgroundColor: `${getEmotionColor(detail.emotion)}20` }}>
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getEmotionColor(detail.emotion) }} />
                                    <span className="text-sm font-medium text-gray-700">{detail.emotion}</span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {detail.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
}

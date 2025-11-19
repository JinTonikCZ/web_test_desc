import { X, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DailyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DailyDetailsModal({ isOpen, onClose }: DailyDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[1000px] w-[95vw] h-[85vh] p-0 gap-0 overflow-hidden rounded-xl bg-white flex flex-col">
        <DialogHeader className="p-4 border-b border-gray-200 flex flex-row items-center justify-between space-y-0 bg-white z-10 shrink-0">
          <DialogTitle className="text-lg font-bold text-gray-900">
            Daily Details: October 5th, 2025
          </DialogTitle>
          {/* Close button is handled by DialogClose or default close button, but custom design requested specific look */}
        </DialogHeader>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden h-full">
          {/* Left Sidebar: Emotions Breakdown */}
          <aside className="w-full md:w-[320px] shrink-0 border-b md:border-b-0 md:border-r border-gray-200 bg-white flex flex-col h-[35%] md:h-full overflow-hidden">
            <ScrollArea className="flex-1">
              <div className="p-6 flex flex-col gap-6">
                <h3 className="font-bold text-sm text-gray-900">Emotions Breakdown</h3>
                
                {/* Joy Group */}
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-xs text-gray-500">Joy</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Contentment", "Excitement", "Happiness", "Pride", "Elation", "Hope", "Pleasure", "Thrill"].map(emo => (
                      <span key={emo} className="px-3 py-1.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-md">
                        {emo}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sadness Group */}
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-xs text-gray-500">Sadness</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                      Loneliness
                    </span>
                  </div>
                </div>

                {/* Neutral Group */}
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-xs text-gray-500">Neutral</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-[#d5ceb480] text-[#5f4522] text-xs font-medium rounded-md">
                      Content
                    </span>
                  </div>
                </div>

                {/* Anxiety Group */}
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-xs text-gray-500">Anxiety</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-md">
                      Fear
                    </span>
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Footer Stats */}
            <div className="p-6 border-t border-gray-200 bg-gray-50/50 shrink-0">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Total Unique Emotions:</span> 4
                </p>
                <p className="text-sm text-gray-600">Total Entries: 11</p>
              </div>
            </div>
          </aside>

          {/* Right Content: Notes & Timeline */}
          <main className="flex-1 h-[65%] md:h-full overflow-hidden bg-gray-50/30">
            <ScrollArea className="h-full">
              <div className="p-6 md:p-8 flex flex-col gap-8">
                <h3 className="font-bold text-sm text-gray-900">Your Notes and Timeline</h3>
                
                <div className="flex flex-col gap-8 relative">
                  {/* Timeline Line (Optional visual) */}
                  <div className="absolute left-[105px] top-4 bottom-4 w-px bg-gray-200 hidden md:block"></div>

                  {/* Log Entry 1 */}
                  <article className="flex flex-col md:flex-row gap-4 relative">
                    <div className="w-full md:w-[130px] shrink-0 flex flex-row md:flex-col gap-2 md:gap-2 pt-1 justify-between md:justify-start">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <time className="text-xs font-semibold">09:15 AM</time>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                            <span className="text-sm font-medium text-blue-700">Loneliness</span>
                        </div>
                    </div>
                    <div className="flex-1 p-4 bg-white rounded-lg border border-gray-100 shadow-sm text-sm text-gray-600 leading-relaxed">
                      Feeling a bit down this morning after waking up. It's a quiet day, and I'm feeling the absence of company more than usual. Not sure why.
                    </div>
                  </article>

                  {/* Log Entry 2 */}
                  <article className="flex flex-col md:flex-row gap-4 relative">
                    <div className="w-full md:w-[130px] shrink-0 flex flex-col gap-2 pt-1">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <time className="text-xs font-semibold">02:30 PM</time>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {["Happy", "Excitement", "Pride", "Contentment", "Elation", "Hope", "Pleasure", "Thrill"].map(e => (
                                <span key={e} className="text-[10px] px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-sm">
                                    {e}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 p-4 bg-white rounded-lg border border-gray-100 shadow-sm text-sm text-gray-600 leading-relaxed">
                      It really lifted my spirits! We ended up talking for hours, catching up on everything that's happened over the past few years work, travel, life changes, all of it. It felt so nice to reconnect and realize how easy it still is to talk, just like before. We're already planning to meet up next month, and honestly, I'm feeling so much lighter and happier after that conversation. Sometimes all you need is a familiar voice and some good laughs to remind you how far you've come.
                    </div>
                  </article>

                  {/* Log Entry 3 */}
                  <article className="flex flex-col md:flex-row gap-4 relative">
                    <div className="w-full md:w-[130px] shrink-0 flex flex-row md:flex-col gap-2 md:gap-2 pt-1 justify-between md:justify-start">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <time className="text-xs font-semibold">08:00 PM</time>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#d5c7b4]"></span>
                            <span className="text-sm font-medium text-gray-700">Content</span>
                        </div>
                    </div>
                    <div className="flex-1 p-4 bg-white rounded-lg border border-gray-100 shadow-sm text-sm text-gray-600 leading-relaxed">
                      Just a calm evening watching a movie. Feeling peaceful and content with how the day turned around. Nothing special, but it's a good feeling to end the day on.
                    </div>
                  </article>

                  {/* Log Entry 4 */}
                  <article className="flex flex-col md:flex-row gap-4 relative">
                    <div className="w-full md:w-[130px] shrink-0 flex flex-row md:flex-col gap-2 md:gap-2 pt-1 justify-between md:justify-start">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <time className="text-xs font-semibold">09:00 PM</time>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                            <span className="text-sm font-medium text-purple-700">Fear</span>
                        </div>
                    </div>
                    <div className="flex-1 p-4 bg-white rounded-lg border border-gray-100 shadow-sm text-sm text-gray-600 leading-relaxed">
                      I have a panicc attack...
                    </div>
                  </article>

                </div>
              </div>
            </ScrollArea>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { BookOpen } from "lucide-react";

export default function LessonItem({ title, index, duration }) {
  return (
    <div className="w-full aspect-square flex flex-col justify-between p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-in-out cursor-pointer shadow-sm overflow-hidden">
      
      {/* Top: Icon */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 border border-white/5 flex items-center justify-center text-purple-300 flex-shrink-0">
        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      
      {/* Middle: Title & Index */}
      <div className="flex flex-col flex-1 justify-center mt-2">
        <span className="text-[9px] text-white/40 font-semibold uppercase tracking-wider mb-0.5">Materi {index}</span>
        <span className="text-xs sm:text-sm font-bold text-white/95 line-clamp-3 leading-snug">{title}</span>
      </div>
      
      {/* Bottom: Duration */}
      <div className="mt-2 flex">
        <span className="text-[9px] sm:text-[10px] text-purple-200/80 font-bold bg-purple-500/10 px-2 py-1 rounded-md border border-purple-500/20">
          {duration}
        </span>
      </div>
    </div>
  );
}

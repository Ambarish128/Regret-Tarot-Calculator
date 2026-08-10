import { Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 py-12">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-[#7C3AED]/10 text-[#7C3AED] font-medium px-3.5 py-1 rounded-full border border-[#7C3AED]/30 shadow-glow-purple text-sm">
        <Sparkles className="w-4 h-4 text-[#8B0000]" />
        <span>Welcome to Orakle</span>
      </div>

      {/* Main Hero Header */}
      <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#E2E8F0]">
        Consult the <span className="bg-[#8B0000]/20 text-[#E2E8F0] px-3 py-1 rounded-lg border border-[#8B0000]/60 inline-block shadow-glow-red">Cards</span>
      </h1>

      {/* Description */}
      <p className="max-w-xl text-lg font-normal text-[#E2E8F0]/70">
        Enter the veil. Draw from the deck to reveal what lies hidden within the shadows of your future.
      </p>

      {/* CTA Button Showcase */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        <button className="bg-[#8B0000] text-white font-semibold text-lg px-6 py-3 rounded-xl border border-[#8B0000] shadow-glow-red transition-all duration-300 hover:shadow-occult hover:scale-[1.02] flex items-center gap-2">
          <span>Start Single Card Draw</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
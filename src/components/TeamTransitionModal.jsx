import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function TeamTransitionModal({ finishedTeam, nextTeam, onStartNextTurn }) {
  return (
    <div className="max-w-xl mx-auto bg-navy-900 border-2 border-gold-500/40 rounded-2xl p-8 text-center text-white shadow-2xl">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500/20 rounded-full border border-gold-400 mb-4 text-gold-400">
        <Sparkles className="w-8 h-8" />
      </div>

      <h2 className="text-2xl font-bold text-slate-200 mb-2">Round Finished!</h2>
      <p className="text-gold-300 font-semibold text-lg mb-6">
        Great job, <span className="text-white font-extrabold">{finishedTeam.name}</span>!
      </p>

      <div className="bg-navy-800/80 border border-gold-500/30 rounded-xl p-6 mb-8">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Up Next</p>
        <h1 className="text-3xl font-black text-white">{nextTeam.name}</h1>
        <p className="text-sm text-gold-400 mt-2">Pass the phone/device to {nextTeam.name}!</p>
      </div>

      <button
        onClick={onStartNextTurn}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-extrabold py-3.5 rounded-xl shadow-xl transition-all active:scale-95 text-lg uppercase tracking-wider"
      >
        <span>Ready! Start {nextTeam.name}'s Turn</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
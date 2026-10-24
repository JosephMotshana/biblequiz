import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Handshake } from 'lucide-react';

export default function WinnerModal({ teams, onRestart }) {
  // Sort teams descending by score
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const topScore = sorted[0].score;

  // Find all teams that share the highest score
  const winners = sorted.filter((team) => team.score === topScore);
  const isDraw = winners.length > 1;

  useEffect(() => {
    // Fire confetti for winners or tied leaders
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#0B1B3D', '#ffffff', '#AA820A'],
    });
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-navy-900 border-2 border-gold-500 rounded-2xl p-8 text-center text-white shadow-2xl animate-scaleUp">
      {isDraw ? (
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-500/20 rounded-full border-2 border-gold-400 mb-4 text-gold-400">
          <Handshake className="w-10 h-10 animate-bounce" />
        </div>
      ) : (
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-500/20 rounded-full border-2 border-gold-400 mb-4 text-gold-400">
          <Trophy className="w-10 h-10 animate-bounce" />
        </div>
      )}

      {isDraw ? (
        <>
          <h1 className="text-3xl font-extrabold text-gold-300 mb-1">It's a Draw! 🤝</h1>
          <p className="text-slate-300 text-sm mb-6">We have a tie for the highest score!</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-extrabold text-gold-300 mb-1">Game Over!</h1>
          <p className="text-slate-300 text-sm mb-6">Congratulations to the winner!</p>
        </>
      )}

      {/* Top Banner */}
      <div className="bg-navy-800 border border-gold-500/40 rounded-xl p-5 mb-6">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
          {isDraw ? 'Tied Champions' : 'Champion'}
        </span>
        <h2 className="text-3xl font-black text-white mt-1">
          {isDraw ? winners.map((w) => w.name).join(' & ') : winners[0].name}
        </h2>
        <p className="text-2xl font-bold text-gold-300 mt-1">{topScore} Points</p>
      </div>

      {/* Full Leaderboard */}
      <div className="mb-8 text-left">
        <h3 className="text-sm font-bold text-gold-300 mb-3 uppercase tracking-wider">Final Standings</h3>
        <div className="space-y-2">
          {sorted.map((team, rank) => (
            <div
              key={team.id}
              className={`flex justify-between items-center p-3 rounded-lg border ${
                team.score === topScore
                  ? 'bg-gold-500/10 border-gold-400/50'
                  : 'bg-navy-800/60 border-slate-700/50'
              }`}
            >
              <span className="font-semibold text-slate-200">
                #{rank + 1} {team.name}
              </span>
              <span className="font-bold text-gold-400">{team.score} pts</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-extrabold py-3.5 rounded-xl shadow-xl transition-all active:scale-95 text-lg uppercase tracking-wider"
      >
        <RotateCcw className="w-5 h-5" />
        Play Again
      </button>
    </div>
  );
}
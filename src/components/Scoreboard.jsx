import React from 'react';
import { Trophy } from 'lucide-react';

export default function Scoreboard({ teams, currentTeamIndex, questionsPerTeam }) {
  return (
    <div className="max-w-2xl mx-auto mb-6 bg-navy-900/80 border border-gold-500/20 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-5 h-5 text-gold-400" />
        <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">Live Standings</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {teams.map((team, idx) => {
          const isCurrent = idx === currentTeamIndex;
          return (
            <div
              key={team.id}
              className={`p-3 rounded-lg border transition-all ${
                isCurrent
                  ? 'bg-gold-500/10 border-gold-400 shadow-md scale-105'
                  : 'bg-navy-800/50 border-slate-700/50 opacity-80'
              }`}
            >
              <div className="text-xs font-semibold text-slate-300 truncate">{team.name}</div>
              <div className="text-xl font-extrabold text-gold-400 mt-1">{team.score} pts</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Questions: {team.questionsAsked} / {questionsPerTeam}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
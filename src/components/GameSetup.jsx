import React, { useState } from 'react';
import { Users, BookOpen, Settings } from 'lucide-react';

export default function GameSetup({ onStartGame }) {
  const [numTeams, setNumTeams] = useState(2);
  const [questionsPerTeam, setQuestionsPerTeam] = useState(5);
  const [teamNames, setTeamNames] = useState(['Team 1', 'Team 2', 'Team 3', 'Team 4']);

  const handleNameChange = (index, value) => {
    const updated = [...teamNames];
    updated[index] = value;
    setTeamNames(updated);
  };

  const handleStart = () => {
    const activeTeams = teamNames.slice(0, numTeams).map((name, i) => ({
      id: i,
      name: name || `Team ${i + 1}`,
      score: 0,
      questionsAsked: 0,
    }));

    onStartGame({
      teams: activeTeams,
      questionsPerTeam: Number(questionsPerTeam),
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-navy-900 border border-gold-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-800 rounded-full border-2 border-gold-500 mb-3 shadow-lg">
          <BookOpen className="w-8 h-8 text-gold-400" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Bible Quiz Setup</h1>
        <p className="text-slate-300 text-sm mt-1">Configure your game settings below</p>
      </div>

      <div className="space-y-6">
        {/* Number of Teams */}
        <div>
          <label className="block text-sm font-semibold text-gold-300 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" /> Number of Teams or Individual Players
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[2, 3, 4].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setNumTeams(count)}
                className={`py-2.5 rounded-xl font-bold transition-all border ${
                  numTeams === count
                    ? 'bg-gold-500 text-navy-950 border-gold-400 shadow-lg scale-105'
                    : 'bg-navy-800 text-slate-200 border-slate-700 hover:border-gold-500/50'
                }`}
              >
                {count} {count === 1 ? 'Player' : 'Teams'}
              </button>
            ))}
          </div>
        </div>

        {/* Team Names */}
        <div>
          <label className="block text-sm font-semibold text-gold-300 mb-2">Team / Player Names</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: numTeams }).map((_, idx) => (
              <div key={idx}>
                <input
                  type="text"
                  value={teamNames[idx]}
                  onChange={(e) => handleNameChange(idx, e.target.value)}
                  placeholder={`Team ${idx + 1}`}
                  className="w-full bg-navy-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-gold-500 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Questions per team */}
        <div>
          <label className="block text-sm font-semibold text-gold-300 mb-2 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Questions Per Team
          </label>
          <select
            value={questionsPerTeam}
            onChange={(e) => setQuestionsPerTeam(e.target.value)}
            className="w-full bg-navy-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-gold-500 transition-all cursor-pointer"
          >
            <option value={3}>3 Questions each</option>
            <option value={5}>5 Questions each</option>
            <option value={8}>8 Questions each</option>
            <option value={10}>10 Questions each</option>
          </select>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full mt-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-extrabold py-3.5 px-6 rounded-xl shadow-xl transition-all transform active:scale-95 text-lg uppercase tracking-wider"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
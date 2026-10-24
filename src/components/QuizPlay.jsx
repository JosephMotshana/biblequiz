import React, { useState } from 'react';
import { CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';

export default function QuizPlay({ currentTeam, question, onAnswer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleChoice = (isCorrect) => {
    setShowAnswer(false);
    onAnswer(isCorrect);
  };

  return (
    <div className="max-w-2xl mx-auto bg-navy-900 border border-gold-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
      {/* Turn indicator banner */}
      <div className="bg-navy-800/80 border border-gold-500/40 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Current Turn</span>
          <h2 className="text-2xl font-extrabold text-white">{currentTeam.name}</h2>
        </div>
        <div className="bg-gold-500/20 border border-gold-500 text-gold-300 font-bold px-4 py-2 rounded-lg text-lg">
          Score: {currentTeam.score}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold px-3 py-1 bg-gold-500/20 text-gold-300 border border-gold-500/30 rounded-full">
            {question.category}
          </span>
          <span className="text-xs text-slate-400">ID: #{question.id}</span>
        </div>

        <p className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed mb-4">
          {question.question}
        </p>

        {/* Answer Toggle */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors font-semibold"
          >
            {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>

          {showAnswer && (
            <div className="mt-3 p-4 bg-navy-950 border border-gold-500/30 rounded-lg animate-fadeIn">
              <p className="text-sm text-slate-400 mb-1">Answer:</p>
              <p className="text-lg font-bold text-gold-300">{question.answer}</p>
              {question.reference && (
                <p className="text-xs text-slate-400 mt-1 italic">Reference: {question.reference}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleChoice(true)}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-95 text-lg"
        >
          <CheckCircle2 className="w-6 h-6" />
          Correct (+10)
        </button>

        <button
          onClick={() => handleChoice(false)}
          className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-95 text-lg"
        >
          <XCircle className="w-6 h-6" />
          Wrong (0)
        </button>
      </div>
    </div>
  );
}
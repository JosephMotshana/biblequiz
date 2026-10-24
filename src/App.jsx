import React, { useState } from 'react';
import GameSetup from './components/GameSetup';
import QuizPlay from './components/QuizPlay';
import Scoreboard from './components/Scoreboard';
import WinnerModal from './components/WinnerModal';
import TeamTransitionModal from './components/TeamTransitionModal';
import { QUESTION_BANK } from './data/questions';

// Utility function to randomly shuffle an array (Fisher-Yates Shuffle)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function App() {
  const [gameState, setGameState] = useState('SETUP'); // 'SETUP', 'PLAYING', 'TRANSITION', 'GAME_OVER'
  const [teams, setTeams] = useState([]);
  const [questionsPerTeam, setQuestionsPerTeam] = useState(5);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [questionPointer, setQuestionPointer] = useState(0);

  const handleStartGame = ({ teams: selectedTeams, questionsPerTeam: qPerTeam }) => {
    // 1. Shuffle the 100 questions randomly for this new game
    const randomized = shuffleArray(QUESTION_BANK);
    setShuffledQuestions(randomized);

    // 2. Reset turn and question pointers
    setTeams(selectedTeams);
    setQuestionsPerTeam(qPerTeam);
    setCurrentTeamIndex(0);
    setQuestionPointer(0);
    setGameState('PLAYING');
  };

  const handleAnswer = (isCorrect) => {
    const currentTeam = teams[currentTeamIndex];
    const newQuestionsAsked = currentTeam.questionsAsked + 1;
    const newScore = isCorrect ? currentTeam.score + 10 : currentTeam.score;

    // Update current team stats
    const updatedTeams = teams.map((team, idx) => {
      if (idx === currentTeamIndex) {
        return {
          ...team,
          score: newScore,
          questionsAsked: newQuestionsAsked,
        };
      }
      return team;
    });

    setTeams(updatedTeams);
    // Move to the next randomized question in the list
    setQuestionPointer((prev) => (prev + 1) % shuffledQuestions.length);

    // Check if the current team finished all their questions
    if (newQuestionsAsked >= questionsPerTeam) {
      if (currentTeamIndex + 1 < teams.length) {
        // Pause and show turn transition screen for the next team
        setGameState('TRANSITION');
      } else {
        // All teams finished! Show winner modal
        setGameState('GAME_OVER');
      }
    }
  };

  const handleStartNextTurn = () => {
    setCurrentTeamIndex((prev) => prev + 1);
    setGameState('PLAYING');
  };

  const handleRestart = () => {
    setGameState('SETUP');
    setTeams([]);
  };

  const activeTeam = teams[currentTeamIndex];
  const finishedTeam = teams[currentTeamIndex];
  const nextTeam = teams[currentTeamIndex + 1];

  return (
    <div className="min-h-screen bg-[#0B1B3D] text-slate-100 py-8 px-4">
      {gameState === 'SETUP' && <GameSetup onStartGame={handleStartGame} />}

      {gameState === 'PLAYING' && activeTeam && shuffledQuestions.length > 0 && (
        <div>
          <Scoreboard
            teams={teams}
            currentTeamIndex={currentTeamIndex}
            questionsPerTeam={questionsPerTeam}
          />
          <QuizPlay
            currentTeam={activeTeam}
            question={shuffledQuestions[questionPointer]}
            onAnswer={handleAnswer}
          />
        </div>
      )}

      {gameState === 'TRANSITION' && (
        <TeamTransitionModal
          finishedTeam={finishedTeam}
          nextTeam={nextTeam}
          onStartNextTurn={handleStartNextTurn}
        />
      )}

      {gameState === 'GAME_OVER' && (
        <WinnerModal teams={teams} onRestart={handleRestart} />
      )}
    </div>
  );
}
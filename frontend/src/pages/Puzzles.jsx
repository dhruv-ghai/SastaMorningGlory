import { useMemo, useState } from 'react';

const basePuzzles = [
  {
    id: 'scramble',
    type: 'scramble',
    prompt: 'Unscramble the newsroom word',
    answer: 'headlines'
  },
  {
    id: 'math',
    type: 'math',
    prompt: 'Fill in the missing number: 5, 9, 17, ?, 65',
    answer: '33'
  },
  {
    id: 'riddle',
    type: 'riddle',
    prompt:
      'I start with news and end with story. I show you worlds in all their glory. What am I?',
    answer: 'newspaper'
  }
];

const shuffleWord = (word) =>
  word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

const generatePuzzleState = () =>
  basePuzzles.map((puzzle) => ({
    ...puzzle,
    scrambled: puzzle.type === 'scramble' ? shuffleWord(puzzle.answer) : null
  }));

const Puzzles = () => {
  const [attempts, setAttempts] = useState({});
  const puzzles = useMemo(() => generatePuzzleState(), []);
  const [feedback, setFeedback] = useState({});

  const handleSubmit = (id, correctAnswer) => {
    const userAnswer = (attempts[id] || '').trim().toLowerCase();
    const isCorrect = userAnswer === correctAnswer;
    setFeedback((prev) => ({
      ...prev,
      [id]: isCorrect ? 'Correct! 🎉' : 'Try again!'
    }));
  };

  const handleReset = () => {
    setAttempts({});
    setFeedback({});
  };

  return (
    <div className="puzzle-page">
      <div className="container-custom">
        <div className="puzzle-page-header">
          <div>
            <p className="puzzle-kicker">Daily brain stretch</p>
            <h1>Interactive puzzles inspired by newsroom life</h1>
            <p className="puzzle-subtitle">
              Warm up your brain with quick scrambles, logic riddles and math teasers. Answers are
              checked right inside the page.
            </p>
          </div>
          <button className="puzzle-reset-btn" type="button" onClick={handleReset}>
            Reset answers
          </button>
        </div>

        <div className="puzzle-grid">
          {puzzles.map((puzzle) => (
            <div key={puzzle.id} className="puzzle-card">
              <p className="puzzle-label">{puzzle.type}</p>
              <h2>{puzzle.prompt}</h2>
              {puzzle.type === 'scramble' && (
                <p className="puzzle-scramble">{puzzle.scrambled}</p>
              )}
              <input
                type="text"
                value={attempts[puzzle.id] || ''}
                onChange={(e) =>
                  setAttempts((prev) => ({
                    ...prev,
                    [puzzle.id]: e.target.value
                  }))
                }
                placeholder="Your answer"
              />
              <div className="puzzle-actions">
                <button type="button" onClick={() => handleSubmit(puzzle.id, puzzle.answer)}>
                  Check
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFeedback((prev) => ({
                      ...prev,
                      [puzzle.id]: `Hint: ${puzzle.answer[0].toUpperCase()}...`
                    }))
                  }
                >
                  Hint
                </button>
              </div>
              {feedback[puzzle.id] && <p className="puzzle-feedback">{feedback[puzzle.id]}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Puzzles;


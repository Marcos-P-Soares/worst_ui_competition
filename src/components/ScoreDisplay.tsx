interface ScoreDisplayProps {
    scores: { [sport: string]: string };
  }
  
  export default function ScoreDisplay({ scores }: ScoreDisplayProps) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white">Pontuações dadas:</h2>
        <ul>
          {Object.entries(scores).map(([sport, score]) => (
            <li key={sport} className="text-yellow-300">
              {sport}: {score}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
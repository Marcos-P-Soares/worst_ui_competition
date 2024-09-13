interface SavedScoresProps {
    savedScores: { [sport: string]: string }[];
  }
  
  export default function SavedScores({ savedScores }: SavedScoresProps) {
    return (
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-white">Pontuações Salvas:</h2>
        <ul className="list-disc list-inside">
          {savedScores.length === 0 ? (
            <li className="text-yellow-300">Nenhuma pontuação salva ainda.</li>
          ) : (
            savedScores.map((entry, index) => (
              <li key={index} className="text-yellow-300">
                {Object.entries(entry).map(([sport, score]) => (
                  <span key={sport}>{sport}: {score}; </span>
                ))}
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
  
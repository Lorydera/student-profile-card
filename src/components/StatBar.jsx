const StatBar = ({ score, label = "Score" }) => {
  const color = score >= 80 ? "#4caf50" : score >= 60 ? "#ff9800" : "#f44336"

  return (
    <div className="statbar-container">
      <span>{label}:</span>
      <div className="statbar-track">
        <div
          className="statbar-fill"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span>{score}%</span>
    </div>
  )
}

export default StatBar

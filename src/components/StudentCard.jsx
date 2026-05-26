import Badge from "./Badge"
import StatBar from "./StatBar"

const getGrade = (score) => {
  if (score >= 90) return "A"
  if (score >= 80) return "B"
  if (score >= 70) return "C"
  if (score >= 60) return "D"
  return "F"
}

const StudentCard = ({ firstName, lastName, track, score, isActive, skills, avatar }) => {
  return (
    <div className={`student-card ${!isActive ? "inactive" : ""}`}>
      <img src={avatar} alt={`${firstName} ${lastName}`} />

      <h2>{firstName} {lastName}</h2>

      <div className="badges">
        <Badge label={track} type="track" />
        <Badge label={isActive ? "Active" : "Inactive"} type="status" />
        <Badge label={`Grade: ${getGrade(score)}`} type="grade" />
      </div>

      <StatBar score={score} />

      <div className="skills">
        {skills.length > 0
          ? skills.map((skill) => <span key={skill}>{skill}</span>)
          : <p>No skills listed yet</p>
        }
      </div>
    </div>
  )
}

export default StudentCard

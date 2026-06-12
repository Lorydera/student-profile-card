import { useState, useRef } from "react";
import Button from "./Button";

const EnrollForm = ({ tracks, onEnroll }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [track, setTrack]         = useState(tracks[0]);
  const [score, setScore]         = useState("");
  const [errors, setErrors]       = useState({});

  const emailRef    = useRef(null);
  const isActiveRef = useRef(null);

  const validate = () => {
    const errs = {};
    if (!firstName.trim()) errs.firstName = "First name is required.";
    if (!lastName.trim())  errs.lastName  = "Last name is required.";
    const s = Number(score);
    if (score === "" || isNaN(s) || s < 0 || s > 100)
      errs.score = "Score must be a number between 0 and 100.";
    if (!emailRef.current?.value.includes("@"))
      errs.email = "Enter a valid email address.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onEnroll({
      id:       `student-${Date.now()}`,
      firstName,
      lastName,
      email:    emailRef.current.value,
      track,
      score:    Number(score),
      isActive: isActiveRef.current?.checked ?? true,
      avatar:   `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
    });

    setFirstName("");
    setLastName("");
    setTrack(tracks[0]);
    setScore("");
    setErrors({});

    if (emailRef.current)    emailRef.current.value      = "";
    if (isActiveRef.current) isActiveRef.current.checked = false;
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <section className="enroll-form">
      <h2>Enroll New Student</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="field">
            <label>First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Amara"
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          <div className="field">
            <label>Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Johnson"
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>

          <div className="field">
            <label>Track</label>
            <select aria-label="Track" value={track} onChange={(e) => setTrack(e.target.value)}>
              {tracks.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Score</label>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="0–100"
              min="0"
              max="100"
            />
            {errors.score && <span className="error">{errors.score}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label>Email <em>(uncontrolled)</em></label>
            <input
              type="email"
              ref={emailRef}
              defaultValue=""
              placeholder="you@example.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="field field-checkbox">
            <label>
              <input type="checkbox" ref={isActiveRef} defaultChecked={false} />
              Active <em>(uncontrolled)</em>
            </label>
          </div>
        </div>

        {(firstName || lastName) && (
          <p className="preview">
            Preview: {`${firstName} ${lastName}`.trim()} — {track}
            {score && ` (${score})`}
          </p>
        )}

        <Button
          title="Enroll"
          onClick={() => {}}
          className={hasErrors ? "btn-disabled" : "btn-primary"}
        />
      </form>
    </section>
  );
};

export default EnrollForm;

// Styling method: Material UI
import { useState, useRef, useEffect } from "react";
import {
  TextField, Select, MenuItem, Button,
  Grid, FormControl, InputLabel, FormHelperText, Typography, Box,
} from "@mui/material";

const EnrollForm = ({ tracks, onEnroll }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [track,     setTrack]     = useState(tracks[0]);
  const [score,     setScore]     = useState("");
  const [errors,    setErrors]    = useState({});

  const emailRef    = useRef(null);
  const isActiveRef = useRef(null);
  const firstNameRef = useRef(null);

  // Auto-focus first name on mount (Step 7)
  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  const validate = () => {
    const errs = {};
    if (!firstName.trim()) errs.firstName = "First name is required.";
    if (!lastName.trim())  errs.lastName  = "Last name is required.";
    const s = Number(score);
    if (score === "" || isNaN(s) || s < 0 || s > 100)
      errs.score = "Score must be 0–100.";
    if (!emailRef.current?.value.includes("@"))
      errs.email = "Enter a valid email.";
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
    <Box component="section" sx={{ background: "#fff", borderRadius: 2, p: 3, mb: 3, boxShadow: 1 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Enroll New Student</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          {/* Controlled inputs */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              inputRef={firstNameRef}
              placeholder="Amara"
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              placeholder="Johnson"
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Track</InputLabel>
              <Select
                value={track}
                label="Track"
                onChange={(e) => setTrack(e.target.value)}
              >
                {tracks.map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Score"
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              error={!!errors.score}
              helperText={errors.score}
              inputProps={{ min: 0, max: 100 }}
              placeholder="0–100"
              size="small"
            />
          </Grid>

          {/* Uncontrolled inputs */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email (uncontrolled)"
              type="email"
              inputRef={emailRef}
              defaultValue=""
              error={!!errors.email}
              helperText={errors.email}
              placeholder="you@example.com"
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <input type="checkbox" ref={isActiveRef} defaultChecked={false} id="isActive" />
            <label htmlFor="isActive" style={{ fontSize: "0.9rem" }}>
              Active <em>(uncontrolled)</em>
            </label>
          </Grid>
        </Grid>

        {(firstName || lastName) && (
          <Typography sx={{ mt: 2, color: "#2c6e49", background: "#eafaf1", px: 1.5, py: 0.5, borderRadius: 1, fontSize: "0.9rem" }}>
            Preview: {`${firstName} ${lastName}`.trim()} — {track}{score && ` (${score})`}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={hasErrors}
          sx={{ mt: 2, background: "#1a1a2e", "&:hover": { background: "#16213e" } }}
        >
          Enroll
        </Button>
      </Box>
    </Box>
  );
};

export default EnrollForm;

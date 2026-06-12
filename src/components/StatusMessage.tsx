const MESSAGES = {
  loading: "Loading student roster...",
  error: "Failed to load roster. Showing local data only.",
};

const StatusMessage = ({ type }: { type: "loading" | "error" }) => (
  <p className={`status-message status-${type}`}>{MESSAGES[type]}</p>
);

export default StatusMessage;

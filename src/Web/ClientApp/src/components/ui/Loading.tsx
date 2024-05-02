import { CircularProgress } from "@mui/material";

export const Loading: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="flex gap-3 text-center justify-center">
      <h1>{message || "loading data"}</h1>
      <CircularProgress style={{ color: "black" }} />;
    </div>
  );
};

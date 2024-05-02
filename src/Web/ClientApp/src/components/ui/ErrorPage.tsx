export const ErrorPage: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl text-red-dark">ERROR</h1>
      <p>{message}</p>
      <p>{!message && "Something went wrong ... TRY AGAIN ⚠️"}</p>
    </div>
  );
};

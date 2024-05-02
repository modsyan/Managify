import { LoginForm } from "../features/authentication/login-form";

export const Login: React.FC<{ className?: string }> = ({ className }) => {
  // console.log(import.meta.env.VITE_API_URL);

  return (
    <div className={`min-h-screen  flex items-center h-full ${className}`}>
      {/* Use apiUrl as needed */}
      <LoginForm className="h-[600px] mx-7" />
    </div>
  );
};

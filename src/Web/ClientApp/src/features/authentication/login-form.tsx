import { useState } from "react";
import { Button, Input, Password, Title } from "rizzui";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const LoginForm: React.FC<{ className?: string }> = ({ className }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate(); // Get the navigate function

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, username: e.target.value });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    if (form.username === "admin" && form.password === "admin") {
      login();
      console.log(isAuthenticated);
      navigate("/dashboard"); // Navigate to the dashboard after successful login
    }

    console.log("submit");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-gray-100 grid grid-cols-3 h-96 justify-center w-full rounded-lg shadow-lg gap-3 ${className}`}
    >
      <div className="flex flex-col gap-4 p-3 justify-center">
        <Title as="h3">تسجيل الدخول</Title>
        <Input placeholder="ادخل اسم المستخدم" onChange={handleUsername} />
        <Password placeholder="ادخل كلمة السر" onChange={handlePassword} />
        <Button type="submit">تسجيل الدخول</Button>
      </div>
      <div className="flex flex-col gap-5 col-span-2 bg-gray-300 justify-center items-center">
        <img
          src="https://cdn.discordapp.com/attachments/1171845001391652998/1183454844539904070/logo-9470000000000.PNG?ex=659ada36&is=65886536&hm=a19c533455e2a1da1bc49646675b0d7bd74fd99bfbc2e6df4d18390d5c38b58c&"
          alt="logo"
          className="w-40"
        />
        <Title as="h3">أهلا بعودتكم 🙋‍♂️</Title>
        <p className="font-bold">
          شركة المعادي للصيانة Maadi Maintenance Company ترحب بكم ونتمنى لكم
          يوما سعيدا
        </p>
      </div>
    </form>
  );
};

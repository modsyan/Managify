export type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  jwt: string;
  created_at: string;
  updated_at: string;
};
export type UserContextProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

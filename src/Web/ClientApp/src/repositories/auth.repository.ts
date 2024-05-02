import axios from "axios";

class AuthRepository {
  async login(email: string, password: string) {
    const user = await axios.post("/api/auth/login", { email, password });
    return user;
  }
}

export { AuthRepository }

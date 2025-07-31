import User from "../../models/User";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export default AuthContextType;
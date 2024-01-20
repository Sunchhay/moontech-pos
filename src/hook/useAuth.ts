import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
    return useContext<any>(AuthContext);
}

export default useAuth;
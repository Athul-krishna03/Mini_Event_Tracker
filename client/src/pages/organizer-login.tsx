import LoginForm from "@/components/common/Login"
import {login} from "@/services/api"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function OrganizerLogin() {
    const navigate = useNavigate()
    const handleOrganizerLogin = async (data: { email: string; password: string; role: string }) => {
        const response = await login(data)
        localStorage.setItem("user", JSON.stringify(response.user));
        if(response){
            toast.success("login Successfully!!")
            navigate('/dashboard')
        }else{
            toast.error("Login failed. Please check your credentials.")
        }
    }

    return <LoginForm role="organizer" onSubmit={handleOrganizerLogin} />
}

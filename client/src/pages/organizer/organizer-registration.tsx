"use client"

import RegistrationForm from "@/components/common/Registration"
import {register} from "@/services/api"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export default function OrganizerRegistration() {
    const navigate = useNavigate()
    const handleRegistration = async (data: {
        name: string
        email: string
        password: string
        phone: string
        role: string
    }) => {
        const response = await register(data)
        if(response) {
            toast.success("Registration successful! Please log in.")
            navigate("/")

        }
    }

    return <RegistrationForm role="organizer" onSubmit={handleRegistration} />
}

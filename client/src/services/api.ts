import { api } from "@/api/auth.axios";
import { axiosInstance } from "@/api/private.axios";
import { AUTH_ROUTES, PRIVATE_ROUTES } from "@/constants/routeConstants";
import type { User } from "@/types/user.types";

export const register = async (data: User) =>{
    const response = await api.post(AUTH_ROUTES.REGISTER, data)
    return response.data
};
export const login = async (data: { email: string; password: string }) => {
    const response =await api.post(AUTH_ROUTES.LOGIN, data)
    return response.data
};
export const logoutUser = async () => {
    const response = await api.post(AUTH_ROUTES.LOGOUT);
    return response.data;
};
export const fetchEvents = async (status: string) => {
    const { data } = await axiosInstance.get(PRIVATE_ROUTES.GET_ALL, {
        params: { status },
    });
    return data;
};

export const fetchEventById = async (eventId: string) => {
    const { data } = await axiosInstance.get(`${PRIVATE_ROUTES.GET_ONE(eventId)}`);
    return data;
};

export const createEvent = async (data: any) => {
    const response = await axiosInstance.post(PRIVATE_ROUTES.CREATE, data);
    return response.data;
};

export const fetchPersonsByRole = async (role: "attendee" | "judge" | "guest", eventId: string) => {
    const { data } = await axiosInstance.get(`${PRIVATE_ROUTES.GET_PERSON}`, {
        params: { role, eventId },
    });
    return data;
};

export const addPerson = async (newPerson: { name: string; email: string; role:string,eventId:string }) => {
    const response = await axiosInstance.post(`${PRIVATE_ROUTES.ADD_PERSON}`, newPerson);
    return response.data;
}
export const verifyTicket = async (data: { eventId?: string; personId?: string;file?: File}) => {
    if(data.file) {
        const formData = new FormData();
        formData.append("file", data.file);
        const response = await axiosInstance.post(PRIVATE_ROUTES.VERIFY_TICKET, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
    else{
        const response = await axiosInstance.patch(PRIVATE_ROUTES.VERIFY_TICKET, data);
        return response.data;
    }
};

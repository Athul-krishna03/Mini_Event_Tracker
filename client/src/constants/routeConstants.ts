const BASE="api/auth"
const PVT_BASE="api/private"
export const AUTH_ROUTES={
    REGISTER:`/${BASE}/register`,
    LOGIN: `/${BASE}/login`,
    LOGOUT: `/${BASE}/logout`
}

export const PRIVATE_ROUTES = {
    GET_ALL: `/${PVT_BASE}/events`,
    GET_ONE: (id: string) => `/${PVT_BASE}/getevent/${id}`,
    CREATE: `/${PVT_BASE}/addEvent`,
    GET_PERSON: `/${PVT_BASE}/getPerson`,
    ADD_PERSON: `/${PVT_BASE}/addPerson`,
    VERIFY_TICKET: `/${PVT_BASE}/verifyTicket`
};
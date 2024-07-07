export async function fetchCredentials() {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/fetchAuth`, { credentials: "include" });
        const response = await res.json();
        return response;
}

export async function logout() {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/user/logout`, { method: 'POST', credentials: "include" });
    return;
}
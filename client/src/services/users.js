export async function fetchCredentials() {
        const res = await fetch('http://localhost:3000/user/fetchAuth', { credentials: "include" });
        const response = await res.json();
        return response;
}

export async function logout() {
    await fetch('http://localhost:3000/user/logout', { method: 'POST', credentials: "include" });
    return;
}
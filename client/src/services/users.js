export async function checkAuth(){
    const res = await fetch('http://localhost:3000/login/check-auth',{credentials: "include"});
    const response = await res.json();
    return response.isAuthenticated;
}
export async function fetchCredentials(){
    const res = await fetch('http://localhost:3000/login/fetchAuth',{credentials: "include"});
    const response = await res.json();
    return response;
}
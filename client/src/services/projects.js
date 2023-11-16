export async function submitCreateProjectForm(projectName, provider){
    await fetch('http://localhost:3000/projects',{
        method: 'POST',
        credentials: 'include',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify({projectName: projectName, provider: provider})
    })
}

export async function getProjects() {
    const response = await fetch('http://localhost:3000/projects', {credentials: 'include'});
    const projectList = await response.json();
    return projectList;   // {id, name, provider}
}

export async function getReposList(){
    const response = await fetch('http://localhost:3000/github/repos', {credentials: 'include'});
    const repoList = await response.json();
    return repoList.map((repo)=>repo.name);
}
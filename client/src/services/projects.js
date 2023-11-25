export async function createProject(projectName, provider, repoLink){
    const body = {projectName: projectName, provider: provider}
    if(repoLink){
        body.repoLink = repoLink;
    }
    const response = await fetch('http://localhost:3000/projects',{
        method: 'POST',
        credentials: 'include',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    const project = await response.json();
    return {id: project._id,projectName: project.name, provider:project.provider};
}

export async function getProjects() {
    const response = await fetch('http://localhost:3000/projects', {credentials: 'include'});
    const projectList = await response.json();
    return projectList;   // {id, projectName, provider, repoLink}
}

export async function getReposList(){
    const response = await fetch('http://localhost:3000/github/repos', {credentials: 'include'});
    const repoList = await response.json();
    return repoList.map((repo)=>({name: repo.name, repoLink: repo.html_url}));
}
export async function submitCreateProjectForm(projectName){
    await fetch('http://localhost:3000/projects',{
        method: 'POST',
        credentials: 'include',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify({projectName: projectName})
    })
}

export async function getProjects() {
    const response = await fetch('http://localhost:3000/projects', {credentials: 'include'});
    const projectList = await response.json();
    return projectList;
}
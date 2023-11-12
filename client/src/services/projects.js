export async function submitCreateProjectForm(projectName){
    await fetch('http://localhost:3000/projects',{
        method: 'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify({projectName: projectName})
    })
}

export async function getProjects() {
    const response = await fetch('http://localhost:3000/projects');
    const projectList = await response.json();
    return projectList;
}
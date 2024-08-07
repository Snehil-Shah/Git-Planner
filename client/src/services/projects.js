export async function createProject(projectName, provider, repoLink) {
    const body = { projectName: projectName, provider: provider }
    if (repoLink) {
        body.repoLink = repoLink;
    }
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/projects`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    const project = await response.json();
    return { id: project._id, projectName: project.name, provider: project.provider, repoLink: project.repoLink };
}

export async function getProjects() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/projects`, { credentials: 'include' });
    const projectList = await response.json();
    return projectList;   // {id, projectName, provider, repoLink}
}

export async function deleteProject(projectId) {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/projects/${projectId}`, { method: 'DELETE', credentials: 'include' });
}

export async function getReposList() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/github/repos`, { credentials: 'include' });
    const repoList = await response.json();
    return repoList.map((repo) => ({ name: repo.name, repoLink: repo.html_url }));
}

export async function getGithubProjects() {
    const repoList = await getReposList();
    const projectList = await getProjects();
    const projectNames = projectList.map(project => project.projectName);
    return repoList.map((gitProject) => ({
        name: gitProject.name,
        link: gitProject.repoLink,
        alreadyCreated: projectNames.includes(gitProject.name)
    }))
}
export async function createTask(projectId, taskName, taskDescription, linkedIssue) {
  const body = { projectId: projectId, taskName: taskName, taskDescription: taskDescription }
  if (linkedIssue.name) {
    body.linkedIssue = linkedIssue;
  }
  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}

export async function getTasks(projectId) {
  if (projectId != null) {
    const response = await fetch(`http://localhost:3000/projects/${projectId}`, { credentials: 'include' });
    const projectTasks = await response.json();
    return projectTasks;
  }
  return [];
}

export async function deleteTask(projectId, taskId) {
  await fetch('http://localhost:3000/tasks', {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      projectId: projectId,
      taskId: taskId
    })
  })
}

export async function editTask(taskId, editDetails){
  const body = {task: editDetails.taskName, description: editDetails.taskDescription, githubIssue: editDetails.linkedIssue}
  await fetch(`http://localhost:3000/tasks/${taskId}`,{
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}

export async function getIssuesList(repoName) {
  if (repoName != null) {
    const response = await fetch(`http://localhost:3000/github/${repoName}/issues`, { credentials: 'include' });
    const issueList = await response.json();
    return (issueList.length ? issueList.map((issue) => ({ id: issue.number, name: issue.title, link: issue.html_url })) : issueList);
  }
}
export async function submitTodoForm(projectId, taskName, taskDescription, linkedIssue) {
  const body = { projectId: projectId, taskName: taskName, taskDescription: taskDescription }
  console.log(linkedIssue)
  if (linkedIssue) {
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
    const response = await fetch(`http://localhost:3000/projects/${projectId}`,{credentials: 'include'});
    const projectTasks = await response.json();
    return projectTasks;
  }
  return [{ _id: null, task: null }];
}

export async function deleteTask(projectId, taskId){
  await fetch('http://localhost:3000/tasks',{
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      projectId: projectId,
      taskId: taskId
    })
  })
}

export async function getIssuesList(repoName){
  if (repoName != null){
  const response = await fetch(`http://localhost:3000/github/${repoName}/issues`, {credentials: 'include'});
  const issueList = await response.json();
  return issueList.map((issue)=>({id: issue.number, name: issue.title}));}
}
export async function submitTodoForm(projectId, taskName) {
  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId: projectId, taskName: taskName })
  })
}

export async function getTasks(projectId) {
  if (projectId != '0') {
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
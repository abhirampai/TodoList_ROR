json.task do
  json.extract! @task,
    :id,
    :slug,
    :title

  json.assigned_user do
    json.id @task.user.id
    json.name @task.user.name
  end

  json.assigned_project do
    json.id @task.project.id
    json.project_name @task.project.project_name
  end

 json.comments @comments do |comment|
    json.extract! comment,
      :id,
      :content,
      :created_at
  end

  json.task_creator @task_creator
end

json.task @tasks do |task|
  json.extract! task,
  "title",
  "progress"

  json.user do
    json.extract! task["user"],
    "name"
  end
end

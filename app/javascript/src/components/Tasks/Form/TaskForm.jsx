import React from "react";
import Button from "components/Button";
import Input from "components/Input";
import Select from "react-select";

const TaskForm = ({
  type = "create",
  title,
  setTitle,
  assignedUser,
  users,
  projects,
  assignedProject,
  setUserId,
  setProjectId,
  loading,
  handleSubmit
}) => {
  const userOptions = users.map(user => ({
    value: user.id,
    label: user.name
  }));

  const projectOptions = projects.map(project => ({
    value: project.id,
    label: project.project_name
  }));
  const userDefaultOption = {
    value: assignedUser?.id,
    label: assignedUser?.name
  };

  const projectDefaultOption = {
    value: assignedProject?.id,
    label: assignedProject?.project_name
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Todo Title (Max 50 Characters Allowed)"
        value={title}
        onChange={e => setTitle(e.target.value.slice(0, 50))}
      />
      <div className="flex flex-row items-center justify-start mt-3">
        <p className="w-3/12 leading-5 text-gray-800 text-md">Assigned To: </p>
        <div className="w-full">
          <Select
            options={userOptions}
            defaultValue={userDefaultOption}
            onChange={e => setUserId(e.value)}
            isSearchable
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-start mt-3">
        <p className="w-3/12 leading-5 text-gray-800 text-md">Project: </p>
        <div className="w-full">
          <Select
            options={projectOptions}
            defaultValue={projectDefaultOption}
            onChange={e => setProjectId(e.value)}
            isSearchable
          />
        </div>
      </div>
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Task" : "Update Task"}
        loading={loading}
      />
    </form>
  );
};

export default TaskForm;

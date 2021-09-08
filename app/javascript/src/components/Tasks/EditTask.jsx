import React, { useState, useEffect } from "react";
import tasksApi from "apis/tasks";
import usersApi from "apis/users";
import projectsApi from "apis/projects";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import { useParams } from "react-router-dom";

import TaskForm from "./Form/TaskForm";

const EditTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedProject, setAssignedProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await tasksApi.update({
        slug,
        payload: {
          task: { title, user_id: userId, project_id: projectId }
        }
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchUserAndProjectDetails = async () => {
    try {
      const response = await usersApi.list();
      const projectResponse = await projectsApi.list();
      setUsers(response.data.users);
      setProjects(projectResponse.data.projects);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const response = await tasksApi.show(slug);
      setTitle(response.data.task.title);
      setAssignedUser(response.data.task.assigned_user);
      setUserId(response.data.task.assigned_user.id);
      setAssignedProject(response.data.task.assigned_project);
      setProjectId(response.data.task.assigned_project.id);
    } catch (error) {
      logger.error(error);
    }
  };

  const loadData = async () => {
    await fetchTaskDetails();
    await fetchUserAndProjectDetails();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <TaskForm
        type="update"
        title={title}
        users={users}
        projects={projects}
        assignedProject={assignedProject}
        setProjectId={setProjectId}
        assignedUser={assignedUser}
        setTitle={setTitle}
        setUserId={setUserId}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditTask;

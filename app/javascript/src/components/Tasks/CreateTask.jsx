import React, { useState, useEffect } from "react";
import Container from "components/Container";
import TaskForm from "./Form/TaskForm";
import PageLoader from "components/PageLoader";
import tasksApi from "apis/tasks";
import usersApi from "apis/users";
import projectsApi from "../../apis/projects";

const CreateTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await tasksApi.create({
        task: { title, user_id: userId, project_id: projectId }
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchUserAndProjectDetails = async () => {
    try {
      const userApiResponse = await usersApi.list();
      const projectApiResponse = await projectsApi.list();
      setUsers(userApiResponse.data.users);
      setUserId(userApiResponse.data.users[0].id);
      setProjects(projectApiResponse.data.projects);
      setProjectId(projectApiResponse.data.projects[0].id);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndProjectDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <TaskForm
        setTitle={setTitle}
        setUserId={setUserId}
        assignedUser={users[0]}
        setProjectId={setProjectId}
        assignedProject={projects[0]}
        loading={loading}
        handleSubmit={handleSubmit}
        users={users}
        projects={projects}
      />
    </Container>
  );
};

export default CreateTask;

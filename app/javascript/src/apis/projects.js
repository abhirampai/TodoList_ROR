import axios from "axios";

const list = () => axios.get("/projects");
const show = project_name => axios.get(`/projects/${project_name}`);

const projectsApi = {
  list,
  show
};

export default projectsApi;

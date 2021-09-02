import axios from "axios";

const list = () => axios.get("/projects");

const projectsApi = {
  list
};

export default projectsApi;

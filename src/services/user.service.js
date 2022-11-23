import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "home");
  }

  getStudentBoard() {
    return axios.get(API_URL + "student", { headers: authHeader() });
  }

  getTeacherBoard() {
    return axios.get(API_URL + "teacher", { headers: authHeader() });
  }

  getAssistantBoard() {
    return axios.get(API_URL + "assistant", { headers: authHeader() });
  }
}

export default new UserService();

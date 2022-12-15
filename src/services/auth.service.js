import axios from "axios";

const API_URL = "http://localhost:8000/api/user";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/login", { email, password })
      .then((response) => {
        if (response.data.content["accessToken"]) {
          localStorage.setItem("user", JSON.stringify(response.data.content));
        }
        return response.data.content;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, name, email, password) {
    return axios.post(API_URL + "/signup", {
      username,
      name,
      email,
      password,
    });
  }
}

export default new AuthService();

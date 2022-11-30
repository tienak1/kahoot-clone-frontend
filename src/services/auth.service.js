import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        console.log();

        if (response.data.content["accessToken"]) {
          localStorage.setItem("email", JSON.stringify(response.data.content));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("email");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();

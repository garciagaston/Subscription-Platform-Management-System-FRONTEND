import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/auth";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.data.token) {
          console.log("RESPONSE:", response.data.data);
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        return response.data.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "/register", {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password,
    });
  }
}

export default new AuthService();

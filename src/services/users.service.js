import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/v1/users";

class UsersService {
  async getAll(index, perPage) {
    return axios
      .get(API_URL + "/?page=" + index + "&per_page=" + perPage, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  async getUser(userId) {
    return axios
      .get(API_URL + "/" + userId, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async createUser(userData) {
    return axios
      .post(API_URL, userData, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async editUser(userId, userData) {
    return axios
      .put(API_URL + "/" + userId, userData, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  async deleteUser(userId) {
    return axios
      .delete(API_URL + "/" + userId, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}
export default new UsersService();

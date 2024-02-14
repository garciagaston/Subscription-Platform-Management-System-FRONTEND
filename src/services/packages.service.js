import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/v1/packages";

class PackageService {
  async getAll(index, perPage) {
    return axios
      .get(API_URL + "/?page=" + index + "&per_page=" + perPage, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  async getPackage(packageId) {
    return axios
      .get(API_URL + "/" + packageId, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async editPackage(packageId, packageData) {
    return axios
      .put(API_URL + "/" + packageId, packageData, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new PackageService();

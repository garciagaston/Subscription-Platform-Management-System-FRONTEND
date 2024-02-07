import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/v1/packages";

class PackageService {
  getAll() {
    return axios.get(API_URL + "/", { headers: authHeader() });
  }

  getPackage(packageId) {
    return axios.get(API_URL + "/" + packageId, { headers: authHeader() });
  }
}

export default new PackageService();

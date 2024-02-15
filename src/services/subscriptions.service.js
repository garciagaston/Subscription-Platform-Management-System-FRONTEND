import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/v1/subscriptions";

class SubscriptionService {
  async getAll(index, perPage) {
    return axios
      .get(API_URL + "/?page=" + index + "&per_page=" + perPage, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  async getSubscription(subscriptionId) {
    return axios
      .get(API_URL + "/" + subscriptionId, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async createSubscription(subscriptionData) {
    return axios
      .post(API_URL, subscriptionData, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async editSubscription(subscriptionId, subscriptionData) {
    return axios
      .put(API_URL + "/" + subscriptionId, subscriptionData, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  async deleteSubscription(subscriptionId) {
    return axios
      .delete(API_URL + "/" + subscriptionId, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new SubscriptionService();

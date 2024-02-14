import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/v1/channels";

class ChannelService {
  async getAll(index, perPage) {
    return axios
      .get(API_URL + "/?page=" + index + "&per_page=" + perPage, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  async getChannel(channelId) {
    return axios
      .get(API_URL + "/" + channelId, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async createChannel(channelData) {
    return axios
      .post(API_URL, channelData, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async editChannel(channelId, channelData) {
    return axios
      .put(API_URL + "/" + channelId, channelData, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async deleteChannel(channelId) {
    return axios
      .delete(API_URL + "/" + channelId, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new ChannelService();

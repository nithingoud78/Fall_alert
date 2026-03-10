import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getAlerts = () => API.get("/api/alerts");

export const createAlert = (data) => API.post("/api/alert", data);
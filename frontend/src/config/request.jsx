import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
export const requestGet = async () => {
  const res = await request.get("/");
  return res;
};
export default request;


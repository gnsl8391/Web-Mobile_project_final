import axios from "axios";

export default baseURL => {
  return axios.create({
    baseURL: baseURL,
    withCredentials: false,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "PRIVATE-TOKEN": "9dQtfnA8W3LENyT4Smcq"
    }
  });
};

import instance from "../utils/axios";
import { errorMessageWrite } from "../utils/errorMessageWrite";

export const loginUser = async ({ eposta, parola }) => {
  return await instance
    .post("/CoreUser/GirisYap", { eposta, parola })
    .then((res) => res.data);
};

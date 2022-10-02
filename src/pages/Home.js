import { Box, Button, Input } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../api/userApi";
import { useFormik } from "formik";
import validationSchema from "../utils/validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { errorMessageWrite } from "../utils/errorMessageWrite";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const redirect = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      loginSubmit(values);
    },
    validationSchema,
  });

  const loginSubmit = async (values) => {
    setLoading(true);
    await loginUser({ eposta: values.email, parola: values.password })
      .then((response) => {
        sessionStorage.setItem("accessToken", response.token);
        toast(response?.message || "Başarılı", {
          type: "success",
        });
        redirect("/talepler");
      })
      .catch((errorResponse) => {
        toast(errorMessageWrite(errorResponse), {
          type: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box w="30%" margin={"auto"} mt="50px">
      <form onSubmit={handleSubmit}>
        <Input
          type={"email"}
          name="email"
          bg="gray.200"
          mb="20px"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          type={"password"}
          name="password"
          bg="gray.200"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button type="submit" mt="20px" isLoading={loading}>
          Login
        </Button>
      </form>
    </Box>
  );
};
export default Home;

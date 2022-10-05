import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { loginUser } from "../api/userApi";
import { useFormik } from "formik";
import { loginValidate } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../utils/helpers";

const loginSubmit = async ({
  values,
  redirect,
  errors,
  setValues,
  setLoading,
}) => {
  setLoading(true);
  const { status, response } = await sendRequest(
    loginUser({ eposta: values.email, parola: values.password }),
    {
      errors,
      setValues,
    }
  );
  if (status) {
    sessionStorage.setItem("accessToken", response.token);
    redirect("/talepler");
  }
  setLoading(false);
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const redirect = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, errors, setValues } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        loginSubmit({
          values,
          errors,
          setValues,
          setLoading,
          redirect,
        });
      },
      validationSchema: loginValidate,
    });

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

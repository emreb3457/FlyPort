import { Box, Button, Input } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../actions/userActions"
import { useFormik } from "formik";
import validationSchema from "../utils/validation";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const Home = () => {

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            onSubmit: (values) => {
                dispatch(loginUser({ email: values.email, password: values.password }))
            },
            validationSchema,
        });

    const redirect = useNavigate();
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector(state => state.user);

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: "CLEAR_ERROR" })
        }
        if (success) {
            redirect("talepler")
            dispatch({ type: "CLEAR_SUCCESS" })
        }
    }, [success, error])


    return (
        <Box w="30%" margin={"auto"} mt="50px">
            <form onSubmit={handleSubmit}>
                <Input type={"email"} name="email" bg="gray.200" mb="20px" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                <Input type={"password"} name="password" bg="gray.200" placeholder="Password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                <Button type="submit" mt="20px">Login</Button>
            </form>
        </Box>
    )
}
export default Home
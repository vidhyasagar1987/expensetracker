import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addUser, getLoginUser } from "../redux/slices/loginslice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { email, password, loginLoading, loginError } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email("Invalid").required("Required"),
    password: yup.string().min(6, "Min 6").required("Required"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email,
      password,
    },
    onSubmit: async (values) => {
      dispatch(addUser(values));
      const resultAction = await dispatch(getLoginUser(values));
      if (getLoginUser.fulfilled.match(resultAction)) {
        navigate("/dashboard");
        formik.resetForm()
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Email"
        />
        {formik.touched.email && formik.errors.email && (
          <p>{formik.errors.email}</p>
        )}
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Password"
        />
        {formik.touched.password && formik.errors.password && (
          <p>{formik.errors.password}</p>
        )}

        <button type="submit" disabled={loginLoading}>
          {loginLoading ? "Submitting" : "Login"}
        </button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
};

export default Login;

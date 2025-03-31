import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addUser, getLoginUser } from "../redux/slices/loginslice";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputFiled";
import "../css/login.css";
import GlobalButton from "../components/GlobalButton";
import { toast } from "react-toastify";
import { LoginIcon } from "../utils/icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../assets/logo.jpg";

const Login = () => {
  const { email, password, loginLoading, loginError } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (loginError) {
      toast.error(loginError);
    }
  }, [loginError]);

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
        formik.resetForm();
      }
    },
  });

  return (
    <div className="login-container">
      <div className="login-form-container">
        <img src={Logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please log in to access your account</p>

        {loginError && <p className="login-error">{loginError}</p>}

        <form onSubmit={formik.handleSubmit} className="login-form">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="john@example.com"
            required
            errorMessage={formik.touched.email && formik.errors.email}
          />
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="......"
            required
            errorMessage={formik.touched.password && formik.errors.password}
            icon={
              <div
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            }
          />

          <GlobalButton
            buttonType="primary"
            onClick={formik.handleSubmit}
            disabled={loginLoading}
            icon={LoginIcon}
            type="submit"
            loading={loginLoading}
            // className="global-button"
          >
            {loginLoading ? "Submitting..." : "Login"}
          </GlobalButton>
        </form>
      </div>
    </div>
  );
};

export default Login;

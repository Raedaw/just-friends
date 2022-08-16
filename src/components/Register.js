import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, registerWithEmailAndPassword } from "../utils/firebase";
import "../Styles/Register.css";
import { sub } from "date-fns/fp";

const schema = yup.object().shape({
  firstname: yup.string().required().min(2),
  surname: yup.string().required().min(2),
  email: yup.string().email().required(),
  dob: yup
    .date()
    .required()
    .max(sub({ years: 18 }, new Date()), "Must be over 18 years old"),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

function Register() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) =>
    registerWithEmailAndPassword(
      data.firstname,
      data.surname,
      data.email,
      data.password
    );

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/area");
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container">
        <img
          className="login_logoForReg"
          alt="just friends logo"
          src={require("../Just-friends_images/just-friends_logo.png")}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="register__textBox"
            placeholder="First Name"
            {...register("firstname")}
            aria-label="first name"
            aria-required="true"
            aria-invalid={errors.firstname ? "true" : "false"}
            aria-describedby="error-firstname-required error-firstname-minLength"
          />
          <p className="error-msg" role="alert">
            {errors.firstname?.message}
          </p>
          <input
            type="text"
            className="register__textBox"
            placeholder="Surname"
            {...register("surname")}
            aria-label="surname"
            aria-required="true"
            aria-invalid={errors.surname ? "true" : "false"}
            aria-describedby="error-surname-required error-surname-minLength"
          />
          <p className="error-msg" role="alert">
            {errors.surname?.message}
          </p>
          <input
            type="text"
            className="register__textBox"
            placeholder="E-mail Address"
            {...register("email")}
            aria-label="email address"
            aria-required="true"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby="error-email-required"
          />
          <p role="alert">{errors.email?.message}</p>
          <p>{errors.email?.message}</p>
         
          <label className="dateOfBirthLabel">D.O.B</label>

          <input
            type="date"
            className="register__textBox"
            placeholder="Date of birth"
            {...register("dob")}
            aria-label="date of birth"
            aria-required="true"
            aria-invalid={errors.dob ? "true" : "false"}
          />
          <p className="error-msg" role="alert">
            {errors.dob?.message}
          </p>

          <input
            type="password"
            className="register__textBox"
            placeholder="Password"
            {...register("password")}
            aria-label="password"
            aria-required="true"
            aria-invalid={errors.password ? "true" : "false"}
          />

          <p className="error-msg" role="alert">
            {errors.password?.message}
          </p>
          <input
            type="password"
            className="register__textBox"
            placeholder="Confirm password"
            {...register("confirmPassword")}
            aria-label="confirm password"
            aria-required="true"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />
          <p className="error-msg" role="alert">
            {errors.confirmPassword?.message && "Passwords must match"}
          </p>
          <input type="submit" className="register__btn" />
        </form>

        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;

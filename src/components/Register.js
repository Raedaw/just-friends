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
          className="login_logo"
          alt="just friends logo"
          src={require("../Just-friends_images/just-friends_logo.png")}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="register__textBox"
            placeholder="First Name"
            {...register("firstname")}
          />
          <p>{errors.firstname?.message}</p>
          <input
            type="text"
            className="register__textBox"
            placeholder="Surname"
            {...register("surname")}
          />
          <p>{errors.surname?.message}</p>
          <input
            type="text"
            className="register__textBox"
            placeholder="E-mail Address"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
          <label className="dateOfBirthLabel">D.O.B</label>
          <br/>
          <input
            type="date"
            className="register__textBox"
            placeholder="Date of birth"
            {...register("dob")}
          />
          <p>{errors.dob?.message}</p>

          <input
            type="password"
            className="register__textBox"
            placeholder="Password"
            {...register("password")}
          />

          <p>{errors.password?.message}</p>
          <input
            type="password"
            className="register__textBox"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          <p>{errors.confirmPassword?.message && "Passwords must match"}</p>
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

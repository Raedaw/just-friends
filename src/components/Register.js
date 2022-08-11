import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, registerWithEmailAndPassword } from "../utils/firebase";
import "../Styles/Register.css";

const schema = yup.object().shape({
  firstname: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
  passwordConf: yup.string().oneOf([yup.ref("password"), null]),
});

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data);
  };
  console.log(errors);
  const navigate = useNavigate();
  // const register = () => {
  //   if (!firstname) alert("Please enter name");
  //   registerWithEmailAndPassword(firstname, surname, email, password);
  // };
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
        <form onSubmit={handleSubmit(submitForm)}>
          <input
            type="text"
            className="register__textBox"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First Name"
            ref={register}
          />
          {/* <p>{errors.firstname?.message}</p> */}
          <input
            type="text"
            className="register__textBox"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Surname"
            ref={register}
          />
          <p>{errors.lastname?.message}</p>
          <input
            type="text"
            className="register__textBox"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            ref={register}
          />
          <p>{errors.email?.message}</p>
          <input
            type="password"
            className="register__textBox"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            ref={register}
          />
          <p>{errors.password?.message}</p>
          <input
            type="password"
            className="register__textBox"
            name="passwordConf"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
            placeholder="Confirm password"
            ref={register}
          />
          <p>{errors.passwordConf && "Passwords must match"}</p>
        </form>
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;

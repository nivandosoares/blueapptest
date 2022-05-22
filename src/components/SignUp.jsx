import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import "./Form.scss";

const signInSchema = Yup.object().shape({
  email: Yup.string().required("Este campo não pode ficar vazio"),
  password: Yup.string()
    .required("Este campo não pode ficar vazio")
    .min(6, "Senha muito curta, deve ter ao menos 6 caracteres")
});

//Documentação mais completa no componente Login.jsx
const initialValues = { name: "", password: "" };
const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:4000/user/cadaster", {
            method: "POST",
            body: JSON.stringify({
              name: name,
              password: password
            }),
            
          });
          if (res.status === 200) {
            setName("");
            setPassword("");
            alert("new user created!");
          } else {
            alert(res.why);
          }
        } catch (err) {
          console.log(err);
        }
    };
    
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => {
        const { errors, touched} = formik;
        return (
          <div className="container">
            <h1>Crie sua conta</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="name">Username</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className={
                    errors.name && touched.name ? "input-error" : null
                  }
                />
                <ErrorMessage name="name" component="span" className="error" />
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>

              <button
                type="submit"
              >
                Cadastre se
              </button>
                </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default SignUp;

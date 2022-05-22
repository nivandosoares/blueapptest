import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState} from "react";
import { Link } from "react-router-dom";
import "./Form.scss";


//Craindo o Schema de validação do Yup
const signInSchema = Yup.object().shape({
  email: Yup.string().required("Este campo não pode ficar vazio"),
  password: Yup.string()
    .required("Este campo não pode ficar vazio")
    .min(6, "Senha muito curta, deve ter ao menos 6 caracteres")
});
const initialValues = { name: "", password: "" };

//Iniciando o React Component
const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
  
  //Requisição POST pós conclusão do formulário
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              name: name,
              password: password
            })
            
          });
    //Observação: a API retorna o status -200- OK em todas as requisições, 
    //eu sou noob demais demais pra contestar com argumentos bem fundamentados mas não curti muito
          if (res.status === 200) {
            setName("");
            setPassword("");
            console.log(res);
        } else {
          alert('User not found in database')
        }
        } catch (err) {
          console.log(err);
        }
    };
    
  return (
    //Formulário com Formik pra criar as regras de preenchimento 
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <h1>Faça Login para continuar</h1>
            <form onSubmit={handleSubmit} noValidate>
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
                Entrar
              </button>
                </form>
                <p>Ainda não tem uma conta? <Link to={"/signup"}>Cadastre-se</Link></p>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;

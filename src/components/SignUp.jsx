import React, { useState, useEffect } from "react";
import "./Form.scss";
import { Link } from "react-router-dom";

const Form = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const intialValues = { name: "", password: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = () => {
    console.log(formValues);
  };

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    try {
      let res = await fetch("http://localhost:4000/user/cadaster", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          password: password,
        }),
      });

      if (res.status === 200) {
        setName("");
        setPassword("");
        setIsSubmitting(true);
        alert('User sueccessfully created, you can login with this now')
    
    } else {
      setIsSubmitting(false);
    
    }
    } catch (err) {
      console.log(err);
    }
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Campo obrigatório";
    } 

    if (!values.password) {
      errors.password = "Campo obrigatório";
    } else if (values.password.length < 6) {
      errors.password = "Senha muito curta";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmitting && (
        <span className="success-msg">Usuário criado com sucesso, você pode <Link to={"/"}>Fazer login agora</Link></span>
      )}
      {Object.keys(formErrors).length !== 0 && isSubmitting && (
        <span className="error-msg">Ops! algum erro ocorreu durante o envio dos dados, por favor tente novamente</span>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formValues.name}
            onChange={handleChange}
            className={formErrors.name && "input-error"}
          />
          {formErrors.name && (
<span className="error">{formErrors.name}</span>
)}
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
            className={formErrors.password && "input-error"}
          />
          {formErrors.password && (
            <span className="error">{formErrors.password}</span>
          )}
        </div>

        <button type="submit">Cadastre-se</button>

        
      </form>
    </div>
  );
};

export default Form;

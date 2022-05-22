import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Form.scss";
const Form = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const intialValues = { name: "", password: "" };
  const [message, setMessage] = useState("");
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
  let handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    try {
      let res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          password: password
        }),
        
      });

      if (res.status === 200) {
        setName("");
        setPassword("");
    } else {
      alert('User not foun in database')
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
      errors.email = "Campo obrigatório";
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
        <span className="success-msg">Form submitted successfully</span>
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

        <button type="submit">Log In</button>

        <p>Ainda não tem uma conta? <Link to={"/signup"}>Cadastre-se</Link></p>

      </form>
    </div>
  );
};

export default Form;

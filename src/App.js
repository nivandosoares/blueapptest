import "./components/Form.scss";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./components/Welcome";

import Login from "./components/Login";

import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

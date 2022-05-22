import "./App.css";
import { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordconfirm) {
      setMessage("The passwords dont match");
    } else {
      try {
        let res = await fetch("https://localhost:4000/user/cadaster", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            password: password,
          }),
        });
        if (res.status === 200) {
          setName("");
          setPassword("");
          setMessage("User created successfully");
        } else {
          setMessage("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Create a password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          value={passwordconfirm}
          placeholder="Confirm your password"
          required
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default SignUp;

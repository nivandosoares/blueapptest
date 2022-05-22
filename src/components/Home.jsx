import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
return (
	<div>
	<h1>Home Page</h1>
	<br />
	<ul>
		<li>
		<Link to="/login">Login</Link>
		</li>
		<li>
		<Link to="/signup">Create an account</Link>
		</li>
		
	</ul>
	</div>
);
};

export default Home;

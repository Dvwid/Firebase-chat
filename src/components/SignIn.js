import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Avatar from "../icons/avatar.svg";
import Lock from "../icons/lock.svg";
import Google from "../icons/google.svg";
import db from "../firebase.config";

const SignIn = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setError] = useState("");
	const provider = new firebase.auth.GoogleAuthProvider();

	const handleSignin = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				const user = result.user;
				props.login(user);
			})
			.catch((e) => {
				setError(e.message);
			});
	};

	const handleGoogleSignIn = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				const user = result.user;
				const userObj = {
					displayName: user.displayName,
					photoURL: user.photoURL,
					userId: user.uid,
					userEmail: user.email,
				};
				db.ref(`/users`).push(userObj);
				console.log("Ty bucu");
				props.login(user);
			})
			.catch((error) => {
				const errorMessage = error.message;
				setError(errorMessage);
			});
	};

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
			<div className="flex flex-col w-11/12 bg-white rounded-xl shadow-xl md:w-2/4 lg:w-1/4">
				<h1 className="text-4xl font-bold mt-20 self-center">Login</h1>
				<form onSubmit={handleSignin} className="flex flex-col mt-20 mx-10 ">
					<label className="flex flex-col items-start">
						<p className="text-xs mb-2">Email</p>
						<div className="flex items-center justify-center w-full">
							<img src={Avatar} className="h-5 mb-3" alt="Avatar" />
							<input
								onChange={(e) => {
									setEmail(e.target.value);
									setError(null);
								}}
								name="username"
								value={email}
								className="border-b-2 border-gray-300 h-10 w-full mb-5 px-2 ml-2 text-xs outline-none"
								placeholder="Type your email"
								autoComplete="username"
							/>
						</div>
					</label>
					<label className="flex flex-col items-start">
						<p className="text-xs mb-2">Password</p>
						<div className="flex items-center justify-center w-full">
							<img src={Lock} className="h-5" alt="Lock" />
							<input
								onChange={(e) => {
									setPassword(e.target.value);
									setError(null);
								}}
								name="password"
								value={password}
								className="border-b-2 border-gray-300 h-10 w-full px-2 ml-2 text-xs outline-none"
								placeholder="Type your password"
								type="password"
								autoComplete="current-password"
							/>
						</div>
					</label>

					<button className="bg-gradient-to-r from-blue-300 to-blue-500 hover:from-pink-500 mt-8 h-10 rounded-3xl text-white">
						Login
					</button>
					{errorMessage ? (
						<p className="text-xs text-red-400 mt-5">{errorMessage}</p>
					) : null}
				</form>

				{/* <div className="flex flex-col items-center">
					<p className="text-xs mt-10">Or Sign Up Using</p>
					<img
						src={Google}
						onClick={handleGoogleSignIn}
						className="h-10 my-5"
						alt="Google"
					/>
				</div> */}

				<p className="text-xs self-center mt-5">Not registered yet?</p>

				<Link
					to="/register"
					className="mt-2 mb-10 font-bold text-blue-400 text-center hover:text-pink-400"
				>
					SIGN UP
				</Link>
			</div>
		</div>
	);
};

export default SignIn;

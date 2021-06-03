import { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Avatar from "../icons/avatar.svg";
import Lock from "../icons/lock.svg";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccess] = useState("");

	const handleCreateUser = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				console.log(res.user);
				setSuccess("You have successfully created an account!");
				setEmail("");
				setPassword("");
			})
			.catch((e) => {
				setErrorMessage(e.message);
			});
	};

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
			<div className="flex flex-col w-11/12 bg-white rounded-xl shadow-xl md:w-2/4 lg:w-1/4">
				<h1 className="text-4xl font-bold mt-20 self-center">Sign up</h1>
				<form className="flex flex-col mt-20 mx-10">
					<div className="text-xs text-green-400 mb-2">
						{successMessage ? (
							<div>
								<span className="mr-1">{successMessage}</span>
								<Link to="/" className="text-purple-300">
									Sign in
								</Link>
							</div>
						) : null}
					</div>
					<label className="flex flex-col items-start">
						<p className="text-xs mb-2">Email</p>
						<div className="flex items-center justify-center w-full">
							<img src={Avatar} className="h-5 mb-3" alt="Avatar" />
							<input
								name="username"
								className="border-b-2 border-gray-300 h-10 w-full mb-5 px-2 ml-2 text-xs outline-none"
								placeholder="Type your email"
								value={email}
								autoComplete="username"
								onChange={(e) => {
									setEmail(e.target.value);
									setErrorMessage("");
								}}
							/>
						</div>
					</label>
					<label className="flex flex-col items-start">
						<p className="text-xs mb-2">Password</p>
						<div className="flex items-center justify-center w-full">
							<img src={Lock} className="h-5" alt="Lock" />
							<input
								name="password"
								className="border-b-2 border-gray-300 h-10 w-full px-2 ml-2 text-xs outline-none"
								placeholder="Type your password"
								type="password"
								autoComplete="new-password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									setErrorMessage("");
								}}
							/>
						</div>
					</label>

					<button
						type="submit"
						onClick={handleCreateUser}
						className="bg-gradient-to-r from-blue-300 to-blue-500 hover:from-pink-500 mt-8 h-10 rounded-3xl text-white"
					>
						Sign up
					</button>
					{errorMessage ? (
						<p className="text-xs text-red-400 mt-5">{errorMessage}</p>
					) : null}
				</form>

				<p className="text-xs self-center mt-5">You are already registered?</p>

				<Link
					to="/"
					className="mt-2 mb-10 font-bold text-blue-400 text-center hover:text-pink-400"
				>
					SIGN IN
				</Link>
			</div>
		</div>
	);
};

export default Register;

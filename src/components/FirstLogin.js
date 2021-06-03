import React, { useState } from "react";
import firebase from "firebase/app";
import db from "../firebase.config";
import { ReactComponent as Right } from "../icons/right.svg";
import { ReactComponent as Left } from "../icons/left.svg";

const FirstLogin = ({ setFirstLogin }) => {
	const userData = firebase.auth().currentUser;
	const [avatarCounter, setCounter] = useState(0);
	const [nickname, setNickname] = useState("");
	const [error, setError] = useState(null);

	const avatars = [
		"https://firebasestorage.googleapis.com/v0/b/chat-fece6.appspot.com/o/1.png?alt=media&token=2620f90f-b613-462d-a74b-9a9aa2354a74",
		"https://firebasestorage.googleapis.com/v0/b/chat-fece6.appspot.com/o/10.png?alt=media&token=1cea89fd-dbf2-42a3-afb9-af6d170ec8a5",
		"https://firebasestorage.googleapis.com/v0/b/chat-fece6.appspot.com/o/2.png?alt=media&token=c8c7aaef-c650-4d9d-bee5-882ddacb0edb",
		"https://firebasestorage.googleapis.com/v0/b/chat-fece6.appspot.com/o/3.png?alt=media&token=22d2686a-36ba-4d24-8969-6501bfd92db0",
		"https://firebasestorage.googleapis.com/v0/b/chat-fece6.appspot.com/o/4.png?alt=media&token=39fb7493-21d6-47ac-b267-b9b32952886f",
		"https://firebasestorage.googleapis.com/v0/b/chat-fece6.appspot.com/o/5.png?alt=media&token=301f0521-47ed-4a36-bdc5-7854e8a85fab",
		"https://firebasestorage.googleapis.com/v0/b/chat-fece6.appspot.com/o/6.png?alt=media&token=5e7add8b-8f39-4d45-93db-fa1269dd8508",
		"https://firebasestorage.googleapis.com/v0/b/chat-fece6.appspot.com/o/7.png?alt=media&token=5d2b2a56-80c8-46f9-8955-f9624b31aa9d",
		"https://firebasestorage.googleapis.com/v0/b/chat-fece6.appspot.com/o/8.png?alt=media&token=19f69ced-b7c0-4332-b05d-3a141bb0024f",
		"https://firebasestorage.googleapis.com/v0/b/chat-fece6.appspot.com/o/9.png?alt=media&token=20fd2d75-d018-4e32-8d44-273b44560de6",
	];

	const handleUpdateUser = (e) => {
		e.preventDefault();
		userData
			.updateProfile({
				displayName: `${nickname}`,
				photoURL: `${avatars[avatarCounter]}`,
			})
			.then(() => {
				setFirstLogin(false);
			})
			.catch((error) => {
				setError(error.message);
			});

		const userObj = {
			displayName: `${nickname}`,
			photoURL: `${avatars[avatarCounter]}`,
			userId: userData.uid,
			userEmail: userData.email.toLowerCase(),
		};

		db.ref(`/users`).push(userObj);
	};

	return (
		<div className="w-full h-screen flex justify-center">
			<div className="flex flex-col items-center w-full justify-between p-10">
				<div>
					<h1 className="text-4xl text-white mt-5 font-bold text-center">
						Hello!
					</h1>
					<p className="text-2xl text-white text-center mt-5">
						Are you here for the first time?
					</p>
				</div>
				<div className="flex flex-col items-center">
					<p className="mt-14 text-xl text-white">Select your avatar</p>

					<div className="mt-5 flex items-center justify-center w-full text-3xl font-bold text-gray-700 fill-current ">
						{avatarCounter > 0 ? (
							<Left
								className="w-12 transition duration-500  hover:text-blue-400"
								onClick={() => {
									setCounter(avatarCounter - 1);
								}}
							/>
						) : (
							<div className="w-12 h-12"></div>
						)}

						<img
							src={avatars[avatarCounter]}
							alt="avatar"
							className="h-36 rounded-full shadow-xl"
						/>
						{avatarCounter < avatars.length - 1 ? (
							<Right
								className="w-12 transition duration-500  hover:text-gray-600 hover:text-blue-400 "
								onClick={() => {
									setCounter(avatarCounter + 1);
								}}
							/>
						) : (
							<div className="w-12 h-12"></div>
						)}
					</div>
					<input
						className="h-10 mt-10 px-2 outline-none text-center rounded-md shadow-xl text-blue-400 placeholder-blue-400"
						placeholder="Insert your nickname"
						maxLength="15"
						value={nickname}
						onChange={(e) => {
							setError("");
							setNickname(e.target.value);
						}}
					/>
					<p className="text-xs mt-2 text-red-300">{error ? error : null}</p>
				</div>

				<button
					onClick={(e) => {
						if (nickname) {
							handleUpdateUser(e);
						} else {
							setError("Please enter your nickname");
						}
					}}
					className="h-10 mt-10 w-48 rounded-full shadow-xl text-white bg-gradient-to-r from-blue-300 to-blue-500 hover:from-pink-500"
				>
					Let's start
				</button>
			</div>
		</div>
	);
};

export default FirstLogin;

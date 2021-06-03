import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import Photo from "../icons/photo.svg";
import Pencil from "../icons/pencil.svg";
import Moon from "../icons/moon.svg";
import Logout from "../icons/logout.svg";
import EditProfile from "./EditProfile";

const ProfilePage = ({ logout, activeUserKey, theme, setTheme }) => {
	const userData = firebase.auth().currentUser;
	const [darkModeSwitch, setDarkModeSwitch] = useState("flex-start");
	const [isEditing, setIsEditing] = useState(null);

	useEffect(() => {
		if (theme === "dark") {
			setDarkModeSwitch("flex-end");
		} else {
			setDarkModeSwitch("flex-start");
		}
	});

	const handleUpdateNickname = (e) => {
		userData
			.updateProfile({
				displayName: "S I M P S O N",
				photoURL: ``,
			})
			.then(function () {
				// Update successful.
			})
			.catch(function (error) {
				// An error happened.
			});
	};

	return isEditing ? (
		<EditProfile
			editing={isEditing}
			back={setIsEditing}
			currentUser={userData}
			activeUserKey={activeUserKey}
		/>
	) : (
		<div className="w-full h-screen flex justify-center">
			<div className="flex flex-col w-11/12 md:w-2/4 lg:w-1/4 bg-white m-5 rounded-xl p-5 justify-between shadow-xl relative dark:bg-gray-800 dark:text-gray-500">
				<div className="absolute bg-gradient-to-r from-purple-300 to-blue-400 h-36 w-full -m-5 rounded-tl-xl rounded-tr-xl shadow-xl z-0 dark: bg-gradient-to-l dark:from-purple-900 dark:to-gray-700"></div>
				<div>
					<Link to="/" className="text-white z-10 absolute dark:text-gray-500">
						{"< BACK"}
					</Link>
					<div className="flex flex-col items-center mt-14">
						<div className="h-32 w-32 relative">
							<img
								src={userData.photoURL}
								className="h-32 w-32 rounded-full absolute shadow-xl"
								alt="userImage"
							/>
							<img
								src={Photo}
								alt="Camera"
								className="h-7 w-7 absolute right-0 bottom-0 cursor-pointer"
								onClick={() => {
									setIsEditing("img");
								}}
							/>
						</div>
						<p className="text-4xl mt-5">{userData.displayName}</p>
						<p className="mt-1 text-blue-500 dark:text-gray-300">
							{userData.email}
						</p>
					</div>
					<div className="flex items-center justify-between mt-20">
						<div className="flex">
							<img src={Moon} alt="Moon" className="w-5 h-5" />
							<p className="ml-2">Dark mode</p>
						</div>
						<div
							className="flex items-center transition-all w-14 h-8 bg-blue-300 rounded-full dark:bg-gray-500"
							style={{
								justifyContent: `${darkModeSwitch}`,
							}}
							onClick={() => {
								if (darkModeSwitch === "flex-start") {
									setDarkModeSwitch("flex-end");
									setTheme("dark");
									localStorage.theme = "dark";
									document.documentElement.classList.add("dark");
								} else {
									setDarkModeSwitch("flex-start");
									setTheme("light");
									localStorage.theme = "light";
									document.documentElement.classList.remove("dark");
								}
							}}
						>
							<div className="h-6 w-6 bg-white rounded-full mx-1 dark:bg-gray-800"></div>
						</div>
					</div>
					<div
						className="flex items-center mt-3 cursor-pointer"
						onClick={() => {
							setIsEditing("nickname");
						}}
					>
						<img src={Pencil} alt="pencil" className="h-5 w-5" />
						<p className="ml-2">Change nickname</p>
					</div>
				</div>
				<div>
					<div
						className="flex items-center mt-3"
						onClick={() => {
							logout();
						}}
					>
						<img src={Logout} alt="doors" className="h-5 w-5" />
						<p className="ml-2 text-red-500 dark:text-red-300">Logout</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;

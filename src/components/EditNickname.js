import React, { useState } from "react";
import db from "../firebase.config";

const EditNickname = ({ currentUser, activeUserKey, back }) => {
	const [newNickname, setNewNickname] = useState("");

	const handleUpdateNickname = () => {
		currentUser
			.updateProfile({
				displayName: `${newNickname}`,
			})
			.then(function () {
				back(null);
			})
			.catch(function (error) {
				console.log(error.message);
			});

		db.ref(`/users/${activeUserKey}`).update({
			displayName: `${newNickname}`,
		});
	};

	return (
		<>
			<div className="absolute bg-gradient-to-l bg-gradient-to-r from-purple-300 to-blue-400 h-20 w-full rounded-tl-xl rounded-tr-xl shadow-xl z-0 -mx-5 top-0 dark:from-blue-900 dark:to-gray-800"></div>
			<div className="flex flex-col h-full relative mt-5">
				<h1 className="self-end text-2xl text-white dark:text-gray-500">
					Change nickname
				</h1>

				<div className="flex flex-col w-full h-full items-center overflow-auto mt-10 dark:text-gray-500">
					<p>Current nickname</p>
					<p className="text-3xl">{currentUser.displayName}</p>

					<p className="mt-20">New nickname</p>
					<input
						type="text"
						className="w-3/4 mt-2 h-10 px-4 text-center text-blue-400 border border-blue-400 rounded-full outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500 "
						placeholder="Insert a new nick"
						maxLength="15"
						value={newNickname}
						onChange={(e) => {
							setNewNickname(e.target.value);
						}}
					></input>
				</div>
				<button
					onClick={() => {
						if (newNickname) {
							handleUpdateNickname();
						}
					}}
					className="my-4 w-full h-14 rounded-xl bg-gradient-to-r from-blue-300 to-blue-500 hover:from-pink-500 text-white outline-none dark:from-blue-800 dark:to-blue-900 dark:text-gray-400"
				>
					Confirm changes
				</button>
			</div>
		</>
	);
};

export default EditNickname;

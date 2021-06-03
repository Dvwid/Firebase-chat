import React, { useEffect, useState } from "react";
import Avatars from "../avatars";
import db from "../firebase.config";

const EditProfileImg = ({ currentUser, back, activeUserKey }) => {
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(null);

	const handleSetActive = (e) => {
		const id = e.target.id;
		setSelectedIndex(id);
		setSelectedAvatarUrl(Avatars[id].url);
	};

	const handleUpdateAvatar = () => {
		if (selectedIndex && setSelectedAvatarUrl) {
			currentUser
				.updateProfile({
					photoURL: `${selectedAvatarUrl}`,
				})
				.then(function () {
					back(null);
				})
				.catch(function (error) {
					console.log(error.message);
				});

			db.ref(`/users/${activeUserKey}`).update({
				photoURL: `${selectedAvatarUrl}`,
			});
		} else {
			console.log("Select avatar!");
		}
	};
	const avatars = Avatars.map((item) => (
		<img
			key={item.id}
			id={item.id}
			src={item.url}
			alt="avatar"
			onClick={(e) => {
				handleSetActive(e);
			}}
			className={
				selectedIndex == item.id
					? "h-28 mx-2 mt-5 border-4 border-pink-300"
					: "h-28 mx-2 mt-5"
			}
		/>
	));

	return (
		<>
			<div className="absolute bg-gradient-to-l bg-gradient-to-r from-purple-300 to-blue-400 h-20 w-full rounded-tl-xl rounded-tr-xl shadow-xl z-0 -mx-5 top-0 dark:from-blue-900 dark:to-gray-800 "></div>
			<div className="flex flex-col h-full relative mt-5">
				<h1 className="self-end text-2xl text-white dark:text-gray-400">
					Change avatar
				</h1>

				<div className="flex w-full h-full flex-wrap justify-around overflow-auto mt-2">
					{avatars}
				</div>
				<button
					onClick={() => {
						handleUpdateAvatar();
					}}
					className="my-4 w-full h-14 rounded-xl bg-gradient-to-r from-blue-300 to-blue-500 hover:from-pink-500 text-white outline-none dark:from-blue-800 dark:to-blue-900 dark:text-gray-400"
				>
					Confirm changes
				</button>
			</div>
		</>
	);
};

export default EditProfileImg;

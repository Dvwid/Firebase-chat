import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import db from "../firebase.config";
import Messages from "./Messages";

const Channel = ({ selectFriend, friend }) => {
	const [content, setContent] = useState("");
	const [allMessages, setMessages] = useState([]);
	const currentUser = firebase.auth().currentUser;

	useEffect(() => {
		db.ref("/messages").on("value", (snapshot) => {
			const getMessages = snapshot.val();
			const convertedMessages = Object.entries(getMessages || {}).map(
				([id, message]) => ({
					...message,
					id,
				})
			);

			setMessages(convertedMessages);
		});
	}, []);

	const sendMessage = () => {
		const messageObj = {
			content,
			timestamp: Date.now(),
			userId_1: currentUser.uid,
			userId_2: friend.userId,
		};
		db.ref(`/messages`)
			.push(messageObj)
			.then(() => {
				console.log("Message sent");
			})
			.catch((error) => {
				console.log(error);
			});

		setContent("");
	};

	return (
		<div className="w-full h-screen flex flex-col items-center p-5 ">
			<div className="flex flex-col justify-between w-full h-screen bg-white rounded-xl p-5 shadow-xl md:w-2/4 lg:w-1/4 relative dark:bg-gray-700">
				<div className="absolute left-0 top-0 w-full h-16 w-full rounded-tl-xl rounded-tr-xl shadow-xl z-10 bg-gradient-to-l bg-gradient-to-r from-purple-300 to-blue-400 dark:from-blue-900 dark:to-gray-800 "></div>
				<div className="flex justify-between items-center mb-5 relative z-20 ">
					<button
						onClick={() => {
							selectFriend(null);
						}}
						className="text-white dark:text-gray-300"
					>
						{"< BACK"}
					</button>
					<div className="flex items-center">
						<p className="text-xs text-white font-bold dark:text-gray-300">
							{friend.displayName}
						</p>
						<img
							src={friend.photoURL}
							alt="friend"
							className="w-8 h-8 ml-4 rounded-full"
						/>
					</div>
				</div>
				<div>
					<Messages
						messages={allMessages}
						currentUser={currentUser}
						friend={friend}
						sendMessage={sendMessage}
					/>
				</div>

				<form
					className="flex w-full"
					onSubmit={(e) => {
						e.preventDefault();
						if (content) sendMessage();
					}}
				>
					<input
						value={content}
						onChange={(e) => {
							setContent(e.target.value);
						}}
						className="flex text-xs h-8 border w-8/12 mr-2 rounded-xl px-3 outline-none text-blue-500 border-blue-500 resize-none dark:bg-gray-800 dark:border-gray-800 dark:text-gray-500"
					></input>
					<button
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							if (content) sendMessage();
						}}
						className="w-4/12 bg-blue-500 rounded-full h-8 text-white text-xs focus:outline-none dark:text-gray-900"
					>
						SEND
					</button>
				</form>
			</div>
		</div>
	);
};

export default Channel;

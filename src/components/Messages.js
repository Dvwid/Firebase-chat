import React, { useEffect, useRef } from "react";

const Messages = ({ messages, currentUser, friend }) => {
	const filteredMessages = messages.map(
		({ userId_1, userId_2, content, timestamp, id }) => {
			const time = new Date(timestamp);
			const hours = time.getHours();
			const minutes = time.getMinutes();

			if (userId_2 === currentUser.uid) {
				if (userId_1 === friend.userId) {
					return (
						<div key={id} className="flex mb-2 items-end">
							<img
								src={friend.photoURL}
								className="w-8 h-8 mr-2 rounded-full"
								alt="friend"
							/>
							<p className="mr-5 rounded-tl-xl rounded-tr-xl rounded-br-xl px-3 py-2 bg-gradient-to-r bg-gradient-to-r from-blue-400 to-purple-300 text-xs text-white break-all dark:from-gray-800 dark:to-gray-900 dark:text-gray-500">
								{content}
							</p>
							<p className="font-mono text-xs text-blue-200 self-center dark:text-gray-500">{`${
								hours < 10 ? "0" + hours : hours
							}:${minutes < 10 ? "0" + minutes : minutes}`}</p>
						</div>
					);
				}
			} else if (userId_1 === currentUser.uid) {
				if (userId_2 === friend.userId) {
					return (
						<div
							key={id}
							className="flex justify-end mb-2 items-center text-white"
						>
							<p className="font-mono text-xs text-blue-200 self-center dark:text-gray-500">{`${
								hours < 10 ? "0" + hours : hours
							}:${minutes < 10 ? "0" + minutes : minutes}`}</p>
							<p className="text-right ml-5 rounded-tl-xl rounded-tr-xl rounded-bl-xl px-3 py-2 bg-gradient-to-l bg-gradient-to-r from-purple-300 to-blue-400 text-xs break-all dark:from-gray-800 dark:to-gray-900 dark:text-gray-500">
								{content}
							</p>
						</div>
					);
				}
			}
			return null;
		}
	);

	const messagesEndRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView();
	};
	// { behavior: "smooth" } add this if want a smooth scrolling
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="mb-6 h-max overflow-auto">
			{filteredMessages}
			<div ref={messagesEndRef} />
		</div>
	);
};

export default Messages;

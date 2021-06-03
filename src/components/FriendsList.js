import React from "react";
const FriendsList = ({ friends, selectFriend }) => {
	const allFriends = [];

	if (friends) {
		allFriends.push(friends[0][0]);
	}

	allFriends.forEach((el) => {
		friends.forEach((obj) => {
			if (el.id === obj[0].id) {
				return null;
			} else {
				allFriends.push(obj[0]);
			}
		});
	});

	const friendElement = allFriends.map((homie) => (
		<div
			key={homie.id}
			onClick={() => {
				selectFriend(homie);
			}}
			className="flex w-full h-10 mt-2 bg-gradient-to-r from-blue-400 to-purple-300 items-center justify-between rounded-full text-white shadow-md dark:from-gray-800 dark:to-gray-900 dark:text-gray-500"
		>
			<div className="w-10 h-10 rounded-full overflow-hidden">
				<img
					src={homie.photoURL}
					alt="friend"
					className="w-10 h-10 justify-self-start"
				></img>
			</div>
			<p className="ml-5 w-8/12 text-center ">{homie.displayName}</p>
			<span className="mr-5">X</span>
		</div>
	));

	return friendElement ? (
		<div className="h-5/6 overflow-auto">{friendElement}</div>
	) : null;
};

export default FriendsList;

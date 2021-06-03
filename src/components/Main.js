import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FirstLogin from "./FirstLogin";
import FriendsList from "./FriendsList";
import db from "../firebase.config";
import Channel from "./Channel";

const Main = ({
	firstLogin,
	setFirstLogin,
	allUsers,
	user,
	activeUserObj,
	activeUserKey,
	logout,
}) => {
	const [matchedFriends, matchFriends] = useState();
	const [friendEmail, setFriendEmail] = useState();
	const [selectedFriend, setSelectedFriend] = useState(null);

	const addNewFriend = () => {
		let emailIsCorrect = false;

		const match = allUsers.filter((us) => {
			return us.userEmail === friendEmail;
		});

		if (match.length > 0) {
			emailIsCorrect = true;
		} else {
			emailIsCorrect = false;
		}

		if (emailIsCorrect) {
			if (activeUserObj.friends) {
				db.ref(`/users/${activeUserKey}`).update({
					friends: [...activeUserObj.friends, friendEmail],
				});
			} else {
				db.ref(`/users/${activeUserKey}`).update({
					friends: [friendEmail],
				});
			}
		}
	};
	useEffect(() => {
		if (activeUserObj && activeUserObj.friends) {
			const all = activeUserObj.friends.map((friend) => {
				const matched = allUsers.filter((us) => {
					return us.userEmail === friend;
				});
				return matched;
			});
			matchFriends(all);
		}
	}, [activeUserObj, allUsers]);

	return firstLogin ? (
		<FirstLogin user={user} logout={logout} setFirstLogin={setFirstLogin} />
	) : selectedFriend ? (
		<Channel selectFriend={setSelectedFriend} friend={selectedFriend} />
	) : (
		<div className="w-full h-screen flex flex-col items-center justify-center p-5">
			<div className="w-full h-full bg-white rounded-xl p-5 md:w-2/4 lg:w-1/4 relative dark:bg-gray-700">
				{activeUserObj ? (
					<div className="flex w-full h-full flex-col">
						<div className="absolute h-16 w-full left-0 top-0 bg-blue-500 rounded-tl-xl rounded-tr-xl z-0 shadow-md bg-gradient-to-l from-purple-300 to-blue-400 dark:from-blue-900 dark:to-gray-800"></div>

						<div className="flex justify-between items-center relative z-10">
							<Link to="/profile">
								<img
									src={activeUserObj.photoURL}
									className="w-8 h-8 rounded-full"
									alt="user"
								></img>
							</Link>

							<span className="flex dark:text-gray-400">
								<p className="mr-1">Hello</p>
								<p className="font-bold">{activeUserObj.displayName}</p>
							</span>
						</div>

						<form
							className="flex mt-5"
							onSubmit={(e) => {
								e.preventDefault();
								addNewFriend();
							}}
						>
							<input
								onChange={(e) => {
									setFriendEmail(e.target.value.toLowerCase());
								}}
								placeholder="Insert your friend's email"
								className="w-11/12 h-8 border border-blue-400 rounded-full mr-2 pl-3 text-blue-500 outline-none dark:bg-gray-800 dark:border-gray-800 dark:text-gray-500"
							></input>
							<button
								type="sumbit"
								className="w-8 h-8 rounded-full text-white bg-gradient-to-r bg-gradient-to-r from-blue-400 to-purple-300 font-bold focus:outline-none dark:from-purple-600 dark:to-blue-600 dark:text-gray-800"
							>
								+
							</button>
						</form>
						<p className="mt-10 text-blue-500 dark:text-gray-500">
							All friends
						</p>

						{activeUserObj.friends ? (
							<FriendsList
								friends={matchedFriends}
								allUsers={allUsers}
								selectFriend={setSelectedFriend}
							/>
						) : (
							"Add your friends"
						)}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Main;

import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import db from "./firebase.config";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Main from "./components/Main";
import Logout from "./components/Logout";
import ProfilePage from "./components/ProfilePage";

const App = () => {
	const [user, setUser] = useState(null);
	const [firstLogin, setFirstLogin] = useState(false);
	const [allUsers, setAllUsers] = useState([]);
	const [activeUserObj, setActiveUserObj] = useState(null);
	const [activeUserKey, setActiveUserKey] = useState(null);
	const [theme, setTheme] = useState(localStorage.theme);

	useEffect(() => {
		if (user && !user.displayName && !user.photoURL) {
			setFirstLogin(true);
		}
		if (allUsers.length === 0) {
			db.ref("/users").on("value", (snapshot) => {
				const getUsers = snapshot.val();
				const convertedUsers = Object.entries(getUsers || {}).map(
					([id, userInfo]) => ({
						...userInfo,
						id,
					})
				);
				setAllUsers(convertedUsers);
			});
		} else if (user && allUsers.length > 0) {
			allUsers.forEach((oneUser) => {
				if (user.uid === oneUser.userId) {
					db.ref(`/users/${oneUser.id}`)
						.once("value")
						.then((snapshot) => {
							setActiveUserObj(snapshot.val());
							setActiveUserKey(oneUser.id);
						});
				}
			});
		}
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			setTheme("dark");
			document.documentElement.classList.add("dark");
		} else {
			setTheme("light");
			document.documentElement.classList.remove("dark");
		}
	}, [user, allUsers]);

	return (
		<div className="bg-cover bg-center bg-no-repeat bg-mobile md:bg-tablets lg:bg-desktop font-body font-bold">
			<div className="App">
				<Router>
					<Switch>
						<Route path="/" exact>
							{user ? (
								<Main
									user={user}
									logout={setUser}
									firstLogin={firstLogin}
									setFirstLogin={setFirstLogin}
									allUsers={allUsers}
									activeUserObj={activeUserObj}
									activeUserKey={activeUserKey}
								/>
							) : (
								<SignIn login={setUser} />
							)}
						</Route>
						<Route path="/register" component={Register}></Route>
						<Route path="/profile">
							{user ? (
								<ProfilePage
									logout={setUser}
									activeUserKey={activeUserKey}
									theme={theme}
									setTheme={setTheme}
								/>
							) : (
								<Logout />
							)}
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	);
};

export default App;

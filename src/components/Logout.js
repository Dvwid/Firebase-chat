import React from "react";
import { Link } from "react-router-dom";

const Logout = () => {
	return (
		<div className="w-full h-screen flex">
			<div className="flex flex-col items-center w-11/12 md:w-2/4 lg:w-1/4 bg-white m-5 rounded-xl p-5 justify-between shadow-xl dark:bg-gray-800 dark:text-gray-500">
				<div className="flex flex-col mt-48 items-center">
					<h1 className="text-3xl">Youre Logged Out</h1>
					<Link
						to="/"
						className="flex items-center justify-center h-10 mt-20 w-48 rounded-full shadow-xl text-white bg-gradient-to-r from-blue-300 to-blue-500 hover:from-pink-500"
					>
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Logout;

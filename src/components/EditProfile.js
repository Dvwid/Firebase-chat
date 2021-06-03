import React from "react";
import EditNickname from "./EditNickname";
import EditProfileImg from "./EditProfileImg.js";

const EditProfile = ({ editing, back, currentUser, activeUserKey }) => {
	return (
		<div className="w-full h-screen flex justify-center">
			<div className="flex flex-col w-11/12 md:w-2/4 lg:w-1/4 bg-white m-5 rounded-xl p-5 justify-between shadow-xl relative dark:bg-gray-700">
				<div className="flex h-full flex-col">
					<button
						onClick={() => {
							back(null);
						}}
						className="text-white absolute z-10 dark:text-gray-400"
					>
						{"< BACK"}
					</button>

					{editing === "nickname" ? (
						<EditNickname
							currentUser={currentUser}
							back={back}
							activeUserKey={activeUserKey}
						/>
					) : (
						<EditProfileImg
							currentUser={currentUser}
							back={back}
							activeUserKey={activeUserKey}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default EditProfile;

import { useState } from "react";
import { logout } from "../login/LoginData.tsx"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");

    const [open, setOpen] = useState(false);

    const userInfo = user.acountInform

    return (
        <div className="relative w-full">

            <div
                className="flex items-center gap-4 p-3 bg-white min-w-[220px] shadow cursor-pointer select-none"
                onClick={() => setOpen(!open)}
            >
                <img
                    src="https://via.placeholder.com/150"
                    className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex flex-col">
                    <span className="font-semibold text-base">{userInfo.accountName}</span>
                    <span className="text-gray-500 text-sm">{userInfo.role}</span>
                </div>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-xl rounded-xl p-2 z-50">
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg">
                        Profile
                    </button>

                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-red-500"
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserData;

import React from "react";
import Navbar from "./component/Navbar.tsx";
import UserData from "./features/user/userData.tsx";

interface props {
    children: React.ReactNode;
}

const Interface: React.FC<props> = ({ children }) => {
    return (
        <div className="w-full h-screen flex overflow-hidden overflow-x-hidden">
            <div className="w-auto">
                <Navbar />
            </div>
            <div className="flex-1 relative overflow-y-auto">
                {children}
                <div className="absolute top-0 right-0 z-50 w-auto">
                    <UserData></UserData>
                </div>
            </div>
        </div>
    );
};

export default Interface;

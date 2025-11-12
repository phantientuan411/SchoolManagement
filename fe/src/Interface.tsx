import React from "react";
import Navbar from "./component/Navbar.tsx";

interface props {
    children: React.ReactNode;
}

const Interface: React.FC<props> = ({ children }) => {
    return (
        <div className="w-full h-screen flex overflow-hidden overflow-x-hidden">
            <div className="w-auto">
                <Navbar />
            </div>
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default Interface;

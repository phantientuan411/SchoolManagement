import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Label } from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
    interface User {
        email: string,
        role: string,
        id: number,
        name: string
    }
    interface NavItem {
        path: string;
        label: string;
    }
    const [role, setRole] = useState('')
    useEffect(() => {

        const userString = localStorage.getItem("user");

        if (!userString) {
            window.location.href = "/login";
            return;
        }

        try {
            const user: User = JSON.parse(userString);
            if (user && user.role !== role) {
                user.role = user.role.toLowerCase();
                setRole(user.role);
            }
        } catch (e) {
            console.error("Error parsing user data:", e);
        }
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [isFlow, setIsFlow] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleMouseEnter = () => {
        setIsOpen(true);
        setIsFlow(true);
    }
    const handleMouseLeave = () => {
        setIsOpen(false);
        setIsFlow(false);
    }

    const NavBar = () => {
        setIsFlow(!isFlow);
        setIsOpen(!isOpen);
    }

    const desktopSidebarClasses = `
    w-64 bg-gray-900 text-white transition-all duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    ${isFlow ? "overflow-y-auto" : "overflow-hidden"}
    h-full
        `;
    const mobileSidebarClasses = `fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transition-all duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`;

    const user = JSON.parse(localStorage.getItem("user") ?? "{}");

    const userInfo = user.acountInform

    const id = userInfo.accountId

    const [navbarItems, setNavbarItems] = useState<NavItem[]>([])
    const navigationItems = {
        admin: [
            { path: '/home', label: 'Dashboard' },
            { path: '/student', label: 'Student' },
            { path: '/teacher', label: 'Teacher' },
            // { path: '/classroom', label: 'Classroom' },
            { path: '/finance', label: 'Finance' },
            { path: '/calendar', label: 'Calendar' },
            { path: '/manageMajor', label: 'Manage Major' }
        ],
        teacher: [
            { path: '/home', label: 'Dashboard' },
            { path: `/myProfile/${id}`, label: 'Profile' },
            { path: '/student', label: 'Student' },
            // { path: '/food', label: 'Food' },
            { path: '/classTeacher', label: 'Class' },
        ],
        student: [
            { path: '/home', label: 'Dashboard' },
            { path: `/myProfile/${id}`, label: 'Profile' },
            // { path: '/food', label: 'Food' },
            // { path: '/class', label: 'Class' },
            // { path: '/mark', label: 'Your mark' },
        ]
    };
    useEffect(() => {
        if (role === "admin") {
            setNavbarItems(navigationItems.admin)
        }
        else if (role === "teacher") {
            setNavbarItems(navigationItems.teacher)
        }
        else if (role === "student") {
            setNavbarItems(navigationItems.student)
        }
    }, [role])
    return (
        <div className="relative w-auto h-screen">
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="fixed top-0 left-0 h-full w-5 z-40"
            >
                <div
                    className={isMobile ? mobileSidebarClasses : `${desktopSidebarClasses} h-full`}
                >
                    <nav className="nav-bg flex h-full">
                        <div className="navBar flex w-full flex-col h-full">
                            <div className="banner flex w-8/10 mt-7 ml-7 gap-3">
                                <div className="flex w-12 h-12 bg-orange-500 justify-center items-center text-xl rounded-xl font-bold">
                                    <b>A</b>
                                </div>
                                <div className="flex w-auto h-auto justify-center items-center text-xl rounded font-bold">
                                    Akademi
                                </div>
                            </div>
                            <nav className="flex-1 py-6 space-y-2 ml-4  ">
                                {navbarItems.map((item, index) => (
                                    <Link to={item.path} key={index}>
                                        <button
                                            onClick={() => {
                                                setIsOpen(false);
                                                if (isMobile) { NavBar() };
                                            }}
                                            className="btn-left-col flex items-center w-full px-4 py-3 mb-4 text-left text-white"
                                        >
                                            <span className="font-medium">{item.label}</span>
                                        </button>
                                    </Link>
                                ))}
                            </nav>
                            <div className="credit ml-2">
                                <b className="text-xs">
                                    Akademi - School Admission Dashboard
                                </b>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {isMobile && isOpen && (
                <div
                    onClick={NavBar}
                    className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300"
                ></div>
            )}
        </div>
    );
};

export default Navbar;
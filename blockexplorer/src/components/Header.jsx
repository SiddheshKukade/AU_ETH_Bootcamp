import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { joinClasses } from "../helper";
import logo from "../assets/logo.png";
const Header = () => {
    const navigate = useNavigate();
    return (
        <header
            className={joinClasses(
                "flex",
                "justify-around",
                "items-center",
                "shadow-sm",
                "p-5"
            )}
        >
            {/* logo */}
            <div className="text-red-400 cursor-pointer">
                <img
                    onClick={() => navigate("/")}
                    className={joinClasses("w-24", "h-24")}
                    src={logo}
                    alt="logo"
                />
            </div>
            <nav>
                <ul className="flex gap-5 list-none">
                    <li
                        className="text-lg cursor-pointer hover:text-gray-700"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </li>
                    <li
                        className="text-lg cursor-pointer hover:text-gray-700"
                        onClick={() => navigate("/account-balance")}
                    >
                        Account-Balance
                    </li>
                    <li
                        className="text-lg cursor-pointer hover:text-gray-700"
                        onClick={() => navigate("/nft")}
                    >
                        Nft
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

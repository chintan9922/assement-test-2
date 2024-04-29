import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("isAuth", false);
        navigate("/");
    };

    return (
        <div className="header">
            <h1 className="page" style={{ marginLeft: "10px", color: "white" }}>
                Dashboard
            </h1>
            <button
                className="logout"
                style={{
                    marginRight: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                }}
                onClick={handleLogout}>
                Log out
            </button>
        </div>
    );
}

export default Header;

import React, { useEffect, useState } from "react";
import "./loginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/;
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        let isAuth = JSON.parse(localStorage.getItem("isAuth"));
        if (isAuth && isAuth !== null) {
            navigate("/dashboard");
        }
    }, [navigate]);

    useEffect(() => {
        let isAuth = JSON.parse(localStorage.getItem("isAuth"));
        if (!isAuth && isAuth !== null) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        if (email === "" && password === "") {
            setErrorEmail(true);
            setErrorPassword(true);
        } else {
            if (email === "test@gmail.com" && password === "test123") {
                localStorage.setItem("isAuth", true);
                console.log("true");
                setErrorEmail(false);
                setErrorPassword(false);
                navigate("/dashboard");
                e.target.reset();
            } else if (email === "test@gmail.com") {
                setErrorPassword(true);
                setErrorEmail(false);
            } else if (password === "test123") {
                setErrorEmail(true);
                setErrorPassword(false);
            } else {
                setErrorEmail(true);
                setErrorPassword(true);
            }
        }
    };

    const checkEmail = (e) => {
        e.preventDefault();
        regexEmail.test(e.target.value)
            ? setErrorEmail(false)
            : setErrorEmail(true);
    };

    return (
        <div className="main">
            <div className="card">
                <h1 className="title">Sign in</h1>
                <form
                    className="loginform"
                    action=""
                    onSubmit={handleSubmit}
                    style={{
                        justifyItems: "center",
                        alignItems: "center",
                        display: "grid",
                    }}>
                    <div className="name">
                        <label htmlFor="name" style={{ color: "white" }}>
                            Email:
                        </label>
                        <input
                            className="name"
                            style={{
                                marginLeft: "40px",
                                width: "60%",
                                height: "25px",
                                borderRadius: "5px",
                                border: errorEmail
                                    ? "1px solid red"
                                    : "1px solid black",
                            }}
                            type="email"
                            placeholder="Username"
                            onKeyUp={checkEmail}
                        />
                    </div>
                    <div
                        className="emailError"
                        style={{ display: errorEmail ? "block" : "none" }}>
                        <p
                            className="error"
                            style={{ color: "red", marginTop: "5px" }}>
                            Please enter valid email address!!
                        </p>
                    </div>
                    <br />
                    <div className="password">
                        <label style={{ color: "white" }} htmlFor="password">
                            Password:
                        </label>
                        <input
                            style={{
                                marginLeft: "10px",
                                width: "60%",
                                height: "25px",
                                borderRadius: "5px",
                                border: errorPassword
                                    ? "1px solid red"
                                    : "1px solid black",
                            }}
                            className="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div
                        className="emailError"
                        style={{ display: errorPassword ? "block" : "none" }}>
                        <p
                            className="error"
                            style={{ color: "red", marginTop: "5px" }}>
                            Please enter valid password!!
                        </p>
                    </div>
                    <br />
                    <br />
                    <button
                        style={{
                            width: "50%",
                            height: "2rem",
                            borderRadius: "10px",
                            border: "1px solid black",
                            marginBottom: "25px",
                            justifyItems: "center",
                            alignItems: "center",
                        }}
                        className="loginbtn"
                        type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;

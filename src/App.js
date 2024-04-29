import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
    const location = useLocation();

    const showHeader = () => {
        const { pathname } = location;
        return ["/dashboard"].includes(pathname);
    };
    return (
        <div className="App">
            {showHeader() && <Header /> }
            
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;

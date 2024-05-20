/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
    TablePagination,
} from "@mui/base/TablePagination";

function Dashboard() {
    // const [formatedDate, setFormatedDate] = useState("");
    const [data, setData] = useState([]);
    const [collapse, setCollapse] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    let now = new Date();
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    let formattedDateTime = year + "-" + month + "-" + day;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const value = localStorage.getItem("data");
        if (value) {
            return setData(JSON.parse(value));
        }
    }, []);

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
        const date = e.target[0].value;
        const task = e.target[1].value;
        let key;
        data?.length > 0 ? (key = data.length) : (key = 0);
        const newData = {
            key: (key += 1),
            date: date,
            task: task,
        };
        data?.length > 0 ? setData([...data, newData]) : setData([newData]);
        localStorage.setItem("data", JSON.stringify(data));
        e.target.reset();
    };

    const handleCollapse = () => {
        collapse ? setCollapse(false) : setCollapse(true);
    };

    function removeItem(index) {
        // console.log(index, "index");
        if (data) {
            data.splice(index, 1);
            // console.log(data, "data");
            localStorage.setItem("data", JSON.stringify(data));
            setData(JSON.parse(localStorage.getItem("data")));
        } else {
            alert("no data found");
        }
    }

    function sortDate() {
        if (clicked) {
            data.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
            localStorage.setItem("data", JSON.stringify(data));
            setClicked(false);
        } else {
            data.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            localStorage.setItem("data", JSON.stringify(data));
            setClicked(true);
        }
    }

    function sortNo() {
        if (clicked) {
            data.sort((a, b) => {
                return a.key - b.key;
            });
            localStorage.setItem("data", JSON.stringify(data));
            setClicked(false);
        } else {
            data.sort((a, b) => {
                return b.key - a.key;
            });
            localStorage.setItem("data", JSON.stringify(data));
            setClicked(true);
        }
    }

    function sortTask() {
        if (clicked) {
            data.sort((a, b) =>
                a.task.toUpperCase() > b.task.toUpperCase()
                    ? 1
                    : b.task.toUpperCase() > a.task.toUpperCase()
                    ? -1
                    : 0,
            );
            localStorage.setItem("data", JSON.stringify(data));
            setClicked(false);
        } else {
            data.sort((a, b) =>
                b.task.toUpperCase() > a.task.toUpperCase()
                    ? 1
                    : a.task.toUpperCase() > b.task.toUpperCase()
                    ? -1
                    : 0,
            );
            localStorage.setItem("data", JSON.stringify(data));
            setClicked(true);
        }
    }

    useEffect(() => {
        if (searchTerm.length > 0) {
            setFilteredData(
                data.filter((task) =>
                    task.task.toUpperCase().includes(searchTerm.toUpperCase()),
                ),
            );
        } else {
            setFilteredData(data);
        }
    }, [data, searchTerm]);

    return (
        <div className="maincontainer">
            <div className="container">
                <div
                    className="field"
                    style={{ display: collapse ? "none" : "grid" }}>
                    <form className="task-form" onSubmit={handleSubmit}>
                        <div className="date-container">
                            <label htmlFor="time">Date:</label>
                            <input
                                type="date"
                                name="date"
                                className="date-field"
                                required
                                min={formattedDateTime}
                            />
                        </div>
                        <div className="text-container">
                            <label htmlFor="task">Task:</label>
                            <input
                                type="text"
                                name="task"
                                className="task-field"
                                placeholder="Enter the task"
                                title="Enter the task!!!"
                                style={{
                                    width: "10rem",
                                }}
                                required
                            />
                        </div>
                        <button type="submit" className="add-task">
                            Add Task
                        </button>
                        <br />
                        <div
                            className="search-container"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                justifyItems: "center",
                                alignItems: "center",
                                textAlign: "center",
                            }}>
                            <label htmlFor="search">Search:</label>
                            <input
                                type="text"
                                style={{ margin: "20px 0px 25px 10px" }}
                                onKeyUp={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </form>
                </div>

                <div
                    className="bottomline"
                    style={{ borderBottom: "1px solid black" }}
                />
                <div className="collapse" style={{display: 'flex', justifyContent:'flex-end', marginTop: '10px'}}>
                    <button className="collapseBtt" onClick={handleCollapse}>
                        Collapse
                    </button>
                </div>
                <div className="table-view">
                    <table className="myTable">
                        <thead>
                            <tr>
                                <th className="number" onClick={sortNo}>
                                    Sr No
                                </th>
                                <th className="date" onClick={sortDate}>
                                    Date
                                </th>
                                <th className="task" onClick={sortTask}>
                                    Task
                                </th>
                                <th className="delete">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData &&
                                (rowsPerPage > 0
                                    ? filteredData.slice(
                                          page * rowsPerPage,
                                          page * rowsPerPage + rowsPerPage,
                                      )
                                    : filteredData
                                ).map((task, index) => (
                                    <>
                                        <tr key={index}>
                                            <td className={`a${index}`}>
                                                {task.key}
                                            </td>
                                            <td className={`b${index}`}>
                                                {task.date}
                                            </td>
                                            <td className={`c${index}`}>
                                                {task.task}
                                            </td>
                                            <td>
                                                <MdDelete
                                                    size={"20px"}
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    </>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div
                    className="pagination"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        justifyItems: "center",
                        alignItems: "center",
                    }}>
                    <TablePagination
                        rowsPerPageOptions={[
                            2,
                            4,
                            10,
                            25,
                            { label: "All", value: -1 },
                        ]}
                        colSpan={3}
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        slotProps={{
                            select: {
                                "aria-label": "rows per page",
                            },
                            actions: {
                                showFirstButton: true,
                                showLastButton: true,
                            },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{ width: "100%" , margin: '0px 0px 25px 0px'}}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

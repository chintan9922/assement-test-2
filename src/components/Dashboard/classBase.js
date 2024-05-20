import React, { Component } from "react";
import "./dashboard.css";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TablePagination } from "@mui/base/TablePagination";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // formatedDate: "",
            data: [],
            collapse: false,
            clicked: false,
            filteredData: [],
            searchTerm: "",
            page: 0,
            rowsPerPage: 4,
        };

        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.sortDate = this.sortDate.bind(this);
        this.sortNo = this.sortNo.bind(this);
        this.sortTask = this.sortTask.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    componentDidMount() {
        const value = localStorage.getItem("data");
        if (value) {
            this.setState({ data: JSON.parse(value) });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.data !== this.state.data) {
            localStorage.setItem("data", JSON.stringify(this.state.data));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const date = e.target[0].value;
        const task = e.target[1].value;
        let key;
        this.state.data?.length > 0
            ? (key = this.state.data.length)
            : (key = 0);
        const newData = {
            key: (key += 1),
            date: date,
            task: task,
        };
        this.state.data?.length > 0
            ? this.setState({ data: [...this.state.data, newData] })
            : this.setState({ data: [newData] });
        e.target.reset();
    }

    handleCollapse() {
        this.setState({ collapse: !this.state.collapse });
    }

    removeItem(index) {
        if (this.state.data) {
            const data = this.state.data.filter((item, i) => i !== index);
            this.setState({ data });
        } else {
            alert("no data found");
        }
    }

    sortDate() {
        if (this.state.clicked) {
            const data = [...this.state.data].sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
            this.setState({ data, clicked: false });
        } else {
            const data = [...this.state.data].sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            this.setState({ data, clicked: true });
        }
    }

    sortNo() {
        if (this.state.clicked) {
            const data = [...this.state.data].sort((a, b) => {
                return a.key - b.key;
            });
            this.setState({ data, clicked: false });
        } else {
            const data = [...this.state.data].sort((a, b) => {
                return b.key - a.key;
            });
            this.setState({ data, clicked: true });
        }
    }

    sortTask() {
        if (this.state.clicked) {
            const data = [...this.state.data].sort((a, b) =>
                a.task.toUpperCase() > b.task.toUpperCase()
                    ? 1
                    : b.task.toUpperCase() > a.task.toUpperCase()
                    ? -1
                    : 0,
            );
            this.setState({ data, clicked: false });
        } else {
            const data = [...this.state.data].sort((a, b) =>
                b.task.toUpperCase() > a.task.toUpperCase()
                    ? 1
                    : a.task.toUpperCase() > b.task.toUpperCase()
                    ? -1
                    : 0,
            );
            this.setState({ data, clicked: true });
        }
    }

    handleChangePage(event, newPage) {
        this.setState({ page: newPage });
    }

    handleChangeRowsPerPage(event) {
        this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
        this.setState({ page: 0 });
    }

    render() {
        const {
            data,
            collapse,
            clicked,
            filteredData,
            searchTerm,
            page,
            rowsPerPage,
        } = this.state;

        filteredData =
            searchTerm.length > 0
                ? data.filter((task) =>
                      task.task
                          .toUpperCase()
                          .includes(searchTerm.toUpperCase()),
                  )
                : data;

        let now = new Date();
        let year = now.getFullYear();
        let month = (now.getMonth() + 1).toString().padStart(2, "0");
        let day = now.getDate().toString().padStart(2, "0");
        let formattedDateTime = year + "-" + month + "-" + day;

        const emptyRows =
            page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

        return (
            <div className="maincontainer">
                <div className="container">
                    <div
                        className="field"
                        style={{ display: collapse ? "none" : "grid" }}>
                        <form
                            className="task-form"
                            onSubmit={this.handleSubmit}>
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
                                    onKeyUp={(e) =>
                                        this.setState({
                                            searchTerm: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </form>
                    </div>

                    <div
                        className="bottomline"
                        style={{ borderBottom: "1px solid black" }}
                    />
                    <div
                        className="collapse"
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "10px",
                        }}>
                        <button
                            className="collapseBtt"
                            onClick={this.handleCollapse}>
                            Collapse
                        </button>
                    </div>
                    <div className="table-view">
                        <table className="myTable">
                            <thead>
                                <tr>
                                    <th
                                        className="number"
                                        onClick={this.sortNo}>
                                        Sr No
                                    </th>
                                    <th
                                        className="date"
                                        onClick={this.sortDate}>
                                        Date
                                    </th>
                                    <th
                                        className="task"
                                        onClick={this.sortTask}>
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
                                                            this.removeItem(
                                                                index,
                                                            )
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
                            onPageChange={this.handleChangePage}
                            onRowsPerPageChange={this.handleChangeRowsPerPage}
                            style={{
                                width: "100%",
                                margin: "0px 0px 25px 0px",
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
// Note that I've binded the methods to the class instance in the constructor, and used 'this.state' and 'this.setState' to handle the state. Also note that I've used `componentDidMount` and `componentDidUpdate` lifecycle hooks instead of `useEffect` hook to handle the logic of storing and retriving data from local storage.

import React from "react";
import { useState, useEffect } from "react";
import Pagination from "https://cdn.skypack.dev/rc-pagination@3.1.15";
import './style.css';
import axios from "axios";
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminHome = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);

    useEffect(() => {
        loadNewsArticles();
    }, [current, size]);

    const loadNewsArticles = async () => {
        try {
            const response = await axios.get('/api/v1/users');
            if (Array.isArray(response.data)) {
                setNewsArticles(response.data);
            } else {
                console.error('API response is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error loading news articles:', error);
        }
    };

    const PerPageChange = (value) => {
        setSize(value);
        setCurrent(1);
    };

    const deleteArticle = async (id) => {
        try {
            // Send DELETE request to your API endpoint with the user's ID
            await axios.delete(`/api/v1/users/${id}`);
            // Reload the articles after deletion
            loadNewsArticles();
            // Show success toast
            toast.success('Deleted successfully');
        } catch (error) {
            console.error('Error deleting:', error);
            // Show error toast
            toast.error('Error deleting');
        }
    };

    const getData = () => {
        const filteredUsers = newsArticles.filter((user) => user.role === "EDITOR");
        // const totalFilteredUsers = filteredUsers.length; // Total count of filtered users
        return filteredUsers.slice((current - 1) * size, current * size);
    };

    const PaginationChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize);
    };

    const PrevNextArrow = (current, type, originalElement) => {
        if (type === 'prev') {
            return (
                <button>
                    <i className="fa fa-angle-double-left"></i>
                </button>
            );
        }
        if (type === 'next') {
            return (
                <button>
                    <i className="fa fa-angle-double-right"></i>
                </button>
            );
        }
        return originalElement;
    };

    return (
        <>
            <div className="container-fluid mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-filter-info">
                                    <Pagination
                                        className="pagination-data"
                                        showTotal={(total, range) =>
                                            `Showing ${range[0]}-${range[1]} of ${total}`
                                        }
                                        onChange={PaginationChange}
                                        total={getData().length} // Use the filtered data length as total count
                                        current={current}
                                        pageSize={size}
                                        showSizeChanger={false}
                                        itemRender={PrevNextArrow}
                                        onShowSizeChange={PerPageChange}
                                    />
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-text-small mb-0">
                                        <thead className="thead-primary table-sorting">
                                            <tr>
                                                <th>User Id</th>
                                                <th>Username</th>
                                                <th>Password</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getData().map((article) => (
                                                <tr key={article.id}>
                                                    <td>{article.id}</td>
                                                    <td>{article.username}</td>
                                                    <td>{article.password}</td>
                                                    <td>{article.email}</td>
                                                    <td>
                                                        <button className='btn'>
                                                            <h4><AiTwotoneEdit /></h4>
                                                        </button>
                                                        <button className='btn' onClick={() => deleteArticle(article.id)}>
                                                            <h4><AiTwotoneDelete /></h4>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="table-filter-info">
                                    <Pagination
                                        className="pagination-data"
                                        showTotal={(total, range) =>
                                            `Showing ${range[0]}-${range[1]} of ${total}`
                                        }
                                        onChange={PaginationChange}
                                        total={getData().length} // Use the filtered data length as total count
                                        current={current}
                                        pageSize={size}
                                        showSizeChanger={false}
                                        itemRender={PrevNextArrow}
                                        onShowSizeChange={PerPageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default AdminHome;

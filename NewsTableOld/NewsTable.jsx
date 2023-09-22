import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import React, {useState, useEffect  } from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import Pagination from "https://cdn.skypack.dev/rc-pagination@3.1.15";
import './style.css';
import axios from "axios";


const NewsTable = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    loadNewsArticles();
  }, [current, size]);

  const loadNewsArticles = async () => {
    try {
      const response = await axios.get('/api/v1/news');
      setNewsArticles(response.data);
    } catch (error) {
      console.error('Error loading news articles:', error);
    }
  };

  const toggleExpanded = async (id) => {
    if (id === expandedId) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      console.log('Clicked on news article ID:', id);

      try {
        const response = await axios.post(`/api/v1/audit/${id}`);
        console.log('Audit Data:', response.data);
      } catch (error) {
        console.error('Error loading audit data:', error);
      }
    }
  };

  const PerPageChange = (value) => {
    setSize(value);
    setCurrent(1);
  };

  const getData = () => {
    return newsArticles.slice((current - 1) * size, current * size);
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
                    total={newsArticles.length}
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
                        <th>News Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Posted At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getData().map((article) => (
                        <tr key={article.id}>
                          <td>{article.id}</td>
                          <td>{article.title}</td>
                          <td>
                            {expandedId === article.id
                              ? article.description
                              : `${article.description.slice(0, 10)}...`}
                            {article.description.length > 10 && (
                              <button
                                className="btn btn-link"
                                onClick={() => toggleExpanded(article.id)}
                              >
                                {expandedId === article.id
                                  ? 'Read Less'
                                  : 'Read More'}
                              </button>
                            )}
                          </td>
                          <td>{article.postedAt}</td>
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
                    total={newsArticles.length}
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
    </>
  );
};

export default NewsTable;

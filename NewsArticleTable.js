import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsArticleTable = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadNewsArticles();
  }, []);

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
      console.log('Clicked on news article ID:', id); // Log the ID to the console

      try {
        const response = await axios.post(`/api/v1/audit/${id}`);
        console.log('Audit Data:', response.data);
        // Handle the audit data as needed
      } catch (error) {
        console.error('Error loading audit data:', error);
      }
    }
  };

  return (
    <table className="table table-striped shadow">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Posted At</th>
        </tr>
      </thead>
      <tbody>
        {newsArticles.map((article) => (
          <tr key={article.id}>
            <td>{article.id}</td>
            <td>{article.title}</td>
            <td>
              {expandedId === article.id
                ? article.description // Display full description if expanded
                : `${article.description.slice(0, 10)}...`} {/* Display truncated description */}
              {article.description.length > 10 && (
                <button
                  className="btn btn-link"
                  onClick={() => toggleExpanded(article.id)}
                >
                  {expandedId === article.id ? 'Read Less' : 'Read More'}
                </button>
              )}
            </td>
            <td>{article.postedAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NewsArticleTable;

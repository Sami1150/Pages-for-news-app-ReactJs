import React from 'react';
import './blogcards.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import Popup from '../popup/popup';
import './newspopup.css';

import image1 from '../assets/images/1.jpeg'
import image2 from '../assets/images/2.jpeg'
import image3 from '../assets/images/3.jpeg'

function Popup({ title, description }) {
    return (
      <div id="popup2" className="popup-container popup-style-2">
        <div className="popup-content">
          <a href="#" className="close">&times;</a>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  }
  
  const BlogCard = ({
    category,
    imageSrc,
    hashtags,
    title,
    description,
    profileImageSrc,
    author,
    followers,
    id,
  }) => {
    const [showPopup, setShowPopup] = useState(false);
  
    const showPopupOnClick = async () => {
      setShowPopup(true);
  
      // Send POST request to /api/v1/audit/{id} when "Read More" is clicked
      try {
        const response = await axios.post(`/api/v1/audit/${id}`);
        console.log('Audit Data:', response.data);
      } catch (error) {
        console.error('Error loading audit data:', error);
      }
    };
  
    return (
      <div className="card">
        <div className="card-banner">
          <p className={`category-tag ${category.toLowerCase()}`}>{category}</p>
          <img className="banner-img" src={imageSrc} alt="" />
        </div>
        <div className="card-body">
          <p className="blog-hashtag">{hashtags}</p>
          <h2 className="blog-title">{title}</h2>
          <p className="blog-description">
            {description}
          </p>
          {description.length > 10 && (
            <div>
              <span className="btn-link" onClick={showPopupOnClick} style={{ cursor: 'pointer', color: 'blue' }}>
                Read More
              </span>
            </div>
          )}
  
          {showPopup && (
            <Popup title={title} description={description} />
          )}
  
          <div className="card-profile">
            <img className="profile-img" src={profileImageSrc} alt="" />
            <div className="card-profile-info">
              <h3 className="profile-name">{author}</h3>
              <p className="profile-followers">{followers} followers</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const BlogList = () => {
    const [newsArticles, setNewsArticles] = useState([]);
  
    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await axios.get('/api/v1/news');
          const fetchedNews = response.data;
  
          const newsWithHashtags = await Promise.all(
            fetchedNews.map(async (article) => {
              const reporterResponse = await axios.get(`/api/v1/news/report/${article.id}`);
              const reporterName = reporterResponse.data;
  
              const hashtagsResponse = await axios.get(`/api/v1/newstag/${article.id}`);
              const hashtags = hashtagsResponse.data.map((tag) => `#${tag} `);
  
              return { ...article, hashtags, reporter: reporterName };
            })
          );
  
          setNewsArticles(newsWithHashtags);
        } catch (error) {
          console.error('Error fetching news articles:', error);
        }
      };
  
      fetchNews();
    }, []);
  
    return (
      <div className="wrapper">
        {newsArticles.map((article) => (
          <BlogCard
            key={article.id}
            category="Popular"
            imageSrc="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            hashtags={article.hashtags}
            title={article.title}
            description={article.description}
            profileImageSrc="https://images.unsplash.com/photo-1554780336-390462301acf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            author={article.reporter}
            followers="1.2k"
            id={article.id} // Pass the news article's id
          />
        ))}


    <BlogCard
      category="Popular"
      imageSrc="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
      hashtags="#webdevelopment #frontend"
      title="What is the future of front end development?"
      description="My thoughts on the future of front end web development"
      profileImageSrc="https://images.unsplash.com/photo-1554780336-390462301acf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
      author="Maya Eleanor Peña"
      followers="1.2k"
    />

    <BlogCard
      category="Technology"
      imageSrc="https://images.unsplash.com/photo-1413708617479-50918bc877eb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
      hashtags="#photographer #gearupgrade #selfmade"
      title="Photography gear you need this year"
      description="Looking to upgrade your gear? Here is the list of the best photography tools for this year"
      profileImageSrc="https://images.unsplash.com/photo-1532332248682-206cc786359f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
      author="Darrell Steward"
      followers="45.7k"
    />

    <BlogCard
      category="Psychology"
      imageSrc="https://images.unsplash.com/photo-1592496001020-d31bd830651f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
      hashtags="#mediation #mentalwellness"
      title="Mediation and Mental Wellness Best Practices"
      description="Mediation has transformed my life. These are the best practices to get into the habit"
      profileImageSrc="https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
      author="Savannah Nguyen"
      followers="318"
    />
  </div>
    )
};

export default BlogList;

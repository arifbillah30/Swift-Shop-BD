// C:\Users\Arifb\Downloads\swiftshop-reactjs\Frontend\src\Components\Blog\BlogList\BlogList.jsx

import React, { useEffect, useState } from "react";
import "./BlogList.css";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogData, setBlogData] = useState([]); // State to hold blog data
  const [loading, setLoading] = useState(true); // State for loading state

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Fetch blog data from the backend
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch('http://localhost:5000/blogs/all'); // Adjust the URL as necessary
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON response
        setBlogData(data); // Set blog data from response
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchBlogData();
  }, []);

  return (
    <>
      <div className="blogListSection">
        <div className="blogListHeaderContainer">
          <div className="blogListHeader">
            <h2>The Blog</h2>
            <div className="blogListHeaderCategories">
              <p>ALL</p>
              <p>COMPANY</p>
              <p className="activeCategory">DESIGN IDEA</p>
              <p>STYLE</p>
              <p>TRENDS</p>
              <p>FURNITURE</p>
            </div>
          </div>
        </div>
        <div className="blogPostListContainer">
          {loading ? ( // Show loading message while fetching
            <p>Loading...</p>
          ) : (
            blogData.map((blogPost) => (
              <div className="blogPost" key={blogPost.blogID}>
                <div className="blogPostThumb">
                  <img src={blogPost.blogThumbnail} alt="blogPost" />
                </div>
                <div className="blogPostContent">
                  <div className="blogPostContentDate">
                    <p>by admin</p>
                    <p>{new Date(blogPost.blogDate).toLocaleDateString()}</p> {/* Format the date */}
                  </div>
                  <div className="blogPostContentHeading">
                    <Link to="/BlogDetails" onClick={scrollToTop}>
                      {blogPost.blogHeading}
                    </Link>
                  </div>
                  <div className="blogPostContentDescription">
                    <p>
                      Midst one brought greater also morning green saying had
                      good. Open stars day let over gathered, grass face one every
                      light of under.
                    </p>
                  </div>
                  <div className="blogPostContentReadMore">
                    <Link to="/BlogDetails" onClick={scrollToTop}>
                      Continue Reading
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <p className="blogListShowMore" onClick={scrollToTop}>
          Show More
        </p>
      </div>
    </>
  );
};

export default BlogList;
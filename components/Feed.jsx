"use client";

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Loading from "./loading";

const BlogCardList = ({ data, handleTagClick }) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="prompt_layout ">
          {data.map((post) => (
            <BlogCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
        </div>
      ) : (
        <span className="text-center block mt-5">No result found.</span>
      )}
    </>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchedLoading, setSearchedLoading] = useState(false);
  const fetchPosts = async () => {
    const response = await fetch("/api/blog");
    const result = await response.json();
    if (result.StatusCode === 200) {
      const postResult = result.Values ? result.Values : [];
      setAllPosts(postResult);
      setLoading(false);
    } else {
      setAllPosts([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterBlogs = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.blog)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchedLoading(true);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterBlogs(e.target.value);
        setSearchedResults(searchResult);
        setSearchedLoading(false);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterBlogs(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Blogs */}

      {loading || searchedLoading ? (
        <div className="mt-10">
          <Loading />
        </div>
      ) : (
        <>
          {searchText ? (
            <BlogCardList
              data={searchedResults}
              handleTagClick={handleTagClick}
            />
          ) : (
            <BlogCardList data={allPosts} handleTagClick={handleTagClick} />
          )}
        </>
      )}
    </section>
  );
};

export default Feed;

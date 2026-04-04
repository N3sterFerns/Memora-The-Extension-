import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSave } from "../hooks/useSave";
import ItemsContainer from "../components/ItemsContainer";
import Rediscover from "./Rediscover";


const DashboardHome = () => {
  const savedItems = useSelector((state) => state.save.items);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredItems = savedItems
    .filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    })
    .filter((item) => {
      if (filter === "all") return true;
      return item.type === filter;
    });
  
  const page = useSelector((state)=> state.save.page)
  const totalPages = useSelector((state)=> state.save.totalPages)
  const {getAllSavedItems} = useSave()
    

  return (
    <main className="main">


      <div className="main__hero">
        <h1>All Items</h1>
        <p>
          Manage your digital assets and editorial workflow. Every piece of
          content is a building block for your brand's story.
        </p>
      </div>

      <div className="search-bar">
        <div className="search-bar__card">
          <div className="search-bar__row">
            <div className="search-bar__input-wrap">
              <span className="material-symbols-outlined icon">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search content, articles, or media..."
              />
            </div>
            <div className="search-bar__divider"></div>
          </div>
          <div className="search-bar__tags">
            <span className="search-bar__tags-label">Quick Filters:</span>
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "video" ? "active" : ""}
              onClick={() => setFilter("video")}
            >
              Videos
            </button>
            <button
              className={filter === "article" ? "active" : ""}
              onClick={() => setFilter("article")}
            >
              Articles
            </button>
          </div>
        </div>
      </div>

      <Rediscover/>

      <div className="content-section">
        <div className="content-section__header">
          <div className="content-section__header-left">
            <h2>Recent Saved</h2>
            <span className="badge">{filteredItems.length} New</span>
          </div>
          <div className="content-section__header-views">
            <button className="active">
              <span className="material-symbols-outlined">list</span>
            </button>
          </div>
        </div>
        {filteredItems.length > 0 ? (
          <ItemsContainer  items={filteredItems} />
        ): (
          <h1>No Saved Items yet</h1>
        )}
      </div>

      
      {filteredItems.length > 0 && (

        <div className="pagination">
          <button disabled={page === 1} onClick={()=> getAllSavedItems(page - 1)} className="pagination__btn pagination__btn--nav">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {Array.from({length: totalPages}, (_, i)=>{
            const pageNum = i+1
            return (
              <button key={pageNum} onClick={()=> getAllSavedItems(pageNum)}  className={`pagination__btn ${page === pageNum ? "pagination__btn--active": "pagination__btn--page"} `}>{pageNum}</button>
            )

          })}
          <span className="pagination__ellipsis">...</span>

          <button disabled={page === totalPages} onClick={()=> {
            getAllSavedItems(page + 1)
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} className="pagination__btn pagination__btn--nav">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )} 
    </main>
  );
};

export default DashboardHome;
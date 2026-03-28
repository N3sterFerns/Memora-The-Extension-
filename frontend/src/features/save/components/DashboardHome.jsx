import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSave } from "../hooks/useSave";
import ItemsContainer from "../components/ItemsContainer";

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

      <div class="content-section">
        <div class="content-section__header">
          <div class="content-section__header-left">
            <h2>Recent Saved</h2>
            <span class="badge">12 New</span>
          </div>
          <div class="content-section__header-views">
            <button class="active">
              <span class="material-symbols-outlined">list</span>
            </button>
          </div>
        </div>

        <ItemsContainer items={filteredItems} />
      </div>

      <div className="pagination">
        <button className="pagination__btn pagination__btn--nav">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="pagination__btn pagination__btn--active">1</button>
        <button className="pagination__btn pagination__btn--page">2</button>
        <button className="pagination__btn pagination__btn--page">3</button>
        <span className="pagination__ellipsis">...</span>
        <button className="pagination__btn pagination__btn--page">12</button>
        <button className="pagination__btn pagination__btn--nav">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </main>
  );
};

export default DashboardHome;

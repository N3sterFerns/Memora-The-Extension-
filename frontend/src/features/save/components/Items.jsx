import React from "react";
import { useSelector } from "react-redux";

const Items = ({ item }) => {
  const user = useSelector((state) => state.auth.user.email);

  return (
    <div class="list-item">
      <div class="list-item__thumb">
        <img src={item?.image} alt={item?.title} />
      </div>
      <div class="list-item__body">
        <div class="list-item__tags">
          {item?.tags?.map((t, i) => (
            <span key={i} class="tag">
              {t}
            </span>
          ))}
        </div>
        <div class="list-item__title">{item?.title}</div>
        <div class="list-item__url">{item?.url}</div>
        <div class="list-item__meta">
          <div class="author">
            <span class="name">{user?.split("@")[0]}</span>
          </div>
          <span class="sep">/</span>
          <span>
            {new Date(item?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <button class="list-item__delete-btn" title="Delete entry">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
};

export default Items;

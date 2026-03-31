import React from "react";
import { useSelector } from "react-redux";
import { useSave } from "../hooks/useSave";

const Items = ({ item }) => {
  const user = useSelector((state) => state.auth.user.email);
  return (
    <div className="list-item">
      <div className="list-item__thumb">
        <img src={item?.image} alt={item?.title} />
      </div>
      <div className="list-item__body">
        <div className="list-item__tags">
          {item?.tags?.map((t, i) => (
            <span key={i} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="list-item__title">{item?.title}</div>
        <div className="list-item__url">{item?.url}</div>
        <div className="list-item__meta">
          <div className="author">
            <span className="name">{user?.split("@")[0]}</span>
          </div>
          <span className="sep">/</span>
          <span>
            {new Date(item?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <button className="list-item__delete-btn" title="Delete entry">
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
};

export default Items;

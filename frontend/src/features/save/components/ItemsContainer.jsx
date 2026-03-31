import React from "react";
import { useSelector } from "react-redux";
import Items from "./Items";
import { Link } from "react-router";

const ItemsContainer = ({items}) => {


  return (
    <div className="content-section__list">
        {items?.map((item)=>(
            <Link to={`/dashboard/save/${item._id}`} state={item}><Items key={item._id} item={item} /></Link>
        ))}
    </div>
  );
};

export default ItemsContainer;

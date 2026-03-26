import React from "react";
import { useSelector } from "react-redux";
import Items from "./Items";

const ItemsContainer = ({items}) => {


  return (
    <div class="content-section__list">
        {items?.map((item)=>(
            <Items key={item._id} item={item} />
        ))}
    </div>
  );
};

export default ItemsContainer;

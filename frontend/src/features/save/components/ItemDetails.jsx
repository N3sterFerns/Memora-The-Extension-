import React, { useEffect } from "react";

import "../styles/itemdetails.scss";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useSave } from "../hooks/useSave";
import { useSelector } from "react-redux";
import YoutubeBtn from "./YoutubeBtn";
import VisitButton from "./VisitButton";

const ItemDetails = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const location = useLocation()
    const {getAllRelatedItems} = useSave()
    const relatedItems = useSelector((state)=> state.save.relatedItems)
    const user = useSelector((state)=> state.auth.user.email)
    const currentItem = location?.state;


    useEffect(()=>{
        getAllRelatedItems(id)
    }, [id])

  return (
    <div className="article-container">

      <div className="header">
        <h1>{currentItem?.title}</h1>
        <div className="actions">
          <button className="back-btn">
            <span onClick={()=> navigate("/dashboard")} >Back</span>
          </button>
          <button className="delete">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      <div className="metadata-strip">
        <div className="author">
          <p className="label">Author</p>
          <p className="value">{user.split("@")[0]}</p>
        </div>
        <div className="published">
          <p className="label">Published</p>
          <p className="value">{new Date(currentItem?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}</p>
        </div>
        <div className="category">
          <p className="label">Category</p>
          <div className="tags">
            {currentItem?.tags?.map((tag, i)=>(
                <span key={i} className={`tag ${i%2=== 0? "primary": "secondary"}`}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="content-area">
        <article>
          <div className="featured-image">
            <img
              src={currentItem?.image}
              alt="Minimalist Workspace"
              height={500}
            />
          </div>
          <div className="text-content">
            <p>
              {currentItem?.description}
            </p>
          </div>

          <div className="visit-link-con">
            {currentItem?.url.includes("youtube") ? (
                <YoutubeBtn url={currentItem?.url}/>
            ): (
                <VisitButton url={currentItem?.url}/>
            )}

          </div>
        </article>
      </div>

      <div className="related-items">
        <h2>Related List</h2>
        <div className="grid">

            {relatedItems?.map((related)=>(
                <Link state={related} to={`/dashboard/save/${related._id}`} className="card">
                    <div className="image-wrapper">
                    <img
                        src={related?.image}
                        alt="Img"
                    />
                    <div className="category-tag">{related?.tags[0]}</div>
                    </div>
                    <h3>The Science of Deep Focus and Productivity</h3>
                    <div className="meta">
                    <span>{user.split("@")[0]}</span> • <span>5 min read</span>
                    </div>
                </Link>
            ))}

          
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;

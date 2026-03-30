import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const Rediscover = () => {

    const resurfacedItems = useSelector((state)=> state.save.resurfaceItems)

     if (!resurfacedItems || resurfacedItems.length === 0) return null;
  return (
    <section className="rediscover">
        <div className="rediscover__header">
          <h2 className="rediscover__title">Rediscover</h2>
          <p className="rediscover__subtitle">Forgotten what you have in your list.</p>
        </div>
        <div className="rediscover__grid">
          {resurfacedItems?.map((item) => (
            <Link to={`/dashboard/save/${item._id}`} state={item} key={item.id} className="rediscover__card">
              <div className="rediscover__card-image">
                <img src={item.image} alt={item.title} />
              </div>
              <h4 className="rediscover__card-title">{item.title}</h4>
              <div className="rediscover__card-meta">
                <span className="material-symbols-outlined">history</span>
                <span>{new Date(item?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
  )
}

export default Rediscover
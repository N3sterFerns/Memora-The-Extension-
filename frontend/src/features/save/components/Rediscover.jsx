import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Rediscover = () => {
  const resurfacedItems = useSelector((state) => state.save.resurfaceItems);
  const { timeBased, relevanceBased } = resurfacedItems;
  if (!resurfacedItems || resurfacedItems.length === 0) return null;
  return (
    <section className="rediscover">

      {(timeBased.length > 0 || relevanceBased.length > 0) && (
        <div key={1} className="rediscover__header">
          <h2 className="rediscover__title">Rediscover</h2>
          <p className="rediscover__subtitle">
            Forgotten what you have in your list.
          </p>
        </div>
      )}

      {timeBased.length > 0 && (
        <div>
          <h3 style={{padding: "1rem 0"}}>Time Based Recommendations</h3>
          <div className="rediscover__grid">
            {timeBased?.map((item) => (
              <Link
                to={`/dashboard/save/${item.item._id}`}
                state={item.item}
                key={item.item._id}
                className="rediscover__card"
              >
                <div className="rediscover__card-image">
                  <img src={item.item.image} alt={item.item.title} />
                </div>
                <h4 className="rediscover__card-title">{item.item.title}</h4>
                <div className="rediscover__card-meta">
                  <span className="material-symbols-outlined">history</span>
                  <span>
                    {new Date(item.item?.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {relevanceBased.length > 0 && (
        <div style={{marginTop: "1rem"}}>
          <h3 style={{padding: "1rem 0"}}>Related to your recent saves</h3>
          <div className="rediscover__grid">
            {relevanceBased.map((item) => (
              <Link key={item._id} to={`/dashboard/save/${item._id}`} state={item} className="rediscover__card">
                <div className="rediscover__card-image"><img src={item.image} alt={item.title} /></div>
                <h4>{item.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      )}

    </section>
  );
};

export default Rediscover;

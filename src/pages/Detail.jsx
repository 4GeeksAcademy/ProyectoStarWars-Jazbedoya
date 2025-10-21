import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { fetchDetail } from "../swapi.js"
import { useStore } from "../hooks/useGlobalReducer";

// Helper to map visualguide folder per type
function imageFor(type, uid) {
  const folder = type === "people" ? "characters" : type; // characters | vehicles | planets
  return `https://starwars-visualguide.com/assets/img/${folder}/${uid}.jpg`;
}

export default function Detail() {
  const { type, uid } = useParams(); // people | vehicles | planets
  const { actions, store } = useStore();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Saber si está en favoritos
  const isSaved = useMemo(
    () => store.favorites?.some(f => f.type === type && f.uid === uid),
    [store.favorites, type, uid]
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        actions.setLoading(true);
        const res = await fetchDetail(type, uid);
        if (mounted) setData(res);
      } catch (e) {
        console.error(e);
        if (mounted) setError("Error fetching detail");
      } finally {
        actions.setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [type, uid]);

  if (error) return (
    <div className="container py-4">
      <div className="alert alert-danger">{error}</div>
      <Link to={`/${type}`} className="btn btn-secondary">← Back to {type}</Link>
    </div>
  );

  if (!data) return (
    <div className="container py-4">
      <p>Loading...</p>
    </div>
  );

  const { properties = {}, description } = data || {};
  const displayName = properties.name || properties.title || "Detail";

  return (
    <div className="container py-4">
      <div className="row g-4 align-items-start">
        <div className="col-12 col-md-5">
          <div className="card shadow-sm">
            <img
              className="card-img-top"
              alt={displayName}
              src={imageFor(type, uid)}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="card-body d-flex justify-content-between align-items-center">
              <Link to={`/${type}`} className="btn btn-outline-secondary btn-sm">← Back</Link>
              {isSaved ? (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => actions.removeFavorite({ uid, type })}
                >
                  ★ Saved
                </button>
              ) : (
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => actions.addFavorite({ uid, type, name: displayName })}
                >
                  ☆ Save
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-7">
          <h2 className="mb-2">{displayName}</h2>
          {description && <p className="text-muted">{description}</p>}

          <div className="card mt-3">
            <div className="card-body">
              <h6 className="card-subtitle mb-3 text-uppercase text-secondary">Properties</h6>
              <div className="row">
                {Object.entries(properties).map(([k, v]) => (
                  <div className="col-6 col-md-4 mb-3" key={k}>
                    <small className="text-secondary text-uppercase d-block">{k}</small>
                    <div>{String(v)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Planets.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";
import { fetchPlanets,imageFor } from "../swapi";
 



export default function Planets() {
  const {store,actions} = useStore();


  useEffect(() => {
    (async () => {
      try {
        actions.setLoading(true);
        const list = await fetchPlanets();
        actions.setPlanets(list)
        
      } catch (e) {
        console.error(e);
      } finally {
        actions.setLoading(false);
      }
    })();
  }, []);

  if (store.loading && store.planets.length ===0){
     return(
   <div className="container">
    <p>Loading...</p>
    </div>
     );
    }

  return (
     <div className="container py-4">
      <h2 className="mb-3">Planets</h2>

      <div className="row g-3">
        {store.planets.map((p) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.uid}>
            <div className="card h-100">
              <img
                className="card-img-top"
                alt={p.name}
                src={imageFor("planets", p.uid)}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <div className="mt-auto d-flex gap-2">
                  <Link
                    to={`/planets/${p.uid}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Details
                  </Link>
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() =>
                      actions.addFavorite({ uid: p.uid, type: "planets", name: p.name })
                    }
                  >
                    ☆ Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// src/pages/Vehicles.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchVehicles,imageFor } from "../swapi";
import { useStore } from "../hooks/useGlobalReducer";

export default function Vehicles() {
  const {store, actions} = useStore();
 
 
  useEffect(() => {
    (async () => {
      try {
        actions.setLoading(true);
        const list = await fetchVehicles;
        actions.setVehicles(list)
      } catch (e) {
        console.error(e);
      } finally {
        actions.setLoading(false);
      }
    })();
  }, []);

  if (store.loading  && store.vehicles.lenght === 0) {
    return( <div className="container">
      <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="container py-4">
      <h2 className="mb-3">Vehicles</h2>

      <div className="row g-3">
        {store.vehicles.map((v) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={v.uid}>
            <div className="card h-100">
              <img
                className="card-img-top"
                alt={v.name}
                src={imageFor("vehicles", v.uid)}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{v.name}</h5>
                <div className="mt-auto d-flex gap-2">
                  <Link
                    to={`/vehicles/${v.uid}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Details
                  </Link>
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() =>
                      actions.addFavorite({ uid: v.uid, type: "vehicles", name: v.name })
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
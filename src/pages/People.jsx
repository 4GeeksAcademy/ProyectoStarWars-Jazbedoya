import { useEffect } from "react";
import { useStore } from "../hooks/useGlobalReducer";
import { fetchPeople } from "../swapi";
import { NavLink } from "react-router-dom";
import { useActionState } from "react";

export default function people() {
    const {store,action} = useStore();


useEffect(()=>{
    (async ()=>{
        try {
            actions.setLoading(true);
            const list = await fetchPeople();
            actions.setPeople(list);
        } catch (e){
            console.error(e);
        } finally{
            actions.setLoading(false);
        }
    })();
},[]);

if (store.loading && store.people.length === 0) return <p className="m-3">Loading...</p>

return (
    <div className="container mt-4">
      <h2>People</h2>
      <div className="row g-3">
        {store.people.map(p => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.uid}>
            <div className="card h-100">
              <img
                className="card-img-top"
                alt={p.name}
                // visualguide usa /characters/:id para personas
                src={`https://starwars-visualguide.com/assets/img/characters/${p.uid}.jpg`}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <div className="mt-auto d-flex gap-2">
                  <Link to={`/people/${p.uid}`} className="btn btn-outline-primary btn-sm">Details</Link>
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => actions.addFavorite({ uid: p.uid, type: "people", name: p.name })}
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
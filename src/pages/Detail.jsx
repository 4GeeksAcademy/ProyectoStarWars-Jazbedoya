import { useEffect, useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import { fetchDetail } from "../swapi";

export default function Detail(){
    const {type, uid } = useParams();
    const [data,setData] = useState(null);
    


    useEffect(()=>{
        (async ()=>{
            const d = await fetchDetail(type,uid );
            setData(d);
        })();
    }),[type,uid]

    if (!data) return <p  className="m-3">Loading...</p>;

    const {properties = {}, description }= data;

    return(<div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-5">
          <img
            className="img-fluid rounded shadow-sm"
            alt={data?.properties?.name || data?.properties?.title || "detail"}
            src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${uid}.jpg`}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <div className="col-md-7">
          <h2 className="mb-3">{properties.name || properties.title}</h2>
          <p className="text-muted">{description}</p>

          <div className="card mt-3">
            <div className="card-body">
              <h6 className="card-subtitle mb-3">Properties</h6>
              <div className="row">
                {Object.entries(properties).map(([k, v]) => (
                  <div className="col-6 col-md-4 mb-2" key={k}>
                    <small className="text-uppercase text-secondary">{k}</small>
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
};
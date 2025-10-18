const API = "https://www.swapi.tech/api";

async function getJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error ("Network error ");
    return res.json();
    
}

export async function fetchPeople(){
    // swapi.tech people: https://www.swapi.tech/api/people
    const data = await getJson(`${API}/people`);
    return (data?.result?? []).map(x =>({uid: x.uid, name: x.name, type: "people"}));

}

export async function fetchVehicles(){
  
    const data = await getJson(`${API}/vehicles`);
    return (data?.result?? []).map(x =>({uid: x.uid, name: x.name, type: "vehicles"}));
    
}

export async function fetchPlanets(){
    
    const data = await getJson(`${API}/planets`);
    return (data?.result?? []).map(x =>({uid: x.uid, name: x.name, type: "planets"}));
    
}


export async function fetchDetail(type,uid ){
    //type : "people" / "vehicles" / "planets"
    const data = await getJson(`${API}/${type}/${uid}`);
    return data?.result; //{uid, descripcion,...}
}
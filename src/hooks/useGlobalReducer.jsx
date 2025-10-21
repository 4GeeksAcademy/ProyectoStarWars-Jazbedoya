import React, { createContext, useContext, useReducer, useMemo } from "react";
import storeReducer,{initialStore} from "../store";

// 1) Crear el Contexto
const StoreContext = createContext(null);

//2) Provider

export function StoreProvider({children}) {
    const [store, dispatch] = useReducer (storeReducer, undefined, initialStore);



//3) Acciones que usara la UI
const actions = useMemo(()=>({
    //Loading helper----
    setLoading: (flag) =>  dispatch({type: "set_loading", payload:flag}),

    //Setters Datos
    setPeople: (list) =>  dispatch({type: "set_people", payload: list}),
    setVehicles: (list) =>  dispatch({type: "set_vehicles", payload: list}),
    setPlanets: (list) =>  dispatch({type: "set_planets", payload: list}),
   

    // favoritos
    addFavorite : (item) =>  dispatch({type: "add_favorite", payload: item}),
    removeFavorite: (item) =>  dispatch({type: "remove_favorite", payload: item}),




}), [dispatch]);

const value = useMemo(()=>({store, actions}),[store, actions]);

return(

<StoreContext.Provider value={value}>
    {children}
</StoreContext.Provider>

);
}


//hook de acceso
export function useStore(){
    const ctx = useContext(StoreContext);
    if (!ctx) throw new Error ("useStore debe usarse dentro de <StoreProvider/>")
    return ctx;
}



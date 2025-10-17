import storeReducer,{initialStore} from "../store";

// 1) Crear el Contexto
const StoreContext = createContext(null);

//2) Provider

export function StoreProvider({children}) {
    const [store, dispatch] = useReducer (storeReducer, undefined, initialStore);
}


//3) Acciones que usara la UI
const action = useMemo(()=>({
    //Loading helper----
    setLoading: (flag) =>  dispatch({type: "set_loading", payload:flag}),

    //Setters Datos
    setLoading: (list) =>  dispatch({type: "set_people", payload: list}),
    setLoading: (list) =>  dispatch({type: "set_vehicles", payload: list}),
    setLoading: (list) =>  dispatch({type: "set_planets", payload: list}),
   

    // favoritos
    addFavorite : (item) =>  dispatch({type: "add_favorite", payload: item}),
    removeFavorite: (item) =>  dispatch({type: "remove_favorite", payload: item}),




}), []);
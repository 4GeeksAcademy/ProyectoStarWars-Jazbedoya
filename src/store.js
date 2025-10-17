
 //Estado Inicial

export const initialStore=()=>({

    message: null,
    loading: false,

    //Datos que vendran de la API

    people: [],
    vehicles: [],
    planets: [],ç


    //REad later/ Favoritos
    favorites : [] // elemntos{uid ,name,type}
   
  
});
  //Reducer
export default function storeReducer(store, action = {}) {
  switch(action.type){
    //Control general

    case 'set_loading': 

      return {...store, people: action.payload}; //array

    case 'set_vehicles':
      return {...store, vehicles: action.payload};

    case 'set_planets':
      return {...store , planets: action.payload};

    
      //Favoritos
    case 'add_favorite':{
      const item = action.payload; //{uid, type, name}
      const exists = store.favorites.some(
        f => f.uid === item.uid && f.type === item.type
      );
    return exists
     ? store 
     : {...store, favorites:[...store.favorites, item] };

    }

    case 'remove_favorite': {
      const {uid,type} = action.payload;
      return{
        ...store,
        favorites: store.favorites.filter(f => !(f.uid === uid && f.type === ))
      };
    }

       
    default:
      throw Error('Unknown action.'+ action.type);
  }    
}

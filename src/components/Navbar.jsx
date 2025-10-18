import { Link } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";

export default  Navbar = () => {
	const {store,actions} = useStore();

	return (
		<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">StarWars</Link>

        <div className="ms-auto dropdown">
          <button
            className="btn btn-warning dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Favorites ({store.favorites.length})
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 && (
              <li className="dropdown-item text-secondary">Empty</li>
            )}
            {store.favorites.map(f => (
              <li key={`${f.type}-${f.uid}`} className="d-flex align-items-center gap-2 dropdown-item">
                <Link to={`/${f.type}/${f.uid}`} className="text-decoration-none flex-grow-1">
                  {f.name}
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => actions.removeFavorite({ uid: f.uid, type: f.type })}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
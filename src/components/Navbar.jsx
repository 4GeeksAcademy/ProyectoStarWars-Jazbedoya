// Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";

export default function Navbar() {
  const { store, actions } = useStore();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-semibold" to="/">
          StarWars
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapse */}
        <div className="collapse navbar-collapse" id="mainNav">
          {/* Left links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/people">
                People
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vehicles">
                Vehicles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/planets">
                Planets
              </NavLink>
            </li>
          </ul>

          {/* Favorites dropdown (right) */}
          <div className="dropdown ms-lg-3">
            <button
              className="btn btn-warning dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites ({store.favorites?.length ?? 0})
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              {store.favorites.length === 0 && (
                <li>
                  <span className="dropdown-item text-secondary">Empty</span>
                </li>
              )}

              {store.favorites.map((f) => (
                <li
                  key={`${f.type}-${f.uid}`}
                  className="d-flex align-items-center gap-2 dropdown-item"
                >
                  <Link
                    to={`/${f.type}/${f.uid}`}
                    className="text-decoration-none flex-grow-1"
                  >
                    {f.name}
                  </Link>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() =>
                      actions.removeFavorite({ uid: f.uid, type: f.type })
                    }
                    title="Remove"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

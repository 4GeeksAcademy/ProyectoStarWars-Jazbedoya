// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
        createRoutesFromElements,
            Route, Navigate
            } from "react-router-dom";
            import { Layout } from "./pages/Layout";
            import People from "./pages/People"
            import Vehicles from "./pages/Vehicles"
            import Detail from "./pages/Detail"

            export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      {/* redirige / a /people */}
      <Route index element={<Navigate to="/people" replace />} />

      <Route path="people" element={<People />} />
      <Route path="vehicles" element={<Vehicles />} />
      <Route path="planets" element={<Planets />} />

      {/* detalle genérico */}
      <Route path=":type/:uid" element={<Detail />} />
    </Route>
  )
);

           
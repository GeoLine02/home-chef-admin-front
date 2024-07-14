import { Suspense } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import routes from "./constants/route";
import DashboardPage from "./pages/DashboardPage";
import AppLayout from "./components/layouts/AppLayout";
import RouteGuard from "./guards/RouteGuard";
import TablePage from "./pages/TablePage";

function App() {
  return (
    <div>
      <TablePage />
      {/* <Suspense>
        <Routes>
          <Route
            element={
              <RouteGuard>
                <AppLayout />
              </RouteGuard>
            }
          >
            <Route path={routes.DASHBOARD} element={<DashboardPage />} />
          </Route>
          <Route path={routes.DASHBOARD} element={<DashboardPage />} />
          <Route path={routes.DASHBOARD} element={<DashboardPage />} />
        </Routes>
      </Suspense> */}
    </div>
  );
}

export default App;

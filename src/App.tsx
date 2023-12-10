import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import { MantineProvider } from "@mantine/core";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy } from "react";
import { paths_information } from "./constants";

const Root = lazy(() => import("./components/Root"));
const MathPage = lazy(() => import("./components/MathPage"));
const DoubleSavingInterest = lazy(
  () => import("./components/Finance/DoubleSavingInterest")
);
const NhamNghiem = lazy(() => import("./components/MathPage/NhamNghiem"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={paths_information.index.path} element={<Root />}>
      <Route path={paths_information.math_index.path} element={<MathPage />} />
      <Route
        path={paths_information.math_nhamnghiem.path}
        element={<NhamNghiem />}
      />
      <Route
        path={paths_information.double_saving_interest.path}
        element={<DoubleSavingInterest />}
      />
    </Route>
  )
);

function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
export default App;

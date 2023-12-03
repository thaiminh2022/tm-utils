import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';
import { MantineProvider, } from '@mantine/core';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from './components/Root';
import MathPage from './components/MathPage';
import { paths_information } from './constants';
import DoubleSavingInterest from './components/Finance/DoubleSavingInterest';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={paths_information.index.path} element={<Root />}>
            <Route path={paths_information.math_index.path} element={<MathPage />} />
            <Route path={paths_information.math_nhamnghiem.path} element={<MathPage />} />
            <Route path={paths_information.double_saving_interest.path} element={<DoubleSavingInterest/>} />
        </Route>
    )
)

function App() {
    return <MantineProvider>
        <RouterProvider router={router} />
    </MantineProvider>;
}
export default App



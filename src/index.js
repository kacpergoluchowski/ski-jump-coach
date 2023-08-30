import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Countries from './pages/Countries'
import Austria from './pages/Countries/Austria';
import Bulgaria from './pages/Countries/Bulgaria';
import Czechy from './pages/Countries/Czechy';
import Finlandia from './pages/Countries/Finlandia'
import Japonia from './pages/Countries/Japonia';
import Kanada from './pages/Countries/Kanada';
import Kazachstan from './pages/Countries/Kazachstan';
import Norwegia from './pages/Countries/Norwegia';
import Niemcy from './pages/Countries/Niemcy';
import Polska from './pages/Countries/Polska';
import Slowenia from './pages/Countries/Słowenia';
import Turcja from './pages/Countries/Turcja';
import Wlochy from './pages/Countries/Włochy';
import Competitions from './pages/Competitions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/countries',
    element: <Countries/>
  },
  {
    path: '/countries/Austria',
    element: <Austria country = "Austria"/>
  },
  {
    path: '/countries/Bułgaria',
    element: <Bulgaria country = "Bułgaria"/>
  },
  {
    path: '/countries/Czechy',
    element: <Czechy country = "Czechy"/>
  },
  {
    path: '/countries/Finlandia',
    element: <Finlandia country = "Finlandia"/>
  },
  {
    path: '/countries/Japonia',
    element: <Japonia country = "Japonia"/>
  },
  {
    path: '/countries/Kanada',
    element: <Kanada country = "Kanada"/>
  },
  {
    path: '/countries/Kazachstan',
    element: <Kazachstan country = "Kazachstan"/>
  },
  {
    path: '/countries/Norwegia',
    element: <Norwegia country = "Norwegia"/>
  },
  {
    path: '/countries/Niemcy',
    element: <Niemcy country = "Niemcy"/>
  },
  {
    path: '/countries/Polska',
    element: <Polska country = "Polska"/>
  },
  {
    path: '/countries/Słowenia',
    element: <Slowenia country = "Słowenia"/>
  },
  {
    path: '/countries/Turcja',
    element: <Turcja country = "Turcja"/>
  },
  {
    path: '/countries/Włochy',
    element: <Wlochy country = "Włochy"/>
  },
  {
    path: '/competitions',
    element: <Competitions/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

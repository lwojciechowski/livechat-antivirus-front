import React, {Suspense} from 'react';
import {Router} from "@reach/router";
import Loading from "./Loading";

import './App.css';

const Install = React.lazy(() => import("./install"));


function App() {
  return (
      <Suspense fallback={<Loading />}>

      <Router>
            <Install exact path="/install" />
        </Router>
      </Suspense>
  );
}

export default App;

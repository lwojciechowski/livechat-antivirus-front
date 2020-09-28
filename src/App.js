import React, {Suspense} from 'react';
import {Router} from "@reach/router";
import Loading from "./Loading";

import './App.css';

const Install = React.lazy(() => import("./install"));
const ChatDetails = React.lazy(() => import("./chat-details"));


function App() {
  return (
    <Suspense fallback={<Loading />}>
        <Router>
            <Install exact path="/install" />
            <ChatDetails exact path="/chat-details" />
        </Router>
    </Suspense>
  );
}

export default App;

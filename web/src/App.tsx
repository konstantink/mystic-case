import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import { Switch, Route} from "react-router";

import routes from "./routes";

// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.tsx</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>

interface AppProps {
    history: History
}

const App = (props: AppProps) => {
    return (
        <React.Fragment>
            <ConnectedRouter history={props.history}>
                <Switch>
                    {routes.map((route, idx) => {
                        console.log(route);
                        return (<Route key={`route-idx-${idx}`} exact path={route.path} component={route.component} />)
                    }
                    )}
                </Switch>
            </ConnectedRouter>
        </React.Fragment>
    );
}

export default App;

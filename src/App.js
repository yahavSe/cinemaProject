import { Route, Switch } from 'react-router-dom';

import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import CreateUser from "./CreateUser"



function App() {
  return (
    <div >

        <Switch>
          <Route path="/" exact component={LoginPage}/>
          <Route path="/MainPage/" component={MainPage}/>
          <Route path="/CreateUser/" component={CreateUser}/>
        </Switch>

    </div>
  );
}

export default App;

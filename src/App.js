import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Client from './Components/Client';
import AddOrUpdateFoodTruck from './Components/AddOrUpdateFoodTruck';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route path='/api/add-truck' element={<AddOrUpdateFoodTruck/>}/>
        </Routes>
      </BrowserRouter> */}
      <Client/>
    </div>
  );
}

export default App;

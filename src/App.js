import logo from './logo.svg';
import './App.css';
import CarList from './screens/CarList';
import 'bootstrap/dist/css/bootstrap.css';
import Search from './screens/Search'
import SearchbyDescription from './screens/searchbydescription'
import Completecar from './screens/CompleteCar'

const App = () => {
  return (
    
    <div>

      <CarList />
      <Search/>
      <SearchbyDescription/>
      <Completecar/>
    </div>
  );
};


export default App;

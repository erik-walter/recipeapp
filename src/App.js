import Home from "./pages/Home";
import Pages from "./pages/Pages";
import Category from "./components/Category";
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Category />
        <Pages/>
    </div>
  );
}

export default App;

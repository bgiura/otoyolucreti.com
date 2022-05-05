import './App.css';
import Navbar from './Components/Navbar';
import MainSearchForm from './Components/MainSearchForm.js';
import Header from './Components/Header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import KuzeyMarmara from './Components/KuzeyMarmara';
import YavuzSultanSelim from './Components/YavuzSultanSelim';
import MalkaraCanakkale from './Components/MalkaraCanakkale';
import KuzeyEge from './Components/KuzeyEge';
import AnkaraNigde from './Components/AnkaraNigde';
import IstanbulIzmir from './Components/IstanbulIzmir';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>

      <div className="App">

        <Navbar />

        <Switch>

          <Route exact path="/">
            <Header />
            <MainSearchForm />
          </Route>

          <Route excact path="/kuzey-marmara-otoyolu">
            <KuzeyMarmara />
          </Route>

          <Route excact path="/yavuz-sultan-selim-koprusu-ve-cevre-otoyolu">
            <YavuzSultanSelim />
          </Route>

          <Route excact path="/malkara-canakkale-otoyolu-ve-canakkale-koprusu">
            <MalkaraCanakkale />
          </Route>

          <Route excact path="/kuzey-ege-otoyolu">
            <KuzeyEge />
          </Route>

          <Route excact path="/ankara-nigde-otoyolu">
            <AnkaraNigde />
          </Route>

          <Route excact path="/istanbul-izmir-otoyolu-ve-osmangazi-koprusu">
            <IstanbulIzmir />
          </Route>

        </Switch>

        <Footer />

      </div>

    </Router>
  );
}

export default App;

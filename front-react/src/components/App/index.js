// == Import
import Header from 'src/components/Header';
import Lists from 'src/components/Lists';
import Menu from 'src/components/Menu';

import './styles.scss';

// == Composant
function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Menu />
        <Lists />
      </div>
    </div>
  );
}

// == Export
export default App;

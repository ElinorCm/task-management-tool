// == Import
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'src/components/Header';
import Lists from 'src/components/Lists';
import Menu from 'src/components/Menu';

import { createListInputValue } from 'src/store/actions';
import './styles.scss';

// == Composant
function App() {
  const lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();
  useEffect(() => {
    lists.forEach((list) => {
      dispatch(createListInputValue(list.id));
    });
  }, []);
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

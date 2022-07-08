// == Import
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'src/components/Header';
import Lists from 'src/components/Lists';
import Menu from 'src/components/Menu';

import {
  createlistsAttributes,
  createcardsAttributes,
  createisListFormOpen,
  createisCardFormOpen,
} from 'src/store/actions';
import './styles.scss';

// == Composant
function App() {
  const lists = useSelector((state) => state.lists);
  const cards = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  useEffect(() => {
    lists.forEach((list) => {
      dispatch(createlistsAttributes(list.id));
      dispatch(createisListFormOpen(list.id));
    });
    cards.forEach((card) => {
      dispatch(createcardsAttributes(card.id));
      dispatch(createisCardFormOpen(card.id));
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

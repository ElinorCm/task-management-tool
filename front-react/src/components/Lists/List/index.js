import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Paper from '@mui/material/Paper';

import Card from 'src/components/Lists/Card';
import Form from 'src/components/Lists/Form';
import { filterCardsbyListId, findIsOpenbyListId, findInputValuebyListId } from 'src/store/selectors';
import { toggleListForm } from 'src/store/actions';
import './list.scss';

function List({ name, id }) {
  const dispatch = useDispatch();
  const cards = useSelector((state) => filterCardsbyListId(state.cards, id));
  const isListFormOpen = useSelector((state) => findIsOpenbyListId(
    state.lists,
    state.listsAttributes,
    id,
  ));
  const listInputValue = useSelector((state) => findInputValuebyListId(
    state.lists,
    state.listsAttributes,
    id,
  ));
  return (
    <Paper
      elevation={1}
      sx={{
        minWidth: 300, marginLeft: '2rem', marginTop: '3rem', height: 'inherit',
      }}
    >
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardHeader
          titleTypographyProps={{ variant: 'subtitle1' }}
          title={name}
          value={listInputValue}
          onClick={() => dispatch(toggleListForm(id))}
        />
        <CardActions>
          <AddIcon />
          <DeleteOutlineIcon />
        </CardActions>
      </Container>
      <Container>
        {
          isListFormOpen && (
          <Form
            className="list-form"
            id={id}
          />
          )
        }
      </Container>
      <CardContent className="card-container">
        {
          cards.map((card) => (
            <Card
              key={card.id}
              name={card.name}
              id={card.id}
            />
          ))
        }
      </CardContent>
    </Paper>
  );
}

List.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default List;

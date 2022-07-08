import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card as CardUI,
  CardActions,
  CardHeader,
  Container,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

import Form from 'src/components/Lists/Form';
import { findIsOpenbyCardId } from 'src/store/selectors';
import './card.scss';

function Card({ name, id }) {
  const isCardFormOpen = useSelector((state) => findIsOpenbyCardId(
    state.cards,
    state.cardsAttributes,
    id,
  ));
  return (
    <div className="card">
      <CardUI sx={{ background: 'white' }}>
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CardHeader
            title={name}
            titleTypographyProps={{ variant: 'subtitle2' }}
          />
          <CardActions>
            <EditIcon />
            <DeleteOutlineIcon />
          </CardActions>
        </Container>
        <Container sx={{ display: 'flex' }}>
          {
            isCardFormOpen
            && (
            <Form
              className="card-form"
              id={id}
            />
            )
          }
        </Container>
      </CardUI>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Card;

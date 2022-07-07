import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

import List from 'src/components/Lists/List';
import './lists.scss';

function Lists() {
  const lists = useSelector((state) => state.lists);
  return (
    <Container>
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        {
          lists.map((list) => (
            <List
              key={list.id}
              name={list.name}
              id={list.id}
            />
          ))
          }
      </Grid>
    </Container>
  );
}

export default Lists;

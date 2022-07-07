import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import List from 'src/components/Lists/List';

function Lists() {
  return (
    <Container>
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        <List />
        <List />
      </Grid>
    </Container>
  );
}

export default Lists;

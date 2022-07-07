import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import './list.scss';

function List() {
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
          title="Titre de la liste"
        />
        <CardActions>
          <AddIcon />
          <DeleteOutlineIcon />
        </CardActions>
      </Container>
      <Container>
        <form className="list-form">
          <TextField id="name" label="Nom de la liste" variant="standard" />
          <Button variant="contained">Valider</Button>
        </form>
      </Container>
      <CardContent>
        <Card sx={{ background: 'white' }}>
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardHeader
              title="Titre de la carte"
              titleTypographyProps={{ variant: 'subtitle2' }}
            />
            <CardActions>
              <EditIcon />
              <DeleteOutlineIcon />
            </CardActions>
          </Container>
          <Container sx={{ display: 'flex' }}>
            <form className="card-form">
              <TextField id="name" label="Nom de la carte" variant="standard" />
              <Button variant="contained">Valider</Button>
            </form>
          </Container>
        </Card>
      </CardContent>
    </Paper>
  );
}

export default List;

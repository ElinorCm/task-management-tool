import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import './form.scss';

function Form() {
  return (
    <form className="form">
      <TextField id="name" label="Nom de la liste" variant="standard" />
      <Button variant="contained">Valider</Button>
    </form>
  );
}

export default Form;

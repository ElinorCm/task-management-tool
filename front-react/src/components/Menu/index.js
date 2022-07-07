import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListAltIcon from '@mui/icons-material/ListAlt';
// import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

function Menu() {
  return (
    <Paper
      className="menu"
      elevation={1}
      sx={{
        width: '15vw', maxWidth: '100%', minWidth: '180px', height: '100%',
      }}
    >
      <MenuList sx={{ padding: '0px' }}>
        <MenuItem sx={{ height: '3.5rem' }}>
          <ListItemIcon>
            <ListAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Créer une liste</ListItemText>
        </MenuItem>
        {/*
        <MenuItem sx={{ height: '3.5rem' }}>
          <ListItemIcon>
            <LocalOfferOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Créer un tag</ListItemText>
        </MenuItem>
        */}
      </MenuList>
    </Paper>
  );
}

export default Menu;

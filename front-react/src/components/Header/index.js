import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

import './header.scss';

function Header() {
  return (
    <div className="header">
      <ViewKanbanIcon
        fontSize="inherit"
      />
      <h1>kanban</h1>
    </div>
  );
}

export default Header;

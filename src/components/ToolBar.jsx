import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

const filterCategoriesDemoAPI = [
  {
    value: 'filter',
    label: 'Filter'
  }, {
    value: 'drink',
    label: 'Drink'
  }, {
    value: 'cookie',
    label: 'Cookie'
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  dropdownPaper: {
    boxShadow: 'none',
    background: 'none'
  },
  dropdownItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: '12px 25px',
    fontSize: '1.1rem',
    background: theme.palette.background.card,
    borderRadius: 20,
    marginBottom: 11,
    '&:hover': {
      background: theme.palette.primary.main,
      color: theme.palette.background.paper
    }
  },
  paperFeature: {
    marginLeft: theme.spacing(2)
  }
}));

export default function ToolBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const prevOpen = React.useRef(open);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={ classes.root }>
      <div style={{ zIndex: 1 }}>
        <Button
          ref={ anchorRef }
          onClick={ handleToggle }
          style={{ fontSize: '1.3rem' }}
        >
          Categories <KeyboardArrowDownIcon className="ml-3" />
        </Button>

        <Popper open={ open } anchorEl={ anchorRef.current } role={ undefined } transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={ classes.dropdownPaper }>
                <MenuList autoFocusItem={ open }>
                  <MenuItem className={ classes.dropdownItem }>
                    <Link component={ ReactLink } to='/variant'>Variant</Link>
                  </MenuItem>

                  <MenuItem className={ classes.dropdownItem }>
                    <Link component={ ReactLink } to='/categories'>Categories</Link>
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <div style={{ display: 'flex' }}>
        <Button variant="contained" color="primary" className={ classes.paperFeature }>
          <FileCopyIcon style={{ fontSize: 20 }} className="mr-1" /> Duplicate
        </Button>

        <Button variant="contained" color="primary" className={ classes.paperFeature }>
          <DeleteIcon style={{ fontSize: 20 }} className="mr-1" /> Delete
        </Button>

        <div className={ classes.paperFeature }>
          <TextField
            style={{ width: 166 }}
            select
            variant="outlined"
            SelectProps={{
              native: true
            }}
          >
            { filterCategoriesDemoAPI.map(option => (
              <option key={ option.value } value={ option.value }>
                { option.label }
              </option>
            )) }
          </TextField>
        </div>

        <div className={ classes.paperFeature }>
          <TextField
            className={ classes.margin }
            id="input-with-icon-textfield"
            placeholder="Search"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>

        <Button variant="contained" color="secondary" className={ classes.paperFeature }>
          <AddIcon style={{ fontSize: 20 }} className="mr-2" /> Add new product
        </Button>
      </div>
    </div>
  );
}

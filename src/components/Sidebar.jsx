import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StoreIcon from '@material-ui/icons/Store';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 88;

const menu = [{
  name: 'Dashboard',
  link: '/',
  icon: <DashboardIcon />,
  childMenu: []
}, {
  name: 'Outlets',
  link: '/product',
  icon: <StoreIcon />,
  childMenu: [{
    name: 'Manage variant',
    link: '/'
  }, {
    name: 'Manage categories',
    link: '/'
  }]
}, {
  name: 'Product',
  link: '/product',
  icon: <LocalMallIcon />,
  childMenu: []
}, {
  name: 'Settings',
  link: '/settings',
  icon: <SettingsIcon />,
  childMenu: []
}];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.background.card,
    borderRight: 0,
    overflow: 'inherit'
  },
  toolbar: theme.mixins.toolbar,
  ListItem: {
    padding: '20px 10px',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    transition: 'none',
    '&:hover $listItemText, &:hover': {
      display: 'flex',
      background: theme.palette.primary.main
    },
    '&:hover $iconButton': {
      color: theme.palette.background.paper
    }
  },
  iconButton: {
    minWidth: 'auto',
    color: theme.palette.primary.type
  },
  listItemText: {
    position: 'absolute',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 30,
    padding: '0 25px 0 11px',
    height: '100%',
    color: theme.palette.background.paper,
    display: 'none',
    '& .MuiTypography-displayBlock': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  paddingList: {
    justifyContent: 'center',
    display: 'grid'
  }
}));

export default function Sidebar() {
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <Drawer
        className={ classes.drawer }
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={ classes.toolbar } />

        <List className={ classes.paddingList }>
          {
            menu.map((elements, i) => (
              <Link to={elements.link} key={i}>
                <ListItem button className={classes.ListItem}>
                    <ListItemIcon className={classes.iconButton}>{ elements.icon }</ListItemIcon>
                    <ListItemText className={classes.listItemText} primary={elements.name} />
                </ListItem>
              </Link>
            ))
          }
        </List>
      </Drawer>
    </div>
  );
}

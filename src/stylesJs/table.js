const customTable = theme => ({
    root: {
      width: '100%'
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      boxShadow: 'none'
    },
    table: {
      minWidth: 750,
      // '& tbody td': {
      //   position: 'relative'
      // },
      // '& tbody td:after': {
      //   content: "''",
      //   width: 2,
      //   height: 60,
      //   background: theme.palette.background.paper,
      //   position: 'absolute',
      //   right: 0
      // },
      '& tbody tr': {
        background: theme.palette.background.card,
        borderBottom: `6px solid ${theme.palette.background.paper}}`
      }
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    },
    demoMultiSelect: {
      background: theme.palette.background.paper,
      padding: '2px 15px',
      marginRight: '5px',
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 20,
      display: 'inline-flex',
      alignItems: 'center'
    },
    demoCapsull: {
      borderRadius: 20,
      marginRight: '5px',
      padding: '2px 10px'
    },
    demoVariantEditor: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      background: theme.palette.background.card,
      borderRadius: 20
    }
  });
  
  export default customTable;
  
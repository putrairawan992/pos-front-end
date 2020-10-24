import React, { useEffect, useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import customTable from '../stylesJs/table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { getAPI } from '../utils/apiHendler';
import ToolBar from '../components/ToolBar';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';

const productAssignedDemoAPI = [
  {
    value: 'martabak-manis',
    label: 'Martabak Manis'
  }, {
    value: 'martabak-pedas',
    label: 'Martabak Pedas'
  }, {
    value: 'martabak-telur',
    label: 'Martabak Telur'
  }, {
    value: 'teh-botol',
    label: 'Teh Botol Sosro'
  }, {
    value: 'rice-bowl',
    label: 'Rice Bowl Beef'
  }
];

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const headCells = [
  { id: 'variant', label: 'Variant Name', width: '13%' },
  { id: 'assigned', label: 'Products assigned', width: '20%' },
  { id: 'options', label: 'Variant options', width: '22%' },
  { id: 'mode', label: 'Mode', width: '20%' },
  { id: 'actions', label: 'Quick actions', width: '25%' }
];

const EnhancedTableHead = props => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        { headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            width={ headCell.width }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const Variant = withStyles(customTable)(props => {
  const { classes } = props;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('variant');
  const [selected, setSelected] = useState([]);
  const [tableVariant, setTableVariant] = useState([]);
  const [openCollapse, setOpenCollapse] = useState({ openAssigned: false, openVariant: false });

  useEffect(() => {
    async function fetchData() {
      const response = await getAPI('variant');

      setTableVariant(response.variants);
    }
    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = tableVariant.map(n => n.variantId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const toggleCollapse = name => {
    setOpenCollapse(prevState => ({ ...prevState, [name]: !openCollapse[name] }));
  };

  const isSelected = name => tableVariant.indexOf(name) !== -1;

  return (
    <div className={ classes.root }>
      <ToolBar/>

      <Paper className={`mt-5 ${classes.paper}`}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableVariant.length}
            />
            <TableBody>
              {
                stableSort(tableVariant, getComparator(order, orderBy))
                  .map((data, index) => {
                    const isItemSelected = isSelected(data.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                    <Fragment key={index}>
                      <TableRow
                        hover
                        onClick={event => handleClick(event, data.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>

                        <TableCell>{ data.variantName }</TableCell>

                        <TableCell>
                          <Button onClick={ () => toggleCollapse('openAssigned') } fullWidth style={{ justifyContent: 'space-between' }}>
                            <span className="mr-3">Assigned to { productAssignedDemoAPI.length } products</span>
                            {openCollapse.openAssigned ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </Button>
                        </TableCell>

                        <TableCell>
                          <Button onClick={() => toggleCollapse('openVariant') } fullWidth style={{ justifyContent: 'space-between' }}>
                            <span className="mr-3">{ data.variantOption.length } variant options</span>
                            {openCollapse.openVariant ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </Button>
                        </TableCell>

                        <TableCell>
                          <Button variant="contained" style={{ justifyContent: 'space-between', boxShadow: 'none', width: 200 }}>
                            <span>Single Choose</span>
                            <KeyboardArrowDownIcon />
                          </Button>
                        </TableCell>

                        <TableCell>
                          <Button variant="contained" color="primary" className={`mr-2 ${classes.paperFeature}`}>
                            Add new option
                          </Button>

                          <Button variant="contained" color="primary" className={classes.paperFeature}>
                            Insert product
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow style={{ background: '#fff' }}>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}></TableCell>

                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                          <Collapse in={openCollapse.openAssigned} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                              <Button variant="contained" color="primary" className={`mr-1 ${classes.paperFeature}`}>
                                <AddIcon style={{ fontSize: 20 }} className="mr-1" /> Insert product
                              </Button>

                              {productAssignedDemoAPI.map((assignee, i) => (
                                <span className={`p-1 mb-1 ${classes.demoMultiSelect}`} key={ i }>
                                  { assignee.label } <CloseIcon className="ml-2" fontSize="small" />
                                </span>
                              ))}
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>

                      <TableRow style={{ background: '#fff' }}>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}></TableCell>

                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                          <Collapse in={ openCollapse.openVariant } timeout="auto" unmountOnExit>
                            <Box margin={1}>
                              {data.variantOption.map(variant => (
                                <div className={`p-1 ${classes.demoVariantEditor}`} key={ variant.index }>
                                  <DragIndicatorIcon />

                                  <div>{ variant.name }</div>

                                  <Button variant="contained" style={{ justifyContent: 'space-between', boxShadow: 'none', width: 200 }}>
                                    <span>{ variant.type }</span>
                                    <KeyboardArrowDownIcon />
                                  </Button>

                                  <TextField id="outlined-basic" value={ variant.price } variant="outlined" />

                                  <Button variant="contained" style={{ justifyContent: 'space-between', boxShadow: 'none', width: 200 }}>
                                    <span>Duplicate option</span>
                                    <FileCopyIcon />
                                  </Button>

                                  <Button variant="contained" style={{ justifyContent: 'space-between', boxShadow: 'none', width: 200 }}>
                                    <span>Duplicate option</span>
                                    <DeleteIcon />
                                  </Button>
                                </div>
                              ))}
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                    );
                  })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
});

export default Variant;

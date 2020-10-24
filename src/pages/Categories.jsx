import React, { useEffect, useState } from 'react';
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
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { getAPI } from '../utils/apiHendler';
import ToolBar from '../components/ToolBar';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

const assignedProductsDemoAPI = [
  {
    value: 'martabak-manis',
    label: 'Martabak Manis'
  }, {
    value: 'martabak-pedas',
    label: 'Martabak Pedas'
  }, {
    value: 'rice-bowl',
    label: 'Rice Bowl Prawn'
  }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: 'name', label: 'Category name' },
  { id: 'assigned', label: 'Assigned products' }
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

const Categories = withStyles(customTable)(props => {
  const { classes } = props;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getAPI('category');

      setCategory(response.categories);
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
      const newSelecteds = category.map(n => n.name);
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

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
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
              rowCount={category.length}
            />
            <TableBody>
              {
                stableSort(category, getComparator(order, orderBy))
                  .map((data, index) => {
                    const isItemSelected = isSelected(data.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, data.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>

                        <TableCell id={ labelId } className="v-align-center">
                          { data.categoryName }
                        </TableCell>

                        <TableCell>
                          <p>Assigned to { assignedProductsDemoAPI.length } products</p>
                          {
                            assignedProductsDemoAPI.map((assignee, i) => (
                              <span className={`p-1 mb-1 ${classes.demoMultiSelect}`} key={ i }>
                                { assignee.label } <CloseIcon className="ml-2" fontSize="small" />
                              </span>
                            ))
                          }
                        </TableCell>

                        <TableCell align="right">
                          <Button variant="contained" color="primary" className={classes.paperFeature}>
                            <AddIcon className="mr-2" /> Insert product
                          </Button>
                        </TableCell>
                      </TableRow>
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

export default Categories;

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  DataGrid,
  GridColDef,
  GridRowData,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { RowData } from '../../templates/Home';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      },
      textField: {
        [theme.breakpoints.down('xs')]: {
          width: '100%',
        },
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
      dataGrid: {
        '& .header': {
          backgroundColor: '#ffcc80',
        },
        backgroundColor: '#fff3e0',
        maxHeight: 850
      }
    }),
  { defaultTheme },
);

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          {/* <GridToolbarFilterButton /> */}
          <GridToolbarDensitySelector />
        </GridToolbarContainer>
      </div>
      <TextField
        style={{
          minWidth: 300,
        }}
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="large" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

type DataWithId = {
  id: number,
  name: string;
  member: string
  gender: 'all' | 'male' | 'female';
  age: string
  tags: string[];
  roomId: number | null
}

function createData(
  rowData: RowData,
  index: number
): DataWithId {
  const id = index
  const name = rowData.name
  const member = rowData.memberLimit + '人中 ' + rowData.member + '人';
  const gender = rowData.gender
  const age = rowData.ageLower + '歳 ~ ' + rowData.ageUpper + ' 歳'
  const tags = rowData.tags.map((tag) => (
    tag.name
  ))
  const roomId = rowData.id
  return { id, name, member, gender, age, tags, roomId };
}


type Props = {
  rowsData: Array<RowData>
}
type AllData = {
  columns: GridColDef[],
  rows: GridRowData[],
}

export default function QuickFilteringGrid(props: Props) {
  const classes = useStyles()
  const history = useHistory()

  const columns: GridColDef[] = [
    {
      field: 'name', headerName: 'Name', headerAlign: 'center', headerClassName: 'header', minWidth: 500, align: 'center'
    },
    { field: 'member', headerName: 'member', headerAlign: 'right', headerClassName: 'header', minWidth: 200, align: 'right', disableColumnMenu: true },

    {
      field: 'gender',
      headerName: 'gender',
      headerAlign: 'right',
      headerClassName: 'header',
      minWidth: 160,
      align: 'right',
    },
    {
      field: 'age',
      headerName: 'age',
      headerAlign: 'right',
      headerClassName: 'header',
      minWidth: 160,
      align: 'right',
      disableColumnMenu: true,
    },
    {
      field: 'tags',
      headerName: 'tags',
      headerAlign: 'center',
      headerClassName: 'header',
      flex: 1,
      align: 'center',
      hideSortIcons: true,
    },
    {
      field: 'roomId',
      headerName: 'EnterRoom',
      headerAlign: 'center',
      headerClassName: 'header',
      minWidth: 140,
      align: 'center',
      hideSortIcons: true,
      disableColumnMenu: true,
      renderCell: (params) => <Button onClick={() => history.push("/room/" + params.getValue(params.id, params.field))} >入室</Button>
      // params.getValue(params.id, params.field) これでroomIdを取得できる
    },
  ];
  const data: AllData = {
    columns: columns,
    rows: props.rowsData.map((row: RowData, index: number) => (
      createData(row, index)
    ))
  }


  const [searchText, setSearchText] = React.useState('');

  const [rows, setRows] = React.useState<GridRowData[]>(data.rows);

  React.useEffect(() => {
    setRows(data.rows)
    console.log(data.rows)
  }, [props.rowsData])

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data.rows.filter((row: any) => {
      return Object.keys(row).some((field: any) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };


  return (
    <div className='w-full h-screen' >

      <DataGrid
        className={classes.dataGrid}
        components={{ Toolbar: QuickSearchToolbar }}
        rows={rows}
        columns={data.columns}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event: any) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          }
        }}
        rowHeight={70}
        rowsPerPageOptions={[10, 25, 100]}
      />
    </div>
  );
}

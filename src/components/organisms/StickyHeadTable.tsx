import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import { RowData } from '../../templates/Home';
import { useHistory } from "react-router";




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ffcc80',
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: '#fff3e0',
        fontSize: 14,
    },
}));

type Column = {
    id: 'name' | 'member' | 'gender' | 'age' | 'tags' | 'roomId';
    label: string;
    minWidth?: number;
    align?: 'center' | 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170, align: 'center' },
    { id: 'member', label: 'member', minWidth: 100, align: 'right', },

    {
        id: 'gender',
        label: 'gender',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'age',
        label: 'age',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'tags',
        label: 'tags',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'roomId',
        label: 'EnterRoom',
        minWidth: 80,
        align: 'center',
    },
];

type Data = {
    name: string;
    member: string;
    gender: 'all' | 'male' | 'female';
    age: string;
    tags: string[]
    roomId: number | null
}

function createData(
    rowData: RowData
): Data {
    const name = rowData.name
    const member = rowData.memberLimit + '人中 ' + rowData.member + '人';
    const gender = rowData.gender
    const age = rowData.ageLower + '歳 ~ ' + rowData.ageUpper + ' 歳'
    const tags = rowData.tags.map((tag) => (
        tag.name
    ))
    const roomId = rowData.id
    return { name, member, gender, age, tags, roomId };
}


type Props = {
    rowsData: Array<RowData>
}

export default function StickyHeadTable(props: Props) {

    const history = useHistory()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows =
        props.rowsData.map((row: RowData) => (
            createData(row)
        ))


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <Paper style={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer style={{ maxHeight: 690 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>

                                        {columns.map((column) => {
                                            const value = row[column.id];

                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
                                                    {column.id !== 'tags' && column.id !== 'roomId' ?
                                                        value :
                                                        column.id !== 'roomId' ? (
                                                            <div className='flex items-center justify-center' >
                                                                {row[column.id].map((tag: string, index: number) => (
                                                                    <p className='p-1 m-1  bg-gray-300 rounded-3xl' key={index}>{tag}</p>
                                                                ))}
                                                            </div>
                                                        ) : <Button onClick={() => history.push("/room/" + value)} >入室</Button>
                                                    }

                                                </StyledTableCell>

                                            )
                                        })}

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{
                    backgroundColor: '#ffe0b2'
                }}
            />
        </Paper >
    );
}

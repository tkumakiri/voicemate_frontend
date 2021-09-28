import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/organisms/Footer';
import Stack from '@mui/material/Stack';
import { Autocomplete, Box, Paper } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { borderColor, textAlign } from '@mui/system';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { SkyWay } from '.';
import { AlertDialog } from '../components/molucules';
import { useDispatch, useSelector } from 'react-redux';
import { editRoom, roomState } from '../redux/slice/roomsSlice';
import axios from 'axios';

const theme = createTheme();

export default function Room() {
    const dispatch = useDispatch()
    const history = useHistory()
    const roomId: { roomId: string } = useParams()
    const match = useRouteMatch()
    const [nowRoom, setNowRoom] = React.useState<roomState>({
        id: null,
        name: "",
        ageLower: null,
        ageUpper: null,
        gender: "all",
        member: null,
        memberLimit: null,
        introduction: "",
        tags: [
            {
                id: null,
                name: ""
            }
        ]
    })
    const [open, setOpen] = React.useState(false);
    const [start, setStart] = React.useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };
    const handleDialogClose = () => {
        setOpen(false);
        setStart(true);
    };



    type Users = {
        uid: string
        name: string
        image: {
            id: string
            path: string
        }
    }
    const users: Array<Users> = [
        {
            uid: 'aaa',
            name: '名前aaa',
            image: {
                id: 'aaa',
                path: 'https://avatars.githubusercontent.com/u/583231?v=4'
            }
        },
        {
            uid: 'bbb',
            name: '名前bbb',
            image: {
                id: 'bbb',
                path: 'https://avatars.githubusercontent.com/u/583231?v=4'
            }
        },
        {
            uid: 'ccc',
            name: '名前ccc',
            image: {
                id: 'bbb',
                path: 'https://avatars.githubusercontent.com/u/583231?v=4'
            }
        },
        {
            uid: 'ddd',
            name: '名前ddd',
            image: {
                id: 'bbb',
                path: 'https://avatars.githubusercontent.com/u/583231?v=4'
            }
        },
        {
            uid: 'eee',
            name: '名前eee',
            image: {
                id: 'bbb',
                path: 'https://avatars.githubusercontent.com/u/583231?v=4'
            }
        },
    ]

    React.useEffect(() => {

        const fetchRoomById = async () => {
            const roomUrl = 'http://localhost:8000/rooms/' + roomId.roomId
            const response: any = await axios({ method: 'get', url: roomUrl })
            setNowRoom(response.data)
        }
        fetchRoomById()


        handleDialogOpen()
    }, [])
    React.useEffect(() => {
        console.log(nowRoom)
        if (nowRoom.member !== null && nowRoom.memberLimit !== null) {
            if (nowRoom.member >= nowRoom.memberLimit) {
                alert('人数制限で現在入室できません。')
                history.push('/home')
            } else {
                const tagIds:any = []
                nowRoom.tags.map(tag => {
                    tagIds.push(tag.id)
                })
                console.log(tagIds)
                dispatch(editRoom({
                    id: nowRoom.id,
                    name: nowRoom.name,
                    ageLower: nowRoom.ageLower,
                    ageUpper: nowRoom.ageUpper,
                    gender: nowRoom.gender,
                    member: nowRoom.member + 1,
                    memberLimit: nowRoom.memberLimit,
                    introduction: nowRoom.introduction,
                    tags: tagIds
                }))
            }
        }

    }, [nowRoom.member])


    return (
        <div className='w-full h-screen bg-yellow-50' >
            <div className='pt-8' >
                <div className="w-full h-screen">
                    <div className="w-full h-1/6 flex items-center justify-center">

                    </div>
                    <div className="h-2/6 flex flex-wrap items-center justify-center ">
                        {users.length > 0 &&
                            users.map((user: any, index: number) => (
                                <div key={user.uid}>
                                    <Box style={{ margin: 32 }}>
                                        <Box
                                            style={{
                                                width: '5rem',
                                                height: '5rem', borderRadius: '50%'
                                            }} >
                                            <img className="rounded-full" src={user.image.path} />
                                        </Box>
                                        <Typography
                                            style={{
                                                textAlign: 'center',
                                            }}>
                                            {user.name}
                                        </Typography>
                                    </Box>
                                </div>
                            ))}
                    </div>
                    <AlertDialog open={open} onClose={handleDialogClose} />
                    <div className="h-2/6"> <SkyWay roomId={roomId.roomId} uid={users[0].uid} start={start} /></div>
                </div>

            </div>
        </div>
    );
}

import { Button } from "@material-ui/core";
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StickyHeadTable } from "../components/organisms";
import { fetchRoom, getRooms, roomState } from "../redux/slice/roomsSlice";
import { fetchUserById, getUser, initialState, updateUserState } from "../redux/slice/userSlice";

const useStyles = makeStyles({
    button: {
        width: 200,
        height: 100,
    },
});

export type RowData = {
    id: number | null;
    name: string;
    ageLower: number | null;
    ageUpper: number | null;
    gender: 'all' | 'male' | 'female',
    member: number | null;
    memberLimit: number | null;
    introduction: string
    tags: Array<{
        id: number | null,
        name: string
    }>
}

export default function Home() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(getUser).user
    const rooms: Array<roomState> = useSelector(getRooms).rooms

    useEffect(() => {

        dispatch(fetchRoom())
        if (user.id) {
            dispatch(fetchUserById(user.id))
        }
    }, [])

    return (
        <div className='w-full h-screen bg-yellow-50' >
            <div className="flex justify-end ml-16" >
                <Button style={{ width: 200, height: 40 }} href="/profile">
                    <p className="text-xl">{user.name}</p>
                </Button>
                <Button style={{ width: 120, height: 40, marginRight: 32 }} onClick={() => dispatch(updateUserState({ ...initialState.user }))} >
                    <p className="text-xl">ログアウト</p>
                </Button>
            </div>
            <div className="flex items-center justify-center">
                <p className='text-5xl' >voicemate</p>
            </div>


            <div className="flex items-center justify-center">
                <Button className={classes.button} href="/searchroom">
                    <p className="text-3xl">部屋をさがす</p>
                </Button>

                <Button className={classes.button} href="/createroom">
                    <p className="text-3xl">部屋をつくる</p>
                </Button>
            </div>
            <div className='pl-8 text-xl font-bold'>人気の部屋一覧</div>
            <StickyHeadTable rowsData={rooms} />

        </div>
    );
}

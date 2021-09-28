
import { RowData } from "./Home";
import { QuickFilteringGrid } from "../components/molucules";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom, getRooms, roomState } from "../redux/slice/roomsSlice";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

export default function SearchRoom() {
    const dispatch = useDispatch()
    const history = useHistory()
    const rooms: Array<roomState> = useSelector(getRooms).rooms

    useEffect(() => {
        console.log('a')
        dispatch(fetchRoom())
    }, [])



    return (
        <div className='bg-yellow-50' >
            <div className='py-8 flex' >
                <Button style={{ marginLeft: 32 }} onClick={() => history.push('/home')} ><p className={'text-xl text-right'} >voicemate</p></Button>
                <p className='m-auto text-3xl  text-center'>部屋をさがす</p>
                <Button style={{ marginRight: 32 }} onClick={() => history.push('/createroom')}><p className='text-xl text-right' >部屋をつくる</p></Button>
            </div>
            <QuickFilteringGrid rowsData={rooms} />

        </div>
    )
}
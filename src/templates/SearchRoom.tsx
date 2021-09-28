
import { RowData } from "./Home";
import { QuickFilteringGrid } from "../components/molucules";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom, getRooms, roomState } from "../redux/slice/roomsSlice";

export default function SearchRoom() {
    const dispatch = useDispatch()
    const rooms: Array<roomState> = useSelector(getRooms).rooms
    const [rowsData, setRowsData] = useState<Array<RowData>>([])

    useEffect(() => {
        console.log(rooms)

        if (!rooms[0].id) { // roomsに値が入っていないとき
            dispatch(fetchRoom())
        } else {
            setRowsData(rooms.map((room: roomState) => {
                return { ...room, now_member: 1 }
            }))
        }
    }, [rooms])



    return (
        <div className='bg-yellow-50' >
            <div className='py-8 text-3xl text-center' >部屋をさがす </div>
            <QuickFilteringGrid rowsData={rowsData} />

        </div>
    )
}
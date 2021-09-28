import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

export type roomState = {
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

export type roomsState = {
    rooms: Array<roomState>
}



export const initialState: roomsState = {
    rooms: [{
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
    }]
};


export type EditRoom = {

    id: number | null;
    name: string;
    ageLower: number | null;
    ageUpper: number | null;
    gender: string,
    member: number;
    memberLimit: number;
    introduction: string
    tags: Array<{
        id: number | null,
        name: string
    }>

}


export const editRoom = createAsyncThunk(
    "user/editRoom",
    async (editroom: EditRoom) => {

        const roomUrl = 'http://localhost:8000/rooms/' + editroom.id
        const response: any = await axios.put(roomUrl, {
            name: editroom.name,
            ageLower: editroom.ageLower,
            ageUpper: editroom.ageUpper,
            gender: editroom.gender,
            member: editroom.member,
            memberLimit: editroom.memberLimit,
            introduction: editroom.introduction,
            tagIDs: editroom.tags
        })
            .catch((e) => {
                console.log(e)
            });

        return response.data
    }
);


export type AddRoomState = {
    name: string;
    ageLower: number | null;
    ageUpper: number | null;
    gender: string,
    memberLimit: number | null;
    introduction: string
    tags: Array<number> | null
}

export const addRoom = createAsyncThunk(
    "room/addRoom",
    async (addroom: any) => {
        console.log(addroom.tags)
        const roomUrl = 'http://localhost:8000/rooms'
        const response: any = await axios.post(roomUrl, {
            name: addroom.name,
            ageLower: addroom.ageLower,
            ageUpper: addroom.ageUpper,
            gender: addroom.gender,
            memberLimit: addroom.memberLimit,
            introduction: addroom.introduction,
            tagIDs: addroom.tags
        })
            .catch((e) => {
                console.log(e)
            });

        return response.data
    }
);

export const fetchRoom = createAsyncThunk(
    "room/fetchRoom",
    async () => {
        const roomUrl = 'http://localhost:8000/rooms'
        const response: any = await axios({ method: 'get', url: roomUrl })
        return response.data
    }
);

// State, Reducer, Action を一気に生成する
const roomsSlice = createSlice({
    name: "rooms", //スライスの名前を設定
    initialState, //stateの初期値を設定
    reducers: {
        // updateUserState: (state: userState, action: any) => ({
        //     user: {
        //         ...action.payload,
        //     } /* もとの配列を展開して新しい配列を作る */,
        // }),
    },
    extraReducers: (builder) => {
        builder.addCase(addRoom.fulfilled, (state, action: any) => {
            // void state.rooms.push(action.payload)
        });
        builder.addCase(fetchRoom.fulfilled, (state, action: any) => {
            state.rooms = action.payload; // payloadCreatorでreturnされた値
            console.log('部屋取得')
            console.log(state.rooms)
        });
        builder.addCase(editRoom.fulfilled, (state, action: any) => {
            console.log('部屋更新')
            console.log(action.payload)
        });
        builder.addCase(editRoom.rejected, (state, action: any) => {
            console.log(action.error)
        });



    },
});

// export const { updateUserState } = roomSlice.actions;

export const getRooms = (state: RootState) => state.rooms;

export default roomsSlice;

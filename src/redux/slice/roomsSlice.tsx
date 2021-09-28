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
    async (addroom: AddRoomState) => {

        const roomUrl = 'http://localhost:8000/rooms'
        const response: any = await axios.post(roomUrl, {
            name: addroom.name,
            ageLower: addroom.ageLower,
            ageUpper: addroom.ageUpper,
            gender: addroom.gender,
            memberLimit: addroom.memberLimit,
            introduction: addroom.introduction,
            tags: addroom.tags
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
        builder.addCase(addRoom.fulfilled, (state, action: any) =>
            void state.rooms.push(action.payload)
        );
        builder.addCase(fetchRoom.fulfilled, (state, action: any) => {
            state.rooms = action.payload; // payloadCreatorでreturnされた値
            console.log('部屋取得')
            console.log(state.rooms)
        });

    },
});

// export const { updateUserState } = roomSlice.actions;

export const getRooms = (state: RootState) => state.rooms;

export default roomsSlice;

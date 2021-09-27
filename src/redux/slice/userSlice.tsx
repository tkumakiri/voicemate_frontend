import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

export type userState = {
    user: {
        id: string;
        name: string;
        email: string;
        isSignedIn: boolean;
        age: number | null;
        gender: 'all' | 'male' | 'female'
        roomID: string
        tags: Array<{
            id: number,
            name: string
        }>
    };
};


export const initialState: userState = {
    user: {
        id: '',
        name: '',
        email: '',
        isSignedIn: false,
        age: null,
        gender: 'all',
        roomID: '',
        tags: [{
            id: 1,
            name: '',
        }],
    }
};
export type fetchuser = {
    email: string;
    password: string;
};

export type adduser = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};




export const addUser = createAsyncThunk(
    "user/addUser",
    async (adduser: adduser) => {
        const { username, email, password, confirmPassword } = adduser;


    }
);

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (fetchuser: fetchuser, thunkAPI) => {
        const { email, password } = fetchuser;

        const userUrl = 'http://localhost:8000/users/1'

        const response: any = await axios({ method: 'get', url: userUrl })

        return response.data

    }
);

// State, Reducer, Action を一気に生成する
const userSlice = createSlice({
    name: "user", //スライスの名前を設定
    initialState, //stateの初期値を設定
    reducers: {
        updateUserState: (state: userState, action: any) => ({
            user: {
                ...action.payload,
            } /* もとの配列を展開して新しい配列を作る */,
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(addUser.fulfilled, (state, action: any) => {
            state.user = action.payload; // payloadCreatorでreturnされた値
            alert("登録完了しました。");
        });
        builder.addCase(addUser.rejected, (state, action: any) => {
            console.log(action.error);
        });
        builder.addCase(fetchUser.fulfilled, (state, action: any) => {
            state.user = action.payload; // payloadCreatorでreturnされた値
        });
    },
});

export const { updateUserState } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice;

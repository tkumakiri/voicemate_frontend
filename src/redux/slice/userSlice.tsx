import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

export type userState = {
    user: {
        id: number;
        name: string;
        email: string;
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
        id: 0,
        name: '',
        email: '',
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
    name: string;
    email: string;
    password: string;
};

export type edituser = {
    id: number;
    name: string;
    email: string;
    age: number | null;
    gender: 'all' | 'male' | 'female'
    roomID: string
    tags: Array<{
        id: number,
        name: string
    }>
};


export const editUser = createAsyncThunk(
    "user/editUser",
    async (edituser: edituser) => {

        const userUrl = 'http://localhost:8000/users'
        const response: any = await axios.put(userUrl, {
            id: edituser.id,
            name: edituser.name,
            email: edituser.email,
            age: edituser.age,
            gender: edituser.gender,
            roomID: edituser.roomID,
            tags: edituser.tags
        })
            .catch((e) => {
                console.log(e)
            });
        return response.data

    }
);




export const addUser = createAsyncThunk(
    "user/addUser",
    async (adduser: adduser) => {

        const data = new FormData()

        data.append('name', adduser.name)
        data.append('email', adduser.email)
        data.append('password', adduser.password)

        const userUrl = 'http://localhost:8000/users'
        const response: any = await axios.post(userUrl, data)
            .catch((e) => {
                console.log(e)
            });

        return response.data

    }
);

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (fetchuser: fetchuser, thunkAPI) => {
        const { email, password } = fetchuser;

        const userUrl = 'http://localhost:8000/users'

        const response: any = await axios.get(userUrl, { headers: { Email: email, Password: password } })
            .catch((e) => {
                console.log(e)
            })

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
        builder.addCase(editUser.fulfilled, (state, action: any) => {
            state.user = action.payload; // payloadCreatorでreturnされた値
            console.log('編集完了しました！')
        });
    },
});

export const { updateUserState } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice;

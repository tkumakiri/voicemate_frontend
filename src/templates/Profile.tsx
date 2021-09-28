import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUserById, getUser } from "../redux/slice/userSlice";
import axios from "axios";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from "@material-ui/core/TextField";
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router';


export type tagType = {
    id: number,
    name: string
}

export default function Profile() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(getUser).user


    useEffect(() => {
        console.log(user)
        if (user.id) {
            dispatch(fetchUserById(user.id))
        }
    }, [])


    return (
        <div className="w-full h-screen bg-yellow-50">
            <div className='py-8 flex' >
                <Button style={{ width: 200, height: 60 }} onClick={() => history.push('/home')} ><p className={'text-xl text-right'} >voicemate</p></Button>
                <p className='m-auto text-3xl  text-center'>プロフィール</p>
                <Button style={{ width: 200, height: 60 }} onClick={() => history.push('/profile/edit')}><p className='text-xl text-right' >編集</p></Button>
            </div>
            <div className='text-center text-3xl' >{user.name}</div>
            <div className='flex items-center justify-center ' >
                <img className="mt-8 w-72 h-72 rounded-full" src="https://avatars.githubusercontent.com/u/583231?v=4" />
            </div>
            <div className="pt-8 flex items-center justify-evenly text-center">
                <p className='text-3xl w-1/2'>follows</p>
                <p className='text-3xl w-1/2'>followers</p>
            </div>
            <div className="pt-3 flex items-center justify-evenly text-center">
                <p className='text-3xl w-1/2'>100</p>
                <p className='text-3xl w-1/2'>200</p>
            </div>
            <h2 className="pt-8 text-3xl text-center">趣味</h2>
            <div className='flex items-center justify-center ' >
                {user.tags && (
                    user.tags.map((tag: tagType) => (
                        <p className='m-4 p-2 bg-gray-200 rounded-3xl text-xl' >{tag.name}</p>
                    )))}
            </div>
        </div>
    );
}

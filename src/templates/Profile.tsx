import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slice/userSlice";
import axios from "axios";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from "@material-ui/core/TextField";
import Grid from '@mui/material/Grid';


export default function Profile() {
    type tagType = {
        id: number,
        name: string
    }
    const dispatch = useDispatch()
    const [tag, setTags] = useState<tagType[]>([{ id: -1, name: '' }])
    const [tagname, setTagname] = useState('')
    const [username, setUsername] = useState('')
    const user = useSelector(getUser).user
    const user_tags: number[] = []

    React.useEffect(() => {
        let tagdata: tagType[]
        axios.get('http://localhost:8000/tags')
            .then(res => {
                tagdata = res.data
                setTags(tagdata)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    user.tags.map((tag: tagType) => {
        user_tags.push(tag.id)
        console.log(user_tags)
    })

    const checkedID: number[] = []
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (event.target.checked === false) {
            const index = checkedID.indexOf(id)
            checkedID.splice(index, 1)
            console.log(checkedID, id)
        }
        else if (event.target.checked === true) {
            if (user_tags.includes(id) != true) {
                checkedID.push(id)
                console.log(checkedID, id)
            }
            else {
                console.log(checkedID, "already set")
            }
        }
    };

    const putTags = () => {
        const body = {
            name: user.name,
            email: user.email,
            password: user.password,
            tagIDs: checkedID,
            roomID: user.roomID
        }
        console.log(body)
        axios.put('http://localhost:8000/users/' + user.id, body)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    const putName = () => {
        const body = {
            name: username,
            email: user.email,
            password: user.password,
            tagIDs: user.tagIDs,
            roomID: user.roomID
        }
        console.log(body)
        axios.put('http://localhost:8000/users/' + user.id, body)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    const setValue = (newtagName: string) => {
        setTagname(newtagName)
    }
    const setName = (newuserName: string) => {
        setUsername(newuserName)
    }

    const postTags = () => {
        const data = new FormData()
        data.append('name', tagname)
        axios.post('http://localhost:8000/tags', data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="w-full h-screen bg-yellow-50">
            <h2 className="pt-8 text-5xl text-center">{user.name}</h2>
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
            <h2 className="pt-8 text-5xl text-center">趣味</h2>
            <div className='flex items-center justify-center ' >
                {user.tags.map((tag: tagType) => (
                    <p className='m-4 p-2 bg-gray-200 rounded-3xl text-xl' >{tag.name}</p>
                ))}
            </div>
            <div className="pt-8 text-3xl text-center">ユーザー設定</div>
            <div className="max-w-full text-center">
                <TextField label="ユーザー名" onChange={(event) => setName(event.target.value)}></TextField>
            </div>
            <div className="max-w-full text-center">
                <Button style={{ fontSize: '24px' }} onClick={putName}>ユーザー名変更</Button>
            </div>

            <div className="pt-8 text-3xl text-center">タグを選択</div>

            <div className="max-w-full text-center">
                {tag.map((tag: tagType) => (
                    <FormControlLabel className='m-2 p-1 w-48 bg-gray-200' control={<Checkbox onChange={e => handleChange(e, tag.id)} />} label={tag.name} />
                ))}
            </div>
            <div className="max-w-full text-center">
                <Button style={{ fontSize: '24px' }} onClick={putTags}>タグ変更</Button>
            </div>


            <div className="pt-8 text-3xl text-center">タグを追加</div>
            <div className="max-w-full text-center">
                <TextField name="タグを追加" label="追加したい趣味を記入" onChange={(event) => setValue(event.target.value)}></TextField>
            </div>
            <div className="max-w-full text-center">
                <Button style={{ fontSize: '24px' }} onClick={postTags}>追加</Button>
            </div>
        </div>
    );
}

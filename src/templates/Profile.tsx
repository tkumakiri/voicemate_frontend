import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slice/userSlice";
import axios from "axios";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { CollectionsOutlined } from '@mui/icons-material';




export default function Profile() {
    type tagType = {
        id: number,
        name: string
    }
    const dispatch = useDispatch()
    const [tag, setTags] = useState<tagType[]>([{ id: -1, name: '' }])
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
        axios.get('http://localhost:8000/users/1')
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div className="w-full h-screen bg-yellow-50">
            <h2 className="pt-8 text-5xl text-center">{user.name}</h2>
            <div className='flex items-center justify-center ' >
                <img className="mt-8 w-72 h-72 rounded-full" src="https://avatars.githubusercontent.com/u/583231?v=4" />
            </div>
            <div className="pt-8 flex items-center justify-evenly">
                <p className='text-3xl' >follows</p>
                <p className='text-3xl' >followers</p>
            </div>
            <h2 className="pt-8 text-5xl text-center">趣味</h2>
            <div className='flex items-center justify-center ' >
                {user.tags.map((tag: tagType) => (
                    <p className='m-4 p-2 bg-gray-200 rounded-3xl text-xl' >{tag.name}</p>
                ))}
            </div>
            <div>追加タグの選択</div>
            <FormGroup>
                {tag.map((tag: tagType) => (
                    <FormControlLabel control={<Checkbox onChange={e => handleChange(e, tag.id)} />} label={tag.name} />
                ))}
            </FormGroup>
            <Button onClick={putTags}>追加</Button>
        </div>
    );
}

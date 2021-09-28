import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slice/userSlice";
import axios from "axios";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';




export default function Profile() {
    type tagType = {
        id: number,
        name: string
    }
    const dispatch = useDispatch()
    const [tag, setTags] = useState<tagType[]>([{ id: -1, name: '' }])

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

    const user = useSelector(getUser).user

    const checkedID: number[] = [2, 5]
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (event.target.checked === false) {
            const index = checkedID.indexOf(id)
            checkedID.splice(index, 1)
        }
        else if (event.target.checked === true) {
            checkedID.push(id)
        }
    };
    const postTags = () => {
        checkedID.forEach(tag => {
            console.log(tag)
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
            <Button onClick={postTags}>追加</Button>
        </div>
    );
}

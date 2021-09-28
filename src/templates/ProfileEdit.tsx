import { Button } from "@material-ui/core";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { EditUserTags, editUserTags, editUserName, getUser } from "../redux/slice/userSlice";
import { tagType } from "./Profile";

export default function Profile() {

    const user = useSelector(getUser).user
    const dispatch = useDispatch()
    const history = useHistory()
    const [tag, setTags] = useState<tagType[]>([{ id: -1, name: '' }])
    const [tagname, setTagname] = useState('')
    const [username, setUsername] = useState(user.name)

    const preUserTags: number[] = user.tags.map((tag: tagType) => {
        return tag.id
    })

    useEffect(() => {
        console.log(user)
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
    // user.tags.map((tag: tagType) => {
    //     user_tags.push(tag.id)
    //     console.log(user_tags)
    // })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number, name: string) => {
        if (event.target.checked === false) {
            const index = preUserTags.indexOf(id)
            preUserTags.splice(index, 1)
        }
        else {
            preUserTags.push(id)
        }
    };

    const putTags = () => {
        console.log(preUserTags)
        const body: EditUserTags = {
            id: user.id,
            name: username,
            email: user.email as string,
            password: user.password as string,
            tagIDs: preUserTags,
            roomID: user.roomID,
        }
        dispatch(editUserTags(body))

    };

    const putName = () => {

        console.log(preUserTags)

        const body = {
            id: user.id,
            name: username,
            email: user.email,
            password: user.password,
            tagIDs: preUserTags,
            roomID: user.roomID
        }
        dispatch(editUserName(body))
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
        <div className='w-full h-screen bg-yellow-50' >
            <div className='py-8 flex' >
                <Button style={{ width: 200, height: 60 }} onClick={() => history.push('/home')} ><p className={'text-xl text-right'} >voicemate</p></Button>
                <p className='m-auto text-3xl  text-center'>プロフィール編集</p>
                <Button style={{ width: 200, height: 60 }} onClick={() => history.push('/profile')}><p className='text-xl text-right' >プロフィール</p></Button>
            </div>
            <div className="max-w-full text-center">
                <TextField label="ユーザー名" onChange={(event) => setName(event.target.value)} defaultValue={user.name}></TextField>
            </div>
            <div className="max-w-full text-center">
                <Button style={{ fontSize: '24px' }} onClick={() => putName()}>ユーザー名変更</Button>
            </div>

            <div className="pt-8 text-3xl text-center">タグを選択</div>

            <div className="max-w-full text-center">
                {tag.map((tag: tagType) => (
                    preUserTags.includes(tag.id) ? (
                        <FormControlLabel className='m-2 p-1 w-48 bg-gray-200' control={<Checkbox defaultChecked={true} onChange={e => handleChange(e, tag.id, tag.name)} />} label={tag.name} />
                    ) : (
                        <FormControlLabel className='m-2 p-1 w-48 bg-gray-200' control={<Checkbox onChange={e => handleChange(e, tag.id, tag.name)} />} label={tag.name} />

                    )
                ))}
            </div>
            <div className="max-w-full text-center">
                <Button style={{ fontSize: '24px' }} onClick={() => putTags()}>タグ変更</Button>
            </div>


            <div className="pt-8 text-3xl text-center">タグを追加</div>
            <div className="max-w-full text-center">
                <TextField name="タグを追加" label="追加したい趣味を記入" onChange={(event) => setValue(event.target.value)}></TextField>
            </div>
            <div className="max-w-full text-center">
                <Button style={{ fontSize: '24px' }} onClick={postTags}>追加</Button>
            </div>
        </div>
    )
}
import { Button } from '@material-ui/core';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { MultipleSelectTag } from '../components/molucules';
import { addRoom } from '../redux/slice/roomsSlice';

const useStyles = makeStyles({
    numberField: {
        width: 100,
    },
});

export default function CreateRoom() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const [checkedAll, setCheckedAll] = useState(true);
    const [checkedMale, setCheckedMale] = useState(false);
    const [checkedFemale, setCheckedFemale] = useState(false);
    const [gender, setGender] = useState('all');
    const [tags, setTags] = useState<string[]>([]);

    const [name, setName] = useState('')

    const [allTags, setAllTags] = useState<Array<{ id: number, name: string }>>([])

    useEffect(() => {
        axios.get('http://localhost:8000/tags')
            .then((res) => setAllTags(res.data))
    }, [])

    const handleChange = (gender: string) => {
        switch (gender) {
            case 'all':
                setCheckedAll(true);
                setCheckedMale(false);
                setCheckedFemale(false);
                setGender('all');
                break;
            case 'male':
                setCheckedAll(false);
                setCheckedMale(true);
                setCheckedFemale(false);
                setGender('male');
                break;
            case 'female':
                setCheckedAll(false);
                setCheckedMale(false);
                setCheckedFemale(true);
                setGender('female');
                break;
            default:
                break;
        }
    };



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console

        if (tags.length > 0) {
            // const selectedTagsId = tags.map((tag) =>
            //     allTags.map((alltag) => {
            //         if (alltag.name == tag) {
            //             return alltag.id
            //         } else {
            //             return -1
            //         }
            //     })
            // )
            // console.log(selectedTagsId)
            // const tagIds = selectedTagsId[0].filter((tag) => tag !== -1)
            // console.log(tagIds)
            
            const selectedTagsId:number[] = []

            tags.map((tag) =>
                allTags.map((alltag) => {
                    if (alltag.name == tag) {
                        selectedTagsId.push(alltag.id)
                    }
                })
            )
            // const tagIds = selectedTagsId[0].filter((tag) => tag !== -1)
            const tagIds = selectedTagsId
            console.log(tagIds)

            dispatch(addRoom({
                name: data.get('room_name') as string,
                ageLower: Number(data.get('age_lower') as string),
                ageUpper: Number(data.get('age_upper') as string),
                gender: gender,
                memberLimit: Number(data.get('menber_limit') as string),
                introduction: data.get('introduction') as string,
                tags: tagIds
            }))
        } else {
            dispatch(addRoom({
                name: data.get('room_name') as string,
                ageLower: Number(data.get('age_lower') as string),
                ageUpper: Number(data.get('age_upper') as string),
                gender: gender,
                memberLimit: Number(data.get('menber_limit') as string),
                introduction: data.get('introduction') as string,
                tags: null
            }))
        }


        history.push('/home')

        // console.log({
        //     room_name: data.get('room_name'),
        //     menber_limit: data.get('menber_limit'),
        //     gender: gender,
        //     age_lower: data.get('age_lower'),
        //     age_upper: data.get('age_upper'),
        //     tags: tagsId,
        //     introduction: data.get('introduction'),
        // });
    };
    return (
        <div className="w-full h-screen bg-yellow-50 ">
            <div className='pt-12 flex' >
                <Button style={{ marginLeft: 32 }} onClick={() => history.push('/home')} ><p className={'text-xl text-right'} >voicemate</p></Button>
                <div className=" m-auto text-center  text-3xl">部屋をつくる</div>
                <Button style={{ marginRight: 32 }} onClick={() => history.push('/searchroom')}><p className='text-xl text-right' >部屋をさがす</p></Button>

            </div>
            <div className=''>
                <Box
                    style={{
                        marginTop: 32,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}

                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                >

                    <TextField
                        style={{ width: 400 }}
                        margin="normal"
                        required
                        id="room_name"
                        label="Room Name"
                        name="room_name"
                        autoFocus
                    />
                    <Box
                        style={{
                            marginTop: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <p className="text-xl">number of member</p>
                        <TextField
                            className={classes.numberField}
                            size="small"
                            margin="normal"
                            required
                            fullWidth={false}
                            id="menber_limit"
                            label="Member Limit"
                            name="menber_limit"
                            type="number"
                            defaultValue={10}
                        />
                    </Box>
                    <p className="mt-2 text-xl">gender</p>
                    <Box
                        style={{
                            display: 'flex',
                        }}
                    >
                        <FormControlLabel
                            id="all"
                            control={
                                <Checkbox
                                    checked={checkedAll}
                                    onChange={() => handleChange('all')}
                                    value="all"
                                    color="primary"
                                />
                            }
                            label="all"
                        />
                        <FormControlLabel
                            id="male"
                            control={
                                <Checkbox
                                    checked={checkedMale}
                                    onChange={() => handleChange('male')}
                                    value="male"
                                    color="primary"
                                />
                            }
                            label="male"
                        />
                        <FormControlLabel
                            id="female"
                            control={
                                <Checkbox
                                    checked={checkedFemale}
                                    onChange={() => handleChange('female')}
                                    value="female"
                                    color="primary"
                                />
                            }
                            label="female"
                        />
                    </Box>
                    <p className="mt-2 text-xl">age</p>
                    <Box
                        style={{
                            display: 'flex',
                            marginBottom: 2,
                        }}
                    >
                        <TextField
                            className={classes.numberField}
                            size="small"
                            margin="normal"
                            required
                            fullWidth={false}
                            id="age_lower"
                            label="age_lower"
                            name="age_lower"
                            type="number"
                            defaultValue={18}
                        />
                        <p className="p-2 flex items-center justify-center">
                            ~
                        </p>

                        <TextField
                            className={classes.numberField}
                            size="small"
                            margin="normal"
                            required
                            fullWidth={false}
                            id="age_upper"
                            label="age_upper"
                            name="age_upper"
                            type="number"
                            defaultValue={60}
                        />
                    </Box>
                    <MultipleSelectTag
                        alltags={allTags}
                        tags={tags}
                        setTags={setTags}
                    />
                    <TextField
                        style={{ width: 400 }}
                        margin="normal"
                        required={false}
                        multiline
                        rows={7}
                        id="introduction"
                        label="introduction"
                        name="introduction"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        style={{
                            width: 400,
                            height: 40,
                            marginTop: 32,
                        }}
                    >
                        つくる
                    </Button>
                </Box>
            </div>
        </div>
    );
}

import { Button } from '@material-ui/core';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import { MultipleSelectTag } from '../components/molucules';

const useStyles = makeStyles({
    numberField: {
        width: 100,
    },
});

export default function CreateRoom() {
    const classes = useStyles();
    const [checkedAll, setCheckedAll] = useState(true);
    const [checkedMale, setCheckedMale] = useState(false);
    const [checkedFemale, setCheckedFemale] = useState(false);
    const [gender, setGender] = useState('all');

    const [tags, setTags] = useState<string[]>([]);

    const alltags: string[] = [
        'baseball',
        'music live',
        'soccer',
        'basketball',
        'tolk',
        'werewolf',
        'cinema',
    ];

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
        console.log({
            room_name: data.get('room_name'),
            menber_limit: data.get('menber_limit'),
            gender: gender,
            age_lower: data.get('age_lower'),
            age_upper: data.get('age_upper'),
            tags: tags,
            introduction: data.get('introduction'),
        });
    };
    return (
        <div className="w-full h-screen bg-yellow-50 ">
            <div className="pt-12 text-center  text-3xl">部屋をつくる</div>
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
                        alltags={alltags}
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

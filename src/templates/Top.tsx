import { Button } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRoom } from '../redux/slice/roomsSlice';
import { initialState, updateUserState } from '../redux/slice/userSlice';

const useStyles = makeStyles({
    button: {
        width: 200,
        height: 100,
    },
});

export default function Top() {
    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateUserState(initialState))
    }, [])


    return (
        <div className="w-full h-screen bg-yellow-50">
            <p className="pt-16 text-5xl text-center">voicemate</p>
            <div className="mt-16 flex items-center justify-center">
                <Button className={classes.button} href="/signup">
                    <p className="text-3xl">signup</p>
                </Button>
                <Button className={classes.button} href="signin">
                    <p className="text-3xl">signin</p>
                </Button>
                <Button className={classes.button} href="/home">
                    <p className="text-3xl">Home</p>
                </Button>
            </div>
        </div>
    );
}

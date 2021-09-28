import { Button } from "@material-ui/core";
import { makeStyles } from '@mui/styles';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StickyHeadTable } from "../components/organisms";
import { getUser, initialState, updateUserState } from "../redux/slice/userSlice";

const useStyles = makeStyles({
    button: {
        width: 200,
        height: 100,
    },
});

export type RowData = {
    name: string,
    now_member: number,
    member_limit: number,
    gender: 'all' | 'male' | 'female',
    age_lower: number,
    age_upper: number,
    tags: string[],
    roomId: string,
}

export default function Home() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(getUser).user

    const rowsData: Array<RowData>
        = [
            { name: '1の部屋', now_member: 9, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: '1' },
            { name: '2の部屋', now_member: 9, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: '2' },
            { name: '3の部屋', now_member: 8, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: '3' },
            { name: '4の部屋', now_member: 9, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'drama', 'baseball'], roomId: '4' },
            { name: '5の部屋', now_member: 9, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'basketball'], roomId: '5' },
            { name: '6の部屋', now_member: 6, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: '6' },
            { name: '7の部屋', now_member: 9, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: '7' },
            { name: '8の部屋', now_member: 9, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'talk'], roomId: '8' },
        ];


    useEffect(() => {
        console.log(user)
    }, [])

    return (
        <div className='w-full h-screen bg-yellow-50' >
            <div className="flex justify-end ml-16" >
                <Button style={{ width: 200, height: 40 }} href="/profile">
                    <p className="text-xl">{user.name}</p>
                </Button>
                <Button style={{ width: 120, height: 40, marginRight: 32 }} onClick={() => dispatch(updateUserState({ ...initialState.user }))} >
                    <p className="text-xl">ログアウト</p>
                </Button>
            </div>
            <div className="flex items-center justify-center">
                <p className='text-5xl' >voicemate</p>
            </div>


            <div className="flex items-center justify-center">
                <Button className={classes.button} href="/searchroom">
                    <p className="text-3xl">部屋をさがす</p>
                </Button>

                <Button className={classes.button} href="/createroom">
                    <p className="text-3xl">部屋をつくる</p>
                </Button>
            </div>
            <div className='pl-8 text-xl font-bold'>人気の部屋一覧</div>
            <StickyHeadTable rowsData={rowsData} />

        </div>
    );
}

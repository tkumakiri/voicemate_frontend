import { Button } from "@material-ui/core";
import { makeStyles } from '@mui/styles';
import { StickyHeadTable } from "../components/organisms";

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

    return (
        <div className='w-full h-screen bg-yellow-50' >

            <div className="pt-8 flex items-center justify-center text-5xl">voicemate
                <Button className={classes.button} href="/profile">
                    <p className="text-3xl">mypage</p>
                </Button></div>
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


import { RowData } from "./Home";
import { QuickFilteringGrid } from "../components/molucules";

export default function SearchRoom() {


    const rowsData: Array<RowData>
        = [
            { name: '月9ドラマをみんなでみよう', now_member: 9, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: '1' },
            { name: '野球観戦', now_member: 9, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: '2' },
            { name: '映画をみよう', now_member: 8, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: '3' },
            { name: '月9ドラマをみんなでみよう', now_member: 9, member_limit: 10, gender: 'male', age_lower: 17, age_upper: 60, tags: ['movie', 'drama', 'baseball'], roomId: '4' },
            { name: '月9ドラマをみんなでみよう', now_member: 9, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 59, tags: ['movie', 'basketball'], roomId: '5' },
            { name: '月9ドラマをみんなでみよう', now_member: 6, member_limit: 10, gender: 'female', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: '6' },
            { name: '月9ドラマをみんなでみよう', now_member: 9, member_limit: 10, gender: 'all', age_lower: 22, age_upper: 40, tags: ['movie', 'drama'], roomId: '7' },
            { name: '月9ドラマをみんなでみよう', now_member: 9, member_limit: 10, gender: 'male', age_lower: 23, age_upper: 55, tags: ['movie', 'talk'], roomId: '8' },

        ];

    return (
        <div className='bg-yellow-50' >
            <div className='py-8 text-3xl text-center' >部屋をさがす </div>
            <QuickFilteringGrid rowsData={rowsData} />

        </div>
    )
}
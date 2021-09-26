import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { StickyHeadTable } from "../components/organisms";
import { RowData } from "./Home";
import { Box } from '@mui/system';
import { useState } from "react";
import { MultipleSelectTag, QuickFilteringGrid } from "../components/molucules";

export default function SearchRoom() {

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

    const rowsData: Array<RowData>
        = [
            { name: '月9ドラマをみんなでみよう', now_member: 9, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: 'aaa' },
            { name: '野球観戦', now_member: 9, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: 'aaa' },
            { name: '映画をみよう', now_member: 8, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: 'aaa' },
            { name: '月9ドラマをみんなでみよう', now_member: 9, member_limit: 10, gender: 'male', age_lower: 17, age_upper: 60, tags: ['movie', 'drama', 'baseball'], roomId: 'bbb' },
            { name: '月9ドラマをみんなでみよう', now_member: 9, member_limit: 10, gender: 'all', age_lower: 18, age_upper: 59, tags: ['movie', 'basketball'], roomId: 'aaa' },
            { name: '月9ドラマをみんなでみよう', now_member: 6, member_limit: 10, gender: 'female', age_lower: 18, age_upper: 60, tags: ['movie', 'drama'], roomId: 'aaa' },
            { name: '月9ドラマをみんなでみよう', now_member: 9, member_limit: 10, gender: 'all', age_lower: 22, age_upper: 40, tags: ['movie', 'drama'], roomId: 'ddd' },
            { name: '月9ドラマをみんなでみよう', now_member: 9, member_limit: 10, gender: 'male', age_lower: 23, age_upper: 55, tags: ['movie', 'talk'], roomId: 'aaa' },

        ];

    return (
        <div className='bg-yellow-50' >
            <div className='pt-8 text-3xl text-center' >部屋をさがす </div>
            <QuickFilteringGrid rowsData={rowsData} />

        </div>
    )
}
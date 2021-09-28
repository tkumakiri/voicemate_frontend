import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

type PROPS = {
    alltags: Array<{ id: number, name: string }>; // すべてのタグ
    tags: string[] // 選択したタグ
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function MultipleSelectTag(props: PROPS) {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof props.tags>) => {
        const {
            target: { value },
        } = event;
        props.setTags(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    return (
        <div>
            <FormControl style={{ margin: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={props.tags}
                    onChange={handleChange}
                    input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                        <Box
                            style={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {props.alltags.map((tag) => (
                        <MenuItem
                            key={tag.id}
                            value={tag.name}
                            style={getStyles(tag.name, props.tags, theme)}
                        >
                            {tag.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

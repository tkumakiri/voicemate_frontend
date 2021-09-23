import { TextField } from '@mui/material';

type TextField = {
    margin: 'dense';
    required: boolean;
    fullWidth: boolean;
    id: string;
    label: string;
    name: string;
    autoComplete: string;
    autoFocus: boolean;
};

const TextInput = (props: TextField) => {
    return (
        <TextField
            margin={props.margin}
            required={props.required}
            fullWidth={props.fullWidth}
            id={props.id}
            label={props.label}
            name={props.name}
            autoComplete={props.autoComplete}
            autoFocus={props.autoFocus}
        />
    );
};
export default TextInput;

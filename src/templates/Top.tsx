import { Button } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    button: {
        width: 200,
        height: 100,
    },
});

export default function Top() {
    const classes = useStyles();

    return (
        <div className="w-full h-screen">
            <p className="pt-16 text-5xl text-center">voicemate</p>
            <div className="mt-16 flex items-center justify-center">
                <Button className={classes.button} href="/signup">
                    <p className="text-3xl">signup</p>
                </Button>
                <Button className={classes.button} href="signin">
                    <p className="text-3xl">signin</p>
                </Button>

                {/* test skyway */}
                <Button className={classes.button} href="testskyway">
                    <p className="text-3xl">test</p>
                </Button>
            </div>
        </div>
    );
}

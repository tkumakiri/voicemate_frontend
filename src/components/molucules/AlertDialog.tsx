import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from 'react-router';

export default function AlertDialog(props: any) {

  const history = useHistory()


  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"部屋を退出するときは、退出するを押して退出してください。"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ブラウザバックや、リロードを使用するとエラーが出ることがあります。
            Agreeを押すと音声通話が開始します。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => history.push('/home')}>Disagree</Button>
          <Button onClick={props.onClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

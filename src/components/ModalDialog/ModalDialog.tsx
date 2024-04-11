import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./style.css";
import { Divider, TextField } from '@mui/material';
import TextAreaComponent from '../TextAreaComponent/TextArea';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addContentData } from '../../store/reducer/ContentReducer';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  width:'80%',
    height: '420px',
    border: 'none',
  p: 4,
};

export default function ModalDialog() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const createContent=(event:React.FormEvent<HTMLFormElement>)=>{
event.preventDefault();
const formData = new FormData(event.currentTarget);
  const data:any = Array.from(formData.entries()).reduce((memo, [key, value]) => ({
    ...memo,
    [key]: value,
  }), {});
dispatch(addContentData({contentId: data['appname'], contentDescription: data['description'], fields:[], updatedBy: "Rishav Mittal", updatedAt:"a few minutes ago"  }));
navigate(`/contentField/${data['appname']}`)
}

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create Content Type
            </Typography>
            <Divider/>
          <form onSubmit={createContent}>
          <Box className="inputContainer">
            <Box>
            <Typography id="transition-modal-title" className='gap10'>
              App Name
            </Typography>
            <TextField name='appname' required fullWidth id="outlined-basic"  variant="outlined" />
            </Box>
            <Box>
            <Typography id="transition-modal-title" className='gap10'>
              Identified
            </Typography>
            <TextField name="identifier" required fullWidth id="outlined-basic"  variant="outlined" />
            </Box>
            <Box>
            <Typography id="transition-modal-title" className='gap10'>
             Description
            </Typography>
            <TextAreaComponent
/>
            </Box>
            <Box className="actionContainer">
                <Button variant="contained" type='submit'>Create</Button>
            </Box>
          </Box>
          </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
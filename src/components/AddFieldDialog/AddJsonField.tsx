import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./style.css";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ILanguage, Langauges } from "../../constant/AppConstant";
import { IField, IFieldLanguage } from "../../interfaces/IField";
import { useDispatch } from "react-redux";
import { addFieldsByContent } from "../../store/reducer/ContentReducer";
import { groupBy } from "../../utility/utility";
import {JsonEditor} from "react-jsondata-editor"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: "80%",
  height: "420px",
  border: "none",
  p: 4,
};

export default function AddJsonFieldDialog() {
  const navigate = useNavigate();
  const {fieldType, contentId} = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<ILanguage | null>();
  const [languageData, setLanguageData] = React.useState<Array<IFieldLanguage>>([{langaugeCode:'',value:'', languageName:''}]);

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    navigate(`/contentField/${contentId}`);
    setOpen(false);
  };

  const createContent=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
      const data:any = Array.from(formData.entries()).reduce((memo, [key, value]) => ({
        ...memo,
        [key]: value,
      }), {});
      const fieldData: IField ={
        fieldName: data['fieldName'],
        fieldType: fieldType ?? '',
        langauges: groupBy(languageData,"langaugeCode")

      }
    dispatch(addFieldsByContent({contentId: contentId??'', contentDescription: data['description'], fields:[fieldData], updatedBy: "Rishav Mittal", updatedAt:"a few minutes ago" }));
    navigate(`/contentField/${contentId}`)
    }
  const langaugeHandler = (
    event: React.SyntheticEvent<Element, Event>,
    value: ILanguage | null,
    index: number
  ) => {
    if(value?.code)
    {
      languageData[index].langaugeCode= value?.code;
      languageData[index].languageName= value?.name;
    const lngData: Array<IFieldLanguage> = Object.assign([],languageData);
    setLanguageData(lngData);
    }
    setValue(value);
  };
  const addAnotherLangauge=()=>{
    setLanguageData(prev => [...prev,{langaugeCode:'',value:'', languageName:''}])
  }
  const handleChange = (e:any, index: number) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (event:any) => {
      languageData[index].value= event.target.result;
      const lngData: Array<IFieldLanguage> = Object.assign([],languageData);
      setLanguageData(lngData);
  }
  };
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
              Field Type #{fieldType?.toUpperCase()}
            </Typography>
            <Divider />

            <Box className="inputContainer">
              <form className="inputContainer" onSubmit={createContent}>
                <Box className="scrollContainer">
              {languageData.map((lang:IFieldLanguage, index:number)=> <Box key={`${lang.value}_${index}`}>
                <Box className="flex-col">
                <Typography id="transition-modal-title" className="gap10">
                  Languages
                </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Langauges}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  value={{code:lang.langaugeCode, name:lang.languageName}}
                  onChange={(event: React.SyntheticEvent<Element, Event>, value: ILanguage|null)=>langaugeHandler(event, value, index)}
                  renderInput={(params) => <TextField required {...params} />}
                />
              </Box>
              {value?.code &&<Box className="mrgT10">
                <Typography className="gap10">
                  Json Object
                </Typography>
                <input className="file" type="file" onChange={(event)=>handleChange(event, index)} />

                {lang.value && <JsonEditor jsonObject={lang.value} onChange={(output:any)=> {console.log(output)}} />}
            
              </Box>}
              </Box>)}
              </Box>
              <Box className="actionContainer">
                <Button variant="contained" onClick={addAnotherLangauge}>
                  Add Another Language
                </Button>
              </Box>
              <Box className="actionContainer">
                <Button variant="contained" type="submit">
                  Create
                </Button>
              </Box>
              </form>
            </Box>
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

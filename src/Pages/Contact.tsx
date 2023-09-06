import { useState } from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Contact = () => {

  interface ContactType {
    firstName?: string;
    lastName?: string;
    activeness?: string;
  }


  // Im giving 2 Demo Contact entries to reduce your effort and make easy to test.
  const [contacts, setContacts] = useState<ContactType[]>([{
    firstName: "SAI PRASAD",
    lastName: "POTLA",
    activeness: "Active"
  },
  {
    firstName: "DEMO",
    lastName: "ABC",
    activeness: "InActive"
  }

  ])

  
  const [activenes, setActivenes] = useState("Active")
  const [firstNameEdit, setFirstNameEdit] = useState<string | undefined>("")
  const [lastNameEdit, setLastNameEdit] = useState<string | undefined>("")
  const [activenesEdit, setActivenesEdit] = useState<string | undefined>("")
  const [indexEdit, setIndexEdit] = useState<number>()
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };


  // Method to Add Contact
  function addContact() {

    const firstNameValue = firstNameRef.current?.value || '';
    const lastNameValue = lastNameRef.current?.value || '';

    const newContact: ContactType = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      activeness: activenes
    }

    setContacts([...contacts, newContact])


  }

  // Method to gather info of contact to be edited
  function contactEdit(index: number) {

    setIndexEdit(index)
    handleClickOpen2()
    const clickedContact: ContactType = contacts[index]
    setFirstNameEdit(clickedContact?.firstName)
    setLastNameEdit(clickedContact?.lastName)
    setActivenesEdit(clickedContact?.activeness)

  }

  // Method to Edit Contact
  function savEditedContact() {

    let contactLists: ContactType[] = contacts;

    const EditedContact: ContactType = {
      firstName: firstNameEdit,
      lastName: lastNameEdit,
      activeness: activenesEdit
    }

    console.log("idx",EditedContact,indexEdit)

    if (indexEdit!=undefined) {
      contactLists.splice(indexEdit, 1, EditedContact)
      setContacts([...contactLists])
    }

  }

  // Method to delete contact .
  function contactDelete(index: number) {

    let contactLists: ContactType[] = contacts;
    
      contactLists.splice(index, 1)
      setContacts([...contactLists])
    
  }

  function activeSetter(e: any) {
    setActivenes(e.target.value)
  }


  return (
    <div style={{ display: "flex", justifyContent: "center" }}>


      <Box sx={{ width: '100%', boxSizing: "border-box" }}>
        <Stack spacing={3} className="mt35" >

          <div style={{ display: "flex", justifyContent: "center" }} >
            <Button variant="contained" onClick={handleClickOpen}> Create Contact</Button>
          </div>


          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>

              {
                contacts?.map((contact: ContactType, index: number) => {

                  return (

                    <Grid item md={4}>
                      <div style={{ minHeight: "100px" }}>
                        <Stack style={{ minHeight: "80px", border: "2px solid black", padding: "30px" ,display:"flex",justifyContent:"center"}}>
                          <div > 
                             <p >First Name : {contact.firstName}</p>
                          <p >Last Name : {contact.lastName}</p>
                          <Stack direction="row" spacing={2} style={{ marginTop:"10px"}}>
                            {contact.activeness === "Active" ? <CircleIcon style={{ color: "green" }} /> : <CircleIcon style={{ color: "red" }} />}
                            <p>{contact.activeness}</p>
                          </Stack>

                          </div>
                         

                        </Stack>
                        <Stack direction="row" spacing={3} style={{ margin: "5px", display: "flex", justifyContent: "center" }}>
                          <EditIcon onClick={() => { contactEdit(index) }} className="mouseEffect"/>
                          <DeleteIcon style={{ color: "red" }} onClick={() => { contactDelete(index) }} className="mouseEffect"/>
                        </Stack>
                      </div>
                    </Grid>


                  )

                })
              }

             

            </Grid>

          </Box>

          {
                contacts.length===0?
                <div style={{display:"flex",justifyContent:"center",border:"1px solid "}} className="mt35">
                   Oops! No Contacts Found. Please Add Contacts from Create Contact Button.

                </div>:""
              }

        </Stack>
      </Box>


      {/* Create Contact Page Modal */}
      <div>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">

            <div style={{ textAlign: "center", fontSize: "35px" }}>{"Create Contact"}</div>

          </DialogTitle>

          <Stack spacing={3} style={{ margin: "20px 50px 50px 50px" }}>

            <TextField id="outlined-basic" label="First Name" variant="outlined" inputRef={firstNameRef} />
            <TextField id="outlined-basic" label="Last Name" variant="outlined" inputRef={lastNameRef} />

            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={activenes}
                name="radio-buttons-group"
                onChange={activeSetter}
              >
                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
              </RadioGroup>
            </FormControl>

            <Button variant="outlined" onClick={() => {
              addContact()
              handleClose()

            }}> Save Contact</Button>


          </Stack>

        </Dialog>
      </div>


{/* Modal to Edit Contact */}
      <div>

        <Dialog
          fullScreen={fullScreen}
          open={open2}
          onClose={handleClose2}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">

            <div style={{ textAlign: "center", fontSize: "35px" }}>{"Edit Contact"}</div>

          </DialogTitle>

          <Stack spacing={3} style={{ margin: "20px 50px 50px 50px" }}>

            <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstNameEdit} onChange={(e) => { setFirstNameEdit(e.target.value) }} />
            <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastNameEdit} onChange={(e) => { setLastNameEdit(e.target.value) }} />

            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={activenesEdit}
                name="radio-buttons-group"
                onChange={(e: any) => { setActivenesEdit(e.target.value) }}
              >
                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
              </RadioGroup>
            </FormControl>

            <Button variant="outlined" onClick={() => {
              handleClose2()

              savEditedContact()

            }}> Save Contact</Button>


          </Stack>

        </Dialog>
      </div>

    </div>
  )
}

export default Contact
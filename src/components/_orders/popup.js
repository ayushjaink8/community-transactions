// material
import { 
    Box, 
    Grid, 
    Container, 
    Typography, 
    TextField, 
    Button, 
    FormControl,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
  } from '@material-ui/core';
  import { Navigate, useNavigate } from 'react-router-dom';
  // import Button from 'src/theme/overrides/Button';
  // components
  import Page from '../Page';
  import {
    AppTasks,
    AppNewUsers,
    AppBugReports,
    AppItemOrders,
    AppNewsUpdate,
    AppWeeklySales,
    AppOrderTimeline,
    AppCurrentVisits,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppCurrentSubject,
    AppConversionRates
  } from '../_dashboard/app';
  
  import { useHistory } from "react-router-dom"
  import CommunityCard from "../Community/CommunityCard"
  import { useState } from 'react';
  import { useMoralis, useNewMoralisObject } from 'react-moralis';
  // --------------------------------------------
  export default function Popup({community="community1", id="123"}){
      const {Moralis} = useMoralis();

      const [Name,setName]=useState('');
      const [Quantity,setQuantity]=useState('');
      const [open, setOpen] = useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const { save } = useNewMoralisObject("OrderDetails");

      const updateObject = async (e) => {
        e.preventDefault();

        const data = {
            Community: community,
            Id: id,
            Name: Name,
            Quantity:Quantity
        };
        
        save(data, {
          onSuccess: (monster) => {
              // Execute any logic that should take place after the object is saved.
              alert("New object created with objectId: " + monster.id);
              console.log(monster);
          },
          onError: (error) => {
              // Execute any logic that should take place if the save fails.
              // error is a Moralis.Error with an error code and message.
              alert("Failed to create new object, with error code: " + error.message);
              console.log(error);
          },
        });
        console.log("done");
        handleClose();
      }
      
      return(<>

      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Orders</DialogTitle>
        <DialogContent>
          <Box justifyContent="center" m={1}>
            <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
              <Box m={1}>
                <TextField 
                  value={Quantity}
                  onChange={(e)=>setQuantity(e.target.value)}
                  placeholder='Name'
                  required
                />
              </Box>
              <Box m={1}>
                <TextField 
                  value={Name}
                  onChange={(e)=>setName(e.target.value)}
                  placeholder='Quantity'
                  required
                />
              </Box>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateObject}>Add</Button>
        </DialogActions>
      </Dialog>
        
      
      </>
      )
  }

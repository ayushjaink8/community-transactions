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
  import { communities } from 'src/_mocks_/communities';
  import { useState } from 'react';
  import { useMoralis, useNewMoralisObject } from 'react-moralis';

  // --------------------------------------------
  export default function Popup({community="community1", id="123", itemName, getItems}){

      const {Moralis} = useMoralis();

      const [Quantity, setQuantity]=useState("");
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
            ItemName: itemName,
            Quantity: Quantity
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

        const query = new Moralis.Query('Items');

        query.equalTo("itemName", itemName)

        const val = await query.first();
        await val.set("Quantity", (parseInt(val.attributes.Quantity) + parseInt(Quantity)));
        await val.save()

        getItems();

        handleClose();
      }
      
      return(<>

      <Button variant="outlined" onClick={handleClickOpen}>
        ADD
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Orders</DialogTitle>
        <DialogContent>
          <Box justifyContent="center" m={1}>
            <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
              <Box m={1}>
                <Typography  variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Item Name: {itemName}
                </Typography>
              </Box>
              <Box m={1}>
                <TextField 
                  value={Quantity}
                  onChange={(e)=>setQuantity(e.target.value)}
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


import { useEffect, useState } from "react";

import { useLocation } from "react-router";
import {
  useMoralis,
  useNewMoralisObject,
  useMoralisQuery,
} from "react-moralis";

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField,
  Grid,
  Box
} from "@material-ui/core";
// components
import Page from "../components/Page";


import OrderCard from "../components/_orders/OrderCard";

// ----------------------------------------------------------------------
export default function Orders() {

  const { state: CommunityName } = useLocation();
  const [ItemName, setItemName] = useState("");
  const { save } = useNewMoralisObject("Items");
  const [ItemList1, setItemList1] = useState([]);
  const { account } = useMoralis();

  useEffect(() => {
    getItems();
  }, []);

  const { fetch } = useMoralisQuery("Items", (query) => query.limit(100), [], {
    autoFetch: false,
  });

  const getItems = async (e) => {
    const result = await fetch();
    let data = [];

    result.forEach((e) => {    
      console.log("hi");
      console.log(ItemList1);
      data.push({
        Community: e.attributes.Community,
        Admin_id: e.attributes.Admin_Id,
        itemName: e.attributes.itemName,
        Quantity: e.attributes.Quantity,
      });
    });

    setItemList1(data);
    console.log('ayush');
    console.log(data);
  };

  const addItem = async (e) => {
    e.preventDefault();
    const data = {
      Community: CommunityName.communityName,
      Quantity: 0,
      Admin_Id: account,
      itemName: ItemName,
    };

    await save(data, {
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

    await getItems();
    console.log("hi");
    console.log(ItemList1);
  };

  return (
    
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
      {(CommunityName?.communityName)
      ? <>
          <Box>
            <Typography variant="h4">Community Orders</Typography>
            <Typography m={1} variant="subtitle2" sx={{ opacity: 0.72 }}>
              {CommunityName.communityName}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            m={2}
            mb={4}
            component="form"
            onSubmit={addItem}
          >
            <Box m={1.5} mr={4}>
              <Typography variant="h5">Add New Item: </Typography>
            </Box>
            <TextField
              value={ItemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            <Button type="submit">Add</Button>
          </Box>

          <Grid container spacing={2}>
            {ItemList1.map(x => 
              <Grid item xs={3} sm={3} md={3}>
                <Box m={1}>
                  <OrderCard 
                    itemName={x.itemName} 
                    quantity={x.Quantity} 
                    id={account} 
                    community={CommunityName.communityName}
                    getItems={getItems}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </>
      : <Box m={4} display="flex" justifyContent="center">
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Please select any Community from Dashboard.
          </Typography>
        </Box>
      } 
      </Container>
    </Page>
  );
}

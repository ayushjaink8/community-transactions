// material
import { 
  Box, 
  Grid, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  FormControl
} from '@material-ui/core';
import { Navigate, useNavigate } from 'react-router-dom';
// import Button from 'src/theme/overrides/Button';
// components
import Page from '../components/Page';
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
} from '../components/_dashboard/app';

import { useHistory } from "react-router-dom"
import CommunityCard from "../components/Community/CommunityCard"
import { useEffect, useState } from 'react';
import { useMoralis, useNewMoralisObject, useMoralisQuery } from 'react-moralis';
// ----------------------------------------------------------------------


export default function DashboardApp() {

  const navigate = useNavigate();

  const {account, Moralis} = useMoralis();

  const [CommunityName, setCommunityName] = useState('');
  const [Communities, setCommunities] = useState([]);

  const { save } = useNewMoralisObject("CommunityDetails");

  useEffect(()=>{
    getCommunities();
  }, [])

  const { fetch } = useMoralisQuery(
    "CommunityDetails",
    (query) => query.limit(100),
    [],
    { autoFetch: false })

  const getCommunities = async (e) => {

    const result = await fetch();

    console.log(result);
    let data = [];
    if(result){
      result.forEach((e)=> {
        data.push({
          'Community': e.attributes.Community,
          'Admin_id': e.attributes.Admin_Id,
          'Community_id': e.id
        })
      })
    }
    
    setCommunities(data);    
  }

  const addCommunity = async (e) => {
    e.preventDefault();

    const data = {
        Community: CommunityName,
        Admin_Id: account,
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
    
    getCommunities();
  }



  const onClick = (e) => {
    console.log("clicked");
    let name;
    if(e.target.id !== ''){
      name = e.target.name;
    }else{
      name = e.target.innerText;
    }
    navigate('/dashboard/orders', {state: {communityName: name}});
  }


  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
          <Typography m={1} variant="subtitle2" sx={{ opacity: 0.72 }}>
            User ID: {account}
          </Typography>
        </Box>
        
        <Box display="flex" justifyContent="center" m={1} component="form" onSubmit={addCommunity}>
          <Box m={1.5} mr={4}>
            <Typography variant="h5">Add New Community: </Typography>
          </Box>
          
          <TextField 
            value={CommunityName}
            onChange={(e)=>setCommunityName(e.target.value)}
            required
          />

          <Button type="submit">Add</Button>
        </Box>

        <Box display="flex" justifyContent="right" m={2}>
          <Button onClick={getCommunities}>Reload Communities</Button>
        </Box>


        <Grid container spacing={2}>
          
          {Communities.map( x => 
            <Grid item xs={3} sm={3} md={3}>
              <Box component="span" m={1} onClick={onClick}>
                
                <CommunityCard name={x.Community} communityName={x.Community} community_id={x.Community_id} />
                
              </Box>
            </Grid>
          )}
        

{/* 
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />texthandler
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </GCommunityNamerid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Container, Stack, TextField, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
import { useState } from 'react';
import { useMoralis, useNewMoralisObject , useMoralisQuery} from 'react-moralis';

import Popup from '../components/_orders/popup';



// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function Explore() {

  const [Value, setValue] = useState('');
  const {Moralis} = useMoralis()

  const runCloud = async (e) => {
    console.log("work");
    let temp = await Moralis.Cloud.run("testme", {});

    setValue(temp);

  } 
  const { save } = useNewMoralisObject("testparam");

  const testparam = Moralis.Object.extend("testparam");
  const query = new Moralis.Query(testparam);

  const callFunc = async (e) => {
    console.log("working");

    const data = {
        strength: 1024,
        ownerName: "Aegon",
        canFly: true,
    };

    save(data, {
        onSuccess: (monster) => {
            // Execute any logic that should take place after the object is saved.
            alert("New object created with objectId: " + monster.id);
        },
        onError: (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Moralis.Error with an error code and message.
            alert(
                "Failed to create new object, with error code: " +
                    error.message
            );
        },
    });

    console.log("done");

  }


    const { fetch } = useMoralisQuery(
      "testparam",
      (query) => query.equalTo("ownerName", "Aegon"),
      [],
      { autoFetch: false })
  
    const killFunc = async (e) => {
      const result = await fetch();

      console.log(result);


      
    }

  return (
    <Page title="Dashboard: Explore">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Explore More!
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Post
          </Button>
        </Stack>

        <Box>
          I am from explore..
        </Box>


        <Box m={2} mt={5}>
          <Button onClick={runCloud}>Run Query</Button>
        </Box>
        <Box m={2}>
          Output: {Value}
        </Box>

        <Box m={2} mt={5}>
          <Button onClick={callFunc}>Run Query 2</Button>
        </Box>
        <Box m={2}>
          Output: {Value}
        </Box>


        <Box m={2} mt={5}>
          <Button onClick={killFunc}>execute kill function</Button>
        </Box>
        <Box m={2}>
          Output: {Value}
        </Box>

        <Popup/>


      </Container>
    </Page>
  );
}

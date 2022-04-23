import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Box, Container, Stack, Typography } from '@material-ui/core';
//iconify icon
import { Icon } from '@iconify/react';
import wiFiFill from '@iconify/icons-eva/wifi-fill';
// components
import Page from '../components/Page';


import { ChatEngine } from 'react-chat-engine';

import ChatFeed from '../components/_connect/ChatFeed';
import LoginForm from '../components/_connect/LoginForm';
import {ChatList} from 'react-chat-engine'


// ----------------------------------------------------------------------

export default function Connect() {
  // const [openFilter, setOpenFilter] = useState(false);

  // const formik = useFormik({
  //   initialValues: {
  //     gender: '',
  //     category: '',
  //     colors: '',
  //     priceRange: '',
  //     rating: ''
  //   },
  //   onSubmit: () => {
  //     setOpenFilter(false);
  //   }
  // });

  // const { resetForm, handleSubmit } = formik;

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  // const handleResetFilter = () => {
  //   handleSubmit();
  //   resetForm();
  // };

  const projectID = 'd4d09c29-fb3b-4d7d-b14a-9722f7e6c62a';

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Box mt={2} mb={0}>
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Connect To Amazon Workspaces&nbsp;
          <Icon icon={wiFiFill} width={22} height={22}/>
        </Typography> */}

        {/* <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 5 }}
        >
          <DisplayScreen/>
        </Stack> */}

        <ChatEngine
          height="70vh"
          projectID={projectID}
          // userName={localStorage.getItem('username')}
          // userSecret={localStorage.getItem('password')}
          userName='ayushjain'
          userSecret='password'
          renderChatList = { (props) => <ChatList {...props} />}
          renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
          onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        />

      </Box>
    </Page>
  );
}

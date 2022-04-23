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

  const projectID = 'd4d09c29-fb3b-4d7d-b14a-9722f7e6c62a';

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Box mt={2} mb={0}>

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

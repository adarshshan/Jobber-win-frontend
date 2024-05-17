import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../src/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { NextUIProvider } from '@nextui-org/react';
import { ChakraProvider } from '@chakra-ui/react'
import ChatProvider from 'Context/ChatProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <Provider store={store}>
        <NextUIProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </NextUIProvider>
      </Provider>
    </ChakraProvider>
  </BrowserRouter>
);

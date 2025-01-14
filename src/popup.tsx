import Route, { Wrapper } from "~components/popup/Route";
import { createGlobalStyle } from "styled-components";
import { GlobalStyle, useTheme } from "~utils/theme";
import { useHashLocation } from "~utils/hash_router";
import { Provider } from "@arconnect/components";
import { syncLabels, useSetUp } from "~wallets";
import { useEffect } from "react";
import { Router } from "wouter";

import HardwareWalletTheme from "~components/hardware/HardwareWalletTheme";
import HistoryProvider from "~components/popup/HistoryProvider";

import Home from "~routes/popup";
import Receive from "~routes/popup/receive";
import Send from "~routes/popup/send";
import SendAuth from "~routes/popup/send/auth";
import Explore from "~routes/popup/explore";
import Unlock from "~routes/popup/unlock";
import Tokens from "~routes/popup/tokens";
import Asset from "~routes/popup/token/[id]";
import Collectibles from "~routes/popup/collectibles";
import Collectible from "~routes/popup/collectible/[id]";
import Transaction from "~routes/popup/transaction/[id]";

export default function Popup() {
  const theme = useTheme();

  // init popup
  useSetUp();

  // sync ans labels
  useEffect(() => {
    syncLabels();
  }, []);

  return (
    <Provider theme={theme}>
      <HardwareWalletTheme>
        <GlobalStyle />
        <HideScrollbar />
        <Wrapper>
          <Router hook={useHashLocation}>
            <HistoryProvider>
              <Route path="/" component={Home} />
              <Route path="/receive" component={Receive} />
              <Route path="/send/transfer/:id?">
                {(params: { id?: string }) => <Send id={params?.id} />}
              </Route>
              <Route path="/send/auth" component={SendAuth} />
              <Route path="/explore" component={Explore} />
              <Route path="/unlock" component={Unlock} />
              <Route path="/tokens" component={Tokens} />
              <Route path="/token/:id">
                {(params: { id: string }) => <Asset id={params?.id} />}
              </Route>
              <Route path="/collectibles" component={Collectibles} />
              <Route path="/collectible/:id">
                {(params: { id: string }) => <Collectible id={params?.id} />}
              </Route>
              <Route path="/transaction/:id/:gateway?">
                {(params: { id: string; gateway?: string }) => (
                  <Transaction id={params?.id} gw={params?.gateway} />
                )}
              </Route>
            </HistoryProvider>
          </Router>
        </Wrapper>
      </HardwareWalletTheme>
    </Provider>
  );
}

const HideScrollbar = createGlobalStyle`
  body {
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none
    }
  }
`;

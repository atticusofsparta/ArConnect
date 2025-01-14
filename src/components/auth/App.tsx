import {
  type DisplayTheme,
  Section,
  Spacer,
  Text
} from "@arconnect/components";
import { useTheme as useDisplayTheme } from "~utils/theme";
import type { Allowance } from "~applications/allowance";
import { formatTokenBalance } from "~tokens/currency";
import { GridIcon } from "@iconicicons/react";
import { useMemo } from "react";
import { type Gateway, defaultGateway } from "~applications/gateway";
import Squircle from "~components/Squircle";
import browser from "webextension-polyfill";
import Arweave from "arweave";
import styled from "styled-components";
import Label from "./Label";

export default function App({
  appIcon,
  appName,
  appUrl,
  gateway,
  allowance
}: Props) {
  // allowance spent in AR
  const spent = useMemo(() => {
    if (!allowance) return 0;

    return winstonToArFormatted(allowance.spent);
  }, [allowance]);

  // allowance limit in AR
  const limit = useMemo(() => {
    if (!allowance) return 0;

    return winstonToArFormatted(allowance.limit);
  }, [allowance]);

  function winstonToArFormatted(val: number) {
    const arweave = new Arweave(defaultGateway);
    const arVal = arweave.ar.winstonToAr(val.toString());

    return parseFloat(arVal);
  }

  // display theme
  const theme = useDisplayTheme();

  return (
    <>
      <SidePaddingSection>
        <Label>
          {browser.i18n.getMessage(
            gateway ? "app_wants_to_connect" : "allowance_limit_reached"
          )}
        </Label>
      </SidePaddingSection>
      <Spacer y={0.4} />
      <SidePaddingSection size="slim">
        <Wrapper displayTheme={theme}>
          <AppData>
            <AppIcon img={appIcon} key={appIcon}>
              {!appIcon && <NoAppIcon />}
            </AppIcon>
            <div>
              <AppName>{appName || appUrl}</AppName>
              {(gateway && (
                <AppUrl>
                  {browser.i18n.getMessage("gateway")}
                  {": "}
                  {gateway.host}
                </AppUrl>
              )) ||
                (allowance && (
                  <AppUrl>
                    {browser.i18n.getMessage("spent")}
                    {": "}
                    {spent.toLocaleString(undefined, {
                      maximumFractionDigits: 8
                    })}
                    {" AR"}
                  </AppUrl>
                ))}
            </div>
          </AppData>
          {allowance && (
            <AllowanceSpent>
              {formatTokenBalance(limit)}
              {" AR"}
            </AllowanceSpent>
          )}
        </Wrapper>
      </SidePaddingSection>
    </>
  );
}

const SidePaddingSection = styled(Section)`
  padding-top: 0;
  padding-bottom: 0;
`;

const Wrapper = styled.div<{ displayTheme: DisplayTheme }>`
  background-color: rgb(
    ${(props) =>
      props.displayTheme === "light" ? "0, 0, 0" : props.theme.cardBackground}
  );
  border-radius: 27px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AppData = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const AppIcon = styled(Squircle)`
  position: relative;
  width: 2.6rem;
  height: 2.6rem;
  color: rgb(${(props) => props.theme.theme});
`;

const NoAppIcon = styled(GridIcon)`
  position: absolute;
  font-size: 1.5rem;
  width: 1em;
  height: 1em;
  color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AppName = styled(Text).attrs({
  heading: true,
  noMargin: true
})`
  font-size: 1.3rem;
  font-weight: 500;
  color: #fff;
`;

const AppUrl = styled(Text).attrs({
  noMargin: true
})`
  font-size: 0.7rem;
`;

const AllowanceSpent = styled(AppName)`
  font-size: 1.4rem;
  color: #ffb800;
`;

interface Props {
  appIcon?: string;
  appName?: string;
  appUrl: string;
  gateway?: Gateway;
  allowance?: Allowance;
}

import React, { FC, ReactNode } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import TitleBar from "./TitleBar";
import PageWrapper from "./styled/PageWrapper";
import PageBody from "./styled/PageBody";

interface BasicPageProps {
  fullpage?: boolean;
  scrollable?: boolean;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

const BasicPage: FC<BasicPageProps> = ({
  fullpage,
  title,
  subtitle,
  children
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const wrapperProps = {
    fullpage: String(fullpage),
    ismobile: String(isMobile),
    spacing: isMobile ? 0 : 2
  };

  const titleProps = { title, subtitle };

  return (
    <PageWrapper {...wrapperProps}>
      <TitleBar {...titleProps} />
      <PageBody scrollable={String(isMobile ? false : true)}>
        {children}
      </PageBody>
    </PageWrapper>
  );
};

export default BasicPage;

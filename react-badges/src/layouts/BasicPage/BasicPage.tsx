import React, { FC, ReactNode } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import TitleBar from "./TitleBar";
import PageWrapper from "./styled/PageWrapper";
import PageBody from "./styled/PageBody";

interface BasicPageProps {
  fullpage?: boolean;
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
    spacing: isMobile ? 0 : 2
  };

  const titleProps = { title, subtitle };

  return (
    <PageWrapper {...wrapperProps}>
      <TitleBar {...titleProps} />
      <PageBody>{children}</PageBody>
    </PageWrapper>
  );
};

export default BasicPage;

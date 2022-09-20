import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { ConsulConfig } from './ConsulConfig';
import { PageWrapper } from 'app/components/PageWrapper';

export function Consul() {
  return (
    <>
      <Helmet>
        <title>HashiConfig Consul Wizard Page</title>
        <meta
          name="description"
          content="HashiConfig Consul Config Wizard"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <ConsulConfig />
      </PageWrapper>
    </>
  );
}

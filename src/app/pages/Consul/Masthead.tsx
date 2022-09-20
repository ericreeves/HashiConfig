import * as React from 'react';
import styled from 'styled-components/macro';
import { Logos } from './Logos';
import { Title } from './components/Title';
import { Lead } from './components/Lead';
import { A } from 'app/components/A';

export function Masthead() {
  return (
    <Wrapper>
      {/* <Logos /> */}
      <Title>HashiCorp Configuration File Wizard</Title>
      <Lead>
        HashiConfig supports configuration file generation guided by Subject Matter Expert{' '}
        best practices for the <strong>Open Source</strong> and {' '} 
        <strong>Enterprise</strong> versions of {' '} 
        <strong>Consul</strong>,{' '}
        <strong>Nomad</strong> and{' '}
        <strong>Vault</strong>.
      </Lead>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
`;

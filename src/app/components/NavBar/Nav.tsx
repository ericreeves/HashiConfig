import * as React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as DocumentationIcon } from './assets/documentation-icon.svg';
import { ReactComponent as GithubIcon } from './assets/github-icon.svg';

export function Nav() {
  return (
    <Wrapper>
      {/* <Item
        href="https://github.com/ericreeves/hashiconfig"
        target="_blank"
        title="Documentation Page"
        rel="noopener noreferrer"
      >
        <DocumentationIcon />
        Documentation
      </Item> */}
      <Item
        href="/consul"
        title="Consul"
        rel="noopener noreferrer"
      >
        Consul
      </Item>
      <Item
        href="/nomad"
        title="Nomad"
        rel="noopener noreferrer"
      >
        Nomad
      </Item>
      <Item
        href="/vault"
        title="Vault"
        rel="noopener noreferrer"
      >
        Vault
      </Item>
      <Item
        href="https://github.com/ericreeves/hashiconfig"
        target="_blank"
        title="Github Page"
        rel="noopener noreferrer"
      >
        <GithubIcon />
        Github
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled.a`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;

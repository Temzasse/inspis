import React from 'react';
import styled from 'styled-components';
import { IconButton, Spacing } from '../common';

function Navbar() {
  return (
    <Wrapper>
      <IconButton icon="search" />
      <Spacing />
      <IconButton icon="plus" />
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  background-color: #fff;
`;

export default Navbar;

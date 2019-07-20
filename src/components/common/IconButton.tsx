import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { noop } from '../../utils/common';

interface Props {
  icon: 'plus' | 'arrow-left';
  color?: string;
  onClick?: () => any;
}

const iconMapper = {
  plus: FaPlus,
  'arrow-left': FiArrowLeft
};

function IconButton({ icon, color = '#222', onClick = noop }: Props) {
  const Icon = iconMapper[icon];
  return (
    <Wrapper onClick={onClick}>
      <Icon size={16} color={color} />
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: none;
  outline: none;
  padding: 12px;
  background: none;
  border-radius: 50%;

  &:active {
    background: #f5f5f5;
  }
`;

export default IconButton;

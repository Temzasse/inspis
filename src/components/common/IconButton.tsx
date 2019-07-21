import React from 'react';
import styled from 'styled-components';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { noop } from '../../utils/common';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon: 'plus' | 'arrow-left' | 'search';
  color?: string;
  onClick?: () => any;
}

const iconMapper = {
  plus: FaPlus,
  search: FaSearch,
  'arrow-left': FiArrowLeft,
};

function IconButton({ icon, color = '#222', onClick = noop, ...rest }: Props) {
  const Icon = iconMapper[icon];
  return (
    <Wrapper onClick={onClick} {...rest}>
      <Icon size={16} color={color} />
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: none;
  outline: none;
  flex: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border-radius: 50%;

  &:active {
    background: #f5f5f5;
  }
`;

export default IconButton;

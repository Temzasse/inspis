import React from 'react';
import styled from 'styled-components';

type Variant = 'h1' | 'h2';

interface OwnProps {
  variant?: Variant;
  color?: string;
}

interface Props extends OwnProps {
  children: React.ReactNode;
}

function Heading({ children, variant = 'h1', color = '#222' }: Props) {
  return (
    <HeadingBase as={variant} variant={variant} color={color}>
      {children}
    </HeadingBase>
  );
}

type P = Required<OwnProps>;

const fontSize = (p: P) => ({ h1: 40, h2: 24 }[p.variant]);
const fontWeight = (p: P) => ({ h1: 900, h2: 800 }[p.variant]);
const color = (p: P) => p.color;

const HeadingBase = styled('h1')<P>`
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  color: ${color};
  margin: 0px;
`;

export default Heading;

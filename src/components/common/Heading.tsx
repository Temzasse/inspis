import React from 'react';
import styled from 'styled-components';

type Variant = 'h1' | 'h2' | 'h3';

interface OwnProps {
  variant?: Variant;
  color?: string;
}

interface Props extends OwnProps {
  children: React.ReactNode;
}

function Heading({ children, variant = 'h1', color = '#222', ...rest }: Props) {
  return (
    <HeadingBase as={variant} variant={variant} color={color} {...rest}>
      {children}
    </HeadingBase>
  );
}

type P = Required<OwnProps>;

const fontSize = (p: P) => ({ h1: 40, h2: 24, h3: 18 }[p.variant]);
const fontWeight = (p: P) => ({ h1: 900, h2: 800, h3: 700 }[p.variant]);
const color = (p: P) => p.color;

const HeadingBase = styled('h1')<P>`
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  color: ${color};
  margin: 0px;
  line-height: 1.45;
`;

export default Heading;

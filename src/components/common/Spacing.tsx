import styled from 'styled-components';

type Dir = 'x' | 'y';

interface Props {
  amount?: number;
  dir?: Dir;
}

const DEFAULT_PAD = '16';

const getWidthOrHeight = (dir?: Dir) => {
  switch (dir) {
    case 'x':
      return 'width';
    case 'y':
      return 'height';
    default:
      return 'width';
  }
};

const getDim = (props: Props) => {
  const amount = props.amount || DEFAULT_PAD;
  return `${getWidthOrHeight(props.dir)}: ${amount}px;`;
};

const Spacing = styled('div')<Props>`
  height: 0px;
  ${props => getDim(props)}
`;

export default Spacing;

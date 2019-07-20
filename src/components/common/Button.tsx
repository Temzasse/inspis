import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  size?: 'small' | 'normal' | 'large';
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary';
}

const disabledStyles = css`
  opacity: 0.5;
  cursor: not-allowed;
`;

const fullWidthStyles = css`
  width: 100%;
`;

type P = Required<Props>;

const fontSize = (p: P) => ({ small: 12, normal: 16, large: 24 }[p.size]);
const bgColor = (p: P) => ({ primary: '#222', secondary: '#fff' }[p.variant]); /* prettier-ignore */
const activeBgColor = (p: P) => ({ primary: '#000', secondary: '#f5f5f5' }[p.variant]); /* prettier-ignore */
const padding = (p: P) => ({ small: '4px 8px', normal: '12px 16px', large: '16px 24px' }[p.size]); /* prettier-ignore */
const color = (p: P) => ({ primary: '#fff', secondary: '#222' }[p.variant]);

const buttonCSS = css`
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  border-radius: 4px;
  font-weight: 500;
  color: ${p => color(p as any)};
  font-size: ${p => fontSize(p as any)}px;
  padding: ${p => padding(p as any)};
  background-color: ${p => bgColor(p as any)};
  ${(p: any) => p.disabled && disabledStyles};
  ${(p: any) => p.fullWidth && fullWidthStyles};

  &:active {
    background-color: ${p => activeBgColor(p as any)};
  }
`;

const Button = styled('button')<Props>`
  ${buttonCSS}
`;

export const MotionButton = styled(motion.button)<Props>`
  ${buttonCSS}
`;

Button.defaultProps = {
  variant: 'primary',
  size: 'normal',
};

MotionButton.defaultProps = {
  variant: 'primary',
  size: 'normal',
};

export default Button;

import { css, keyframes } from 'styled-components';

export const ripple = (rippleColor: string = 'rgba(0, 0, 0, 0.4)') => {
  return css`
    position: relative;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      transform: scale(10, 10);
      opacity: 0;
      transition: transform 0.5s, opacity 1s;
      background-repeat: no-repeat;
      background-position: 50%;
      background-image: radial-gradient(
        circle,
        ${rippleColor} 10%,
        transparent 10.01%
      );
    }
    &:active:after {
      transform: scale(0, 0);
      opacity: 0.2;
      transition: 0s;
    }
  `;
};

export const visuallyHidden = css`
  position: absolute;
  border: 0;
  padding: 0;
  height: 1px;
  width: 1px;
  margin: -1px;
  clip: rect(0 0 0 0);
  overflow: hidden;
  white-space: nowrap;
`;

export const zStackContext = css`
  position: relative;
  z-index: 0;
`;

export const fit = (fixed?: boolean) => css`
  position: ${fixed ? 'fixed' : 'absolute'};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const centered = (dir = 'row') => css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${dir};
`;

const fadeInAnim = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeIn = css`
  animation: ${fadeInAnim} 200ms forwards ease-in;
  animation-delay: 100ms;
`;

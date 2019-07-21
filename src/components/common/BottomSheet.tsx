import React from 'react';
import ReactDOM from 'react-dom';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import styled, { css, createGlobalStyle } from 'styled-components';

import { usePrevious } from '../../utils/hooks';
import { isPWA } from '../../utils/common';

interface State {
  isOpen: boolean;
  el: null | React.ReactNode;
}

type Action =
  | { type: 'open' }
  | { type: 'close' }
  | { type: 'set-el'; payload: React.ReactNode }
  | { type: 'clear-el' };

type Dispatch = (action: Action) => void;

const StateContext = React.createContext<State | undefined>(undefined);
const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

function useBottomSheetDispatch() {
  const dispatch = React.useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }

  return dispatch;
}

function useBottomSheetState() {
  const state = React.useContext(StateContext);

  if (state === undefined) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }

  return state;
}

function bottomSheetReducer(state: State, action: Action) {
  switch (action.type) {
    case 'open': {
      return { ...state, isOpen: true };
    }
    case 'close': {
      return { ...state, isOpen: false };
    }
    case 'set-el': {
      return { ...state, el: action.payload };
    }
    case 'clear-el': {
      return { ...state, el: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

export function BottomSheetProvider({
  children,
  blurTarget,
}: {
  blurTarget?: string;
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(bottomSheetReducer, {
    isOpen: false,
    el: null,
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
        <BottomSheetPortal blurTarget={blurTarget} />
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useBottomSheet(el: React.ReactNode) {
  const dispatch = useBottomSheetDispatch();

  React.useEffect(() => {
    dispatch({ type: 'set-el', payload: el });
    return () => {
      dispatch({ type: 'clear-el' });
    };
  }, [dispatch, el]);

  return React.useMemo(
    () => ({
      openBottomSheet: () => dispatch({ type: 'open' }),
      closeBottomSheet: () => dispatch({ type: 'close' }),
    }),
    [dispatch]
  );
}

const BottomSheetPortal = (props: any) => {
  const portalRef = React.useRef<any>(null);

  React.useEffect(() => {
    let el = document.getElementById('#bottom-sheet-portal');

    if (!el) {
      el = document.createElement('div');
      el.id = 'bottom-sheet-portal';
      document.body.appendChild(el);
    }

    portalRef.current = el;
  }, []);

  if (!portalRef.current) return null;

  const bottomSheet = <BottomSheet {...props} />;

  return ReactDOM.createPortal(bottomSheet, portalRef.current);
};

const BottomSheet = ({
  blurTarget,
  sheetHeight = window.innerHeight - 32,
}: {
  blurTarget: string;
  sheetHeight: number;
}) => {
  const { isOpen, el } = useBottomSheetState();
  const dispatch = useBottomSheetDispatch();
  const prevOpen = usePrevious(isOpen);

  const closeY = window.innerHeight + 50; // Add padding for closing animation
  const openY = window.innerHeight - sheetHeight;
  const y = useSpring(closeY, { stiffness: 300, damping: 30, mass: 0.2 });

  const handleDragEnd = React.useCallback(
    (e, { velocity }) => {
      if (velocity.y > 500) {
        // User flicked the sheet down
        dispatch({ type: 'close' });
      } else {
        // Snap back to original position
        y.stop();
        y.set(openY);
      }
    },
    [dispatch, openY, y]
  );

  React.useEffect(() => {
    if (prevOpen && !isOpen) dispatch({ type: 'close' });
  }, [dispatch, isOpen, prevOpen]);

  // Update body color to match backdrop color for PWAs
  React.useEffect(() => {
    if (isPWA()) {
      const body = document.getElementsByTagName('body')[0];
      body.style.backgroundColor = isOpen ? 'rgba(51, 51, 51, 0.5)' : '#fff';
    }
  }, [isOpen]);

  return (
    <React.Fragment>
      <Wrapper isOpen={isOpen}>
        <AnimatePresence>
          {isOpen && (
            <Backdrop
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch({ type: 'close' })}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <Sheet
              key="sheet"
              drag="y"
              dragConstraints={{ top: openY }}
              dragElastic={0.3}
              onDragEnd={handleDragEnd}
              initial={{ y: closeY }}
              animate={{ y: openY }}
              exit={{ y: closeY }}
              style={{ y }}
            >
              {el}
            </Sheet>
          )}
        </AnimatePresence>
      </Wrapper>

      {blurTarget && (
        <BlurHandler shouldBlur={isOpen} blurTarget={blurTarget} />
      )}
    </React.Fragment>
  );
};

// eslint-disable-next-line
const BlurHandler = createGlobalStyle<{
  blurTarget: string;
  shouldBlur: boolean;
}>`
  ${props =>
    props.blurTarget &&
    css`
      ${props.blurTarget} {
        will-change: filter, transform;
        transition: filter 200ms linear, transform 200ms linear;
        filter: blur(${props.shouldBlur ? 6 : 0}px);
        transform: scale(${props.shouldBlur ? 1.05 : 1});
      }
    `}
`;

const Wrapper = styled('div')<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
`;

const Backdrop = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(51, 51, 51, 0.5);
`;

const Sheet = styled(motion.div)`
  position: absolute;
  top: 0;
  background-color: #fff;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  box-shadow: 0px -2px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 100px;
  height: calc(100vh + 100px);
  width: 100vw;
`;

export default BottomSheet;

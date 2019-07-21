import React from 'react';
import styled from 'styled-components';

type Size = 'sm' | 'lg';

interface Props {
  tags: string[];
  size?: Size;
}

function NoteTags({ tags, size = 'sm' }: Props) {
  return (
    <Wrapper>
      {tags.map(tag => (
        <NoteTag size={size}>{tag}</NoteTag>
      ))}
    </Wrapper>
  );
}

type P = { size: Size };
const fontSize = (p: P) => ({ sm: 9, lg: 12 }[p.size]);
const padding = (p: P) => ({ sm: '3px 6px', lg: '4px 8px' }[p.size]);

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const NoteTag = styled('span')<{ size: Size }>`
  flex: none;
  font-size: ${fontSize}px;
  text-transform: uppercase;
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 99px;
  padding: ${padding};
  color: rgba(255, 255, 255, 0.7);
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.1);
`;

export default NoteTags;

import React from 'react';
import color from 'color';
import styled from 'styled-components';
import { IconType } from 'react-icons/lib/cjs';

import {
  FaYoutube,
  FaTwitter,
  FaMediumM,
  FaLink,
  FaGithub,
  FaReddit,
} from 'react-icons/fa';

import { Note, NoteKind } from './notes.types';
import { getNoteKind } from './note.utils';

type Size = 'sm' | 'lg';

interface Props {
  note: Note;
  size?: Size;
}

const iconMapper: { [kind: string]: IconType } = {
  [NoteKind.Medium]: FaMediumM,
  [NoteKind.Twitter]: FaTwitter,
  [NoteKind.Youtube]: FaYoutube,
  [NoteKind.Github]: FaGithub,
  [NoteKind.Reddit]: FaReddit,
};

const iconSizeMapper = { sm: 18, lg: 24 };
const wrapSizeMapper = { sm: 32, lg: 48 };
const borderRadSizeMapper = { sm: 8, lg: 12 };

function NoteKindIcon({ note, size = 'sm' }: Props) {
  const noteKind = getNoteKind(note);
  const Icon = iconMapper[noteKind] || FaLink;
  const iconSize = iconSizeMapper[size];
  const iconColor = color(note.colors[0])
    .darken(0.6)
    .string();

  return (
    <Wrapper size={size}>
      <Icon size={iconSize} color={iconColor} />
    </Wrapper>
  );
}

const Wrapper = styled('div')<{ size: Size }>`
  width: ${props => wrapSizeMapper[props.size]}px;
  height: ${props => wrapSizeMapper[props.size]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: ${props => borderRadSizeMapper[props.size]}px;
`;

export default NoteKindIcon;

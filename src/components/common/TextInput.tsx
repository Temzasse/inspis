import React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  onTextChange: (val: string) => any;
  value: string;
  label: string;
}

function TextInput({ label, onTextChange, ...rest }: Props) {
  return (
    <Label>
      {label}
      <Input {...rest} onChange={e => onTextChange(e.target.value)} />
    </Label>
  );
}

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #51525a;
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
`;

const Input = styled.input`
  border: none;
  border-radius: 4px;
  padding: 16px 12px;
  background-color: #f5f5f5;
  margin-top: 8px;
  color: #222;
  outline: none;
  font-size: 16px;
`;

export default TextInput;

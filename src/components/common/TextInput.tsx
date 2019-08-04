import React from 'react';
import styled from 'styled-components';
import { FiInfo } from 'react-icons/fi';
import { FaAsterisk } from 'react-icons/fa';

import Spacing from './Spacing';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  onTextChange: (val: string) => any;
  value: string;
  label: string;
  labelInfo?: string;
  required?: boolean;
}

function TextInput({
  label,
  labelInfo,
  onTextChange,
  required,
  ...rest
}: Props) {
  return (
    <Label>
      <LabelContent>
        <LabelText>
          {label}
          <Spacing amount={4} />
          {required && <FaAsterisk size={8} />}
        </LabelText>

        {labelInfo && (
          <LabelInfo>
            <FiInfo size={12} color="#51525a" />
            <Spacing dir="x" amount={4} />
            {labelInfo}
          </LabelInfo>
        )}
      </LabelContent>

      <Input {...rest} onChange={e => onTextChange(e.target.value)} />
    </Label>
  );
}

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #51525a;
`;

const LabelContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LabelText = styled.span`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
`;

const LabelInfo = styled.span`
  font-size: 12px;
  font-style: italic;
  font-weight: 300;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.1);

  ::placeholder {
    color: #989aaa;
  }

  ::-ms-input-placeholder {
    color: #989aaa;
  }
`;

export default TextInput;

import React from 'react';
import { TagWrapper } from './style';

type Props = {
  children: React.ReactNode;
};

export function Tag({ children }: Props) {
  return <TagWrapper>{children}</TagWrapper>;
}

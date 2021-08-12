import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface HtagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement> {
  className?: string;
  tag: 'h1' | 'h2' | 'h3';
  children: ReactNode;
}

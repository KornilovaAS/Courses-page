import { DividerProps } from './Divider.props';
import styles from './Divider.module.css';
import cn from 'classnames';

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
  return <hr {...props} className={cn(styles.hr, className)} />;
};

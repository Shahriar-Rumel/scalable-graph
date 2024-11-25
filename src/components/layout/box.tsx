import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

interface BoxProps {
  children: ReactNode;
  className?: string;
}

const Box: FC<BoxProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

export default Box;

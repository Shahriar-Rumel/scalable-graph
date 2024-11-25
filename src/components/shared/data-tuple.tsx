import { FC } from 'react';
import { cn } from '../../lib/utils';
import Box from '../layout/box';

interface DataTupleProps {
  _key: string;
  value?: string | number | null;
  valueStyle?: string;
}

const DataTuple: FC<DataTupleProps> = ({ _key, value, valueStyle = '' }) => {
  return (
    <Box className="flex my-[6px] flex-col gap-[4px] text-[14px]">
      <p className="text-foreground/60 ">{_key}</p>
      <p className={cn('capitalize', valueStyle)}>{value}</p>
    </Box>
  );
};

export default DataTuple;

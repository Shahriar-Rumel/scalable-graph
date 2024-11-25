import { FC } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CircleX } from 'lucide-react';

import { PopoverClose } from '@radix-ui/react-popover';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { cn } from '../../../lib/utils';
import DataTuple from '../data-tuple';
import Box from '../../layout/box';

interface NetworkNodeData {
  label: string;
  description?: string;
  ip?: string;
  network?: string;
  status?: 'inactive' | 'error' | 'active';
  customInfo?: string;
  lastmodified: string;
  traffic?: {
    volume?: string;
    latency?: string;
  };
}

interface NetworkNodeProps {
  data: NetworkNodeData;
}

const NetworkNode: FC<NetworkNodeProps> = ({ data }) => {
  const getStatus = () => {
    if (data.status === 'inactive') return 'bg-stone-500';
    if (data.status === 'error') return 'bg-rose-500';
    return 'bg-violet-500';
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Handle type="source" position={Position.Top} id="a" />
        <Box
          className={cn(
            'w-[30px] h-[30px] md:h-[40px] md:w-[40px] hover:border-[1px] hover:border-foreground/60 rounded-full flex items-center justify-center tracking-tight text-center text-[6px] md:text-[8px] text-white',
            getStatus()
          )}
        >
          {data.label}
        </Box>
        <Handle type="target" position={Position.Bottom} />
      </PopoverTrigger>
      <PopoverContent className="z-[999] relative max-h-[300px] md:max-h-[500px] overflow-y-scroll">
        <PopoverClose
          className="PopoverClose absolute right-2 top-2"
          aria-label="Close"
        >
          <CircleX className="w-[18px] h-[18px] opacity-[0.6]" />
        </PopoverClose>
        <Box className="grid grid-cols-2">
          <DataTuple _key={'Label'} value={data.label} />
          <DataTuple _key={'Description'} value={data.description} />
        </Box>
        <Box className="grid grid-cols-2">
          <DataTuple _key="IP" value={data.ip} />
          <DataTuple
            _key="Status"
            value={data.status}
            valueStyle={
              data.status === 'inactive'
                ? 'text-stone-300'
                : data.status === 'error'
                ? 'text-rose-500'
                : 'text-green-500'
            }
          />
        </Box>

        <Box className="grid grid-cols-2">
          <DataTuple _key="Network" value={data.network} />
          <DataTuple
            _key="Last Modified"
            value={
              data.lastmodified
                ? new Date(data.lastmodified).toISOString().split('T')[0]
                : ''
            }
          />
        </Box>

        <Box className="flex my-[12px] border-t-[1px] mt-[24px] pt-[24px] flex-col gap-[4px] text-[14px]">
          <p className="text-foreground">Traffic</p>
          <Box className="grid grid-cols-2">
            <DataTuple _key="Volume" value={data.traffic?.volume || 'N/A'} />
            <DataTuple _key="Latency" value={data.traffic?.latency || 'N/A'} />
          </Box>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

export default NetworkNode;

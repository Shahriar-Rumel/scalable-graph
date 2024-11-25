import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath
} from '@xyflow/react';
import { FC } from 'react';

import { cn } from '../../../lib/utils';

interface EdgeData {
  [key: string]: unknown;
  opacity?: number;
  label?: string;
  status?: 'active' | 'inactive' | 'error';
}

const NetworkEdge: FC<EdgeProps<Edge<EdgeData>>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  data,
  ...props
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  const edgeOpacity = data?.opacity || 1;

  const label = data?.label || 'N/A';

  const edgeColorClass =
    data?.status === 'active'
      ? '!stroke-violet-500'
      : data?.status === 'inactive'
      ? '!stroke-stone-500'
      : '!stroke-rose-500';

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        className={cn(
          'network-edge',
          selected ? 'stroke-blue-500' : edgeColorClass
        )}
        {...props}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            opacity: edgeOpacity
          }}
          className="absolute text-[4px] bg-stone-500 flex rounded-full py-[1px] px-[2px] nodrag nopan"
        >
          <p>{label}</p>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default NetworkEdge;

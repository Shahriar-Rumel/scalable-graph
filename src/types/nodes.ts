import type { Node, BuiltInNode } from '@xyflow/react';
export type PositionLoggerNode = Node<
  {
    label?: string;
    status?: string;
    description?: string;
    ip?: string;
    network?: string;
    lastmodified?: string;
    customInfo?: string;
    traffic?: {
      volume?: string;
      latency?: string;
    };
  },
  'position-logger'
>;
export type AppNode = BuiltInNode | PositionLoggerNode;

import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ReactFlow,
  Controls,
  MiniMap,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
  Edge,
  NodeChange,
  EdgeChange
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { useEdges, useNodes } from '@/hooks/use-graph';
import { AppNode } from '@/types/nodes';

import NetworkNode from '@/components/shared/network/node';
import NetworkEdge from '@/components/shared/network/edge';
import Loader from '@/components/ui/loader';
import SearchNodes from '@/components/shared/search-nodes';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const proOptions = { hideAttribution: true };

const NetworkGraph = () => {
  const {
    data: serverNodes,
    loading: nodesLoading,
    error: nodesError
  } = useNodes();
  const {
    data: serverEdges,
    loading: edgesLoading,
    error: edgeError
  } = useEdges();

  const [nodes, setNodes] = useState(serverNodes);
  const [edges, setEdges] = useState(serverEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');

  const opacity = {
    active: 1,
    inActive: 0.1
  };

  const nodeTypes = useMemo(
    () => ({
      networkNode: NetworkNode
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      networkEdge: NetworkEdge
    }),
    []
  );

  const onNodesChange = useCallback(
    (changes: NodeChange<AppNode>[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  useEffect(() => {
    setNodes(serverNodes);
  }, [serverNodes]);

  useEffect(() => {
    setEdges(serverEdges);
  }, [serverEdges]);

  const handleNodeClick = useCallback((event: MouseEvent, node: AppNode) => {
    event.preventDefault();
    setSelectedNodeId((currentId) => (currentId === node.id ? '' : node.id));
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId('');
  }, []);

  const getNodeStyle = useCallback(
    (node: AppNode) => ({
      opacity:
        !selectedNodeId || node.id === selectedNodeId
          ? opacity.active
          : opacity.inActive,
      z: 999
    }),
    [selectedNodeId, opacity.active, opacity.inActive]
  );

  const getEdgeStyle = useCallback(
    (edge: Edge) => {
      const isConnected =
        selectedNodeId &&
        (edge.source === selectedNodeId || edge.target === selectedNodeId);

      const edgeOpacity =
        !selectedNodeId || isConnected ? opacity.active : opacity.inActive;

      return {
        opacity: edgeOpacity
      };
    },
    [selectedNodeId, opacity.active, opacity.inActive]
  );

  if (nodesLoading || edgesLoading)
    return <Loader label={'Initializing Network...'} />;

  if (edgeError || nodesError)
    return (
      <Card className="w-[95%] mx-auto my-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {edgeError && nodesError
              ? nodesError + ' ' + edgeError
              : nodesError
              ? nodesError
              : edgeError}
          </AlertDescription>
        </Alert>
      </Card>
    );

  return (
    <ReactFlowProvider>
      <SearchNodes setSelectedNodeId={setSelectedNodeId} />
      <ReactFlow
        nodes={nodes?.map((node) => ({
          ...node,
          style: getNodeStyle(node)
        }))}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges?.map((edge) => ({
          ...edge,
          data: {
            ...edge.data,
            opacity: getEdgeStyle(edge).opacity
          },
          style: getEdgeStyle(edge)
        }))}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        fitView
        className="bg-black"
        proOptions={proOptions}
        maxZoom={10}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        style={{ background: 'transparent' }}
      >
        <MiniMap className="!bg-black" />
        <Controls className="text-black" />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default NetworkGraph;

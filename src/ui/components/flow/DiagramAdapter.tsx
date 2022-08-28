import { useRef, useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  Connection,
  EdgeChange,
  NodeChange,
  ReactFlowInstance,
  ReactFlowRefType,
} from 'react-flow-renderer';

import EndNode from './Nodes/EndNode';
import StartNode from './Nodes/StartNode';
import DepositNote from './Nodes/DepositNode';

let id = 0;
const getId = () => `node_${id++}`;
const nodeTypes = {
  start: StartNode,
  deposit: DepositNote,
  end: EndNode,
};

const DiagramAdapter = ({ nodes, setNodes, edges, setEdges }) => {
  const reactFlowWrapper = useRef<ReactFlowRefType>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

  useEffect(() => {
    id = nodes.length;
  }, [])


  const onInit = (_reactFlowInstance: ReactFlowInstance) => setReactFlowInstance(_reactFlowInstance);

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = event => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current!.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance!.project({
      x: event.clientX - reactFlowBounds!.left,
      y: event.clientY - reactFlowBounds!.top,
    });
    const nodeId = getId();

    const newNode = {
      id: nodeId,
      type,
      position,
      data: {},
    };

    setNodes(nodes.concat(newNode));
  };

  return (
    <div style={{ width: '100%', height: '100%' }} ref={reactFlowWrapper}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      />
    </div>
  );
};

export default DiagramAdapter;

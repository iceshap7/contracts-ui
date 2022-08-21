import { Handle, Position } from 'react-flow-renderer';

const StartNode = () => {
  return (
    <div className="c-node node-start">
      <div className="text-center">
        <strong>START</strong>
      </div>
      <Handle id="out" type="source" position={Position.Bottom} />
    </div>
  );
};

export default StartNode;

import { Handle, Position } from 'react-flow-renderer';

const EndNode = () => {
  return (
    <div className="c-node node-end">
      <div className="text-center">
        <strong>END</strong>
      </div>
      <Handle id="in" type="target" position={Position.Top} />
    </div>
  );
};

export default EndNode;

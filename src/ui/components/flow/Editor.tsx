import React, { useState } from 'react';

import "./styles.css";
import Sidebar from './Sidebar';
import DiagramAdapter from './DiagramAdapter';
import { PageFull } from 'ui/templates';
import { Edge, Node } from 'react-flow-renderer';

const Editor = () => {
  const initialNodes: Node[] = [];

  const initialEdges: Edge[] = [];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    <PageFull header="Create Own Contract" help={<>You can drag-drop for create own contract.</>}>
      <div className="grid grid-cols-4 gap-5">
        <div>
          <h2 className="text-xl font-semibold dark:text-white text-gray-700 capitalize mb-2">
            Components
          </h2>
          <div className="bg-white h-[700px]">
            <Sidebar />
          </div>
        </div>
        <div className="col-span-3">
          <h2 className="text-xl font-semibold dark:text-white text-gray-700 capitalize mb-2">
            Editor
          </h2>
          <div className="bg-white h-[700px]">
            <DiagramAdapter
              nodes={nodes}
              edges={edges}
              setNodes={setNodes}
              setEdges={setEdges}
            />
          </div>
        </div>
      </div>
    </PageFull>
  );
};

export default Editor;

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import './styles.css';
import Sidebar from './Sidebar';
import DiagramAdapter from './DiagramAdapter';
import { PageFull } from 'ui/templates';
import { Edge, Node } from 'react-flow-renderer';
import { EditorContext } from 'ui/contexts/EditorContext';

const Editor = () => {
  const initialNodes: Node[] = [
    {
      id: 'node_0',
      type: 'start',
      position: { x: 64.75, y: -105.5 },
      data: {},
    },
    {
      id: 'node_1',
      type: 'end',
      position: { x: 447.625, y: 190.5 },
      data: {},
    },
  ];

  const initialEdges: Edge[] = [];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [contract, setContract] = useState<string>('');
  const [isPublishProgressing, setIsPublishProgressing] = useState(false);
  const [isDownloadProgressing, setIsDownloadProgressing] = useState(false);
  const { code, setCode } = useContext(EditorContext);

  const saveTemplateHandle = () => {
    localStorage.setItem('nodes', JSON.stringify(nodes));
    localStorage.setItem('edges', JSON.stringify(edges));
  };

  const clearTemplateHandle = () => {
    localStorage.removeItem('nodes');
    localStorage.removeItem('edges');
    setNodes(initialNodes);
    setEdges(initialEdges);
    setContract('');
  };

  const contractPublishHandle = code => {
    setIsPublishProgressing(true);
    axios.post('http://localhost:3000/contracts', code).then(rs => {
      const { contract } = rs.data;
      setContract(contract);
      setIsPublishProgressing(false);
    });
  };

  const contractDownloadHandle = contract => {
    setIsDownloadProgressing(true);
    axios.get('http://localhost:3000/contracts/' + contract).then(rs => {
      const { downloadUrl } = rs.data;
      setIsDownloadProgressing(false);
      window.location.href = downloadUrl;
    });
  };

  useEffect(() => {
    const savedNodes = localStorage.getItem('nodes');
    const savedEdges = localStorage.getItem('edges');

    if (savedNodes) setNodes(JSON.parse(savedNodes));
    if (savedEdges) setEdges(JSON.parse(savedEdges));
  }, []);

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
          <div className="bg-white h-[700px] mb-[30px]">
            <DiagramAdapter nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
          </div>
          <div className="text-right">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-[10px]"
              onClick={saveTemplateHandle}
            >
              Save
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-[10px]"
              onClick={clearTemplateHandle}
            >
              Clear
            </button>
            {!contract && (
              <button
                disabled={isPublishProgressing}
                className="bg-violet-500 hover:bg-violet-700 disabled:opacity-25 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  contractPublishHandle(code);
                }}
              >
                {!isPublishProgressing && <>Publish</>}
                {isPublishProgressing && <>Please wait...</>}
              </button>
            )}
            {contract && (
              <button
                disabled={isDownloadProgressing}
                className="bg-violet-500 hover:bg-violet-700 disabled:opacity-25 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  contractDownloadHandle(contract);
                }}
              >
                {!isDownloadProgressing && <>Download</>}
                {isDownloadProgressing && <>Please wait...</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </PageFull>
  );
};

export default Editor;

import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
} from "react-flow-renderer";

import { UserCursor } from "../UserCursor";
import Sidebar from "./Sidebar";

import "./index.css";
import { useUsers } from "../../hooks/useUsers";
import { useUser } from "../../hooks/useUser";
import { yEdges, yNodes } from "../../y";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const { users } = useUsers();
  const {
    user: self,
    updateUserPoint,
    activateUser,
    deactivateUser,
  } = useUser();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(yNodes.toArray());
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useEffect(() => {
    yNodes.observeDeep(() => {
      setNodes(yNodes.toArray());
    });
    yEdges.observeDeep(() => {
      setEdges(yEdges.toArray());
    });
  }, [yNodes, yEdges]);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
    yEdges.set("edges", edges);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      yNodes.push([newNode]);

      setNodes(yNodes.toArray());
    },
    [reactFlowInstance]
  );

  const handlePointerMove = useCallback((e) => {
    updateUserPoint([e.clientX, e.clientY]);
  });

  return (
    <div
      className="dndflow"
      onPointerMove={handlePointerMove}
      style={{ heigh: 960 }}
    >
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Background gap={24} />
          </ReactFlow>
        </div>
        <Sidebar />
        {users
          ?.filter((user) => user.id !== self.id)
          ?.map((other) => (
            <UserCursor key={other.id} user={other} />
          ))}
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;

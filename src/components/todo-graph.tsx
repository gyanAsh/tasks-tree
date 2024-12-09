"use client";

import { useState, useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  EdgeChange,
  NodeChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Todo {
  id: string;
  text: string;
}

const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Start Project" } },
];

const initialEdges: Edge[] = [];

export default function TodoGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Start Project" },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [parentId, setParentId] = useState("");

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newId = (nodes.length + 1).toString();
    const newNode: Node = {
      id: newId,
      data: { label: newTodo },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };

    setNodes((nds) => nds.concat(newNode));
    setTodos((prevTodos) => [...prevTodos, { id: newId, text: newTodo }]);

    if (parentId) {
      const newEdge: Edge = {
        id: `e${parentId}-${newId}`,
        source: parentId,
        target: newId,
      };
      setEdges((eds) => eds.concat(newEdge));
    }

    setNewTodo("");
    setParentId("");
  };

  return (
    <div className="h-[600px] rounded-lg border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
      </ReactFlow>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">Add Todo</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Todo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="todo" className="text-right">
                Todo
              </Label>
              <Input
                id="todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parent" className="text-right">
                Parent Todo
              </Label>
              <select
                id="parent"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                className="col-span-3 rounded border p-2"
              >
                <option value="">No Parent</option>
                {todos.map((todo) => (
                  <option key={todo.id} value={todo.id}>
                    {todo.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button onClick={addTodo}>Add Todo</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

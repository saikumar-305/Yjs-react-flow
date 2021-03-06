import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

// Create the doc
export const doc = new Y.Doc();

// Create a websocket provider (but don't connect just yet)
export const provider = new WebsocketProvider(
  "wss://demos.yjs.dev",
  `demo-flow-yjs-test`,
  doc
);

// Export the provider's awareness API
export const awareness = provider.awareness;

// Get a shared array of our nodes and edges
export const yNodes = doc.getArray("all--nodes");
export const yEdges = doc.getArray("all--edges");

// Create an undo manager for the line maps
export const undoManager = new Y.UndoManager(yNodes);

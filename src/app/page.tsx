import TodoGraph from "@/components/todo-graph";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Todo Graph</h1>
      <TodoGraph />
    </main>
  );
}

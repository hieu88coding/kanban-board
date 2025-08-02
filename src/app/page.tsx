import { Board } from "@/components/Board";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-4 sm:p-8 bg-gray-50">
      <main className="w-full h-full">
        <Board />
      </main>
    </div>
  );
}

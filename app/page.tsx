import Code from "@/components/Code";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center flex-col">
      <h1>Code Share</h1>
      <Code placeHolder="Share some code here" />
    </main>
  );
}

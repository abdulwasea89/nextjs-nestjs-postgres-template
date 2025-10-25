import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
            StackMind
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            AI Technical Strategist
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Feed a project brief and get a trusted, auditable, deployable tech strategy: stack recommendation, architecture diagram, folder + Docker + CI starter repo, cost & maintenance estimate, and migration notes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/new-project">
              <Button size="lg">
                Start Your Tech Strategy
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

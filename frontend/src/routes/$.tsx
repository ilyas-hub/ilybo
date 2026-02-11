import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-primary px-4 text-center">
      <div className="mx-auto max-w-md">
        <p className="mb-2 text-7xl font-black text-secondary">404</p>
        <h1 className="mb-4 text-3xl font-black tracking-tight text-black sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mb-8 text-lg text-black/70">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 font-bold text-white transition-colors hover:bg-secondary/90"
        >
          Go Home
        </Link>
      </div>
    </section>
  )
}

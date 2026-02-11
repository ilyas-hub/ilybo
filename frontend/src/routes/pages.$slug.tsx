import { createFileRoute } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import DOMPurify from 'dompurify'
import { usePage } from '@/features/cms'

export const Route = createFileRoute('/pages/$slug')({
  component: DynamicPage,
})

function DynamicPage() {
  const { slug } = Route.useParams()
  const { data, isLoading, error } = usePage(slug)

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (error || !data?.data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
      </div>
    )
  }

  const page = data.data

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1>{page.title}</h1>
        {page.contentFormat === 'markdown' ? (
          <ReactMarkdown>{page.content}</ReactMarkdown>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.content) }} />
        )}
      </article>
    </div>
  )
}

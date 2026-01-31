import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Globe,
  FileText,
  Send,
  Archive,
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/lib/ui'
import type { Page, PageStatus, PageType } from '../types'
import { useDeletePage, usePublishPage, useUpdatePage } from '../hooks/use-pages'

interface PagesTableProps {
  pages: Page[]
  onEdit: (page: Page) => void
  isLoading?: boolean
}

const statusVariants: Record<PageStatus, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
  draft: 'secondary',
  published: 'success',
  archived: 'warning',
}

const typeLabels: Record<PageType, string> = {
  legal: 'Legal',
  content: 'Content',
  landing: 'Landing',
  custom: 'Custom',
}

export function PagesTable({ pages, onEdit, isLoading }: PagesTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const deletePage = useDeletePage()
  const publishPage = usePublishPage()
  const updatePage = useUpdatePage()

  const handleDelete = async () => {
    if (deleteId) {
      await deletePage.mutateAsync(deleteId)
      setDeleteId(null)
    }
  }

  const handlePublish = async (id: string) => {
    await publishPage.mutateAsync(id)
  }

  const handleArchive = async (id: string) => {
    await updatePage.mutateAsync({ id, data: { status: 'archived' } })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    )
  }

  if (pages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center"
      >
        <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-semibold">No pages yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Create your first page to get started.
        </p>
      </motion.div>
    )
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page, index) => (
              <motion.tr
                key={page._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {page.showInNavigation && (
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium">{page.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="rounded bg-muted px-2 py-1 text-xs">
                    /{page.slug}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{typeLabels[page.type]}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariants[page.status]}>
                    {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(page.updatedAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => window.open(`/pages/${page.slug}`, '_blank')}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(page)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {page.status === 'draft' && (
                        <DropdownMenuItem onClick={() => handlePublish(page._id)}>
                          <Send className="mr-2 h-4 w-4" />
                          Publish
                        </DropdownMenuItem>
                      )}
                      {page.status === 'published' && (
                        <DropdownMenuItem onClick={() => handleArchive(page._id)}>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setDeleteId(page._id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this page? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

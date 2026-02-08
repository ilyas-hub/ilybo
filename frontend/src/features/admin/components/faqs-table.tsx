import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Card,
  CardContent,
  Badge,
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/lib/ui'
import { Pencil, Trash2, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useFAQs, useDeleteFAQ } from '../hooks/use-faqs'
import { FAQFormDialog } from './faq-form-dialog'
import type { FAQ } from '../types'

export function FAQsTable() {
  const [page, setPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data, isLoading } = useFAQs({ page, limit: 20 })
  const deleteFAQ = useDeleteFAQ()

  const faqs = data?.data || []
  const pagination = data?.pagination

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq)
    setIsFormOpen(true)
  }

  const handleCreate = () => {
    setEditingFAQ(null)
    setIsFormOpen(true)
  }

  const handleDelete = async () => {
    if (deleteId) {
      await deleteFAQ.mutateAsync(deleteId)
      setDeleteId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <HelpCircle className="h-5 w-5" />
            FAQs
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage frequently asked questions displayed on the website
          </p>
        </div>
        <Button onClick={handleCreate}>Add FAQ</Button>
      </div>

      <div className="space-y-3">
        {faqs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center"
          >
            <HelpCircle className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-medium text-muted-foreground">No FAQs found</p>
            <p className="mt-1 text-sm text-muted-foreground/70">
              Add your first FAQ to get started
            </p>
          </motion.div>
        ) : (
          faqs.map((faq, index) => (
            <motion.div
              key={faq._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{faq.question}</h3>
                        <Badge variant={faq.isActive ? 'success' : 'secondary'}>
                          {faq.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {faq.answer}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground/60">
                        Order: {faq.order}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(faq)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setDeleteId(faq._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            {page} / {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <FAQFormDialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open)
          if (!open) setEditingFAQ(null)
        }}
        faq={editingFAQ}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete FAQ</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this FAQ? This action cannot be undone.
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
    </div>
  )
}

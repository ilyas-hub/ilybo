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
import { Pencil, Trash2, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTestimonials, useDeleteTestimonial } from '../hooks/use-testimonials'
import { TestimonialFormDialog } from './testimonial-form-dialog'
import type { Testimonial } from '../types'

export function TestimonialsTable() {
  const [page, setPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data, isLoading } = useTestimonials({ page, limit: 20 })
  const deleteTestimonial = useDeleteTestimonial()

  const testimonials = data?.data || []
  const pagination = data?.pagination

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setIsFormOpen(true)
  }

  const handleCreate = () => {
    setEditingTestimonial(null)
    setIsFormOpen(true)
  }

  const handleDelete = async () => {
    if (deleteId) {
      await deleteTestimonial.mutateAsync(deleteId)
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
            <Quote className="h-5 w-5" />
            Testimonials
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage client testimonials displayed on the website
          </p>
        </div>
        <Button onClick={handleCreate}>Add Testimonial</Button>
      </div>

      <div className="space-y-3">
        {testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center"
          >
            <Quote className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-medium text-muted-foreground">No testimonials found</p>
            <p className="mt-1 text-sm text-muted-foreground/70">
              Add your first testimonial to get started
            </p>
          </motion.div>
        ) : (
          testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                        {testimonial.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <Badge variant={testimonial.isActive ? 'success' : 'secondary'}>
                            {testimonial.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground/80">
                          "{testimonial.review}"
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground/60">
                          Order: {testimonial.order}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setDeleteId(testimonial._id)}
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

      <TestimonialFormDialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open)
          if (!open) setEditingTestimonial(null)
        }}
        testimonial={editingTestimonial}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
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

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  Textarea,
  Label,
  Switch,
} from '@/lib/ui'
import { useCreateTestimonial, useUpdateTestimonial } from '../hooks/use-testimonials'
import type { Testimonial } from '../types'

interface TestimonialFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testimonial: Testimonial | null
}

export function TestimonialFormDialog({ open, onOpenChange, testimonial }: TestimonialFormDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    initials: '',
    review: '',
    order: 0,
    isActive: true,
  })

  const createTestimonial = useCreateTestimonial()
  const updateTestimonial = useUpdateTestimonial()

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        company: testimonial.company,
        initials: testimonial.initials,
        review: testimonial.review,
        order: testimonial.order,
        isActive: testimonial.isActive,
      })
    } else {
      setFormData({ name: '', company: '', initials: '', review: '', order: 0, isActive: true })
    }
  }, [testimonial, open])

  const handleNameChange = (name: string) => {
    const initials = name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
    setFormData((prev) => ({ ...prev, name, initials }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (testimonial) {
      await updateTestimonial.mutateAsync({ id: testimonial._id, data: formData })
    } else {
      await createTestimonial.mutateAsync(formData)
    }
    onOpenChange(false)
  }

  const isPending = createTestimonial.isPending || updateTestimonial.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{testimonial ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                placeholder="Acme Inc"
                required
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="initials">Initials</Label>
              <Input
                id="initials"
                value={formData.initials}
                onChange={(e) => setFormData((prev) => ({ ...prev, initials: e.target.value }))}
                placeholder="JD"
                maxLength={3}
                required
              />
              <p className="text-xs text-muted-foreground">Auto-generated from name</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData((prev) => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="review">Review</Label>
            <Textarea
              id="review"
              value={formData.review}
              onChange={(e) => setFormData((prev) => ({ ...prev, review: e.target.value }))}
              placeholder="Enter the testimonial review"
              rows={4}
              required
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : testimonial ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

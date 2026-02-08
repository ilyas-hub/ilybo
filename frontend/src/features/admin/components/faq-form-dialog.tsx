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
import { useCreateFAQ, useUpdateFAQ } from '../hooks/use-faqs'
import type { FAQ } from '../types'

interface FAQFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  faq: FAQ | null
}

export function FAQFormDialog({ open, onOpenChange, faq }: FAQFormDialogProps) {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
    isActive: true,
  })

  const createFAQ = useCreateFAQ()
  const updateFAQ = useUpdateFAQ()

  useEffect(() => {
    if (faq) {
      setFormData({
        question: faq.question,
        answer: faq.answer,
        order: faq.order,
        isActive: faq.isActive,
      })
    } else {
      setFormData({ question: '', answer: '', order: 0, isActive: true })
    }
  }, [faq, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (faq) {
      await updateFAQ.mutateAsync({ id: faq._id, data: formData })
    } else {
      await createFAQ.mutateAsync(formData)
    }
    onOpenChange(false)
  }

  const isPending = createFAQ.isPending || updateFAQ.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{faq ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              value={formData.question}
              onChange={(e) => setFormData((prev) => ({ ...prev, question: e.target.value }))}
              placeholder="Enter the question"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              value={formData.answer}
              onChange={(e) => setFormData((prev) => ({ ...prev, answer: e.target.value }))}
              placeholder="Enter the answer"
              rows={4}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData((prev) => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : faq ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

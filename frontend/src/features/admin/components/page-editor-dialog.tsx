import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Eye, Code, FileText } from 'lucide-react'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
} from '@/lib/ui'
import type { Page, PageType, PageStatus, ContentFormat, CreatePageInput, UpdatePageInput } from '../types'
import { useCreatePage, useUpdatePage } from '../hooks/use-pages'

interface PageEditorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  page?: Page | null
}

const pageTypes: { value: PageType; label: string }[] = [
  { value: 'content', label: 'Content' },
  { value: 'legal', label: 'Legal' },
  { value: 'landing', label: 'Landing' },
  { value: 'custom', label: 'Custom' },
]

const pageStatuses: { value: PageStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
]

const contentFormats: { value: ContentFormat; label: string }[] = [
  { value: 'markdown', label: 'Markdown' },
  { value: 'html', label: 'HTML' },
]

export function PageEditorDialog({ open, onOpenChange, page }: PageEditorDialogProps) {
  const [formData, setFormData] = useState<CreatePageInput>({
    slug: '',
    title: '',
    content: '',
    contentFormat: 'markdown',
    type: 'content',
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
    showInNavigation: false,
  })

  const createPage = useCreatePage()
  const updatePage = useUpdatePage()
  const isEditing = !!page

  useEffect(() => {
    if (page) {
      setFormData({
        slug: page.slug,
        title: page.title,
        content: page.content,
        contentFormat: page.contentFormat,
        type: page.type,
        status: page.status,
        metaTitle: page.metaTitle || '',
        metaDescription: page.metaDescription || '',
        showInNavigation: page.showInNavigation,
      })
    } else {
      setFormData({
        slug: '',
        title: '',
        content: '',
        contentFormat: 'markdown',
        type: 'content',
        status: 'draft',
        metaTitle: '',
        metaDescription: '',
        showInNavigation: false,
      })
    }
  }, [page, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing && page) {
      await updatePage.mutateAsync({ id: page._id, data: formData as UpdatePageInput })
    } else {
      await createPage.mutateAsync(formData)
    }

    onOpenChange(false)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title),
    }))
  }

  const isLoading = createPage.isPending || updatePage.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {isEditing ? 'Edit Page' : 'Create New Page'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="content" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">
                <Code className="mr-2 h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="settings">
                <FileText className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="seo">
                <Eye className="mr-2 h-4 w-4" />
                SEO
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Page title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">/</span>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="page-slug"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Content</Label>
                  <Select
                    value={formData.contentFormat}
                    onValueChange={(value: ContentFormat) =>
                      setFormData(prev => ({ ...prev, contentFormat: value }))
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder={
                    formData.contentFormat === 'markdown'
                      ? '# Heading\n\nYour content here...'
                      : '<h1>Heading</h1>\n<p>Your content here...</p>'
                  }
                  className="min-h-[300px] font-mono text-sm"
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="type">Page Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: PageType) =>
                      setFormData(prev => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {pageTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: PageStatus) =>
                      setFormData(prev => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {pageStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show in Navigation</Label>
                  <p className="text-sm text-muted-foreground">
                    Display this page in the site navigation menu
                  </p>
                </div>
                <Switch
                  checked={formData.showInNavigation}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, showInNavigation: checked }))
                  }
                />
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                  placeholder="SEO title (optional)"
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to use the page title
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  placeholder="Brief description for search engines"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended length: 150-160 characters
                </p>
              </div>

              <Separator />

              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Search Preview
                </p>
                <div className="space-y-1">
                  <p className="text-lg text-blue-600">
                    {formData.metaTitle || formData.title || 'Page Title'}
                  </p>
                  <p className="text-sm text-green-700">
                    yoursite.com/{formData.slug || 'page-slug'}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {formData.metaDescription || 'Page description will appear here...'}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Saving...
                  </>
                ) : isEditing ? (
                  'Save Changes'
                ) : (
                  'Create Page'
                )}
              </Button>
            </motion.div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

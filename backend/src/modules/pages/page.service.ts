import { Page, type IPage, type PageStatus, type IPageVersion } from './page.model.js'
import { NotFoundError, ConflictError } from '../../utils/index.js'
import type { CreatePageInput, UpdatePageInput } from './page.validation.js'

const MAX_VERSIONS = 10

export async function findAllPages(
  status?: PageStatus
): Promise<IPage[]> {
  const query = status ? { status } : {}
  return Page.find(query).select('-versions').sort({ createdAt: -1 })
}

export async function findPageBySlug(slug: string): Promise<IPage> {
  const page = await Page.findOne({ slug, status: 'published' })
  if (!page) {
    throw new NotFoundError('Page not found')
  }
  return page
}

export async function findPageById(id: string): Promise<IPage> {
  const page = await Page.findById(id)
  if (!page) {
    throw new NotFoundError('Page not found')
  }
  return page
}

export async function createPage(
  data: CreatePageInput,
  userId: string
): Promise<IPage> {
  const existingPage = await Page.findOne({ slug: data.slug })
  if (existingPage) {
    throw new ConflictError('A page with this slug already exists')
  }

  const page = await Page.create({
    ...data,
    currentVersion: 1,
    versions: [
      {
        version: 1,
        title: data.title,
        content: data.content,
        createdAt: new Date(),
        createdBy: userId,
      },
    ],
    createdBy: userId,
  })

  return page
}

export async function updatePage(
  id: string,
  data: UpdatePageInput,
  userId: string
): Promise<IPage> {
  const page = await Page.findById(id)
  if (!page) {
    throw new NotFoundError('Page not found')
  }

  // Check slug uniqueness on update
  if (data.slug && data.slug !== page.slug) {
    const existingPage = await Page.findOne({ slug: data.slug })
    if (existingPage) {
      throw new ConflictError('A page with this slug already exists')
    }
    page.slug = data.slug
  }

  // Track if content changed for versioning
  const contentChanged = data.title !== page.title || data.content !== page.content

  // Update fields
  if (data.title) page.title = data.title
  if (data.content) page.content = data.content
  if (data.contentFormat) page.contentFormat = data.contentFormat
  if (data.type) page.type = data.type
  if (data.status) page.status = data.status
  if (data.metaTitle !== undefined) page.metaTitle = data.metaTitle
  if (data.metaDescription !== undefined) page.metaDescription = data.metaDescription
  if (data.showInNavigation !== undefined) page.showInNavigation = data.showInNavigation

  // Add new version if content changed
  if (contentChanged && (data.title || data.content)) {
    page.currentVersion += 1
    page.versions.push({
      version: page.currentVersion,
      title: page.title,
      content: page.content,
      createdAt: new Date(),
      createdBy: userId as unknown as typeof page.createdBy,
    })

    // Keep only last MAX_VERSIONS
    if (page.versions.length > MAX_VERSIONS) {
      page.versions = page.versions.slice(-MAX_VERSIONS)
    }
  }

  await page.save()
  return page
}

export async function deletePage(id: string): Promise<void> {
  const page = await Page.findByIdAndDelete(id)
  if (!page) {
    throw new NotFoundError('Page not found')
  }
}

export async function publishPage(id: string): Promise<IPage> {
  const page = await Page.findByIdAndUpdate(
    id,
    { status: 'published' },
    { new: true }
  )
  if (!page) {
    throw new NotFoundError('Page not found')
  }
  return page
}

export async function getVersionHistory(id: string): Promise<IPageVersion[]> {
  const page = await Page.findById(id).select('versions')
  if (!page) {
    throw new NotFoundError('Page not found')
  }
  return page.versions.slice().reverse() // Most recent first
}

export async function revertToVersion(
  id: string,
  version: number,
  userId: string
): Promise<IPage> {
  const page = await Page.findById(id)
  if (!page) {
    throw new NotFoundError('Page not found')
  }

  const versionToRevert = page.versions.find((v) => v.version === version)
  if (!versionToRevert) {
    throw new NotFoundError('Version not found')
  }

  // Create new version with reverted content
  page.title = versionToRevert.title
  page.content = versionToRevert.content
  page.currentVersion += 1
  page.versions.push({
    version: page.currentVersion,
    title: versionToRevert.title,
    content: versionToRevert.content,
    createdAt: new Date(),
    createdBy: userId as unknown as typeof page.createdBy,
  })

  // Keep only last MAX_VERSIONS
  if (page.versions.length > MAX_VERSIONS) {
    page.versions = page.versions.slice(-MAX_VERSIONS)
  }

  await page.save()
  return page
}

function generate(organizationName: string): string {
  const organizationSlug = organizationName
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/_/g, '-')
    .replace(/--+/g, '-')
    .replace(/-$/g, '')
  const randomEndOfSlug = Math.ceil(Math.random() * 1000)
  return organizationSlug.concat(randomEndOfSlug.toString())
}

export const OrganizationSlug = {
  generate,
}

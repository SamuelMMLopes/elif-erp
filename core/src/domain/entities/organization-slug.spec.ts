import { describe, expect, it } from 'bun:test'

import { OrganizationSlug } from './organization-slug'

describe('OrganizationSlug', () => {
  it('should be able to generate a valid organization slug', () => {
    const organizationSlug = OrganizationSlug.generate('Samuel Company')
    expect(organizationSlug).toStartWith('samuel-company')
    expect(organizationSlug).not.toEndWith('company')
  })
})

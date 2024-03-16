import {
  InMemoryOrganizationRepository,
  InMemoryUserRepository,
} from '@test/repositories/in-memory'
import { beforeEach, describe, expect, it } from 'bun:test'

import { Organization } from '@/domain/entities'
import { CustomError } from '@/shared/errors'

import { RegisterUserUseCase } from './register'

describe('RegisterUserUseCase', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let inMemoryOrganizationRepository: InMemoryOrganizationRepository
  let sut: RegisterUserUseCase

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()

    await inMemoryOrganizationRepository.create(
      Organization.restore({
        id: 'organization_id',
        name: 'Any Organization',
        email: 'organization@domain.com',
        document: 'any_document',
      }),
    )

    sut = new RegisterUserUseCase(
      inMemoryUserRepository,
      inMemoryOrganizationRepository,
    )
  })

  it('should be able to register a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@domain.com',
      username: 'johndoe',
      organizationId: 'organization_id',
    })
    expect(result.isRight()).toBeTrue()
    expect(result.value).toEqual({ id: inMemoryUserRepository.users[0].id })
  })

  it('should return an error when trying to register a user as owner and already hear a registered owner', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@domain.com',
      username: 'johndoe',
      organizationId: 'organization_id',
      isOrganizationOwner: true,
    })
    const result = await sut.execute({
      name: 'Other User',
      email: 'otheruser@domain.com',
      username: 'other-user',
      organizationId: 'organization_id',
      isOrganizationOwner: true,
    })
    expect(result.isLeft()).toBeTrue()
    expect(result.value).toEqual([
      new CustomError('The organization already has an owner'),
    ])
  })
})

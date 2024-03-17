import type { OrganizationDao, UserDao } from '@/application/contracts/daos'
import type { SellerRepository } from '@/application/contracts/repositories/seller'
import { Seller, type SellerType } from '@/domain/entities'
import { type Either, left, right } from '@/shared/core'
import { CustomError, ResourceNotFoundError } from '@/shared/errors'

type Input = {
  userId: string
  organizationId: string
  type: SellerType
  document: string
}

type Output = Either<CustomError[], { id: string }>

export class RegisterSellerUseCase {
  constructor(
    private readonly sellerRepository: SellerRepository,
    private readonly userDao: UserDao,
    private readonly organizationDao: OrganizationDao,
  ) {}

  async execute({
    userId,
    organizationId,
    type,
    document,
  }: Input): Promise<Output> {
    const user = await this.userDao.findById(userId)
    if (!user) {
      return left([new ResourceNotFoundError('user')])
    }
    const organization = await this.organizationDao.findById(organizationId)
    if (!organization) {
      return left([new ResourceNotFoundError('organization')])
    }
    const sellerWithSameUserId = await this.sellerRepository.findByUserId({
      userId,
      organizationId,
    })
    if (sellerWithSameUserId) {
      return left([new CustomError('Seller already exists')])
    }
    const sellerOrErrors = Seller.create({
      userId,
      organizationId,
      type,
      document,
    })
    if (sellerOrErrors.isLeft()) {
      return left(sellerOrErrors.value)
    }
    await this.sellerRepository.create(sellerOrErrors.value)
    return right({ id: sellerOrErrors.value.id })
  }
}

import type { AuthCode } from '@/domain/entities'

export interface AuthCodeRepository {
  create: (authCode: AuthCode) => Promise<void>
  findByCode: (code: string) => Promise<AuthCode | null>
  deleteByCode: (code: string) => Promise<void>
}

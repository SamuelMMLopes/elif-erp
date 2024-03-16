import { eq } from 'drizzle-orm'

import type { AuthCodeRepository } from '@/application/contracts/repositories'
import { AuthCode } from '@/domain/entities'
import { db } from '@/infra/database/connection'
import { authCodes } from '@/infra/database/schema'

export class DrizzleAuthCodeRepository implements AuthCodeRepository {
  async create(authCode: AuthCode): Promise<void> {
    await db.insert(authCodes).values(authCode)
  }

  async findByCode(code: string = ''): Promise<AuthCode | null> {
    const rawAuthCode = await db.query.authCodes.findFirst({
      where(fields, { eq }) {
        return eq(fields.code, code)
      },
    })
    if (!rawAuthCode) {
      return null
    }
    return AuthCode.restore(rawAuthCode)
  }

  async deleteByCode(code: string = ''): Promise<void> {
    await db.delete(authCodes).where(eq(authCodes.code, code))
  }
}

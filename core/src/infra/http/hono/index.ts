import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

import type { Hono } from 'hono'

export async function setupHono(app: Hono): Promise<void> {
  const files = await readdir(join(__dirname, './routes'))
  await Promise.all(
    files
      .filter((file) => !file.endsWith('.map'))
      .map(async (file) => {
        const fileWithoutExtension = file.replace(/\.[^.]+$/, '')
        app.route(
          `/${fileWithoutExtension}`,
          (await import(`./routes/${file}`)).default,
        )
      }),
  )
}

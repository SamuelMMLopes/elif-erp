const ORGANIZATION_CREATED = 'organization-created'
const USER_CREATED = 'user-created'

export const exchanges = {
  ORGANIZATION_CREATED,
  USER_CREATED,
}

const SEND_USER_WELCOME_EMAIL = 'send-user-welcome-email'
const SEND_ORGANIZATION_WELCOME_EMAIL = 'send-organization-welcome-email'
const CREATE_ORGANIZATION_IN_SALES = 'create-organization-in-sales'
const CREATE_USER_IN_SALES = 'create-user-in-sales'

export const queues = {
  SEND_USER_WELCOME_EMAIL,
  SEND_ORGANIZATION_WELCOME_EMAIL,
  CREATE_ORGANIZATION_IN_SALES,
  CREATE_USER_IN_SALES,
}

export const binds = [
  [CREATE_ORGANIZATION_IN_SALES, ORGANIZATION_CREATED],
  [SEND_ORGANIZATION_WELCOME_EMAIL, ORGANIZATION_CREATED],
  [CREATE_USER_IN_SALES, USER_CREATED],
  [SEND_USER_WELCOME_EMAIL, USER_CREATED],
]

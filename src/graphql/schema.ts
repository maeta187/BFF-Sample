import { builder } from '@/graphql/builder.js'
import '@/graphql/modules/user-profile.js'
import '@/graphql/modules/user.js'

// 実処理は module 側にある
export const schema = builder.toSchema()

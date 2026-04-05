import {
  fetchBackendUserById,
  type BackendUserDto
} from '@/clients/mock-backend/user-client.js'
import { builder } from '@/graphql/builder.js'
import { formatAsJapaneseDate } from '@/utils/date.js'
import { isDormant, toMembershipLabel } from '@/utils/user-profile.js'

interface UserProfileShape {
  id: string
  displayName: string
  email: string
  birthday: string | null
  membershipLabel: string
  isDormant: boolean
  lastLoginAt: string | null
}

// UserProfileShape を土台にした GraphQL オブジェクト型の参照
const UserProfile = builder.objectRef<UserProfileShape>('UserProfile')

// その型が持つ GraphQL フィールドを実際に公開
UserProfile.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    displayName: t.exposeString('displayName'),
    email: t.exposeString('email'),
    birthday: t.exposeString('birthday', { nullable: true }),
    membershipLabel: t.exposeString('membershipLabel'),
    isDormant: t.exposeBoolean('isDormant'),
    lastLoginAt: t.exposeString('lastLoginAt', { nullable: true })
  })
})

function mapBackendUserToProfile(dto: BackendUserDto): UserProfileShape {
  return {
    id: dto.user_id,
    displayName: `${dto.first_name} ${dto.last_name}`,
    email: dto.email_address ?? 'unknown@example.com',
    birthday: formatAsJapaneseDate(dto.birthday_at),
    membershipLabel: toMembershipLabel(dto.tier_code),
    isDormant: isDormant(dto.last_login_at),
    lastLoginAt: dto.last_login_at
  }
}

builder.queryFields((t) => ({
  userProfile: t.field({
    type: UserProfile,
    nullable: true,
    args: {
      id: t.arg.id({ required: true })
    },
    resolve: async (_parent, args) => {
      const dto = await fetchBackendUserById(args.id.toString())

      if (!dto) {
        return null
      }

      return mapBackendUserToProfile(dto)
    }
  })
}))

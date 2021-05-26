export interface sessionToken {
  token: string | null
}

export interface UserInfo {
  active?: boolean
  email: string
  phone?: string | null
  qq?: string | null
  uuid?: string
  vip_vaild?: string
}

export interface sessionToken {
  token: string | null
}

export interface UserInfo {
  email: string
  username: string
  uuid: string
  active: boolean
  phone?: string | null
  qq?: string | null
  vip_vaild?: string
  avatar?: string | null
  nick_name?: string | null
}

export interface UrlList {
  original_url: string
  short_url: string
  url_id: number
  starttime: number
  endtime: number
  permemt: boolean
  status: number
}

export interface Modals {
  onFinish: Function
  isModalVisible: boolean
  setIsModalVisible: Function
  urlId?: number
}

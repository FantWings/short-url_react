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
  avatar?: string
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

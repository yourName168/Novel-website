import { ObjectId } from 'mongodb'

enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}

interface UserType {
  name: string
  email: string
  password: string
  username: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  avatar?: string
}

class User {
  private name: string
  private email: string
  private password: string
  private created_at: Date
  private updated_at: Date
  private email_verify_token: string
  private forgot_password_token: string
  private verify: UserVerifyStatus
  private username: string
  private avatar: string

  constructor(user: UserType) {
    this.username = user.username
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.created_at = user.created_at || new Date()
    this.updated_at = user.updated_at || new Date()
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.avatar = user.avatar || ''
  }
}

export default User

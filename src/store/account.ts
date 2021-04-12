import { observable, action } from 'mobx'
import { message } from 'antd'
import { IUserInfo } from '@/model/common'
class AccountStore {
	// token
	@observable
	token: string = sessionStorage.getItem('token') || ''

	// 账户信息
	@observable
	accountInfo: IUserInfo = { roles: [], permission: [] }

	@action
	setToken(value: string) {
		this.token = value
		sessionStorage.setItem('token', value)
	}

	@action
	setAccountInfo(value: IUserInfo) {
		this.accountInfo = value
	}

	/**
	 * 权限检查
	 * @param {Number} id 权限id
	 * @param {boolean} showMsg 无权限时是否显示提示信息
	 */
	public checkPermission(id: number, showMsg: boolean = true): boolean {
		const existing = this.accountInfo.permission.some(item => item.id === id)
		if (!existing && showMsg) {
			message.error('没有该权限')
		}
		return existing
	}
}

export default new AccountStore()

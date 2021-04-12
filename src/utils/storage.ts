import { tupleStr } from '@/utils/core'

// 项目中所有存在localStorage中的数据的名称
const keyName = tupleStr(
	// 支付方式。 all:还所有，day：还某天，month：还某月
	'payment_mode'
)

type keyName = typeof keyName[number]

class Storage {
	setItem(keyName: keyName, value: any) {
		localStorage.setItem(keyName, JSON.stringify(value))
	}

	getItem(keyName: keyName) {
		const result = localStorage.getItem(keyName) || ''
		try {
			return JSON.parse(result)
		} catch (err) {
			return result
		}
	}

	removeItem(keyName: keyName) {
		localStorage.removeItem(keyName)
	}

	clear() {
		localStorage.clear()
	}

	key(index: number) {
		return localStorage.key(index) as keyName
	}

	// 获取所有数据的名称
	keys() {
		return Array.from({ length: localStorage.length }).map((item, index) => this.key(index))
	}

	// 获取所有数据
	getAll() {
		return Object.fromEntries(this.keys().map(item => [item, this.getItem(item)]))
	}
}

const storage = new Storage()

export default storage

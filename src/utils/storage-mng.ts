import { tupleStr } from '@/utils/core'

// 项目中所有存储在localStorage中的数据的名称
const localKeyName = tupleStr(
	// 还款方式。 free:自由还，day：按天还，month：按月还
	'repay_mode',
	// 当前店铺信息
	'cur_shop',
	// 是否展示赊账会员详情中当前欠款的指引。true：显示，false：隐藏
	'debt_guide_visible'
)

// 项目中所有存春在sessionStorage中的数据的名称
const sessionKeyName = tupleStr()

type localKeyName = typeof localKeyName[number]
type sessionKeyName = typeof sessionKeyName[number]
type keyName = localKeyName | sessionKeyName

class StorageMng {
	// key名称前缀
	private prefix: string
	// 使用localStorage还是sessionStorage
	private mode: Storage

	constructor(mode: Storage, prefix: string = '') {
		this.prefix = prefix
		this.mode = mode
	}

	public setItem(keyName: keyName, value: any) {
		try {
			this.mode.setItem(`${this.prefix}${keyName}`, JSON.stringify(value))
		} catch (err) {
			console.error('Storage set error', err)
		}
	}

	public getItem(keyName: keyName) {
		const result = this.mode.getItem(`${this.prefix}${keyName}`) || ''
		try {
			return JSON.parse(result)
		} catch (err) {
			console.warn('Storage set error', err)
			return result
		}
	}

	public removeItem(keyName: keyName) {
		this.mode.removeItem(`${this.prefix}${keyName}`)
	}

	public clear() {
		this.mode.clear()
	}

	public getKey(index: number) {
		return this.getKeys()[index]
	}

	// 获取所有数据的名称
	public getKeys() {
		const keys: keyName[] = []
		Array.from({ length: this.mode.length }).forEach((item, index) => {
			const keyName = this.mode.key(index)
			if (keyName?.startsWith(this.prefix)) {
				keys.push(keyName.slice(this.prefix.length) as keyName)
			}
		})
		return keys
	}

	// 获取所有数据
	public getAll() {
		return Object.fromEntries(this.getKeys().map(keyName => [keyName, this.getItem(keyName)]))
	}
}

const localMng = new StorageMng(localStorage)
const sessionMng = new StorageMng(sessionStorage)

export { StorageMng, localMng, sessionMng }

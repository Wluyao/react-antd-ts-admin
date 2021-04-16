interface ICachedData {
	data: any
	timer?: number
	startTime: number
}

class Cache {
	caches = new Map<string, ICachedData>()

	setItem(key: string, data: any, cacheTime: number = 0) {
		const currentCache = this.caches.get(key)
		if (currentCache?.timer) {
			clearTimeout(currentCache.timer)
		}
		let timer
		if (cacheTime > -1) {
			timer = setTimeout(() => {
				this.caches.delete(key)
			}, cacheTime)
		}
		this.caches.set(key, {
			data,
			timer,
			startTime: new Date().getTime()
		})
	}

	getItem(key: string) {
		const currentCache = this.caches.get(key)
		if (currentCache?.data) {
			return currentCache.data
		}
	}

	removeItem = (key: string) => {
		const currentCache = this.caches.get(key)
		if (currentCache) {
			clearTimeout(currentCache.timer)
			this.caches.delete(key)
		}
	}
}

const cache = new Cache()

export default cache

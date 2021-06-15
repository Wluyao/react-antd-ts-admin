import React, { useState, useEffect, useRef, useCallback } from 'react'

function sleep(interval: number) {
	return new Promise(resolve => setTimeout(resolve, interval))
}

function NewsList() {
	const count = useRef(0)
	const [keyWord, setKeyWord] = useState('')

	const getList = useCallback(() => {
		const currentCount = count.current
		sleep(1000).then(res => {
			if (currentCount === count.current) {
				console.log(keyWord)
			}
		})
	}, [keyWord])

	useEffect(() => {
		getList()
		return () => {
			count.current += 1
		}
	}, [getList])

	return <input value={keyWord} onChange={e => setKeyWord(e.target.value)} />
}

export default NewsList

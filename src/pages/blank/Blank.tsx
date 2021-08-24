import React from 'react'
import { observer } from 'mobx-react'
import { useSetState } from '@/hooks'
import './style.less'

const Blank: React.FC = () => {
	const [params, setParams] = useSetState({ page: 1, pageSize: 20 })

	const handlePagination = () => {
		setParams({
			pageSize: params.pageSize + 1
		})
	}

	return (
		<div onClick={handlePagination}>
			<p className="text">dfgffffdfg</p>
		</div>
	)
}

export default observer(Blank)

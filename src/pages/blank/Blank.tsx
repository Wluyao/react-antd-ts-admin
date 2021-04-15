import React from 'react'
import { observer } from 'mobx-react'

import './style.less'

const Blank: React.FC = () => {
	return <div className="title"></div>
}

export default observer(Blank)

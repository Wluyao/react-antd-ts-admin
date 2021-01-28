import React, { useState, useCallback } from 'react'
import Icon from '@/components/base/icon'

import './style.less'

const Blank: React.FC = () => {
  return (
    <div className="title">
      <p>ffff</p>
      <Icon name="article" />
      <Icon name="money" mode="colour" />
    </div>
  )
}

export default Blank

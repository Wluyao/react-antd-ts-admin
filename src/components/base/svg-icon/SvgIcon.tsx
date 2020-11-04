import React from 'react'
import Icon from '@ant-design/icons'
import { ICON_NAME_MAP, iconNames } from '@/assets/icons'

export type IconName = typeof iconNames[number]

interface IProps {
  className?: string
  style?: React.CSSProperties
  name: IconName
  size?: string | number
  color?: string
}

const SvgIcon: React.FC<IProps> = (props) => {
  const { className, style, name, size = 16, color } = props
  const iconStyle = {
    ...style,
    ...{
      fontSize: size,
      color
    }
  }
  return <Icon className={className} style={iconStyle} component={ICON_NAME_MAP[name]} />
}

export default SvgIcon

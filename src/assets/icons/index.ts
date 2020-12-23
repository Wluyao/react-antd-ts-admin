import { tupleStr } from '@/utils/core'
import Article from './article.svg'
import Blank from './blank.svg'
import Chart from './chart.svg'
import Form from './form.svg'
import Home from './home.svg'
import User from './user.svg'

export const ICON_NAME_MAP = {
  article: Article,
  blank: Blank,
  chart: Chart,
  form: Form,
  home: Home,
  user: User
}

export const iconNames = tupleStr('article', 'blank', 'chart', 'form', 'home', 'user')

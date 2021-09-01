//  空白页
import { lazy } from 'react'
import IRoute from '../IRoute'

const MicroApp = lazy(() => import(/* webpackChunkName:"blank" */ '@/pages/micro-app'))

const route: IRoute = {
	name: 'micro-app',
	title: '微应用',
	icon: 'menuBlank',
	path: '/micro-app',
	exact: true,
	component: MicroApp
}

export default route

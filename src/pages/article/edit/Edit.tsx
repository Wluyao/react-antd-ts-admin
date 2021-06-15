import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Row, Col, Select } from 'antd'
import './style.less'

const Edit: React.FC = () => {
	// 文章id
	const routeParams: any = useParams()
	// 文章详情
	const [detail, setDetail] = useState<any>({})

	// 获取文章详情
	useEffect(() => {
		setDetail({})
	}, [])

	return (
		<div className="article-editor">
			<Form>
				<Row>
					<Col span={12}>
						<Form.Item
							label="标题"
							initialValue={detail.title}
							rules={[{ required: true, message: '请输入文章标题' }]}
						>
							<Input placeholder="请输入文章标题" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="类型"
							initialValue={detail.type}
							rules={[{ required: true, message: '请选择文章类型' }]}
						>
							<Select placeholder="请选择文章类型">
								{TypeList.map(item => (
									<Select.Option key={item.id} value={item.id}>
										{item.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>

				<Form.Item
					label="描述"
					initialValue={detail.description}
					rules={[{ required: true, message: '请输入文章简要描述' }]}
				>
					<Input.TextArea placeholder="请输入文章简要描述" />
				</Form.Item>
				<Form.Item label="内容" required></Form.Item>
			</Form>
		</div>
	)
}

export default Edit

const TypeList = [
	{
		id: 1,
		name: '新闻'
	},
	{
		id: 2,
		name: '体育'
	}
]

import React, { useEffect, useRef } from 'react'
import { loadMicroApp } from 'qiankun'
import { documentReady } from '@/utils/core'

const Third: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const microAppRef = useRef<any>(null)

  useEffect(() => {
    documentReady(() => {
      if (!containerRef.current) return
      const entry = 'http://localhost:8090/home.html'
      microAppRef.current = loadMicroApp({
        name: 'third',
        entry,
        container: containerRef.current,
        props: { platform: 'manage' }
      })

      microAppRef.current.loadPromise.catch((e: any) => {
        $message.error('微应用注册失败')
      })
    })
  }, [])
  return <div ref={containerRef}></div>
}

export default Third

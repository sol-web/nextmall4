import React from 'react'
import Layout from '../components/Layout'

export default function intro() {
  return (
    <Layout title="intro">
      <div className="card bg-slate-300 p-5">
        <h1>제작자</h1>
        <p> 이름: 김 솔 </p>
        <p> 소속: 중부대학교 정보보호학과</p>
      </div>
    </Layout>
  )
}

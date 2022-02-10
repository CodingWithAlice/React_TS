import { useEffect, useState } from "react"

// 组件2：表头
export const SearchPanel = ({param, setParam, users}) => {
  return <form>
    <div>
      {/* 这里 onChange 方法相当于 setParam(Object.assign({}, param, {name: evt.target.name})); */}
      <input type="text" value={param.name} onChange={evt => setParam({
        ...param,
        name: evt.target.value,
      })} />
      <select value={param.personId} onChange={evt => setParam({
        ...param,
        personId: evt.target.value
      })}>
        <option value="">负责人</option>
        {
          users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </select>
    </div>
  </form>
}
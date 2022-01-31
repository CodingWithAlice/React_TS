import { useEffect, useState } from "react"

// 组件2：表头
export const SearchPanel = () => {
  // 表有两个数据：项目名+负责人id
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  // 负责人也是一个列表
  const [users, setUsers] = useState([]);
  // 列表数据
  const [list, setList] = useState([]);
  // 当 param 中的数据发生变化时，页面应该请求接口，按照参数获取列表数据
  useEffect(() => {
    fetch('').then(response => {
      if(response.ok) {
        setList(response.json())
      }
    })
  }, [param])

  return <form>
    <div>
      {/* 这里 onChange 方法相当于 setParam(Object.assign({}, param, {name: evt.target.name})); */}
      <input type="text" value={param.name} onChange={evt => setParam({
        ...param,
        name: evt.target.value,
      })} />
      <select value={param.personId} onChange={evt => setParam({
        ...param,
        personId: evt.target.personId
      })}>
        <option value="">负责人</option>
        {
          users.map(user => <option value={user.id}>{user.name}</option>)
        }
      </select>
    </div>
  </form>
}
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect, useState } from "react"
import { cleanObject, useMount, useDebounce } from "utils";
import * as qs from 'qs';

const apiURL = process.env.REACT_APP_URL;

export const ProjectListScreen = () => {
  // 表有两个数据：项目名+负责人id
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  // 列表数据
  const [list, setList] = useState([]);
  // 负责人也是一个列表
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 2000);
  // 当 param 中的数据发生变化时，页面应该请求接口，按照参数获取列表数据
  useEffect(() => {
    fetch(`${apiURL}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
      if(response.ok) {
        setList(await response.json())
      }
    })
  }, [debounceParam]);

  // 初始化 users - 只触发一次
  useMount(() => {
    fetch(`${apiURL}/users`).then(async response => {
      if(response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return <div>
    <SearchPanel param={param} setParam={setParam} users={users}/>
    <List list={list} users={users}/>
  </div>
}
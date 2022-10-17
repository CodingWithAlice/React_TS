import { useArray, useMount } from "utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "Qiu", age: 1.5 },
    { name: "Alice", age: 28 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {
    // 期待报错 Property 'notExist' does not exist on type '{name: string; age: number;}'
    // console.log(value.notExist);
    //期待报错 Property 'age' is missing in type '{name: string;}' but required in type '{name: string; age: number;}'
    // add({name: 'Sunny'});
    // 期待报错 Argument of type 'string' is not assignable to parameter of type 'number'
    // removeIndex('123');
  });
  return (
    <div>
      {/* 期待点击以后增加 Bob */}
      <button onClick={() => add({ name: "Bob", age: 28 })}> add Bob</button>
      {/* 期待点击以后删除第一项 */}
      <button onClick={() => removeIndex(0)}>remove 0</button>
      {/* 期待点击以后清空列表 */}
      <button onClick={() => clear()}>clear</button>

      {/* 列表 */}
      {value.map((person: { age: number; name: string }, index: number) => (
        <div key={index}>
          <span>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};

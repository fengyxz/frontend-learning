## 如何在React中使用debounce

### useCallback

当给子组件传入调用时，useCallback可以优化性能，可以借助useCallback来确保每次渲染debouncedSave都指向同一个防抖函数。

```jsx
import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

function App() {
  const [value, setValue] = useState('');
  const [dbValue, saveToDb] = useState('');//真实情况应该调用api

  const debouncedSave = useCallback(
    debounce(nextValue => saveToDb(nextValue), 1000),[]
  )

  const handleChange = e => {
    const {value:nextValue} = e.target.value;
    setValue(nextValue);
    debouncedSave(nextValue);
  }

  return (
		<main>
			<h1>Blog</h1>
			<textarea value={value} onChange={handleChange} rows={5} cols={50} />
			<section className="panels">
				<div>
					<h2>Editor (Client)</h2>
					{value}
				</div>
				<div>
					<h2>Saved (DB)</h2>
					{dbValue}
				</div>
			</section>
		</main>
	);
}

```

### useRef

useRef 提供一个可以修改的对象，对象的current属性指向传入的最初值。如果不手动修改，该值会在组件的整个生命周期保持不变。

你可以将 ref 指向任何值。但是，ref 最常见的用法是访问 DOM 元素。例如，如果你想以编程方式聚焦一个输入框，这种用法就会派上用场。当你将 ref 传递给 JSX 中的 ref 属性时，比如 <div ref={myRef}>，React 会将相应的 DOM 元素放入 myRef.current 中。
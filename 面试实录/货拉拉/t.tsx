import { useEffect, useState } from "react";

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const mockGetList = async () => {

  console.log("mock get list");
  await sleep(Math.ceil(1000 * 15 * Math.random()));
  return [
    { id: 1, time: Date.now() },
    { id: 2, time: Date.now() },
    { id: 3, time: Date.now() }
  ];
};

export default function App() {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (keyword) {
      mockGetList().then((items) => {
        setList(items);
      });
    } else {
      setList([]);
    }
  }, [keyword]);

  return (
    <div>
      <input value={keyword} onChange={(e) => debounce(setKeyword(e.target.value),3000)} />
      {list.map((item) => (
        <div>
          ID {item.id} 时间 {item.time}
        </div>
      ))}
    </div>
  );
}
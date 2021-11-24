import React, { useState, useEffect } from 'react';
import './App.css';
import Datatable from './Components/Datatable';

// Cài 2 thư viện es6-promise và isomorphic-fetch
require("es6-promise").polyfill();
require("isomorphic-fetch");

function App() {

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchColumns, setSearchColumns] = useState(["name","type"]); // Chỉ áp dụng tìm kiếm cho cột name và cột type

  useEffect(() => {
    fetch("https://6071b6b950aaea0017284fcb.mockapi.io/products")
    .then(response => response.json())
    .then(json =>  setData(json)) 
  }, [])

  // Hàm search này có thể kiếm dữ liệu ở bất kì cột dữ liệu nào cũng được
  function search(arrays) {
    return arrays.filter(item => searchColumns.some(   // Ta dùng some thay vì ta phải viết nhiều hàm item.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || item.price.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ....
      x => item[x].toString().toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    ))
  }

  const columns = data[0] && Object.keys(data[0]); // Chỉ lấy ra các key (key: value) (lấy tiêu đề như id,name,price,description,type,status...)

  return (
    <div className="App">
      <div>
          <input type='text' value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
          {columns?.map(column => 
          <label>
            <input type='checkbox' 
            checked={searchColumns.includes(column)} 
            onChange={(e) => {
              const checked = searchColumns.includes(column); // Trạng thái ban đầu
              setSearchColumns(prev => 
                // Kiểm tra xem nếu trước đó có check rồi mà ta click check thêm một lần nữa thì xoá cột đó đi ngược lại nếu cột đó chưa được click khi click vào sẽ cập nhật thêm
                checked ? prev.filter(x => x !== column) : [...prev, column]
              );
            }}
          />
            {column}
          </label>)
          }
      </div>
      <Datatable data={search(data)}/>
    </div>
  );
}

export default App;
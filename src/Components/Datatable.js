import React from 'react'

function Datatable({ data }) {

    const columns = data[0] && Object.keys(data[0]); 
    //// data[0] chính là phần tử đầu tiên khi ta lấy trong data
    //// Nếu không có data[0] thì nó sẽ báo lỗi Cannot convert undefined or null to object
    //// Object.keys(data[0]) Chỉ lấy ra các key (key: value) (lấy tiêu đề như id,name,price,description,type,status...)

    return (
        <table cellPadding={0} cellSpacing={0}>
            <thead>
                <tr>
                    {columns?.map((heading,index) => <th key={index}>{heading}</th>)}
                </tr>
            </thead>
            <tbody>
                    {/* //// Cách 1 */}
                    {/* {data.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>{item.type}</td>
                                <td>{item.status}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.updatedAt}</td>
                            </tr>
                        )
                    })} */}

                    {/* //// Cách 2  */}
                    {data.map((row,index) => 
                        <tr key={index}>
                            {
                                columns.map((column,index) => {
                                    return (
                                        <td key={index}>{row[column]}</td>
                                    )
                                })
                            }
                        </tr>   
                    )}
            </tbody>
        </table>
    )
}

export default Datatable

/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import MainMenu from "./pages/MainMenu";
import DataStadium from "./pages/DataStadium";
import PlayerProfile from "./pages/PlayerProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Table, ConfigProvider } from "antd";

// import Test from "./Test"
function App() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: "0px"
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  
  const data = () => {
    const newData = [];
    for (let i = 0; i < 46; i++) {
      newData.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    return newData
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    hideSelectAll: true,
    type: "radio",
    renderCell: (checked, record, index, originNode) => {
      return <></>
    },
    onChange: onSelectChange,
  };

  const onRowSelected = (record, rowIndex) => {
    return {
      onClick:(event) => {
        console.log(rowIndex, record);
        setSelectedRowKeys([record.key])
      }
    }
  }

  const theme = {
    components: {
        Table: {
          headerColor: "rgba(255,0,0,255)",

        }
        // padding: 2
        // defaultPadding: 2
      
    }
  }

  return (
    <>
    {/* <ConfigProvider componentDisabled={true} theme={theme}>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data()} onRow={onRowSelected}/>
    </ConfigProvider> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<MainMenu/>} />
          <Route path="/data-stadium" element={<DataStadium/>} />
          <Route path="/player-profile" element={<PlayerProfile/>} />
        </Routes>
      </Router> 

      {/* <MainMenu/> */}
      {/* <DataStadium/> */}
      {/* <br /><br /><br /> */}
      {/* <PlayerProfile/> */}
      {/* <Test/>*/}
    </>
  );
}

export default App;

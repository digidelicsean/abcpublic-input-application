/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Select } from "antd";

const { Option } = Select;

function Test() {
  const [testVal, setTestVal] = useState();

  const onChange1 = (value) => {
    console.log(value.target.value);
    setTestVal(value.target.value)   
  };

  const onChange2 = (value) => {
    console.log(value);
  };

  return (
    <>
      <select onChange={onChange1}>
        <option key={1} value={"test1"}>
          Test
        </option>
        <option key={2} value={"test2"}>
          Test
        </option>
        <option key={3} value={"test3"}>
          Test
        </option>
        <option key={4} value={"test4"}>
          Test
        </option>
      </select>

      <Select onChange={onChange2} value={testVal}>
        <Option key={1} value={"test1"}>
          Test1
        </Option>
        <Option key={2} value={"test2"}>
          Test2
        </Option>
        <Option key={3} value={"test3"}>
          Test3
        </Option>
        <Option key={4} value={"test4"}>
          Test4
        </Option>
      </Select>
    </>
  );
}

export default Test;

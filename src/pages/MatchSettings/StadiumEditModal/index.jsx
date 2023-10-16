/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
import React, { useEffect, useState, useMemo } from "react";
import { Modal, Button } from "antd";
import { DndContext, closestCenter } from "@dnd-kit/core";

import "./StadiumEditModal.css";
import StadiumDataBar from "./StadiumDataBar";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

function StadiumEditModal({ title, mainStadiumInfo, otherStadiumInfo, isModalOpen, onOk }) {

  const [sortedStadiumInfo, setSortedStadiumInfo] = useState([])

  const dataIds = useMemo(() => sortedStadiumInfo.map((data) => data.Order), [sortedStadiumInfo]);
  // console.log(otherStadiumInfo, sortedStadiumInfo)
  // console.log(dataIds)
  const mainDataBar = useMemo(() => {
    return <StadiumDataBar stadiumData={mainStadiumInfo} />
  }, [mainStadiumInfo])

  const otherDataBars = useMemo(() => {
    const stadiumDataBars = sortedStadiumInfo?.map((data, index) =>
      <StadiumDataBar
        key={data.Order}
        stadiumData={data}
      />
    )
    const missingDataBars = 5 - stadiumDataBars.length
    const idx = stadiumDataBars.length + 1
    for (let i = 0; i < missingDataBars; i++) {
      stadiumDataBars.push(
        <StadiumDataBar
          key={idx + i}
        />
      )
    }
    return stadiumDataBars
  }, [sortedStadiumInfo])

  useEffect(() => {
    const stadiumInfos = [...otherStadiumInfo]
    for (let i = 0; i < stadiumInfos.length; i++) {
      stadiumInfos[i].Order = i + 1;
    }
    setSortedStadiumInfo(stadiumInfos)
  }, [otherStadiumInfo])

  const onDragEnd = (event) => {
    const { active, over } = event;

    console.log(active, over);
    if (active.id === over.id) {
      return;
    }

    setSortedStadiumInfo(stadiumData => {
      const oldIdx = stadiumData.findIndex((data) => data.Order === active.id)
      const newIdx = stadiumData.findIndex((data) => data.Order === over.id)
      const newArr = arrayMove(stadiumData, oldIdx, newIdx)
      return newArr
    })
  };

  const onOkClick = () => {
    if (!onOk) return;
    onOk(sortedStadiumInfo);
  }

  return (
    <Modal
      title={title}
      className="stadium-edit-modal"
      open={isModalOpen}
      onOk={onOkClick}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { width: "100px" } }}
      closeIcon={false}
      maskClosable={false}
      keyboard={false}
      okText="確定"
    >
      {mainDataBar}
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
          {otherDataBars}
        </SortableContext>
      </DndContext>
    </Modal>
  );
}

export default StadiumEditModal;

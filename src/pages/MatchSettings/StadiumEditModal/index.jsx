/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
import React from "react";
import { Modal, Button } from "antd";

import "./StadiumEditModal.css";
import StadiumDataBar from "./StadiumDataBar";

function StadiumEditModal({ title, isModalOpen, onOk, onCancel }) {
  return (
    <Modal
      title={title}
      className="stadium-edit-modal"
      open={isModalOpen}
      onOk={onOk}
      onCancel={onCancel}
      closeIcon={false}
    >
      <StadiumDataBar />
      <StadiumDataBar />
      <StadiumDataBar />
      <StadiumDataBar />
      <StadiumDataBar />
    </Modal>
  );
}

export default StadiumEditModal;

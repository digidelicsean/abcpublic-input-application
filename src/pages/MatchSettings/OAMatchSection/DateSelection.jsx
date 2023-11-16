/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, InputNumber, ConfigProvider } from 'antd'
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";

import style from "../Styles/DateSelection.module.css"
import { useModal } from '../../../hooks/useModal';
import MatchInfoModal from '../../../components/MatchInfoModal';

function DateSelection({ onDateSelected, className }) {

    const { isOpen, Open, onModalConfirm, onModalCancel } = useModal(dateSelectCallback, (() => { }))

    const [day, setDay] = useState("1");
    const [month, setMonth] = useState("10");
    const [year, setYear] = useState("2023");

    function dateSelectCallback() {
        const date = year + String(month).padStart(2, "0") + String(day).padStart(2, "0");
        if (!onDateSelected) return;
        onDateSelected({ day, month, year, date })
    }

    const onOpenClicked = () => {
        Open();
        dateSelectCallback();
    }

    useEffect(() => {
        dateSelectCallback
    }, [day, month, year])

    return (
        <div className={className}>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            defaultBorderColor: "#f4f4f4",
                        },
                        InputNumber: {
                            // bordered: false
                        },
                    },
                }}
            >
                <div className="date-select">
                    <div className="date-select-year">
                        <Button
                            type="text"
                            icon={<CaretUpFilled style={{ color: "#778dbb" }} />}
                            onClick={() => {
                                if (year == 9999) return;
                                setYear(Number(year) + 1);
                            }}
                        />
                        <InputNumber
                            style={{
                                width: "100%",
                                height: "70px",
                                fontSize: "3em",
                                textAlign: "center",
                            }}
                            controls={false}
                            value={year}
                            min={1800}
                            max={9999}
                            onChange={(e) => setYear(e)}
                        />
                        <Button
                            type="text"
                            icon={
                                <CaretDownFilled style={{ color: "#778dbb" }} />
                            }
                            onClick={() => {
                                if (year == 1800) return;
                                setYear(Number(year) - 1);
                            }}
                        />
                    </div>
                    年
                    <div className="date-select-month">
                        <Button
                            type="text"
                            icon={<CaretUpFilled style={{ color: "#778dbb" }} />}
                            onClick={() => {
                                if (month == 12) return;
                                setMonth(Number(month) + 1);
                            }}
                        />
                        <InputNumber
                            style={{
                                width: "100%",
                                height: "70px",
                                fontSize: "3em",
                                textAlign: "center",
                            }}
                            controls={false}
                            value={month}
                            min={1}
                            max={12}
                            onChange={(e) => setMonth(e)}
                        />
                        <Button
                            type="text"
                            icon={
                                <CaretDownFilled style={{ color: "#778dbb" }} />
                            }
                            onClick={() => {
                                if (month == 1) return;
                                setMonth(Number(month) - 1);
                            }}
                        />
                    </div>
                    月
                    <div className="date-select-day">
                        <Button
                            type="text"
                            icon={<CaretUpFilled style={{ color: "#778dbb" }} />}
                            onClick={() => {
                                if (day == 31) return;
                                setDay(Number(day) + 1);
                            }}
                        />
                        <InputNumber
                            style={{
                                width: "100%",
                                height: "70px",
                                fontSize: "3em",
                                textAlign: "center",
                            }}
                            controls={false}
                            value={day}
                            min={1}
                            max={31}
                            onChange={(e) => setDay(e)}
                        />
                        <Button
                            type="text"
                            icon={
                                <CaretDownFilled style={{ color: "#778dbb" }} />
                            }
                            onClick={() => {
                                if (day == 1) return;
                                setDay(Number(day) - 1);
                            }}
                        />
                    </div>
                    日
                </div>
                <Button className="match-data-open-btn" onClick={onOpenClicked}> OPEN </Button>

                <MatchInfoModal title={`${year}.${month}.${day}`} isOpen={isOpen} onConfirm={onModalConfirm} onCancel={onModalCancel} />
            </ConfigProvider>
        </div>
    )
}

export default DateSelection
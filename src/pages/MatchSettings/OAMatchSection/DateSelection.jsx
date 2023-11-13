import React, { useState } from 'react'
import { Button, InputNumber, ConfigProvider } from 'antd'
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";

import style from "../Styles/DateSelection.module.css"

function DateSelection({ onDateSelected, className }) {
    const [day, setDay] = useState("1");
    const [month, setMonth] = useState("10");
    const [year, setYear] = useState("2023");

    const onOpenClicked = () => {
        const date = year + String(month).padStart(2, "0") + String(day).padStart(2, "0");
        console.log(date)
        if (!onDateSelected) return;
        onDateSelected(date)
    }

    return (
        <div className={className}>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            defaultBorderColor: "#f4f4f4",
                        },
                    },
                }}
            >
                <div className={style.container}>
                    <div className={style.selector}>
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
                    <span>年</span>
                    <div className={style.selector}>
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
                    <span>月</span>
                    <div className={style.selector}>
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
                    <span>日</span>
                </div>
                <Button className={style['button-open']} onClick={onOpenClicked}> OPEN </Button>
            </ConfigProvider>
        </div>
    )
}

export default DateSelection
import React, { useState } from 'react'
import { Radio, Space } from "antd"


function DSSelection({ onDeliveryTypeChange, className }) {
    const [deliveryType, setDeliveryType] = useState(1)
    
    return (
        <Radio.Group
            className={`radio-btn-group ${className}`}
            value={deliveryType}
            onChange={(e) => {
                setDeliveryType(e.target.value)
                if (!onDeliveryTypeChange) return;
                onDeliveryTypeChange(e.target.value)
            }}
        >
            <Space direction="vertical">
                <Radio className="radio-btn" value={1}>
                    DS配信あり
                </Radio>
                <Radio className="radio-btn" value={2}>
                    DS配信なし
                </Radio>
            </Space>
        </Radio.Group>
    )
}

export default DSSelection
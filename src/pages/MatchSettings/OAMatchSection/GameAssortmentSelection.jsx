import React, { useState } from 'react'
import { Radio, Space } from 'antd'

function GameAssortmentSelection({ onGameClassCDChange, className }) {
    const [gameClassCD, setGameClassCD] = useState(1)

    return (
        <div className={className}>
            <Radio.Group
                class="radio-btn-group"
                value={gameClassCD}
                onChange={(e) => {
                    setGameClassCD(e.target.value)
                    if (!onGameClassCDChange) return;
                    onGameClassCDChange(e.target.value)
                }}
            >
                <Space direction="vertical">
                    <Radio className="radio-btn" value={1}>
                        セ・リーグ
                    </Radio>
                    <Radio className="radio-btn" value={2}>
                        パ・リーグ
                    </Radio>
                    <Radio className="radio-btn" value={26}>
                        交流戦
                    </Radio>
                    <Radio className="radio-btn" value={5}>
                        オープン戦
                    </Radio>
                </Space>
                <Space direction="vertical">
                    <Radio className="radio-btn" value={35}>
                        CS 1ST
                    </Radio>
                    <Radio className="radio-btn" value={36}>
                        CS ファイナル
                    </Radio>
                    <Radio className="radio-btn" value={3}>
                        日本シリーズ
                    </Radio>
                </Space>
            </Radio.Group>
        </div>
    )
}

export default GameAssortmentSelection
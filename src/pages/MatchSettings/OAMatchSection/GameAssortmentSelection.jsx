import React, { useState } from 'react';
import { Radio, Space } from 'antd';

// Function component GameAssortmentSelection
function GameAssortmentSelection({ onGameClassCDChange, className }) {
    // State variable gameClassCD and its setter function setGameClassCD using useState hook
    const [gameClassCD, setGameClassCD] = useState(1);

    return (
        <div className={className}>
            {/* Radio group for game class selection */}
            <Radio.Group
                class="radio-btn-group"
                value={gameClassCD}
                onChange={(e) => {
                    // Call setGameClassCD to update the gameClassCD state variable with the selected value
                    setGameClassCD(e.target.value);
                    // Check if onGameClassCDChange function is provided
                    if (!onGameClassCDChange) return;
                    // Call onGameClassCDChange function with the selected value
                    onGameClassCDChange(e.target.value);
                }}
            >
                {/* First set of radio buttons */}
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
                {/* Second set of radio buttons */}
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
    );
}

// Export GameAssortmentSelection component as the default export
export default GameAssortmentSelection;
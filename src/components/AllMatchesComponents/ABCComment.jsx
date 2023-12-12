import React from 'react'

import { Button, Checkbox, Input } from "antd";
import "./ABCComment.css";


const ABCComment = () => {
    return (
        <div className="other-game-bottom-body">
            <div className="other-game-bottom-left">
                <div className="bot-left-input1">
                    <span className="header-label">ABCコメント</span>
                    <div className="input-btn">
                        <Input className="abc-comment" />
                        <Button className="abc-comment-card-btn">保存</Button>
                    </div>

                </div>
                <div className="bot-left-input2">
                    <span className="header-label">データスタジアム コメント</span>
                    <div className="input-btn">
                        <span className="dst-comment-num">➀</span>
                        <Input className="dst-comment" />
                        <Button className="dst-comment-card-btn">保存</Button>
                    </div>
                    <div className="input-btn">
                        <span className="dst-comment-num">➁</span>
                        <Input className="dst-comment" />
                        <Button className="dst-comment-card-btn">保存</Button>
                    </div>
                </div>

            </div>

            <div className="other-game-bottom-right">
                <span className="label">使用コメント</span>
                <div className="checkbox-container">
                    <div className="checkbox-body">
                        <Checkbox className="abc-comment-cb">ABC</Checkbox>
                        <Checkbox className="dst-comment-cb">データスタジアム➀</Checkbox>
                        <Checkbox className="dst-comment-cb">データスタジアム➁</Checkbox>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ABCComment
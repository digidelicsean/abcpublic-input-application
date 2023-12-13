import React, { useState } from 'react'
import { Button, Checkbox, Input } from "antd";
import "./ABCComment.css";
import { fetchOtherGameInfoCollection } from './Data/otherGameInfoData';

const ABCComment = (index) => {
    const [abcComment, setABCComment] = useState("");
    const [dstComment1, setDSTComment1] = useState("");
    const [dstComment2, setDSTComment2] = useState("");
    var otherGameInfoNum = parseInt(index.index) + 1;

    fetchOtherGameInfoCollection().then(data => {
        const otherGameInfo = data[0].OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
        const abc = otherGameInfo.ABC_Comment;
        const dst1 = otherGameInfo.DS_Comment_1;
        const dst2 = otherGameInfo.DS_Comment_2;

        setABCComment(abc);
        setDSTComment1(dst1);
        setDSTComment2(dst2);
    });

    return (
        <div className="other-game-bottom-body">
            <div className="other-game-bottom-left">
                <div className="bot-left-input1">
                    <span className="header-label">ABCコメント</span>
                    <div className="input-btn">
                        <Input className="abc-comment" value={abcComment} />
                        <Button className="abc-comment-card-btn">保存</Button>
                    </div>

                </div>
                <div className="bot-left-input2">
                    <span className="header-label">データスタジアム コメント</span>
                    <div className="input-btn">
                        <span className="dst-comment-num">➀</span>
                        <Input className="dst-comment" value={dstComment1} />
                        <Button className="dst-comment-card-btn">保存</Button>
                    </div>
                    <div className="input-btn">
                        <span className="dst-comment-num">➁</span>
                        <Input className="dst-comment" value={dstComment2} />
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
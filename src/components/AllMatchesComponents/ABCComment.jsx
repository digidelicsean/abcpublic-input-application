import React, { useState, useEffect } from 'react'
import { Button, Input, Radio, Space } from "antd";
import "./ABCComment.css";
import { useOtherGameInfo } from '../../services/api/useOtherGameInfo';


const ABCComment = (index) => {
    const [abcComment, setABCComment] = useState("");
    const [dstComment1, setDSTComment1] = useState("");
    // const [dstComment2, setDSTComment2] = useState("");
    const [selectComment, setSelectComment] = useState();
    const [gameData, setGameData] = useState("");

    var otherGameInfoNum = parseInt(index.index) + 1;
    const otherGameInfo = useOtherGameInfo();

    useEffect(() => {
        const getComments = () => {
            let info;
            if (otherGameInfo.data == null) {
                return []
            }

            for (let i = 0; i < otherGameInfo.data.length; i++) {
                info = otherGameInfo.data[i];
            }
            setGameData(info);
            const gameInfo = info.OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
            const abc = gameInfo.ABC_Comment;
            const dst1 = gameInfo.DS_Comment_1;
            const dst2 = gameInfo.DS_Comment_2;
            const select = gameInfo.SelectComment;

            setABCComment(abc);
            setDSTComment1(dst1);
            setDSTComment2(dst2);
            setSelectComment(parseInt(select));
        };

        getComments();
    }, [index])


    return (
        <div className="other-game-bottom-body">
            <div className="other-game-bottom-left">
                <div className="bot-left-input1">
                    <span className="header-label">ABCコメント</span>
                    <div className="input-btn">
                        <Input className="abc-comment"
                            value={abcComment}
                            onChange={(event) => setABCComment(event.target.value)}
                        />
                        <Button className="abc-comment-card-btn"
                            onClick={() => {
                                const currentInfo = gameData.OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
                                currentInfo.ABC_Comment = abcComment;
                                otherGameInfo.update();
                            }}
                        >保存</Button>
                    </div>

                </div>
                <div className="bot-left-input2">
                    <span className="header-label">データスタジアム コメント</span>
                    <div className="input-btn">
                        <span className="dst-comment-num">➀</span>
                        <Input className="dst-comment"
                            value={dstComment1}
                            onChange={(event) => setDSTComment1(event.target.value)}
                        />
                        <Button className="dst-comment-card-btn"
                            onClick={() => {
                                const currentInfo = gameData.OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
                                currentInfo.DS_Comment_1 = dstComment1;
                                otherGameInfo.update();
                            }}
                        >保存</Button>
                    </div>
                    <div className="input-btn">
                    <span className="dst-comment-num">➁</span>

                        <div className="input-only">

                            <span className="dst-header-label">勝</span>
                            <Input />
                            <Input className="dst-input-short" />
                            <span>勝</span>
                            <Input className="dst-input-short" />
                            <span>敗</span>
                            <span className="dst-header-label">負</span>
                            <Input />
                            <Input className="dst-input-short" />
                            <span>勝</span>
                            <Input className="dst-input-short" />
                            <span>敗</span>
                            <span className="dst-header-label">セーブ</span>
                            <Input />
                            <Input className="dst-input-short" />
                            <span>S</span>
                        </div>

                        {/* <Input className="dst-comment"
                            value={dstComment2}
                            onChange={(event) => setDSTComment2(event.target.value)}
                        /> */}
                        <Button className="dst-comment-card-btn"
                            // onClick={() => {
                            //     const currentInfo = gameData.OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
                            //     currentInfo.DS_Comment_2 = dstComment2;
                            //     otherGameInfo.update();
                            // }}
                        >保存</Button>
                    </div>
                </div>
            </div>

            <div className="other-game-bottom-right">
                <span className="label">使用コメント</span>
                <div className="select-comment-container">
                    <Radio.Group
                        onChange={(e) => {
                            setSelectComment(e.target.value);
                            const currentInfo = otherGameInfo.data[0].OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
                            currentInfo.SelectComment = e.target.value;
                            otherGameInfo.update();
                        }}
                        value={selectComment}
                    >
                        <Space direction="vertical">
                            <Radio value={1}>ABC</Radio>
                            <Radio value={2}>データスタジアム➀</Radio>
                            <Radio value={3}>データスタジアム➁</Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </div>
        </div>
    )
}

export default ABCComment
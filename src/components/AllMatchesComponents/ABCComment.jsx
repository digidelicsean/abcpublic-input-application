import React, { useState, useEffect } from 'react'
import { Button, Input, Radio, Space } from "antd";
import "./ABCComment.css";
import { useOtherGameInfo } from '../../services/api/useOtherGameInfo';


const ABCComment = (data) => {
    const [abcComment, setABCComment] = useState("");
    const [dstComment1, setDSTComment1] = useState("");
    const [winningPlayer, setWinningPlayer] = useState("");
    const [winningWon, setWinningWon] = useState();
    const [winningLose, setWinningLose] = useState();
    const [losingPlayer, setLosingPlayer] = useState("");
    const [losingWon, setLosingWon] = useState();
    const [losingLose, setLosingLose] = useState();
    const [savingPlayer, setSavingPlayer] = useState("");
    const [savingSave, setSavingSave] = useState("");
    const [selectComment, setSelectComment] = useState();
    const [currentData, setCurrentData] = useState([]);

    var otherGameInfoNum = Number(data.index) + 1;
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
            const gameInfo = info.OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
            const abc = gameInfo.ABC_Comment;
            const dst1 = gameInfo.DS_Comment_1;
            const winningPN = gameInfo.DS_Comment_2[`Winning-Pitcher`].PlayerName;
            const winningTW = gameInfo.DS_Comment_2[`Winning-Pitcher`][`Total-Won`];
            const winningTL = gameInfo.DS_Comment_2[`Winning-Pitcher`][`Total-Lose`];
            const losingPN = gameInfo.DS_Comment_2[`Losing-Pitcher`].PlayerName;
            const losingTW = gameInfo.DS_Comment_2[`Losing-Pitcher`][`Total-Won`];
            const losingTL = gameInfo.DS_Comment_2[`Losing-Pitcher`][`Total-Lose`];
            const select = gameInfo.SelectComment;

            if ([`Saving-Pitcher`] in gameInfo.DS_Comment_2) {
                const savingPN = gameInfo.DS_Comment_2[`Saving-Pitcher`].PlayerName;
                const savingTS = gameInfo.DS_Comment_2[`Saving-Pitcher`][`Total-Save`];

                setSavingPlayer(savingPN);
                setSavingSave(savingTS);
            }
            else {
                setSavingPlayer("");
                setSavingSave();
            }

            setCurrentData(gameInfo);
            setABCComment(abc);
            setDSTComment1(dst1);
            setSelectComment(select);
            setWinningPlayer(winningPN);
            setWinningWon(winningTW);
            setWinningLose(winningTL);
            setLosingPlayer(losingPN);
            setLosingWon(losingTW);
            setLosingLose(losingTL);
        };

        getComments();
    }, [data])


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
                                currentData.ABC_Comment = abcComment;
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
                                currentData.DS_Comment_1 = dstComment1;
                                otherGameInfo.update();
                            }}
                        >保存</Button>
                    </div>
                    <div className="input-btn">
                        <span className="dst-comment-num">➁</span>
                        <div className="input-only">
                            <span className="dst-header-label">勝</span>
                            <Input value={winningPlayer}
                                onChange={(event) => setWinningPlayer(event.target.value)}
                            />
                            <Input className="dst-input-short"
                                value={winningWon}
                                onChange={(event) => setWinningWon(event.target.value)}
                            />
                            <span>勝</span>
                            <Input className="dst-input-short"
                                value={winningLose}
                                onChange={(event) => setWinningLose(event.target.value)}
                            />
                            <span>敗</span>
                            <span className="dst-header-label">負</span>
                            <Input value={losingPlayer}
                                onChange={(event) => setLosingPlayer(event.target.value)}
                            />
                            <Input className="dst-input-short"
                                value={losingWon}
                                onChange={(event) => setLosingWon(event.target.value)}
                            />
                            <span>勝</span>
                            <Input className="dst-input-short"
                                value={losingLose}
                                onChange={(event) => setLosingLose(event.target.value)}
                            />
                            <span>敗</span>
                            <span className="dst-header-label">セーブ</span>
                            <Input value={savingPlayer}
                                onChange={(event) => setSavingPlayer(event.target.value)}
                            />
                            <Input className="dst-input-short" value={savingSave}
                                onChange={(event) => setSavingSave(event.target.value)}
                            />
                            <span>S</span>
                        </div>

                        <Button className="dst-comment-card-btn"
                            onClick={() => {
                                currentData.DS_Comment_2[`Winning-Pitcher`].PlayerName = winningPlayer;
                                currentData.DS_Comment_2[`Winning-Pitcher`][`Total-Won`] = Number(winningWon);
                                currentData.DS_Comment_2[`Winning-Pitcher`][`Total-Lose`] = Number(winningLose);
                                currentData.DS_Comment_2[`Losing-Pitcher`].PlayerName = losingPlayer;
                                currentData.DS_Comment_2[`Losing-Pitcher`][`Total-Won`] = Number(losingWon);
                                currentData.DS_Comment_2[`Losing-Pitcher`][`Total-Lose`] = Number(losingLose);
                                if ([`Saving-Pitcher`] in currentData.DS_Comment_2) {
                                    currentData.DS_Comment_2[`Saving-Pitcher`].PlayerName = savingPlayer;
                                    currentData.DS_Comment_2[`Saving-Pitcher`][`Total-Save`] = Number(savingSave);
                                }
                                otherGameInfo.update();
                            }}
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
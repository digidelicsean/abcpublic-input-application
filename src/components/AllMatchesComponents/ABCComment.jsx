import React, { useState, useEffect } from 'react'
import { Button, Input, Radio, Space } from "antd";
import "./ABCComment.css";
// import { fetchOtherGameInfoCollection } from './Data/otherGameInfoData';
import { useOtherGameInfo } from '../../services/api/useOtherGameInfo';


const ABCComment = (index) => {

    const [abcComment, setABCComment] = useState("");
    const [dstComment1, setDSTComment1] = useState("");
    const [dstComment2, setDSTComment2] = useState("");
    const [value, setValue] = useState(1);
    const [selectComment, setSelectComment] = useState(value);
    var otherGameInfoNum = parseInt(index.index) + 1;

    // fetchOtherGameInfoCollection().then(data => {
    //     const otherGameInfo = data[0].OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
    //     const abc = otherGameInfo.ABC_Comment;
    //     const dst1 = otherGameInfo.DS_Comment_1;
    //     const dst2 = otherGameInfo.DS_Comment_2;
    //     const select = otherGameInfo.SelectComment;

    //     setABCComment(abc);
    //     setDSTComment1(dst1);
    //     setDSTComment2(dst2);
    //     setSelectComment(parseInt(select));

    // });

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
            const dst2 = gameInfo.DS_Comment_2;
            const select = gameInfo.SelectComment;

            setABCComment(abc);
            setDSTComment1(dst1);
            setDSTComment2(dst2);
            setSelectComment(parseInt(select));
        };

        getComments();
    }, [otherGameInfo])

    const onChange = (e) => {
        // console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };


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
                <div className="select-comment-container">
                    <Radio.Group onChange={onChange} value={selectComment}>
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
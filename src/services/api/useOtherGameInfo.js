import { useFetch, usePost } from "../../hooks/useFetch";


export const useOtherGameInfo = () => {
    const otherGameInfo = useFetch("abc-public/OtherGameInfo?Type=OtherGameInfo");
    const { data, isLoading, error, send } = usePost("abc-public/update/OtherGameInfo");

    if (otherGameInfo.isLoading || otherGameInfo.error) {
        return {
            data: null,
            reload: otherGameInfo.reload,
        };
    }

    const parsedData = parseOtherGameInfo(otherGameInfo.data);

    return {
        data: parsedData,
        reload: otherGameInfo.reload,
        update: (infoNum, updatedData) => {


            if (otherGameInfo?.data == null) return;

            // const prevData = otherGameInfo.data[0].OtherGameInfo;
            // prevData[`OtherGameInfo_${infoNum}`] = updatedData;
            // console.log(prevData);
            // send(prevData);


            // const { _id, ...updatedObject } = otherGameInfo.data[0];

            // const updated = updatedObject.OtherGameInfo;
            // updated[`OtherGameInfo_${infoNum}`] = updatedData;
            // console.log("updated: ", updated);
            // send(updated).then(() => {
            //         otherGameInfo.reload();
            //     });

            

            // prevData.OtherGameInfo[`OtherGameInfo_${infoNum}`] = updatedData;
            // send(prevData).then(() => {
            //     otherGameInfo.reload();
            // });


            const propsToBeDeleted = "_id";
            const gameInfoData = otherGameInfo.data[0];
            delete gameInfoData[propsToBeDeleted]
            const updated = gameInfoData.OtherGameInfo;
            updated[`OtherGameInfo_${infoNum}`] = updatedData;
            console.log("updated: ", updated);
            send(updated).then(() => {
                    otherGameInfo.reload();
                });

        }

        //     update: (infoNum, otherGameInfoData) => {
        //         if (otherGameInfo?.data == null) return;

        //         const prevData = otherGameInfo.data[0];

        //         const updated = prevData.OtherGameInfo[`OtherGameInfo_${infoNum}`] = otherGameInfoData;
        //         console.log("hi: ", updated);
        //         send(prevData)
        //     }
    }
}

const parseOtherGameInfo = (data) => {

    return data
}
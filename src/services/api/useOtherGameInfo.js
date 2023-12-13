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
        update: ( infoNum, updatedData ) => {
            if (otherGameInfo?.data == null) return;
            const prevData = otherGameInfo.data[0];

            const gameInfoNum = prevData.OtherGameInfo[`OtherGameInfo_${infoNum}`];
            
            console.log("hi: ", prevData);

            // send(prevData, gameInfoNum);
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
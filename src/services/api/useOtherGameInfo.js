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
        // update: (otherGameInfoData) => {
        //     if (otherGameInfo?.data == null) return;

        //     const prevData = otherGameInfo.data;

        //     prevData.OtherGameInfo.OtherGameInfo_1 = otherGameInfoData;
        //     send(prevData)
        // }
    }
}

const parseOtherGameInfo = (data) => {

    return data
}
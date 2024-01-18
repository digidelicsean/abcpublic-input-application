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
        update: () => {
            if (otherGameInfo?.data == null) return;

            const objId = "_id";
            const gameInfoData = otherGameInfo.data[0];
            delete gameInfoData[objId];

            send(gameInfoData).then(() => {
                otherGameInfo.reload();
                window.location.reload();
            });

            if (error) {
                console.error(error)
            }
        }
    }
}

const parseOtherGameInfo = (data) => {

    return data
}
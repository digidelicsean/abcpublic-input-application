/* eslint-disable no-unused-vars */
import { defaultURI } from "../../../../services/fetch/fetch-lib";

const getHittingStats = async (teamCD, playerCD) => {
    try {
        const response = await fetch(`${defaultURI}/data-stadium/`)

    } catch (err) {
        console.log(err);
        return null;
    }
}
import axios from "axios";
import { findEntityByPath, csrf } from "./windowUtils.js";

export const uploadImage = async (imageBlob: File, hash: string) => {
    //@ts-ignore
    const url = `https://${document.location.host}${document.location.pathname}/upload?folder_id=${findEntityByPath('assets').id}&_csrf=${csrf()}`;
    let formData = new FormData();
    formData.append('qqfile', imageBlob, hash + '.png');
    formData.append('relativePath', '');
    formData.append('name', hash + '.png');
    formData.append('type', 'image/png');

    return await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
};
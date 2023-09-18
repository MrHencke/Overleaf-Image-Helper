import axios from "axios";
import { getOptions, safelyGetFolder } from "./optionsUtils";
import { csrf } from "./windowUtils";

export const uploadImage = async (imageBlob: File, hash: string) => {
    const options = await getOptions()
    const folderId = await safelyGetFolder(options.assetsFolder)
    //@ts-ignore
    const url = `https://${document.location.host}${document.location.pathname}/upload?folder_id=${folderId}&_csrf=${csrf()}`;
    let formData = new FormData();
    formData.append('qqfile', imageBlob, hash + '.png');
    formData.append('relativePath', '');
    formData.append('name', hash + '.png');
    formData.append('type', 'image/png');

    return await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
};
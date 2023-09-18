import { IFigureTextOptions, defaultFigureTextOptions } from "../interface/figureTextOptions.interface.js";
import { createFolder, findEntityByPath } from "./windowUtils.js";

export const getOptions = async () => {
        const s = await browser.storage.local.get()
        const outputOptions = {...defaultFigureTextOptions}

        let prop: keyof typeof outputOptions;
        for(prop in outputOptions) {
            // @ts-ignore
            outputOptions[prop] = s[prop]
        }
        return outputOptions
}

export const setOptions = (options: IFigureTextOptions): void => {
    getOptions().then((existingOptions) => {
        let prop: keyof typeof options;
        for(prop in options) {
            // @ts-ignore
            if(!existingOptions || existingOptions[prop] !== options[prop])
            browser.storage.local.set({[prop]: options[prop]})
        }
    })
}

export const getFigureText = (hash: string, options: IFigureTextOptions): string => {
    if(!options.template) 
        options.template = defaultFigureTextOptions.template

    if(!options.hashReplaceName)
        options.hashReplaceName = defaultFigureTextOptions.hashReplaceName

    return insertHash(options.template, hash, options.hashReplaceName)
}

export const insertHash = (template: string, hash: string, templateHashValue: string) => {
    return template.replaceAll(templateHashValue, hash);
};

export const checkFirstRun = async () => {
	const options = await getOptions();
	if (!options || !options.hasRunBefore) {
        setOptions(defaultFigureTextOptions)
	}
};

export const safelyGetFolder = async (folder: string) => {
    const folderData = findEntityByPath(folder)
	if (folderData === null) {
		try {
            console.log(`Generating assets folder with name: ${folder}`)
			const folderInfo = await createFolder(folder)
            return folderInfo.data._id
		} catch (e) {
			console.log("Failed to generate folder:", e)
		}
	}
    return folderData.id
};
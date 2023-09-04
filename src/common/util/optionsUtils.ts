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
        if(existingOptions.assetsFolder != options.assetsFolder) 
            tryGenerateFolder(options.assetsFolder)
        
        let prop: keyof typeof options;
        for(prop in options) {
            // @ts-ignore
            if(!existingOptions || existingOptions[prop] !== options[prop])
            browser.storage.local.set({[prop]: options[prop]})
        }
    })
}

export const setDefaultOptions = (): void => {
    setOptions(defaultFigureTextOptions)
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

// TODO: Fix magic number, use regex to find caption text, could be different in custom templates
export const getCaptionTextPosition = (cursorPos: number, options: IFigureTextOptions): [number, number] => {
    const captionStartPosition = cursorPos + options.template.search("Caption");
    const captionEndPosition = captionStartPosition + 7;
    return [captionStartPosition, captionEndPosition];
} 

export const checkFirstRun = async () => {
	const options = await getOptions();
	if (!options || !options.hasRunBefore) {
		setDefaultOptions();
        tryGenerateFolder(defaultFigureTextOptions.assetsFolder)
	}
};

export const generateAssetsFolder = async () => {
	const options = await getOptions();
	const assetsPath = options.assetsFolder;
	tryGenerateFolder(assetsPath)
};

export const tryGenerateFolder = async (folder: string) => {
	if (!findEntityByPath(folder)) {
		try {
			createFolder(folder);
		} catch (e) {
			console.log("Failed to generate folder:", e);
		}
	}
};
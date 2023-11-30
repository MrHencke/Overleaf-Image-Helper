export interface IFigureTextOptions {
    hasRunBefore: boolean,
	template: string,
	hashReplaceName: string,
	assetsFolder: string,
	copyNameToClipboard: boolean,
}

const defaultTemplate = `\\begin{figure}[H]
	\\centering
	\\includegraphics[width=0.66\\textwidth]{assets/PICTURENAME.png}
	\\caption{}
	\\label{fig:PICTURENAME}
\\end{figure}`;

export const defaultFigureTextOptions: IFigureTextOptions = {
	hasRunBefore: true,
	template: defaultTemplate,
	hashReplaceName: 'PICTURENAME',
	assetsFolder: 'assets',
	copyNameToClipboard: true,
}

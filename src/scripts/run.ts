import { checkFirstRun, getFigureText, getOptions } from '../common/util/optionsUtils.js';
import { uploadImage } from '../common/util/api.js';
import { cm6, cmInsert, cursorPos } from '../common/util/windowUtils.js';
import { sha256FromImage } from '../common/util/shaUtils.js';

checkFirstRun();

export const injectPasteEventListener = () => {

const editor = document.querySelector('.editor');

editor!.addEventListener('paste', async (e) => {
	e.stopPropagation();
	const images = getClipboardImages(e);
	const options = await getOptions();
	for (const image of images) {
		const hash = await sha256FromImage(image);
		const insertText = getFigureText(hash, options);
		const cPos = cursorPos()
		cmInsert(cPos, insertText);
		await uploadImage(image, hash);
		if(options.copyNameToClipboard){
			const matches = insertText.match(/(?<=\\label\{)(.*?)(?=\})/)
			if(matches.length > 0)
				navigator.clipboard.writeText(matches[0]);
		}
	}
}, true)}

const getClipboardImages = (e: Event): File[] => {
	const event = e as ClipboardEvent;
	if (!event.clipboardData) return [];
	const items = Array.from(event.clipboardData.items);
	return items.flatMap((item) => {
		const file = item.getAsFile();
		return item.type.startsWith('image') && file ? file : [];
	});
};

(() => {
	try {
		const retry = setInterval(() => {
			if (!cm6()) return;
			clearInterval(retry);
			injectPasteEventListener()
		}, 500);
	} catch (e) {
		console.log("Failed to inject script", e);
	}
})();
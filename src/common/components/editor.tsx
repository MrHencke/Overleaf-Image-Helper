import { JSX } from 'solid-js/jsx-runtime';
import '../styles/editor.css';
import { onMount } from 'solid-js';
import { KbEvent } from '../interface/kbEvent.type';

interface EditorProps {
	value: string;
	onChange: JSX.ChangeEventHandlerUnion<HTMLTextAreaElement, Event>;
}

const Editor = ({ value, onChange }: EditorProps) => {
	let lineNumbers: HTMLDivElement;

	const setLineNumbers = (inputString: string) => {
		const numberOfLines = inputString.split('\n').length;
		lineNumbers.innerHTML = Array(numberOfLines).fill('<span></span>').join('');
	};

	const handleKeyUp = (e: KbEvent) => setLineNumbers(e.currentTarget.value);

	const handleTab = (e: KbEvent) => {
		if (e.key !== 'Tab') return;
		e.preventDefault();
		const start = e.currentTarget.selectionStart;
		const end = e.currentTarget.selectionEnd;

		e.currentTarget.value =
			e.currentTarget.value.substring(0, start) + '\t' + e.currentTarget.value.substring(end);
		e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1;
	};

	onMount(() => setLineNumbers(value));
	return (
		<div class='editor'>
			<div class='line-numbers' ref={(el) => (lineNumbers = el)}></div>
			<textarea
				class='nmb'
				id='editor-box'
				name='template'
				value={value}
				onKeyUp={handleKeyUp}
				onKeyDown={handleTab}
				onChange={onChange}
			></textarea>
		</div>
	);
};

export default Editor;

import { Match, Switch, createResource } from 'solid-js';
import '../styles/popup.css';
import '../styles/milligram.css';
import Editor from './editor';
import { getOptions, setOptions } from '../util/optionsUtils';

const OptionsPanel = () => {
	const [opts, { mutate }] = createResource(getOptions);

	return (
		<div class='popup-container'>
			<h2>Overleaf Image Paste Options</h2>
			<Switch fallback={<p>Something went wrong.</p>}>
				<Match when={typeof opts() !== 'undefined'}>
					<form onsubmit={(e) => e.preventDefault()}>
						<fieldset>
							<label for='assetsFolder'>Asset folder</label>
							<div style='width: 100%;'>
								<input
									class='nmb'
									type='text'
									id='assetsFolder'
									name='assetsFolder'
									value={opts()!.assetsFolder}
									onChange={(e) =>
										mutate((prev) =>
											prev
												? { ...prev, [e.target.name]: e.target.value }
												: prev
										)
									}
								/>
								<div class='form-hint'>
									Renaming assets folder will NOT move existing assets.
								</div>
							</div>
							<label for='copyNameToClipboard'>Copy Name To Clipboard</label>
							<div style='width: 100%;'>
								<input
									class='nmb'
									type='checkbox'
									id='copyNameToClipboard'
									name='copyNameToClipboard'
									checked={opts().copyNameToClipboard}
									onClick={(e) =>
										mutate((prev) =>
											prev
												? {
														...prev,
														[e.currentTarget.name]:
															!prev.copyNameToClipboard,
												  }
												: prev
										)
									}
								/>
								<div class='form-hint'>
									If checked, the name of your file is written to clipboard, for
									easy referencing.
								</div>
							</div>
							<label for='template'>Template</label>
							<Editor
								value={opts()!.template}
								onChange={(e) =>
									mutate((prev) =>
										prev ? { ...prev, [e.target.name]: e.target.value } : prev
									)
								}
							/>
							<div class='form-hint'>
								"PICTURENAME" will be replaced by the image name, remember to keep
								it in the template.
							</div>

							<div class='vcenter'>
								<button
									onclick={() => {
										setOptions(opts());
										window.close();
									}}
								>
									Save Changes
								</button>
							</div>
						</fieldset>
					</form>
				</Match>
				<Match when={opts.loading}>
					<p>Loading...</p>
				</Match>
			</Switch>
		</div>
	);
};

export default OptionsPanel;

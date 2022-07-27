export interface FormEnhanceOption<T> {
	pending?: (form: HTMLFormElement, uploadProgress: number) => void;
	result?: (form: HTMLFormElement, data?: T, error?: Error) => void;
	xhr?: XMLHttpRequest;
}

export function enhance<T = unknown>(
	form: HTMLFormElement,
	options?: FormEnhanceOption<T>
): SvelteActionReturnType {
	const { pending, result, xhr = new XMLHttpRequest() } = options ?? {};
	let submitting = false;

	function load() {
		if (xhr.status >= 200 && xhr.status < 400) {
			const data = JSON.parse(xhr.responseText);
			result?.(form, data);
		} else {
			throw new Error(xhr.responseText);
		}
		submitting = false;
	}

	function uploadProgress(e: ProgressEvent<EventTarget>) {
		const progress = Math.ceil((e.loaded / e.total) * 100);
		pending?.(form, progress);
	}

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (submitting) return;
		try {
			pending?.(form, 0);
			xhr.open(form.method, form.action, true);
			xhr.setRequestHeader('accept', 'application/json');
			xhr.addEventListener('load', load);
			xhr.upload.addEventListener('progress', uploadProgress);
			xhr.send(new FormData(form));
			submitting = true;
		} catch (e) {
			console.error(e);
			const err = e instanceof Error ? e : new Error(JSON.stringify(e))
			result?.(form, undefined, err);
		}
	}

	form.addEventListener('submit', submit);
	return {
		destroy() {
			xhr.abort();
			form.removeEventListener('submit', submit);
			xhr.removeEventListener('load', load);
			xhr.upload.removeEventListener('progress', uploadProgress);
		}
	};
}

import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { enhance, type FormEnhanceOption } from './form';

interface FormEnhanceStore<T> {
	pending: boolean;
	uploadProgress: number;
	data?: T;
	error?: Error;
}

export function createFormEnhanceStore<T>() {
	const { subscribe, update } = writable<FormEnhanceStore<T>>({
		pending: false,
		uploadProgress: 0
	});
	let xhr: XMLHttpRequest;

	function form(form: HTMLFormElement) {
		if (!browser) return enhance(form);
		xhr = new XMLHttpRequest();
		const options: FormEnhanceOption<T> = {
			pending(_, up) {
				update((old) => ({ ...old, pending: true, uploadProgress: up }));
			},
			result(_, data, error) {
				update((old) => ({ ...old, pending: false, data, error }));
			},
			xhr
		};
		return enhance(form, options);
	}

	function abort() {
		xhr?.abort();
		update((old) => ({ ...old, pending: false }));
	}

	return { subscribe, form, abort };
}

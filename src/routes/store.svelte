<script lang="ts">
	import { createFormEnhanceStore } from '$lib/form-store';

	const formStore = createFormEnhanceStore<{ message: string | undefined }>();
</script>

<main>
	<section>
		<h1>Example form enhance store</h1>
		<form use:formStore.form action="/store" method="post">
			<section>
				<label>
					<span>Name:</span>
					<input type="text" name="name" required />
				</label>
				<label>
					<input type="file" name="file" required />
				</label>
			</section>
			<section>
				<progress max="100" value={$formStore.uploadProgress} />
			</section>
			<section>
				<button type="button" on:click={formStore.abort}>Cancel</button>
				<button type="submit">Upload</button>
			</section>
		</form>

		<p>{$formStore.pending ? 'Uploading...' : $formStore.data?.message ?? ''}</p>
	</section>
	<section>
		<a href="/">Go to example form enhance</a>
	</section>
</main>

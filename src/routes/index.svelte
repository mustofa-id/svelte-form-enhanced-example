<script lang="ts">
	import { enhance, type FormEnhanceOption } from '$lib/form';

	let message: string | undefined;

	const formOptions: FormEnhanceOption<{ message?: string }> = {
		pending: () => {
			message = 'Please wait...';
		},
		result: (_, data) => {
			message = data?.message;
		}
	};
</script>

<main>
	<section>
		<h1>Example form enhance</h1>
		<form use:enhance={formOptions} action="/" method="post">
			<label>
				<span>Username:</span>
				<input type="text" name="username" required />
			</label>
			<label>
				<span>Password:</span>
				<input type="password" name="password" required />
			</label>
			<button type="submit">Login</button>
		</form>

		{#if message}
			<p>{message}</p>
		{/if}
	</section>
	<section>
		<a href="/store">Go to example form enhance store</a>
	</section>
</main>

<script lang="ts">
	import { Dashboard, DashboardModal, DragDrop, ProgressBar } from '@batooty/svelte'
	import batooty from '@batooty/core'
	import Webcam from '@batooty/webcam'
	import XHRUpload from '@batooty/xhr-upload'

	const createbatooty = () => {
		return new batooty().use(Webcam).use(XHRUpload, {
			bundle: true,
			endpoint: 'http://localhost:9967/upload',
			allowedMetaFields: ['something'],
			fieldName: 'files',
		})
	}

	let batooty1 = createbatooty()
	let batooty2 = createbatooty()

	let open = false;
	let showInlineDashboard = true;
</script>

<main>
	<h1>Welcome to the <code>@batooty/svelte</code> demo!</h1>
	<h2>Inline Dashboard</h2>
	<label>
      <input
        type="checkbox"
				bind:checked={showInlineDashboard}
			/>
      Show Dashboard
	</label>
	{#if showInlineDashboard}
		<Dashboard
			batooty={batooty1}
			plugins={['Webcam']}
		/>
	{/if}
	<h2>Modal Dashboard</h2>
	<div>
		<button on:click={() => open = true}>Show Dashboard</button>
		<DashboardModal
			batooty={batooty2}
			open={open}
			props={{
				onRequestCloseModal: () => open = false,
				plugins: ['Webcam']
			}}
		/>
	</div>

	<h2>Drag Drop Area</h2>
	<DragDrop
		batooty={batooty1}
	/>

	<h2>Progress Bar</h2>
	<ProgressBar
		batooty={batooty1}
		props={{
			hideAfterFinish: false
		}}
	/>
</main>
<style global>
	@import "@batooty/core/dist/style.min.css";
	@import "@batooty/dashboard/dist/style.min.css";
	@import "@batooty/drag-drop/dist/style.min.css";
	@import "@batooty/progress-bar/dist/style.min.css";
	input[type="checkbox"] {
		user-select: none;
	}
</style>

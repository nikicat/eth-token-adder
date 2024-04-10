<script lang="ts">
	import { page } from '$app/stores';
	import { base } from "$app/paths";

    const inactiveTab = "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
	const activeTab = "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500";

    export let path: string;
    $: active = $page.url.pathname === path;
</script>

<li class="me-2" aria-current={active ? 'page' : undefined}>
    <a href="{base}/" class={active ? activeTab : inactiveTab}><slot /></a>
</li>
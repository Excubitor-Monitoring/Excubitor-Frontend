import { writable } from 'svelte/store';

export const host = writable(null);

export const host_config = writable({});

export const current_plugin = writable(null);
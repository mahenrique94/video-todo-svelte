import { writable } from 'svelte/store'

const tasks = writable([])

export { tasks }
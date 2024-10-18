import { writable } from "svelte/store"
import { pb } from "$lib/pocketbase"

// Create a writable store to hold the user state
export const user = writable(pb.authStore.model || null)

import AlbertsonsClaim from './AlbertsonsClaim.svelte'
import UserscriptMeta from '$util/metadata'
import { assertQuery } from '$util/assert'

export const target = assertQuery('.title-bg', 'failed to find target element!')
target.style.display = 'flex'
export const app = new AlbertsonsClaim({
  props: {
    meta: UserscriptMeta.parse(),
  },
  target,
})

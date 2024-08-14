import KHInsiderDL from './KHInsiderDL.svelte'
import UserscriptMeta from '$util/metadata'
import { assertQuery } from '$util/assert'

/** target element */
export const target = assertQuery<HTMLDivElement>(
  '.albumMassDownload',
  'failed to find target element!',
)
target.innerHTML = ''
target.style.marginBottom = '1.2rem'
/** svelte application */
export const app = new KHInsiderDL({
  props: {
    album: assertQuery('#pageContent > h2', 'failed to find album title!'),
    audio: assertQuery('audio', 'failed to find audio element!'),
    meta: UserscriptMeta.parse(),
  },
  target,
})

import { assertQuery } from '$util/assert'
import UserscriptMeta from '$util/metadata'
import GitHubDl from './GitHubDL.svelte'

export const target = assertQuery('.user-following-container', 'failed to find target element!')
export const app = new GitHubDl({
  props: {
    meta: UserscriptMeta.parse(),
    username: assertQuery('.AppHeader-context-item-label', 'failed to find username element!')
      .innerText,
  },
  target,
})

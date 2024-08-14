<script context="module" lang="ts">
  /** GitHub API repository */
  export interface Repository {
    id: number
    name: string
    archive_url: string
    html_url: string
    fork: boolean
  }
</script>

<script lang="ts">
  import style, { styleSerialize } from '$action/style'
  import type UserscriptMeta from '$util/metadata'

  export let meta: UserscriptMeta
  export let username: string

  const BRANCH = meta?.['config.branch'] ?? ''
  const FORMAT = meta?.['config.format'] ?? 'zipball'
  const LOG_STYLES = styleSerialize({ color: '#a6e22a', background: '#000' })

  console.log(`%c[${meta.name}]:`, LOG_STYLES, `initialized ${meta.name} v${meta.version}`)
  if (FORMAT !== 'zipball' && FORMAT !== 'tarball') {
    throw new Error(`unsupported download format '${FORMAT}'!`)
  }

  /** Download github repositories */
  const download = async (): Promise<void> => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`)
    if (!res.ok) {
      throw new Error(`[${res.status}]: failed to fetch repositories! ${res.statusText}`)
    }
    ;((await res.json()) as Repository[]).forEach((repo) => {
      if (repo.fork && meta?.['config.skip-forks'] === true) {
        return
      }
      console.log(`  - downloading repository '${repo.name}' ${repo.html_url}`)
      GM_download({
        name: `${repo.name}.${FORMAT === 'zipball' ? 'zip' : 'tar.gz'}`,
        url: repo.archive_url.replace('{archive_format}', FORMAT).replace('{/ref}', BRANCH),
      })
    })
  }
</script>

<div use:style={{ marginTop: '0.5rem' }}>
  <button on:click={download} class="btn btn-block">Download</button>
  <div
    use:style={{ margin: '0.3rem 0', textAlign: 'center' }}
    title="created by {meta.author ?? '???'}"
  >
    <a href={meta.namespace} rel="noopener noreferrer" target="_blank">{meta.name}</a>
    <span>v{meta.version}</span>
  </div>
</div>

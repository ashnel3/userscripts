<script lang="ts">
  import style, { styleSerialize } from '$action/style'
  import type UserscriptMeta from '$util/metadata'

  /** Album title element */
  export let album: HTMLHeadingElement
  /** Audio player element */
  export let audio: HTMLAudioElement
  /** UserScript metadata */
  export let meta: UserscriptMeta

  const FORMAT_COVER: string = meta['config.cover-format'] ?? 'cover ({index}).{ext}'
  const FORMAT_TRACK: string = meta['config.track-format'] ?? '({index}) {title} - {album}.{ext}'
  const LOG_STYLES = styleSerialize({ color: '#a6e22a', background: '#000' })

  console.log(`%c[${meta.name}]:`, LOG_STYLES, `initialized ${meta.name} v${meta.version}`)

  /**
   * escape & format filename
   * @param t    template
   * @param i    index
   * @param ext  file extension
   * @returns    filename
   */
  const filename = (template: string, index: number, ext: string): string =>
    template
      .replace('{index}', index.toString())
      .replace('{album}', album.innerText)
      .replace('{ext}', ext)
      .replace(/[/\\:?!*"|<>]/, '')

  /** Download khinsider album */
  const download = () => {
    console.log(`%c[${meta.name}]:`, LOG_STYLES, `downloading album '${album.innerText}'!`)
    // download images
    document.querySelectorAll<HTMLLinkElement>('.albumImage > a').forEach((a, i) => {
      GM_download({
        name: filename(FORMAT_COVER, i + 1, a.href.split('.').pop() as string),
        url: a.href,
      })
    })
    // download tracks
    document
      .querySelectorAll<HTMLTableRowElement>('#songlist > tbody > tr:not(#songlist_header)')
      .forEach((tr, i) => {
        const a = tr.querySelector<HTMLAnchorElement>('.clickable-row > a')
        const play = tr.querySelector<HTMLAnchorElement>('.playTrack')
        if (a !== null && play !== null) {
          play.click()
          GM_download({
            name: filename(FORMAT_TRACK, i + 1, 'mp3').replace('{title}', a.innerText),
            url: audio.src,
          })
        }
      })
    audio.pause()
  }
</script>

<button
  on:click={download}
  use:style={{
    display: 'flex',
    height: '100%',
    float: 'left',
    padding: '0 0.5rem',
    alignItems: 'center',
    gap: '0.25rem',
  }}
>
  <i use:style={{ color: 'blue', paddingTop: '0px' }} class="material-icons">file_download</i>
  <b>Download Album</b>
</button>
<span use:style={{ float: 'right' }}>
  <p title="created by {meta.author ?? '???'}">
    <a href={meta.namespace} rel="noopener noreferrer" target="_blank">{meta.name}</a>
    <span>v{meta.version}</span>
  </p>
</span>

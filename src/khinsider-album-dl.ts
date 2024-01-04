import { assertElement } from './util/assert'
import { createElement } from './util/element'

/**
 * Create album download button
 * @param massDownload  AlbumMassDownload element
 * @returns             Download button element
 */
const createDownloadButton = (massDownload: HTMLElement): HTMLButtonElement => {
  const button = createElement('button', {
    children: [
      {
        tagName: 'b',
        innerText: 'Download Album',
      },
      {
        tagName: 'i',
        classlist: ['material-icons'],
        innerText: 'file_download',
        styles: {
          color: 'blue',
          'padding-top': '0px',
        },
      },
    ],
    styles: {
      display: 'flex',
      'padding-left': '0.5rem',
      gap: '0.3rem',
      'align-items': 'center',
      'justify-content': 'center',
    },
  })
  massDownload.innerHTML = ''
  massDownload.style.marginBottom = '1.25em'
  massDownload.appendChild(button)
  return button
}

// main
void (async () => {
  const audio = assertElement<HTMLAudioElement>('audio', 'Failed to find audio element!')
  const button = createDownloadButton(
    assertElement('.albumMassDownload', 'Failed to find albumMassDownload element!'),
  )
  // button click event
  button.addEventListener('click', () => {
    const songlist = document.querySelectorAll<HTMLElement>('#songlist > tbody > tr')
    songlist.forEach((tr, i) => {
      const a = tr.querySelector<HTMLAnchorElement>('.clickable-row > a')
      const play = tr.querySelector<HTMLAnchorElement>('.playTrack')
      if (a === null || play === null || tr.id === 'songlist_header') {
        return
      }
      play.click()
      GM_download({
        name: `${i} - ${a.innerText}.mp3`,
        url: audio.src,
      })
    })
    audio.pause()
  })
})()

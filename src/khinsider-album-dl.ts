import { assertElement } from './util/assert'
import { createElement } from './util/element'

/** Audio player element */
const audio = assertElement<HTMLAudioElement>('audio')
/** Parent div */
const parent = assertElement('.albumMassDownload')
/** Download all button */
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
button.addEventListener('click', () => {
  document.querySelectorAll<HTMLTableRowElement>('#songlist > tbody > tr').forEach((tr, i) => {
    const a = tr.querySelector<HTMLAnchorElement>('.clickable-row > a')
    const play = tr.querySelector<HTMLAnchorElement>('.playTrack')
    if (a !== null && play !== null && tr.id !== 'songlist_header') {
      play.click()
      GM_download({
        name: `${i} - ${a.innerText}.mp3`,
        url: audio.src,
      })
    }
  })
  audio.pause()
})
parent.innerHTML = ''
parent.style.marginBottom = '1rem'
parent.appendChild(button)
console.log('%c[khinsider-album-dl]:', 'color: #1f78ff', 'initialized!')

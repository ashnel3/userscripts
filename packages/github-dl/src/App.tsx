import { useEffect } from 'preact/hooks'
import { useFetch } from '@userscripts/lib/hook/fetch'
import type { Repository } from './types'

// assets
import IconDownload from '~icons/mdi/download'
import css from './App.css?raw'

// TODO: organization downloads
// TODO: ssh copy to clipboard

export const FORMATS: Record<string, string> = {
  zipball: '.zip',
  tarball: '.tar.gz',
}

// TODO: organization downloads
// TODO: ssh copy to clipboard

/**
 * GithubDL Application
 * @returns - react element
 */
export const App = () => {
  const username = location.pathname.substring(1)
  const {
    error,
    loading,
    data = [],
  } = useFetch<Repository[]>(`https://api.github.com/users/${username}/repos`)
  const disabled = loading || error

  // component un/mount effect
  useEffect(() => {
    const style = GM_addStyle(css)
    return () => {
      style.remove()
    }
  }, [])

  /**
   * handle form submit
   * @private
   * @param event
   */
  const onSubmit = (event: SubmitEvent): void => {
    event.preventDefault()
    const formdata = new FormData(event.target as HTMLFormElement)
    const format = (formdata.get('format') as string) || 'zipball'
    const forks = formdata.get('forks') === 'on'
    data.forEach((repo) => {
      if (forks || !repo.fork) {
        console.log(`downloading repository "${repo.name}" ${repo.html_url}`)
        GM_download({
          name: repo.name + FORMATS[format],
          url: repo.archive_url
            .replace('{archive_format}', format)
            .replace('{/ref}', repo.default_branch),
        })
      }
    })
  }

  return (
    <form
      action="?"
      className="ashnel3 github-dl"
      onSubmit={onSubmit}
      title={`${GM_info.script.name} v${GM_info.script.version}`}
    >
      <div className="github-dl-error">
        <span>{error?.toString()}</span>
      </div>
      <div className="github-dl-menu">
        <label title="allow downloading forks.">
          <span>Forks:</span>
          <input checked disabled={disabled} name="forks" type="checkbox" />
        </label>
        <select disabled={disabled} className="btn" name="format" title="output archive format.">
          {Object.keys(FORMATS).map((ext) => (
            <option value={ext}>{ext}</option>
          ))}
        </select>
        <button disabled={disabled} className="btn" type="submit">
          <span>({data.length ?? '??'})</span>
          <IconDownload />
        </button>
      </div>
    </form>
  )
}

export default App

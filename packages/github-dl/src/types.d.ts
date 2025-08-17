import '@userscripts/lib/types/client'

/** Github API repository */
export interface Repository {
  archive_url: string
  default_branch: string
  git_url: string
  html_url: string
  name: string
  fork: boolean
}

import App from './App'
import { render } from 'preact'
import { querySelector } from '@userscripts/lib/assert'

console.log('initializing...')

render(
  <App />,
  querySelector(
    '.js-profile-editable-replace .user-following-container',
    'failed to find target element!',
  ),
)

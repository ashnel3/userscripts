import App from './App'
import * as Preact from 'preact'
import * as assert from '@userscripts/lib/assert'
import log from '@userscripts/lib/log'

log('initializing...')

Preact.render(
  <App />,
  assert.querySelector(
    '.js-profile-editable-replace .user-following-container',
    'failed to find target element!',
  ),
)

import App from './App'
import * as Preact from 'preact'
import * as assert from '@util/assert'
import log from '@util/log'

log('initializing...')

Preact.render(
  <App />,
  assert.querySelector(
    '.js-profile-editable-replace .user-following-container',
    'failed to find target element!',
  ),
)

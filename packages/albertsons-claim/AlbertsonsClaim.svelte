<script lang="ts">
  import style from '$action/style'
  import type UserscriptMeta from '$util/metadata'

  export let meta: UserscriptMeta

  const claim = (): void => {
    Array.from(document.querySelectorAll<HTMLButtonElement>('.btn'))
      .filter((btn) => btn.id.startsWith('couponAddBtn'))
      .forEach((btn) => btn.click())
  }
</script>

<button
  on:click={claim}
  use:style={{ height: '1.5rem', margin: 'auto 0' }}
  class="claim-all btn btn-md btn-primary"
  title="{meta.name} v{meta.version}"
>
  claim all
</button>

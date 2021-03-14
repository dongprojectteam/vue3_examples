<template>
  <div class="p-4">
    <header>
      <h4 class="font-italic">
        <slot name="header"></slot>
      </h4>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"><hr /></slot>
    </footer>
  </div>
</template>

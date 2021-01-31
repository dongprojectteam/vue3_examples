<template>
  <button
    v-bind="$attrs"
    :type="type"
    :class="classes"
    ref="button"
    v-on="type == 'switch' ? { click: onClick } : {}"
  >
    <slot></slot>
  </button>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  props: {
    type: {
      default: 'button',
      validator: (value) => {
        // 실전 연습 - switch 추가
        const allowed = ['button', 'submit', 'reset', 'switch']
        return allowed.includes(value)
      },
    },
    sm: Boolean,
    md: {
      type: Boolean,
      default: true,
    },
    lg: Boolean,
    pill: Boolean,
    // 실전 연습 - swtich 값 추가
    active: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:active'],
  setup(props, context) {
    const classes = ref([])
    const button = ref(null)
    const active = ref(props.active)

    // Props 로 처리되는 변수들
    if (props.sm) classes.value.push('sm')
    else if (props.lg) classes.value.push('lg')
    else classes.value.push('md')

    if (props.pill) classes.value.push('pill')

    // swtich 를 위한 Props
    const changeBrightness = () => {
      if (props.type == 'switch') {
        if (!active.value) classes.value.push('deactive')
        else classes.value = classes.value.filter((i) => i != 'deactive')
      }
    }
    changeBrightness()

    const onClick = () => {
      active.value = !active.value
      changeBrightness()
      context.emit('update:active', active.value)
    }

    onMounted(() => {
      // Non-props 로 처리되는 변수들
      Object.keys(context.attrs).forEach((attr) => {
        if (attr.startsWith('text-')) {
          button.value.style.color = attr.substring(5)
        }
        if (attr.startsWith('background-')) {
          button.value.style.backgroundColor = attr.substring(11)
        }
      })
    })

    return {
      classes,
      button,
      onClick,
    }
  },
}
</script>

<style scoped>
button {
  outline: none;
}

.sm {
  height: 20px;
  font-size: 13px;
}

.md {
  height: 30px;
  font-size: 22px;
}

.lg {
  height: 40px;
  font-size: 31px;
}

.pill {
  border-radius: 16px;
}

.deactive {
  filter: brightness(50%);
}
</style>

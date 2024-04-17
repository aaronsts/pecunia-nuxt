<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { CalendarCellTrigger, type CalendarCellTriggerProps, useForwardProps } from 'radix-vue'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCellTrigger
    :class="cn(
      buttonVariants({ variant: 'ghost' }),
      'h-9 w-9 p-0 font-normal',
      '[&[data-today]:not([data-selected])]:bg-gray-100 [&[data-today]:not([data-selected])]:text-gray-900 dark:[&[data-today]:not([data-selected])]:bg-gray-800 dark:[&[data-today]:not([data-selected])]:text-gray-50',
      // Selected
      'data-[selected]:bg-gray-900 data-[selected]:text-gray-50 data-[selected]:opacity-100 data-[selected]:hover:bg-gray-900 data-[selected]:hover:text-gray-50 data-[selected]:focus:bg-gray-900 data-[selected]:focus:text-gray-50 dark:data-[selected]:bg-gray-50 dark:data-[selected]:text-gray-900 dark:data-[selected]:hover:bg-gray-50 dark:data-[selected]:hover:text-gray-900 dark:data-[selected]:focus:bg-gray-50 dark:data-[selected]:focus:text-gray-900',
      // Disabled
      'data-[disabled]:text-gray-500 data-[disabled]:opacity-50 dark:data-[disabled]:text-gray-400',
      // Unavailable
      'data-[unavailable]:text-gray-50 data-[unavailable]:line-through dark:data-[unavailable]:text-gray-50',
      // Outside months
      'data-[outside-month]:pointer-events-none data-[outside-month]:text-gray-500 data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-gray-100/50 [&[data-outside-month][data-selected]]:text-gray-500 [&[data-outside-month][data-selected]]:opacity-30 dark:data-[outside-month]:text-gray-400 dark:[&[data-outside-month][data-selected]]:bg-gray-800/50 dark:[&[data-outside-month][data-selected]]:text-gray-400',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>

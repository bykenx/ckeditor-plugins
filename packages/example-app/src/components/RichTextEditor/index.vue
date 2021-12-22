<template>
  <div class="RichTextEditor">
    <CKEditor.component
      :editor="ClassicEditor"
      :config="editorConfig"
      :modelValue="modelValue"
      @ready="handleReady"
      @input="handleInput"
    />
  </div>
</template>
<script setup lang="ts">
  import { computed, ref, unref, watch } from 'vue'
  import CKEditor from '@ckeditor/ckeditor5-vue'
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
  import * as VueTypes from 'vue-types'
  import { defaultPlugins, defaultToolbar } from './config'

  const props = defineProps({
    value: VueTypes.string().def(''),
    content: VueTypes.string().def(''),
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:content': VueTypes.func<(content: string) => void>(),
    onUpdateContent: VueTypes.func<(content: string) => void>(),
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': VueTypes.func<(content: string) => void>(),
    onUpdateValue: VueTypes.func<(content: string) => void>(),
    placeholder: VueTypes.string().def('请输入内容'),
    externalToolbar: VueTypes.array<any>().def([]),
    extraPlugins: VueTypes.array<any>().def([]),
  })

  const ready = ref(false)
  const modelValue = ref('')

  const editorConfig = computed(() => {
    return {
      toolbar: [...defaultToolbar, ...props.externalToolbar],
      extraPlugins: [...defaultPlugins, ...props.extraPlugins],
      placeholder: props.placeholder,
      language: 'zh-cn',
      qiniuUpload: {
        // TODO: 这里需要改成自己的七牛云配置的域名
        domain: 'http://example.com',
        getToken: (file: any) => {
          // TODO: 添加获取token的逻辑
          return 'token-string'
        },
      },
    }
  })

  const handleReady = (editor: any) => {
    ready.value = true
  }

  watch([ready, () => props.value, () => props.content], ([ready, value, content]) => {
    content = value || content
    if (ready && content !== unref(modelValue)) {
      modelValue.value = content
    }
  })

  const handleInput = (content: any) => {
    modelValue.value = content
    props['onUpdate:content']?.(content)
    props.onUpdateContent?.(content)
    props['onUpdate:value']?.(content)
    props.onUpdateValue?.(content)
  }
</script>

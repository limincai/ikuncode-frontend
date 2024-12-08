<template>
  <a-result status="error" title="No internet ">
    <template #icon>
      <IconFaceFrownFill />
    </template>
    <template #subtitle> DNS_PROBE_FINISHED_NO_INTERNET</template>
    <a-typography style="background: var(--color-fill-2); padding: 24px">
      <a-typography-paragraph>Try:</a-typography-paragraph>
      <ul>
        <li>Checking the network cables, modem, and router</li>
        <li>Reconnecting to Wi-Fi</li>
      </ul>
    </a-typography>
  </a-result>
</template>

<script setup>
import { IconFaceFrownFill } from "@arco-design/web-vue/es/icon";
</script>

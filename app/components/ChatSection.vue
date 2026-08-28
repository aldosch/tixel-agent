<script setup lang="ts">
const { data, status, send, error } = useEveAgent();

const input = ref('');
const scrollContainer = ref<HTMLElement | null>(null);

const isBusy = computed(
  () => status.value === 'submitted' || status.value === 'streaming',
);
const isDisabled = computed(() => isBusy.value || status.value === 'resuming');

const messages = computed(() => data.value?.messages ?? []);

async function handleSubmit() {
  const text = input.value.trim();
  if (!text || isDisabled.value) return;
  input.value = '';
  await send(text);
}

const suggestions = [
  'How much are Harry Styles tickets?',
  'What is the cheapest ticket for Foo Fighters?',
  'Are there any AFL tickets available?',
  'What is the price range for Beyond the Valley?',
];

async function useSuggestion(suggestion: string) {
  if (isDisabled.value) return;
  await send(suggestion);
}

watch(
  () => messages.value.length,
  async () => {
    await nextTick();
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
  },
);
</script>

<template>
  <section class="chat-section">
    <div class="chat-header">
      <span class="chat-badge">AI</span>
      <div>
        <h2 class="chat-title">Ask Tixel AI</h2>
        <p class="chat-subtitle">Check ticket prices and event info instantly</p>
      </div>
    </div>

    <div ref="scrollContainer" class="chat-messages">
      <div v-if="messages.length === 0" class="chat-empty">
        <p class="chat-empty-text">Ask me about ticket prices for any event!</p>
        <div class="suggestion-chips">
          <button
            v-for="s in suggestions"
            :key="s"
            class="suggestion-chip"
            :disabled="isDisabled"
            @click="useSuggestion(s)"
          >
            {{ s }}
          </button>
        </div>
      </div>

      <div
        v-for="message in messages"
        :key="message.id"
        class="message"
        :class="message.role"
      >
        <div class="message-avatar">
          {{ message.role === 'user' ? '🧑' : '🎫' }}
        </div>
        <div class="message-content">
          <template v-for="(part, i) in message.parts" :key="i">
            <p v-if="part.type === 'text'" class="message-text">{{ part.text }}</p>
            <div v-else-if="part.type === 'dynamic-tool'" class="tool-indicator">
              <span class="tool-icon">🔧</span>
              <span class="tool-name">{{ part.toolName }}</span>
              <span v-if="part.state" class="tool-state">{{ part.state }}</span>
            </div>
          </template>
        </div>
      </div>

      <div v-if="isBusy" class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <p v-if="error" class="chat-error">{{ error.message }}</p>
    </div>

    <form class="chat-input-form" @submit.prevent="handleSubmit">
      <input
        v-model="input"
        type="text"
        placeholder="Ask about ticket prices..."
        class="chat-input"
        :disabled="isDisabled"
      />
      <button
        type="submit"
        class="chat-send"
        :disabled="!input.trim() || isDisabled"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      </button>
    </form>
  </section>
</template>

<style scoped>
.chat-section {
  margin: 3rem 0;
  border: 1px solid var(--tixel-border);
  border-radius: 20px;
  overflow: hidden;
  background: var(--tixel-white);
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  background: var(--tixel-dark);
  color: var(--tixel-white);
}

.chat-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--tixel-pink), var(--tixel-orange));
  font-weight: 800;
  font-size: 0.85rem;
}

.chat-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--tixel-white);
}

.chat-subtitle {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.chat-messages {
  height: 400px;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  background: var(--tixel-bg-light);
}

.chat-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 1rem;
  text-align: center;
}

.chat-empty-text {
  color: var(--tixel-text-light);
  font-size: 1rem;
}

.suggestion-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  max-width: 500px;
}

.suggestion-chip {
  background: var(--tixel-white);
  border: 1px solid var(--tixel-border);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  color: var(--tixel-text);
  transition: all 0.15s ease;
}

.suggestion-chip:hover:not(:disabled) {
  border-color: var(--tixel-orange);
  color: var(--tixel-orange);
}

.suggestion-chip:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.message {
  display: flex;
  gap: 0.625rem;
  max-width: 85%;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  background: var(--tixel-white);
  border: 1px solid var(--tixel-border);
}

.message-content {
  border-radius: 14px;
  padding: 0.625rem 0.875rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.message.user .message-content {
  background: var(--tixel-orange);
  color: var(--tixel-white);
  border-bottom-right-radius: 4px;
}

.message.assistant .message-content,
.message.tool .message-content {
  background: var(--tixel-white);
  border: 1px solid var(--tixel-border);
  border-bottom-left-radius: 4px;
}

.message-text {
  margin: 0;
}

.message-text + .message-text {
  margin-top: 0.5rem;
}

.tool-indicator {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8rem;
  color: var(--tixel-text-light);
  padding: 0.25rem 0;
}

.tool-icon {
  font-size: 0.9rem;
}

.tool-name {
  font-weight: 600;
}

.tool-state {
  color: var(--tixel-pink);
  font-size: 0.75rem;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 0.75rem 1rem;
  align-self: flex-start;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ccc;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

.chat-error {
  color: #e53e3e;
  font-size: 0.85rem;
  padding: 0.5rem;
  background: rgba(229, 62, 62, 0.05);
  border-radius: 8px;
}

.chat-input-form {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--tixel-border);
  background: var(--tixel-white);
}

.chat-input {
  flex: 1;
  border: 1px solid var(--tixel-border);
  border-radius: 999px;
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s ease;
}

.chat-input:focus {
  border-color: var(--tixel-orange);
}

.chat-input:disabled {
  background: var(--tixel-bg-light);
  cursor: not-allowed;
}

.chat-send {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--tixel-orange);
  color: var(--tixel-white);
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.chat-send:hover:not(:disabled) {
  background: #e64d22;
  transform: scale(1.05);
}

.chat-send:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>

<script setup lang="ts">
const searchQuery = ref('');

function handleSearch() {
  if (searchQuery.value.trim()) {
    navigateTo(`/?q=${encodeURIComponent(searchQuery.value)}`);
  }
}
</script>

<template>
  <div class="search-bar">
    <span class="search-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </span>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search for event, artist or venue"
      class="search-input"
      @keyup.enter="handleSearch"
    />
    <button class="search-btn" @click="handleSearch">Search</button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--tixel-white);
  border-radius: 999px;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.search-icon {
  display: flex;
  align-items: center;
  color: var(--tixel-text-light);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--tixel-text);
  background: transparent;
  padding: 0.5rem 0;
}

.search-input::placeholder {
  color: #999;
}

.search-btn {
  background: var(--tixel-orange);
  color: var(--tixel-white);
  padding: 0.625rem 1.5rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
  transition: background 0.2s ease;
}

.search-btn:hover {
  background: #e64d22;
}
</style>

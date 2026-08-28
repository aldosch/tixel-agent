<script setup lang="ts">
interface Event {
  id: string;
  name: string;
  category: string;
  venue: string;
  city: string;
  date: string;
  faceValue: number;
  currency: string;
  listings: number;
  lowestPrice: number;
  highestPrice: number;
  image: string;
}

const props = defineProps<{
  title: string;
  events: Event[];
}>();

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
</script>

<template>
  <section :id="title.toLowerCase()" class="carousel-section">
    <div class="carousel-header">
      <h2 class="carousel-title">{{ title }}</h2>
      <a href="#" class="explore-link">Explore {{ title.toLowerCase() }}</a>
    </div>

    <div class="carousel">
      <div class="carousel-track">
        <div
          v-for="event in events"
          :key="event.id"
          class="event-card"
        >
          <div class="event-image-wrapper">
            <img
              :src="event.image"
              :alt="event.name"
              class="event-image"
              loading="lazy"
            />
          </div>
          <div class="event-info">
            <h3 class="event-name">{{ event.name }}</h3>
            <p class="event-venue">{{ event.venue }} · {{ event.city }}</p>
            <p class="event-date">{{ formatDate(event.date) }}</p>
            <div class="event-pricing">
              <span class="price-label">From</span>
              <span class="price-value">${{ event.lowestPrice.toFixed(2) }}</span>
              <span
                v-if="event.lowestPrice < event.faceValue"
                class="below-face"
              >
                Below face value
              </span>
            </div>
            <p class="event-listings">{{ event.listings }} fans selling tickets</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-section {
  margin-bottom: 2.5rem;
}

.carousel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.carousel-title {
  font-size: 1.75rem;
  font-weight: 800;
}

.explore-link {
  color: var(--tixel-orange);
  font-weight: 600;
  font-size: 0.95rem;
  transition: opacity 0.15s ease;
}

.explore-link:hover {
  opacity: 0.8;
}

.carousel {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}

.carousel-track {
  display: flex;
  gap: 1rem;
  padding-bottom: 0.5rem;
}

.event-card {
  flex: 0 0 240px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--tixel-white);
  border: 1px solid var(--tixel-border);
  transition: all 0.2s ease;
  cursor: pointer;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.event-image-wrapper {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--tixel-bg-light);
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-info {
  padding: 0.875rem;
}

.event-name {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-venue {
  font-size: 0.85rem;
  color: var(--tixel-text-light);
  margin-bottom: 0.125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-date {
  font-size: 0.85rem;
  color: var(--tixel-text-light);
  margin-bottom: 0.5rem;
}

.event-pricing {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.25rem;
}

.price-label {
  font-size: 0.8rem;
  color: var(--tixel-text-light);
}

.price-value {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--tixel-text);
}

.below-face {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--tixel-orange);
  background: rgba(247, 88, 42, 0.1);
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
}

.event-listings {
  font-size: 0.8rem;
  color: var(--tixel-text-light);
}
</style>

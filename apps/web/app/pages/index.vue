<script setup lang="ts">
const { data: ticketData } = await useFetch('/api/ticket-prices');

const concerts = computed(() => ticketData.value?.events.filter(e => e.category === 'music') ?? []);
const festivals = computed(() => ticketData.value?.events.filter(e => e.category === 'festival') ?? []);
const sports = computed(() => ticketData.value?.events.filter(e => e.category === 'sports') ?? []);
const comedy = computed(() => ticketData.value?.events.filter(e => e.category === 'comedy') ?? []);

const categories = [
  { name: 'Music', icon: '🎵', color: 'var(--tixel-pink)', href: '#concerts' },
  { name: 'Festivals', icon: '🎪', color: 'var(--tixel-orange)', href: '#festivals' },
  { name: 'Sports', icon: '🏅', color: 'var(--tixel-yellow)', href: '#sports' },
  { name: 'Comedy', icon: '🎤', color: 'var(--tixel-pink)', href: '#comedy' },
];
</script>

<template>
  <div class="page">
    <TixelHeader />

    <section class="hero">
      <div class="hero-bg" />
      <div class="hero-content">
        <h1 class="hero-title">THE HONEST TICKET EXCHANGE</h1>
        <p class="hero-subtitle">Face value tickets · Buyer guarantee · Excellent on Trustpilot</p>
        <TixelSearch />
      </div>
    </section>

    <main class="main">
      <section class="categories">
        <h2 class="section-title">What's on in Melbourne</h2>
        <div class="category-grid">
          <a
            v-for="cat in categories"
            :key="cat.name"
            :href="cat.href"
            class="category-card"
            :style="{ '--cat-color': cat.color }"
          >
            <span class="category-icon">{{ cat.icon }}</span>
            <span class="category-name">{{ cat.name }}</span>
          </a>
        </div>
      </section>

      <EventCarousel
        v-if="concerts.length"
        id="concerts"
        title="Concerts"
        :events="concerts"
      />

      <EventCarousel
        v-if="festivals.length"
        id="festivals"
        title="Festivals"
        :events="festivals"
      />

      <EventCarousel
        v-if="sports.length"
        id="sports"
        title="Sports"
        :events="sports"
      />

      <section class="sell-cta">
        <div class="sell-cta-content">
          <h2 class="sell-title">Turn spare tickets into cash</h2>
          <p class="sell-text">Our stats show that over 90% of tickets sell within 4 days.</p>
          <button class="sell-btn">Sell your tickets</button>
        </div>
      </section>

      <EventCarousel
        v-if="comedy.length"
        id="comedy"
        title="Comedy"
        :events="comedy"
      />

      <ChatSection />
    </main>

    <TixelFooter />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero {
  position: relative;
  background: var(--tixel-dark);
  padding: 3rem 1.5rem 4rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(241, 126, 214, 0.08), transparent 50%),
              radial-gradient(ellipse at 70% 30%, rgba(247, 88, 42, 0.08), transparent 50%);
}

.hero-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 900;
  color: var(--tixel-white);
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-bottom: 2rem;
}

.main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.categories {
  margin-bottom: 3rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem 1rem;
  border-radius: 16px;
  background: var(--tixel-bg-light);
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.category-card:hover {
  border-color: var(--cat-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.category-icon {
  font-size: 2.5rem;
}

.category-name {
  font-weight: 700;
  font-size: 1.1rem;
}

.sell-cta {
  margin: 3rem 0;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--tixel-dark), var(--tixel-dark-light));
  padding: 3rem 2rem;
  text-align: center;
}

.sell-cta-content {
  max-width: 500px;
  margin: 0 auto;
}

.sell-title {
  color: var(--tixel-white);
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
}

.sell-text {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

.sell-btn {
  background: var(--tixel-orange);
  color: var(--tixel-white);
  padding: 0.875rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1rem;
  transition: transform 0.15s ease;
}

.sell-btn:hover {
  transform: scale(1.03);
}
</style>

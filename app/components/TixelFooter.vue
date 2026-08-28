<script setup lang="ts">
const columns = [
  {
    title: 'Resources',
    links: [
      { label: 'Sell a ticket', href: '/sell' },
      { label: 'About us', href: '/about' },
      { label: 'Help', href: '/help' },
      { label: 'For organisers', href: '/organisers' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Cities',
    links: [
      { label: 'Sydney', href: '/au/discover/Sydney' },
      { label: 'Perth', href: '/au/discover/Perth' },
      { label: 'Brisbane', href: '/au/discover/Brisbane' },
      { label: 'Adelaide', href: '/au/discover/Adelaide' },
    ],
  },
  {
    title: 'Countries',
    links: [
      { label: 'Australia', href: '/au/' },
      { label: 'New Zealand', href: '/nz/' },
      { label: 'United States', href: '/us/' },
      { label: 'United Kingdom', href: '/uk/' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Concerts', href: '/au/discover/music-tickets' },
      { label: 'Festivals', href: '/au/discover/festival-tickets' },
      { label: 'Sports', href: '/au/discover/sports-tickets' },
      { label: 'Comedy', href: '/au/discover/comedy-tickets' },
    ],
  },
];
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <div v-for="col in columns" :key="col.title" class="footer-col">
          <h5 class="footer-title">{{ col.title }}</h5>
          <a
            v-for="link in col.links"
            :key="link.href"
            :href="link.href"
            class="footer-link"
          >
            {{ link.label }}
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">© 2018-2026 Tixel Pty Ltd. ACN 625 710 581</p>
        <div class="socials">
          <span>Facebook</span>
          <span>Twitter</span>
          <span>Instagram</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--tixel-bg-light);
  border-top: 1px solid var(--tixel-border);
  padding: 2.5rem 1.5rem 1.5rem;
  margin-top: 2rem;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.footer-title {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--tixel-text);
  margin-bottom: 0.25rem;
}

.footer-link {
  font-size: 0.9rem;
  color: var(--tixel-text-light);
  transition: color 0.15s ease;
}

.footer-link:hover {
  color: var(--tixel-text);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--tixel-border);
}

.copyright {
  font-size: 0.85rem;
  color: var(--tixel-text-light);
}

.socials {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--tixel-text-light);
}

@media (max-width: 640px) {
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>

<script setup lang="ts">
const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Help', href: '/help' },
  { label: 'Sign in', href: '/login' },
];
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <a href="/" class="logo">
        <svg viewBox="0 0 432 125" width="100" height="29" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor">
            <path d="m218.9 113.2a37.62 37.62 0 0 1-18.8 5.1c-17.1 0-27.4-9.3-27.4-27.4v-26h-12.5v-17.4h12.5v-20.3h21.9v20.3h20.3v17.4h-20.3v23.8c0 7.1 3.4 10 9.2 10a23.33 23.33 0 0 0 10-2.7z" />
            <path d="m249.3 27.2c0 7-5.3 12.2-12.7 12.2s-12.6-5.2-12.6-12.2a12.65 12.65 0 0 1 25.3 0zm-23.7 89v-68.7h21.9v68.7z" />
            <path d="m331.3 116.2h-25.2l-13.1-19.9-13.3 19.9h-25l22.6-33.3-22.6-35.6h25l13.3 21.4 13.1-21.4h25.2l-22.7 35.6z" />
            <path d="m398.2 87.4h-50.4c1.8 8.2 7.4 13.3 14.8 13.3 5.1 0 11-1.2 14.7-7.9l19.4 4c-5.9 14.5-18.3 21.5-34.1 21.5-19.8 0-36.3-14.7-36.3-36.4s16.4-36.4 36.4-36.4c19.4 0 35 14 35.5 36.4zm-50-13.4h28.3c-2.1-7.4-7.5-10.8-13.8-10.8a15.12 15.12 0 0 0-14.5 10.8z" />
            <path d="m404.5 116.2v-98.6h21.9v98.6z" />
          </g>
          <path d="m118.4 81.6-36.8 35.7-42.2-42.4-29.8-29.8 35.8-36.9 35 27.8 3.7 4.5z" fill="#f17ed6" />
          <path d="m81.7 101.1a11.29 11.29 0 0 1 0 16.1 11.29 11.29 0 0 1-16.1 0l-19.9-19.9-19.9 19.9a11.46 11.46 0 1 1-16.2-16.2l19.9-19.9-19.9-19.9a11.46 11.46 0 0 1 16.2-16.2l19.9 19.9 19.9-19.9a11.46 11.46 0 1 1 16.2 16.2l-19.9 19.9z" fill="#f7582a" />
          <path d="m99.1 45 19.3-19.4a12.23 12.23 0 0 0-17.3-17.3l-19.3 19.4-19.4-19.4a12.23 12.23 0 0 0-17.3 17.3l19.4 19.4-19.4 19.4a12.07 12.07 0 0 0 0 17.2 12.19 12.19 0 0 0 17.3 0l19.4-19.4 19.3 19.4a12.07 12.07 0 0 0 17.2 0 12.38 12.38 0 0 0 0-17.3z" fill="#ffc802" />
        </svg>
      </a>

      <nav class="nav">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="nav-link"
        >
          {{ link.label }}
        </a>
        <button class="partner-btn">Partner with us</button>
        <a href="/sell" class="sell-link">
          <button class="sell-nav-btn">Sell your tickets</button>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--tixel-dark);
  border-bottom: 1px solid #2a1a1a;
  color: var(--tixel-white);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 1.5rem;
}

.logo {
  color: var(--tixel-white);
  display: flex;
  align-items: center;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.15s ease;
}

.nav-link:hover {
  color: var(--tixel-white);
}

.partner-btn {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  transition: all 0.15s ease;
}

.partner-btn:hover {
  border-color: rgba(255, 255, 255, 0.5);
  color: var(--tixel-white);
}

.sell-nav-btn {
  background: var(--tixel-orange);
  color: var(--tixel-white);
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: transform 0.15s ease;
}

.sell-nav-btn:hover {
  transform: scale(1.03);
}

@media (max-width: 768px) {
  .nav-link,
  .partner-btn {
    display: none;
  }
}
</style>

const EVENTS = [
  { id: 'harry-styles', name: 'Harry Styles', category: 'music', venue: 'Rod Laver Arena', city: 'Melbourne', date: '2026-12-15', faceValue: 129.50, currency: 'AUD', listings: 23, lowestPrice: 115.00, highestPrice: 180.00, image: 'https://event-images.tixel.com/cdn-cgi/image/w=700,f=webp,q=70/media/images/f7f3e969754fb6d2fb3b0f6087cc95b7_1772593339_8093_square_l.jpg' },
  { id: 'tame-impala', name: 'Tame Impala', category: 'music', venue: 'John Cain Arena', city: 'Melbourne', date: '2026-11-20', faceValue: 149.90, currency: 'AUD', listings: 18, lowestPrice: 140.00, highestPrice: 195.00, image: 'https://event-images.tixel.com/cdn-cgi/image/w=700,f=webp,q=70/media/images/18039f52033ac073c960f5c29e674c0_1762812066_7504_square_l.jpg' },
  { id: 'post-malone', name: 'Post Malone', category: 'music', venue: 'Marvel Stadium', city: 'Melbourne', date: '2026-10-30', faceValue: 159.00, currency: 'AUD', listings: 31, lowestPrice: 135.00, highestPrice: 220.00, image: 'https://event-images.tixel.com/cdn-cgi/image/w=700,f=webp,q=70/media/images/ecbf261900c401b33194550e8fc96de0_1753078882_4023_square_l.jpg' },
  { id: 'robbie-williams', name: 'Robbie Williams', category: 'music', venue: 'Rod Laver Arena', city: 'Melbourne', date: '2026-11-05', faceValue: 139.50, currency: 'AUD', listings: 12, lowestPrice: 120.00, highestPrice: 175.00, image: 'https://event-images.tixel.com/cdn-cgi/image/w=700,f=webp,q=70/media/images/f58496f939e2700602bd13ccdbf35bde_1753078930_0206_square_l.jpg' },
  { id: 'foo-fighters', name: 'Foo Fighters', category: 'music', venue: 'Marvel Stadium', city: 'Melbourne', date: '2026-12-01', faceValue: 169.00, currency: 'AUD', listings: 28, lowestPrice: 150.00, highestPrice: 240.00, image: 'https://event-images.tixel.com/cdn-cgi/image/w=700,f=webp,q=70/media/images/759db779dbf93893b0806cd8d9208da6_1753078904_1994_square_l.jpg' },
  { id: 'guns-n-roses', name: "Guns N' Roses", category: 'music', venue: 'Marvel Stadium', city: 'Melbourne', date: '2026-11-28', faceValue: 179.50, currency: 'AUD', listings: 35, lowestPrice: 160.00, highestPrice: 280.00, image: 'https://event-images.tixel.com/cdn-cgi/image/w=700,f=webp,q=70/media/images/d1da7dcd70680b1f37e1998388c27686_1753080150_6299_square_l.jpg' },
  { id: 'beyond-the-valley', name: 'Beyond the Valley', category: 'festival', venue: 'Hanging Flats', city: 'Melbourne', date: '2026-12-28', faceValue: 189.00, currency: 'AUD', listings: 45, lowestPrice: 170.00, highestPrice: 250.00, image: 'https://event-images.tixel.com/cdn-cgi/image/w=700,f=webp,q=70/https://public-uploads-production.tixel.com/covers/uLeiyD3FnAF8cfJ9v6nVrwnApma818dRWiB5xbBh.png' },
  { id: 'afl-grand-final', name: 'AFL Grand Final 2026', category: 'sports', venue: 'MCG', city: 'Melbourne', date: '2026-09-26', faceValue: 225.00, currency: 'AUD', listings: 8, lowestPrice: 210.00, highestPrice: 350.00, image: 'https://event-images.tixel.com/cdn-cgi/image/w=700,f=webp,q=70/media/images/74f56dc74220fa9d3285ed19cb096fb8_1723707837_9924_l.jpg' },
  { id: 'dom-dolla', name: 'Dom Dolla', category: 'music', venue: 'Marvel Stadium', city: 'Melbourne', date: '2026-09-24', faceValue: 119.00, currency: 'AUD', listings: 22, lowestPrice: 99.00, highestPrice: 165.00, image: 'https://event-images.tixel.com/cdn-cgi/image/w=700,f=webp,q=70/media/images/a4e7d125b4f5250ab805673b3dff33bf_1779750518_9687_l.jpg' },
  { id: 'josh-thomas', name: 'Josh Thomas', category: 'comedy', venue: 'Comedy Theatre', city: 'Melbourne', date: '2026-10-15', faceValue: 65.00, currency: 'AUD', listings: 5, lowestPrice: 55.00, highestPrice: 75.00, image: 'https://event-images.tixel.com/cdn-cgi/image/w=700,f=webp,q=70/media/images/210da57d59d6c812871850ed3af2665c_1775141085_3215_square_l.jpg' },
];

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const search = (query.q as string || '').toLowerCase().trim();
  const category = query.category as string;

  let results = EVENTS;

  if (search) {
    results = results.filter(
      (e) =>
        e.name.toLowerCase().includes(search) ||
        e.venue.toLowerCase().includes(search) ||
        e.city.toLowerCase().includes(search),
    );
  }

  if (category) {
    results = results.filter((e) => e.category === category);
  }

  return {
    events: results,
    total: results.length,
  };
});

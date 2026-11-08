// Default romantic Diwali wish configuration and URL helpers

export const DEFAULT_WISH = {
  to: "My Love",
  from: "Himadri",
  title: "Happy Diwali, My Brightest Light ✨",
  subtitle: "A special festival celebration made just for you",
  letter: `They say Diwali is the festival of lights—the night when millions of golden diyas chase away the darkest shadows.

Yet, in all honesty, not a single lamp in this entire city shines as bright or as warm as you do in my life.

Thank you for being my constant glow, my favorite peace, and the sweetest reason I smile without trying. On this holy festival of light and new beginnings, I wish your world overflows with endless giggles, boundless warmth, and all the love your heart can hold.

Happy Diwali, meri jaan. May our light never dim.`,
  lanternWish: "To a lifetime of laughter, holding hands, and celebrating every Diwali together.",
  reasons: [
    {
      title: "Your Smile",
      detail: "The way your eyes crinkle and your whole face lights up—it's warmer than a thousand golden diyas.",
      icon: "✨"
    },
    {
      title: "Your Warmth",
      detail: "How simply talking to you turns the most chaotic, tiring day into pure peace.",
      icon: "🕯️"
    },
    {
      title: "My Favorite Pataka",
      detail: "Your bubbly energy, playful drama, and the cute little dances you do when you are happy.",
      icon: "🎆"
    },
    {
      title: "Safe Haven",
      detail: "Knowing that no matter where we go in this world, home is wherever you are beside me.",
      icon: "🪔"
    },
    {
      title: "Our Forever",
      detail: "This Diwali is special, but I cannot wait for the decades of Diwalis we still have to celebrate.",
      icon: "💫"
    }
  ],
  photoUrl: "" // Optional photo URL, if empty a romantic festive SVG mandala / photo placeholder renders
};

// URL query encoder / decoder (supports query params or compressed base64 payload)
export function parseWishFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    
    // Check if full payload is in 'data'
    if (params.has('d')) {
      const decoded = JSON.parse(decodeURIComponent(escape(atob(params.get('d')))));
      return { ...DEFAULT_WISH, ...decoded };
    }

    const wish = { ...DEFAULT_WISH };
    if (params.has('to')) wish.to = params.get('to');
    if (params.has('from')) wish.from = params.get('from');
    if (params.has('msg')) wish.letter = params.get('msg');
    if (params.has('photo')) wish.photoUrl = params.get('photo');
    if (params.has('wish')) wish.lanternWish = params.get('wish');

    return wish;
  } catch (e) {
    console.error('Failed to parse URL wish data, using defaults', e);
    return DEFAULT_WISH;
  }
}

export function encodeWishToUrl(wish) {
  try {
    const json = JSON.stringify(wish);
    const b64 = btoa(unescape(encodeURIComponent(json)));
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('d', b64);
    return url.toString();
  } catch (e) {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('to', wish.to);
    url.searchParams.set('from', wish.from);
    return url.toString();
  }
}


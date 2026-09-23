// Közös validációs szabályok — kliens (SubscribeForm) és szerver
// (api/subscribe route) oldalon egyaránt ebből importálva, hogy a két hely
// sose szakadjon el egymástól.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

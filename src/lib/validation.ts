// Közös validációs szabályok — kliens (SubscribeForm) és szerver
// (api/subscribe route) oldalon egyaránt ebből importálva, hogy a két hely
// sose szakadjon el egymástól.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Az RFC 5321 szerinti maximális email-hossz. */
export const EMAIL_MAX_LENGTH = 254;
export const FIRST_NAME_MAX_LENGTH = 100;

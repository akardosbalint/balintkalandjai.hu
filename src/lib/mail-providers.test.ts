import { describe, expect, it } from "vitest";
import { getEmailDomain, getMailProvider } from "./mail-providers";

describe("getMailProvider", () => {
  it("felismeri a gyakori szolgáltatókat email címből és domainből is", () => {
    expect(getMailProvider("valaki@gmail.com")?.name).toBe("Gmail");
    expect(getMailProvider("gmail.com")?.name).toBe("Gmail");
    expect(getMailProvider("valaki@hotmail.hu")?.name).toBe("Outlook");
    expect(getMailProvider("valaki@freemail.hu")?.name).toBe("Freemail");
    expect(getMailProvider("valaki@icloud.com")?.name).toBe("iCloud Mail");
  });

  it("kis-nagybetű és szóköz független", () => {
    expect(getMailProvider("  Valaki@GMAIL.com ")?.name).toBe("Gmail");
  });

  it("ismeretlen (pl. céges) domainre null-t ad", () => {
    expect(getMailProvider("valaki@ceg.hu")).toBeNull();
    expect(getMailProvider("")).toBeNull();
  });

  it("minden ismert szolgáltató URL-je https", () => {
    for (const domain of ["gmail.com", "outlook.com", "yahoo.com", "icloud.com", "proton.me", "freemail.hu", "citromail.hu", "gmx.net", "aol.com"]) {
      expect(getMailProvider(domain)?.url).toMatch(/^https:\/\//);
    }
  });
});

describe("getEmailDomain", () => {
  it("csak a @ utáni részt adja vissza, kisbetűsítve", () => {
    expect(getEmailDomain("Valaki.Nev@Gmail.com")).toBe("gmail.com");
  });

  it("@ nélkül vagy üres domainnel null", () => {
    expect(getEmailDomain("nincs-kukac")).toBeNull();
    expect(getEmailDomain("valaki@")).toBeNull();
  });
});

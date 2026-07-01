import { useEffect, useState } from "react";

interface GeoContact {
  phone: string;
  phoneHref: string;
  location: string;
  resumeFile: string;   // path served from /public
  resumeName: string;   // filename for the download attribute
  loading: boolean;
}

const DUBAI: Omit<GeoContact, "loading"> = {
  phone: "+971 52 472 9069",
  phoneHref: "tel:+971524729069",
  location: "Dubai, UAE",
  resumeFile: "/Rezin Muhammed - Resume.pdf",
  resumeName: "Rezin Muhammed - Resume.pdf",
};

const INDIA: Omit<GeoContact, "loading"> = {
  phone: "+91 88919 30742",
  phoneHref: "tel:+918891930742",
  location: "Trivandrum, Kerala",
  resumeFile: "/Rezin_Muhammed_Resume.pdf",
  resumeName: "Rezin_Muhammed_Resume.pdf",
};

export function useGeoContact(): GeoContact {
  const [contact, setContact] = useState<Omit<GeoContact, "loading">>(DUBAI);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // ipwho.is supports HTTPS on free tier (unlike ip-api.com which requires HTTP)
    fetch("https://ipwho.is/?fields=country_code")
      .then((res) => res.json())
      .then((data: { country_code?: string }) => {
        if (!cancelled) {
          setContact(data.country_code === "IN" ? INDIA : DUBAI);
        }
      })
      .catch(() => {
        // On any error, silently fall back to Dubai (default)
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { ...contact, loading };
}


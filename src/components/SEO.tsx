import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  noFollow?: boolean;
}

const defaultSEO = {
  title: "New Modern Beauty Salon | Premium Women & Kids Salon in Indore",
  description: "Luxury women & kids beauty studio in Indore. Bridal makeup, hair styling, facials, keratin & more. Trusted since 2011. Book via WhatsApp!",
  image: "https://newmodernbeautysalon.com/og-image.jpg",
  url: "https://newmodernbeautysalon.com",
  type: "website" as const,
};

export const SEO = ({
  title = defaultSEO.title,
  description = defaultSEO.description,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = defaultSEO.type,
  noIndex = false,
  noFollow = false,
}: SEOProps) => {
  useEffect(() => {
    document.title = title;

    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector<HTMLMetaElement>(selector);
      if (!meta) {
        meta = document.createElement("meta");
        if (property) meta.setAttribute("property", name);
        else meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", description);
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:image", image, true);
    updateMeta("og:url", url, true);
    updateMeta("og:type", type, true);
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", image);
    updateMeta("twitter:card", "summary_large_image");

    const robots = `${noIndex ? "noindex" : "index"}, ${noFollow ? "nofollow" : "follow"}`;
    updateMeta("robots", robots);
  }, [title, description, image, url, type, noIndex, noFollow]);

  return null;
};

export default SEO;
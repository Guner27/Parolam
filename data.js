const passwords = [
  {
    "title": "Gmail Hesabım",
    "emails": [
      "user@example.com"
    ],
    "username": "kullanici123",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Ana mail hesabım",
    "website": "https://mail.google.com",
    "category": "Temel",
    "type": "Benim"
  },
  {
    "title": "Okul Portalı",
    "emails": [
      "ogrenci@school.com"
    ],
    "username": "ogr123",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "",
    "website": "https://school.edu",
    "category": "Eğitim",
    "type": "Benim"
  },
  {
    "title": "Google 2",
    "emails": [
      "email@example.com"
    ],
    "username": "guner23",
    "password": "U2FsdGVkX1+rqGjMv6YgC16hYS9fgw92X3JLnNuYY94=",
    "note": "Hesabın güvenliği için 2FA açık.",
    "website": "https://www.google.com",
    "category": "Temel",
    "type": "Yedek"
  },
  {
    "title": "Amazon",
    "emails": [
      "shop@example.com"
    ],
    "username": "shopuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Alışveriş için kullandığım hesap.",
    "website": "https://www.amazon.com",
    "category": "Alışveriş",
    "type": "Benim"
  },
  {
    "title": "Facebook",
    "emails": [
      "facebook@example.com"
    ],
    "username": "facebookuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Sosyal medya hesabım.",
    "website": "https://www.facebook.com",
    "category": "Sosyal",
    "type": "Benim"
  },
  {
    "title": "LinkedIn",
    "emails": [
      "linkedin@example.com"
    ],
    "username": "linkedinuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Profesyonel ağım.",
    "website": "https://www.linkedin.com",
    "category": "İş",
    "type": "Benim"
  },
  {
    "title": "Netflix",
    "emails": [
      "netflix@example.com"
    ],
    "username": "netflixuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Film ve dizi izleme platformu.",
    "website": "https://www.netflix.com",
    "category": "Oyun ve Eğlence",
    "type": "Benim"
  },
  {
    "title": "GitHub",
    "emails": [
      "github@example.com"
    ],
    "username": "githubuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Proje ve kod paylaşımı.",
    "website": "https://www.github.com",
    "category": "İş",
    "type": "Benim"
  },
  {
    "title": "Amazon Prime",
    "emails": [
      "prime@example.com"
    ],
    "username": "primeuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Amazon Prime Video hesabı.",
    "website": "https://www.amazon.com/prime",
    "category": "Oyun ve Eğlence",
    "type": "Benim"
  },
  {
    "title": "Etsy",
    "emails": [
      "etsy@example.com"
    ],
    "username": "etsyuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "El yapımı ürünler için alışveriş.",
    "website": "https://www.etsy.com",
    "category": "Alışveriş",
    "type": "Başkasının"
  },
  {
    "title": "Udemy",
    "emails": [
      "udemy@example.com"
    ],
    "username": "udemyuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Online eğitim platformu.",
    "website": "https://www.udemy.com",
    "category": "Eğitim",
    "type": "Benim"
  },
  {
    "title": "Twitter",
    "emails": [
      "twitter@example.com"
    ],
    "username": "twitteruser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Sosyal medya platformu.",
    "website": "https://www.twitter.com",
    "category": "Sosyal",
    "type": "Yedek"
  },
  {
    "title": "Spotify",
    "emails": [
      "spotify@example.com"
    ],
    "username": "spotifyuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Müzik dinleme platformu.",
    "website": "https://www.spotify.com",
    "category": "Oyun ve Eğlence",
    "type": "Benim"
  },
  {
    "title": "Slack",
    "emails": [
      "slack@example.com"
    ],
    "username": "slackuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "İş için iletişim aracı.",
    "website": "https://www.slack.com",
    "category": "İş",
    "type": "Başkasının"
  },
  {
    "title": "TikTok",
    "emails": [
      "tiktok@example.com"
    ],
    "username": "tiktokuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Kısa video platformu.",
    "website": "https://www.tiktok.com",
    "category": "Sosyal",
    "type": "Yedek"
  },
  {
    "title": "Dropbox",
    "emails": [
      "dropbox@example.com"
    ],
    "username": "dropboxuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Dosya saklama ve paylaşma.",
    "website": "https://www.dropbox.com",
    "category": "İş",
    "type": "Benim"
  },
  {
    "title": "Airbnb",
    "emails": [
      "airbnb@example.com"
    ],
    "username": "airbnbuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Konaklama ve seyahat platformu.",
    "website": "https://www.airbnb.com",
    "category": "Diğer",
    "type": "Başkasının"
  },
  {
    "title": "Pinterest",
    "emails": [
      "pinterest@example.com"
    ],
    "username": "pinterestuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Görsel keşif ve ilham kaynağı.",
    "website": "https://www.pinterest.com",
    "category": "Sosyal",
    "type": "Yedek"
  },
  {
    "title": "Zoom",
    "emails": [
      "zoom@example.com"
    ],
    "username": "zoomuser",
    "password": "U2FsdGVkX1+GE0i4/PSpfYb3UocCIcUreoRNnihOBwU=",
    "note": "Online toplantılar için.",
    "website": "https://www.zoom.us",
    "category": "İş",
    "type": "Benim"
  }
];
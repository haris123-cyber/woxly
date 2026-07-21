export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  tags: string[];
}

export const MOCK_BLOGS: BlogPost[] = [
  {
    slug: "guide-to-fresh-produce-shopping",
    title: "The Ultimate Guide to Fresh Produce Shopping",
    excerpt: "Learn how to select the freshest fruits and vegetables to elevate your everyday meals and support sustainable farming.",
    content: "Navigating the produce aisle can be overwhelming, but selecting the right ingredients is the foundation of great cooking. From checking the firmness of an avocado to understanding seasonal availability, this guide breaks down everything you need to know. We dive into the benefits of sourcing locally, how to store your greens to maximize freshness, and why organic matters for certain items. Fresh, high-quality ingredients not only taste better but provide essential nutrients for a healthy lifestyle.",
    date: "July 12, 2026",
    author: "Elena Rodriguez",
    readTime: "5 min read",
    image: "/images/products/hero_grocery_basket.png",
    tags: ["Produce", "Health", "Guide"]
  },
  {
    slug: "healthy-avocado-recipes",
    title: "5 Healthy Avocado Recipes for Everyday Living",
    excerpt: "Discover creative and delicious ways to incorporate avocados into your daily routine, beyond just toast.",
    content: "Avocados are a nutritional powerhouse, packed with healthy fats, fiber, and vitamins. While avocado toast is a classic, there are countless other ways to enjoy this versatile fruit. In this post, we share five quick and easy recipes, including a creamy avocado smoothie, a zesty avocado and cucumber salad, and a rich, dairy-free avocado chocolate mousse. These recipes are designed for busy individuals who want to eat well without spending hours in the kitchen.",
    date: "June 28, 2026",
    author: "James Peterson",
    readTime: "4 min read",
    image: "/images/products/grocery_avocado.png",
    tags: ["Recipes", "Wellness", "Food"]
  },
  {
    slug: "creating-relaxing-home-atmosphere",
    title: "Creating a Relaxing Home Atmosphere",
    excerpt: "Transform your living space into a tranquil sanctuary with premium candles, soft lighting, and minimal clutter.",
    content: "Your home should be a retreat from the fast-paced world. Creating a calming atmosphere doesn't require a complete renovation; it starts with small, intentional changes. Introducing soothing scents through high-quality soy candles, incorporating soft textiles, and minimizing visual clutter can drastically improve your mental well-being. We explore the psychological benefits of a well-organized space and share simple tips for bringing a sense of luxury and peace into your everyday environment.",
    date: "May 18, 2026",
    author: "Sophia Vance",
    readTime: "6 min read",
    image: "/images/products/home_candles.png",
    tags: ["Home", "Lifestyle", "Wellness"]
  }
];

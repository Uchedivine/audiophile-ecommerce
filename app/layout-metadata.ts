import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audiophile E-commerce",
  description: "Premium audio equipment",
};
```

Or add metadata directly to your pages instead of the root layout.

Make sure your `.env.local` file has:
```
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud
// app/providers/ConvexProvider.tsx
"use client";

import React from "react";
import { ConvexReactClient, ConvexProvider } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convexClient = new ConvexReactClient(convexUrl);

export default function ConvexProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}

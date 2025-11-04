import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  carts: defineTable({
    userId: v.optional(v.string()), // For authenticated users
    sessionId: v.string(), // For guest users
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.optional(v.string()),
      })
    ),
    subtotal: v.number(),
    shipping: v.number(),
    tax: v.number(),
    total: v.number(),
    updatedAt: v.number(),
  }).index("by_session", ["sessionId"]),

  orders: defineTable({
    orderId: v.string(),
    // Customer details
    customerName: v.string(),
    email: v.string(),
    phone: v.string(),
    
    // Shipping address
    shippingAddress: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    
    // Order items
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.optional(v.string()),
      })
    ),
    
    // Totals
    subtotal: v.number(),
    shipping: v.number(),
    tax: v.number(),
    total: v.number(),
    
    // Status
    status: v.string(), // "pending", "confirmed", "shipped", "delivered"
    
    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_order_id", ["orderId"])
    .index("by_email", ["email"])
    .index("by_status", ["status"]),
});
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create order from cart
export const createOrder = mutation({
  args: {
    sessionId: v.string(),
    customerName: v.string(),
    email: v.string(),
    phone: v.string(),
    shippingAddress: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    // Get cart
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
    
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }
    
    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create order
    const order = await ctx.db.insert("orders", {
      orderId,
      customerName: args.customerName,
      email: args.email,
      phone: args.phone,
      shippingAddress: args.shippingAddress,
      items: cart.items,
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      tax: cart.tax,
      total: cart.total,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    // Clear cart
    await ctx.db.delete(cart._id);
    
    return { orderId, orderDbId: order };
  },
});

// Get order by order ID
export const getOrder = query({
  args: { orderId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_order_id", (q) => q.eq("orderId", args.orderId))
      .first();
  },
});

// Get orders by email
export const getOrdersByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
  },
});
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get cart by session ID
export const getCart = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
    
    return cart;
  },
});

// Calculate totals helper
function calculateTotals(items: any[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  return { subtotal, shipping, tax, total };
}

// Add item to cart
export const addToCart = mutation({
  args: {
    sessionId: v.string(),
    productId: v.string(),
    name: v.string(),
    price: v.number(),
    quantity: v.number(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { sessionId, productId, name, price, quantity, image } = args;
    
    // Find existing cart
    const existingCart = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .first();
    
    if (existingCart) {
      // Check if item already exists
      const itemIndex = existingCart.items.findIndex(
        (item) => item.productId === productId
      );
      
      let updatedItems;
      if (itemIndex >= 0) {
        // Update quantity
        updatedItems = [...existingCart.items];
        updatedItems[itemIndex].quantity += quantity;
      } else {
        // Add new item
        updatedItems = [...existingCart.items, { productId, name, price, quantity, image }];
      }
      
      const totals = calculateTotals(updatedItems);
      
      await ctx.db.patch(existingCart._id, {
        items: updatedItems,
        ...totals,
        updatedAt: Date.now(),
      });
      
      return existingCart._id;
    } else {
      // Create new cart
      const items = [{ productId, name, price, quantity, image }];
      const totals = calculateTotals(items);
      
      return await ctx.db.insert("carts", {
        sessionId,
        items,
        ...totals,
        updatedAt: Date.now(),
      });
    }
  },
});

// Update item quantity
export const updateQuantity = mutation({
  args: {
    sessionId: v.string(),
    productId: v.string(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
    
    if (!cart) return null;
    
    const updatedItems = cart.items.map((item) =>
      item.productId === args.productId
        ? { ...item, quantity: args.quantity }
        : item
    );
    
    const totals = calculateTotals(updatedItems);
    
    await ctx.db.patch(cart._id, {
      items: updatedItems,
      ...totals,
      updatedAt: Date.now(),
    });
    
    return cart._id;
  },
});

// Remove item from cart
export const removeFromCart = mutation({
  args: {
    sessionId: v.string(),
    productId: v.string(),
  },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
    
    if (!cart) return null;
    
    const updatedItems = cart.items.filter(
      (item) => item.productId !== args.productId
    );
    
    if (updatedItems.length === 0) {
      // Delete cart if empty
      await ctx.db.delete(cart._id);
      return null;
    }
    
    const totals = calculateTotals(updatedItems);
    
    await ctx.db.patch(cart._id, {
      items: updatedItems,
      ...totals,
      updatedAt: Date.now(),
    });
    
    return cart._id;
  },
});

// Clear cart
export const clearCart = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
    
    if (cart) {
      await ctx.db.delete(cart._id);
    }
  },
});
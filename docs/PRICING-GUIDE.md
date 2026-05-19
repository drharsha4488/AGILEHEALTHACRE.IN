# Pricing & B2B Guide — AgileHealthcare

How pricing, discounts, inventory, and B2B work in this theme.

---

## 1. Price display logic

The `snippets/price.liquid` snippet handles **every** price state. Logic (in order of precedence):

1. **Quote-only** — product is tagged `quote-only` → renders "Request Quote for Pricing" link, no price shown.
2. **B2B-only, not logged in** — product is tagged `b2b-only` and `customer == nil` → renders "Log in for B2B price".
3. **Variable price, not on sale** — product has multiple variants with different prices → renders "From ₹X,XXX".
4. **On sale** — `compare_at_price > price` → renders sale price in green, struck compare price, % savings badge.
5. **B2B tier** — customer has `tier-platinum`/`gold`/`silver` tag → renders tier price (large) + retail struck through + tier badge.
6. **Default** — renders regular price.

Plus:
- **Unit pricing** — if variant has `unit_price_measurement`, renders "₹X / 100ml" beneath.
- **Tax note** — "Inclusive of GST" or "Exclusive of GST" depending on `shop.taxes_included`.

---

## 2. Volume pricing setup

Set `custom.volume_tiers` JSON on a product:

```json
[
  {"min": 1, "max": 9, "price": 14500},
  {"min": 10, "max": 49, "price": 13775, "save": 5},
  {"min": 50, "max": 199, "price": 12325, "save": 15},
  {"min": 200, "price": 10875, "save": 25}
]
```

The theme renders a Volume Pricing table beneath the price. As the user changes the quantity input, the active tier row is highlighted in green.

> **Note:** displayed tier prices are **informational**. To actually charge those amounts, create matching Shopify **Automatic Discounts** with quantity rules.

---

## 3. B2B tier system

Apply customer tags:

| Tag | Display discount |
|---|---|
| `tier-platinum` | 15% off |
| `tier-gold` | 10% off |
| `tier-silver` | 5% off |

- Theme **displays** the discounted price and adds a colored member banner.
- To actually **apply** the discount at checkout: create Shopify Discounts → Automatic discount → Specific customers → tagged.

For Shopify Plus, use native **B2B Catalogs** (Companies + price lists). The theme respects price-list pricing automatically because `product.price` already reflects the company's list.

---

## 4. Net payment terms

Apply tags `net-30` or `net-60`. Banner appears on PDP. For actual deferred payment, you need:

- Shopify Plus B2B (native), **or**
- A third-party app like Paylater / Triple Whale / Razorpay Credit, **or**
- Manual: tag → checkout shows "Net 30" payment method via Draft Orders workflow.

---

## 5. Tax inclusive vs exclusive

- **Settings → Taxes and duties → India** → toggle "All prices include tax".
- Theme reads `shop.taxes_included` and displays the correct note.
- Recommended: **tax-inclusive** for B2C retail, **tax-exclusive** for B2B (GST shown separately at checkout).

---

## 6. Unit pricing

For consumables sold by volume/weight:

1. On variant: set **Weight** and **Unit price** measurements.
2. Theme automatically renders "₹X / 100ml" or "₹X / kg" below the main price.

---

## 7. Discounts (Shopify-native)

Use Shopify's native discount engine for actual savings:

- **Code discount** — coupon-based (`SAVE10`)
- **Automatic discount** — applies without code (e.g. tier-platinum customers get 15%)
- **Quantity discount** — buy 10, get 5% off (powers the volume_tiers actual pricing)
- **Buy X get Y** — bundle deals

Set under **Discounts → Create discount**.

---

## 8. Inventory states displayed

| Condition | Display |
|---|---|
| Inventory not tracked | "Available" (green dot) |
| `qty > 10` | "In Stock — Ships in 2 hours" (green) |
| `1 ≤ qty ≤ 10` | "Only X left in stock" (orange) |
| `qty = 0` + policy `continue` | "Available on Backorder · 5–7 days" (blue) |
| `qty = 0` + policy `deny` | "Sold Out" (red) |

All variants include "Available for pickup at Hyderabad HQ" pickup line.

---

## 9. Shipping estimates

Static (for now). Renders on every PDP:

- 🚚 Delivery in 2–4 hours within Hyderabad · Same-day across Telangana
- ✓ Free shipping on orders over ₹5,000
- 📦 Cold-chain shipping for sensitive items

To make this dynamic (postcode-aware), wire in a Shopify carrier API or a delivery date app.

---

## 10. Quote workflow

For `quote-only` products:

1. Customer clicks "Request a Quote" → lands on `/pages/quote?product=<handle>`
2. Page renders a contact form pre-filled with the product handle
3. Form submits → email to `info@agilehealthcare.in`
4. Sales replies with a Draft Order link for payment

This bypasses the cart entirely and is the right pattern for high-value implants, capital equipment, and custom orders.

# AgileHealthcare Theme — Setup Guide

A step-by-step walkthrough to launch your storefront after the theme is uploaded.

---

## 1. Connect this GitHub repo as your theme

1. Shopify Admin → **Online Store → Themes**
2. **Add theme → Connect from GitHub**
3. Authorize and pick `drharsha4488/AGILEHEALTHACRE.IN`, branch `main`
4. Click **Customize** to verify it loads. Don't publish yet — finish setup first.

---

## 2. Create the 20 collections

For each handle in `docs/CATEGORIES.md`:

1. **Products → Collections → Create collection**
2. **Title:** as listed (e.g. "Trauma & Fracture")
3. **Handle** (under SEO): force lowercase kebab, e.g. `trauma-fracture` — must match exactly.
4. **Type:** Smart collection
5. **Conditions:** *Product tag is equal to* the suggested tag
6. **Image:** upload a representative banner (1920×600) — used in collection hero
7. **Save**

Repeat for all 20.

---

## 3. Set up the Main Menu

**Online Store → Navigation → Main menu**

Add links:
- Home → `/`
- Divisions → `/collections` (the All Collections page)
- Catalog → `/collections/all`
- Quick Order → `/pages/quick-order`
- About → `/pages/about`
- Contact → `/pages/contact`

> Note: the header mega-menu is hard-coded to the 20 expected handles, so you do **not** need to nest collections under "Divisions" — but you may add them anyway for SEO.

---

## 4. Create required pages

**Online Store → Pages → Add page** for each:

| Title | Handle | Template |
|---|---|---|
| About Us | `about` | page |
| Contact | `contact` | page.contact (uses contact form) |
| Quick Order | `quick-order` | page (bulk SKU entry) |
| Request a Quote | `quote` | page (form) |
| B2B Portal | `b2b-portal` | page |
| Shipping Policy | `shipping-policy` | page |
| Returns | `returns` | page |

---

## 5. Set up Product Metafields

**Settings → Custom data → Products → Add definition**

See `docs/METAFIELDS.md` for the full list. Minimum to enable the theme features:

- `custom.specifications` (Rich text)
- `custom.volume_tiers` (JSON)
- `custom.regulatory_approvals` (List of single-line text)
- `custom.downloads` (List of file references)
- `custom.related_products` (List of product references)

For Collections:
- `custom.icon` (Single line text, emoji)
- `custom.faq` (JSON)
- `custom.sub_collections` (List of collection references)

---

## 6. Set up Customer B2B tiers

**Customers → pick a customer → Add tags**

| Tag | Effect |
|---|---|
| `tier-platinum` | 15% off all prices |
| `tier-gold` | 10% off |
| `tier-silver` | 5% off |
| `net-30` | "Net 30" payment banner |
| `net-60` | "Net 60" payment banner |

> Discounts here are **display only** — to actually charge the discounted amount, create matching Shopify **Discounts** (Automatic, tag-targeted) or use Shopify Plus B2B catalogs.

---

## 7. Add your first product

1. **Products → Add product**
2. Fill: Title, Description (rich), Media (4+ images), Price, Compare-at price (if on sale)
3. Inventory: track quantity, set `Continue selling when out of stock` if you allow backorders
4. **Vendor:** set the manufacturer (Meril, Smith & Nephew, etc.)
5. **Type:** map to the collection (e.g. "Trauma Implant")
6. **Tags:** include collection tag(s) + any of `new`, `quote-only`, `b2b-only`, `cold-chain`
7. **Variants:** add Size, Length, Diameter etc. as variant options
8. **Metafields:** fill specifications, regulatory approvals, volume_tiers
9. **SEO:** custom title, description, handle
10. **Save**

---

## 8. Email notifications

**Settings → Notifications**

- Customize: order confirmation, shipping confirmation, draft order invoice
- Add cc: `info@agilehealthcare.in` so all notifications reach your team
- Update sender to `info@agilehealthcare.in`

---

## 9. Configure tax and shipping

**Settings → Taxes and duties → India**
- Enable GST. Choose tax-inclusive or exclusive (theme respects `shop.taxes_included`).

**Settings → Shipping and delivery**
- General profile: Standard India shipping
- Add rate `Hyderabad Same-Day` ₹0 for Hyderabad postcodes ≤ ₹5,000 threshold
- Add rate `Telangana Same-Day` ₹150 flat
- Add rate `Pan-India` ₹250 flat; free above ₹5,000

---

## 10. Going live checklist

- [ ] All 20 collections live and have ≥ 5 products each
- [ ] Theme published (Themes → Actions → Publish)
- [ ] Custom domain (agilehealthcare.in) added under Settings → Domains
- [ ] SSL active (Shopify auto-issues)
- [ ] Tax rates verified for India
- [ ] Payment provider connected (Razorpay / Shopify Payments)
- [ ] Test order placed end-to-end
- [ ] Privacy / Refund / Terms pages set under Settings → Policies
- [ ] Google Search Console + sitemap.xml submitted
- [ ] Meta Pixel / GA4 installed via Customer events
- [ ] WhatsApp Business linked (+91 74165 21222)

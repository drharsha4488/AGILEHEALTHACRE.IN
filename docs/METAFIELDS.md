# Metafields Schema — AgileHealthcare

All metafields use the `custom` namespace unless noted.

Create them under **Settings → Custom data → Products / Collections / Customers → Add definition**.

---

## Product metafields

### custom.specifications
- **Type:** Rich text
- **Description:** Rendered in the "Specifications" tab on the product page.
- **Example:** A formatted spec block with H3 headings, bullet lists, tables.

### custom.downloads
- **Type:** List of file references (PDF / docx)
- **Description:** Renders as a download list in the "Documents" tab.
- **Example:** IFU.pdf, MSDS.pdf, Certificate-of-Analysis.pdf

### custom.surgical_technique_pdf
- **Type:** File reference (single PDF)
- **Description:** Linked from the "Surgical Technique" tab.
- **Example:** `meril-trauma-locking-plate-technique-v3.pdf`

### custom.volume_tiers
- **Type:** JSON
- **Description:** Volume pricing table. Rendered below price + highlighted as quantity changes.
- **Example:**
  ```json
  [
    {"min": 1, "max": 9, "price": 14500},
    {"min": 10, "max": 49, "price": 13775, "save": 5},
    {"min": 50, "max": 199, "price": 12325, "save": 15},
    {"min": 200, "price": 10875, "save": 25}
  ]
  ```
  `price` is in **smallest currency unit** (paise) divided by 100 — i.e. ₹14,500 → `14500`. The theme passes it through Shopify's `money` filter.

### custom.related_products
- **Type:** List of product references
- **Description:** Manual "You may also like" picks. Falls back to collection auto-recs if empty.

### custom.bundle_with
- **Type:** List of product references (max 2)
- **Description:** Used by the "Frequently Bought Together" section.

### custom.regulatory_approvals
- **Type:** List of single-line text
- **Description:** Shown as chips in product info and list-view cards.
- **Example values:** `CDSCO`, `CE`, `FDA`, `ISO 13485`

### custom.minimum_order_qty
- **Type:** Integer
- **Description:** Sets the minimum on the quantity input.
- **Example:** `10`

### custom.cold_chain_required
- **Type:** Boolean
- **Description:** When true, the theme shows a "Cold-chain shipping" note.

### custom.prescription_required
- **Type:** Boolean
- **Description:** When true, theme shows an Rx warning under the price.

---

## Collection metafields

### custom.icon
- **Type:** Single-line text
- **Description:** Emoji used on the "All Divisions" tile.
- **Example:** `🦴`

### custom.sub_collections
- **Type:** List of collection references
- **Description:** Rendered as sub-collection pills above the product grid.

### custom.faq
- **Type:** JSON
- **Description:** Category-specific FAQ accordion at the bottom of the collection page.
- **Example:**
  ```json
  [
    {"q": "What is your CDSCO certification status?", "a": "All trauma implants are CDSCO licensed under MD-9."},
    {"q": "Do you handle emergency cases?", "a": "Yes — call +91 74162 16262, 2-hour OT dispatch."}
  ]
  ```

### custom.related_collections
- **Type:** List of collection references
- **Description:** "Related Categories" section at the bottom of the collection page.

---

## Customer tags (B2B)

Not metafields — these are **customer tags**, applied under the customer record.

| Tag | Effect in theme |
|---|---|
| `tier-platinum` | 15% off display, "Platinum Member" banner |
| `tier-gold` | 10% off display, "Gold Member" banner |
| `tier-silver` | 5% off display, "Silver Member" banner |
| `net-30` | "Net 30 Payment Terms Available" banner |
| `net-60` | "Net 60 Payment Terms Available" banner |

---

## Reviews metafields (compatible with Shopify Reviews app)

If you install **Shopify Product Reviews**, these populate automatically:

- `reviews.rating_avg` — float, average rating
- `reviews.rating_count` — integer, number of reviews

If you don't use the app, you can populate them manually for demo/testing.

---

## How to bulk-import via CSV

Shopify supports metafield CSV import. Header format:

```
Handle, Metafield: custom.volume_tiers [json], Metafield: custom.regulatory_approvals [list.single_line_text_field]
```

The cell value for JSON must be the full JSON string (escape quotes with `""`).

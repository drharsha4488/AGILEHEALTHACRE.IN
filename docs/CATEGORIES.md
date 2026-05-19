# Category Architecture — AgileHealthcare

20 parent collections. Use these **exact** handles in Shopify (the theme links to them).

---

## Surgical Specialties

### 1. trauma-fracture
- **Title:** Trauma & Fracture
- **Icon:** 🦴
- **Description:** Plates, screws, nails, external fixators for orthopedic trauma.
- **Sub-collections:** locking-plates, intramedullary-nails, cannulated-screws, external-fixators, k-wires
- **Tags:** trauma, plate, screw, nail, fixator

### 2. arthroplasty
- **Title:** Arthroplasty (Joint Replacement)
- **Icon:** 🦵
- **Description:** Primary and revision hip, knee, shoulder implants.
- **Sub-collections:** hip-implants, knee-implants, shoulder-implants, revision-systems
- **Tags:** hip, knee, shoulder, implant, prosthesis

### 3. spine
- **Title:** Spine
- **Icon:** 🧠
- **Description:** Pedicle screws, interbody cages, cervical plates.
- **Sub-collections:** pedicle-screws, cages, cervical-plates, mis-spine
- **Tags:** spine, pedicle, cage, cervical, lumbar

### 4. sports-medicine
- **Title:** Sports Medicine
- **Icon:** ⚽
- **Description:** Anchors, ACL/PCL reconstruction, arthroscopy tools.
- **Sub-collections:** anchors, acl-reconstruction, meniscal-repair, arthroscopy-shavers
- **Tags:** sports, anchor, acl, meniscus, arthroscopy

### 5. cardiovascular
- **Title:** Cardiovascular
- **Icon:** ❤
- **Description:** Stents, balloons, guide wires, catheters.
- **Sub-collections:** drug-eluting-stents, balloon-catheters, guidewires, vascular-grafts
- **Tags:** cardiac, stent, balloon, catheter, vascular

### 6. endo-surgery
- **Title:** Endo-Surgery
- **Icon:** 🔭
- **Description:** Laparoscopic instruments, staplers, energy devices.
- **Sub-collections:** laparoscopes, staplers, energy-devices, trocars
- **Tags:** laparoscopy, endo, stapler, trocar

---

## Diagnostics & Specialties

### 7. diagnostics
- **Title:** Diagnostics & Lab
- **Icon:** 🔬
- **Description:** Analyzers, reagents, rapid test kits, lab consumables.
- **Sub-collections:** analyzers, reagents, rapid-tests, blood-collection
- **Tags:** diagnostics, lab, reagent, analyzer

### 8. urology
- **Title:** Urology
- **Icon:** 💧
- **Description:** Catheters, stents, lithotripsy, endoscopes.
- **Sub-collections:** foley-catheters, ureteral-stents, lithotripsy, urology-scopes
- **Tags:** urology, foley, ureteral, lithotripsy

### 9. gynecology
- **Title:** Gynecology
- **Icon:** 🌸
- **Description:** OB/GYN instruments, IUDs, hysteroscopy.
- **Sub-collections:** instruments, iuds, hysteroscopy, obstetric-care
- **Tags:** gyn, iud, hysteroscopy

### 10. ent
- **Title:** ENT (Ear, Nose, Throat)
- **Icon:** 👂
- **Description:** ENT scopes, hearing implants, sinus instruments.
- **Sub-collections:** ent-scopes, hearing-implants, sinus-instruments, tonsil-adenoid
- **Tags:** ent, ear, nose, throat, sinus

### 11. ophthalmology
- **Title:** Ophthalmology
- **Icon:** 👁
- **Description:** IOLs, phaco machines, viscoelastics, surgical instruments.
- **Sub-collections:** iols, phaco, viscoelastics, ophthalmic-instruments
- **Tags:** ophthal, iol, phaco, eye

### 12. dental-cmf
- **Title:** Dental & CMF
- **Icon:** 🦷
- **Description:** Dental implants, CMF plates, orthodontic supplies.
- **Sub-collections:** dental-implants, cmf-plates, ortho-supplies, dental-consumables
- **Tags:** dental, cmf, implant, ortho

---

## Consumables & Equipment

### 13. consumables
- **Title:** Surgical Consumables
- **Icon:** 🩹
- **Description:** Sutures, drapes, blades, syringes, gloves.
- **Sub-collections:** sutures, drapes, blades, syringes, surgical-gloves
- **Tags:** consumable, suture, drape, syringe

### 14. wound-care
- **Title:** Wound Care
- **Icon:** 🩹
- **Description:** Dressings, NPWT, antimicrobials, bandages.
- **Sub-collections:** dressings, npwt, antimicrobials, bandages
- **Tags:** wound, dressing, npwt

### 15. pain-management
- **Title:** Pain Management
- **Icon:** 💊
- **Description:** Pumps, catheters, TENS, radiofrequency.
- **Sub-collections:** pumps, epidural-catheters, tens, rf-ablation
- **Tags:** pain, pump, epidural

### 16. aesthetic-plastic
- **Title:** Aesthetic & Plastic
- **Icon:** ✨
- **Description:** Breast implants, fillers, lasers, derma supplies.
- **Sub-collections:** breast-implants, fillers, lasers, derma-supplies
- **Tags:** aesthetic, plastic, filler, laser

### 17. power-tools
- **Title:** Power Tools
- **Icon:** ⚡
- **Description:** Surgical drills, saws, reamers, battery systems.
- **Sub-collections:** drills, saws, reamers, batteries
- **Tags:** power-tool, drill, saw

### 18. ot-equipment
- **Title:** OT Equipment
- **Icon:** 🛏
- **Description:** OT tables, lights, anesthesia machines, monitors.
- **Sub-collections:** ot-tables, lights, anesthesia-machines, monitors
- **Tags:** ot, equipment, table, anesthesia

### 19. sterilization
- **Title:** Sterilization
- **Icon:** 🧴
- **Description:** Autoclaves, sterilization wrap, indicators, washers.
- **Sub-collections:** autoclaves, wraps, indicators, washers
- **Tags:** sterile, autoclave, wrap

### 20. ppe-safety
- **Title:** PPE & Safety
- **Icon:** 😷
- **Description:** Masks, gowns, face-shields, exam gloves.
- **Sub-collections:** masks, gowns, face-shields, exam-gloves
- **Tags:** ppe, mask, gown, gloves

---

## Smart Collection Rules

For each collection, in Shopify Admin: **Products → Collections → Create collection → Smart**:

> Condition: **Product tag** is equal to `<primary tag>` (e.g., `trauma` for trauma-fracture).

You can also add OR conditions for related tags so a single product can surface in multiple collections.

## Special Tags (theme-aware)

| Tag | Effect |
|---|---|
| `quote-only` | Hides price, shows "Request a Quote" CTA |
| `b2b-only` | Requires login to see price |
| `new` | Shows green "New" badge on card |
| `cold-chain` | Adds cold-chain shipping note |
| `prescription-required` | Adds Rx warning |

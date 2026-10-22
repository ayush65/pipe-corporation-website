export type Product = {
  id: string
  /** URL-safe identifier, unique within its category + group. */
  slug: string
  title: string
  description: string
  image: string
}

export type ProductGroup = {
  slug: string
  title: string
  description: string
  products: Product[]
}

export type Category = {
  slug: "sanitary-plumbing" | "agriculture-engineering"
  title: string
  shortTitle: string
  tagline: string
  description: string
  cover: string
  groups: ProductGroup[]
}

type Raw = [title: string, file: string, description: string]

function group(
  base: string,
  slug: string,
  folder: string,
  title: string,
  description: string,
  items: Raw[],
): ProductGroup {
  return {
    slug,
    title,
    description,
    products: items.map(([t, file, d]) => ({
      id: `${slug}-${file}`,
      slug: file,
      title: t,
      description: d,
      image: `/products/${base}/${folder}/${file}.webp`,
    })),
  }
}

const sanitaryGroups: ProductGroup[] = [
  group("sanitary", "hero-agro-plast", "hero-agro-plast", "Hero Agro Plast", "Complete range of CPVC, UPVC, PVC, SWR and UGD pipes & fittings from Hero Agro Plast.", [
    ["Hero CPVC Pipes & Fittings", "hero-cpvc-pipe-and-fitting-s", "Hot & cold water CPVC pipes and fittings for residential and commercial plumbing."],
    ["Hero UPVC Pipes & Fittings", "hero-upvc-pipe-and-fitting-s", "Lead-free UPVC plumbing pipes and fittings for cold water supply lines."],
    ["Hero PVC Pipes & Fittings", "hero-pvc-pipe-and-fittings", "Durable PVC pipes and fittings for water supply and agricultural use."],
    ["Hero SWR Pipes & Fittings", "hero-swr-pipe-and-fitting-s", "Soil, waste & rain-water drainage pipes with ring-fit and self-fit joints."],
    ["Hero UGD Pipes & Fittings", "hero-ugd-pipe-and-fittings", "Underground drainage pipes and fittings engineered for heavy loads."],
  ]),
  group("sanitary", "amrut-pipes", "amruth-range-of-pipes", "Amrut Range of Pipes", "Amrut CPVC, SWR and UGD pipe systems for modern building infrastructure.", [
    ["Amrut CPVC Pipes", "amruth-cpvc-pipe-s", "Temperature-resistant CPVC pipes for hot and cold potable water."],
    ["Amrut SWR Pipes", "amruth-swr-pipe-s", "Robust soil, waste and rain-water drainage pipe systems."],
    ["Amrut UGD Pipes", "amruth-ugd-pipe-s", "Underground drainage pipes for sewage and storm-water networks."],
  ]),
  group("sanitary", "izoti-taps", "izoti-pvc-taps", "IZOTI Taps & Showers", "Stylish PVC & PTMT taps, showers, faucets and concealed valves by IZOTI.", [
    ["IZOTI Atom Series PTMT", "izoti-atom-series-ptmt", "Modern PTMT taps with smooth operation and long-lasting finish."],
    ["IZOTI Squro Series PTMT", "izoti-squro-series-ptmt", "Square-profile PTMT taps for a contemporary bathroom look."],
    ["IZOTI Hexa Series PVC", "izoti-hexa-series-pvc", "Hexagonal-design PVC taps built for everyday reliability."],
    ["IZOTI Regular Series PVC", "izoti-regular-series-pvc", "Economical, rust-free PVC taps for kitchen and utility areas."],
    ["IZOTI Chrome Showers", "izoti-crome-showers", "Chrome-finish overhead showers with even spray distribution."],
    ["IZOTI Linn Showers PVC", "izoti-linn-showers-pvc", "Lightweight PVC showers that resist scaling and corrosion."],
    ["IZOTI Health Faucet Chrome", "izoti-health-faucet-crome", "Chrome health faucet with flexible hose and wall hook."],
    ["IZOTI PTMT Health Faucet", "izoti-ptmt-health-faucet", "Rust-proof PTMT health faucet with comfortable grip."],
    ["IZOTI CPVC Concealed Valve", "izoti-cpvc-concealed-valve", "CPVC concealed valve for clean in-wall installations."],
    ["IZOTI PVC Connection Pipe", "izoti-pvc-connection-pipe", "Flexible PVC connection pipes for basins and geysers."],
  ]),
  group("sanitary", "flozy-taps", "flozy-pvc-taps", "FLOZY Taps & Showers", "FLOZY PVC & PTMT bath fittings designed for durability and style.", [
    ["FLOZY Aura Series PTMT", "flozy-aura-series-ptmt", "Elegant PTMT taps with a glossy, long-lasting finish."],
    ["FLOZY Fusion Series PTMT", "flozy-fusion-series-ptmt", "Contemporary PTMT taps with smooth quarter-turn control."],
    ["FLOZY Posh Series PTMT Taps", "flozy-posh-series-ptmt-tap-s", "Premium-look PTMT taps for modern washrooms."],
    ["FLOZY Regular Series PVC", "flozy-regular-series-pvc", "Reliable everyday PVC taps at an economical price."],
    ["FLOZY PTMT Showers", "flozy-ptmt-shower-s", "Rust-free PTMT showers with uniform water flow."],
    ["FLOZY PVC Showers", "flozy-pvc-shower-s", "Lightweight PVC showers resistant to hard water."],
    ["FLOZY PTMT Health Faucets", "flozy-ptmt-health-faucets", "Complete PTMT health faucet sets with hose and holder."],
    ["FLOZY CPVC Concealed Valve", "flozy-cpvc-concealed-valve", "CPVC concealed valves for neat, leak-free installations."],
    ["FLOZY PTMT Connection Pipe", "flozy-ptmt-connection-pipe", "Durable connection pipes for basins, sinks and geysers."],
  ]),
  group("sanitary", "solvents", "solvents", "Solvents & Lubricants", "BOND-WELD solvent cements and lubricants for strong, leak-proof joints.", [
    ["CPVC Solvent Cement", "cpvc-solvent-s", "One-step solvent cement for CPVC pipes and fittings."],
    ["UPVC Solvent Cement", "upvc-solvent-s", "High-strength solvent cement for UPVC plumbing joints."],
    ["PVC Solvent Cement", "pvc-solvent-s", "Fast-setting solvent cement for PVC pipe systems."],
    ["Lubricant", "lubricant", "Rubber-ring lubricant for easy SWR and UGD pipe jointing."],
  ]),
  group("sanitary", "manhole-covers", "oxyjal-frp-man-hole-covers-5ton", "OXYJAL FRP Manhole Covers (5 Ton)", "Lightweight, high-strength FRP manhole covers rated for 5 ton loads.", [
    ["Round FRP Manhole Cover", "round-man-hole-cover", "Round FRP cover with frame, rust-free and theft-resistant."],
    ["Square FRP Manhole Cover", "square-man-hole-cover", "Square FRP cover with frame for chambers and sumps."],
    ["Rectangle FRP Manhole Cover", "rectangle-frp-man-hole", "Rectangular FRP cover for drains and inspection chambers."],
  ]),
  group("sanitary", "accessories", "accessories", "Plumbing Accessories", "Everyday plumbing and sanitary accessories to complete every installation.", [
    ["CPVC Union NRV", "cpvc-union-nrv", "Non-return valve with union ends for CPVC lines."],
    ["CPVC Long Plug (Heavy)", "cpvc-long-plug-hy", "Heavy-duty long plugs for pressure testing CPVC lines."],
    ["CPVC Wall Mixer Adaptor", "cpvc-wall-mixer-adaptor", "Adaptor for mounting wall mixers on CPVC lines."],
    ["CPVC Clips D-Nail (Heavy)", "cpvc-clip-s-d-nail-hy", "Heavy-duty pipe clips with nails for CPVC pipes."],
    ["SWR Patti Clips", "swr-patti-clip-s", "Metal strip clips for securing SWR drainage pipes."],
    ["SWR PVC Clips", "swr-pvc-clip-s", "PVC clamps for neat SWR pipe mounting."],
    ["OXYJAL SWR Nico Clamps (Heavy)", "oxyjal-swr-nico-clamps-hy", "Heavy-duty nico clamps for SWR pipes."],
    ["SS Extension Nipple", "ss-extention-nipple", "Stainless steel extension nipples for tap fittings."],
    ["SS Hex Nipple", "ss-hex-nipple", "Stainless steel hex nipples for threaded joints."],
    ["SS Lock Jali", "ss-lock-jali", "Stainless steel lockable floor drain grating."],
    ["CP Flange", "cp-flenge", "Chrome-plated wall flanges for a clean finish."],
    ["PVC Back Flow Valve", "pvc-back-flow-valve", "Prevents backflow of drain water into the house."],
    ["PVC Connectors", "pvc-connector-s", "PVC connectors for quick and secure joints."],
    ["PVC Red Taps", "pvc-red-tap-s", "Durable red PVC garden and utility taps."],
    ["Polo Taps", "polo-taps", "Economical PVC taps for everyday use."],
    ["Waste Pipe", "west-pipe", "Flexible waste pipes for basins and sinks."],
    ["Waste Coupling", "west-coupling", "Basin and sink waste couplings."],
    ["Teflon Tape", "teflon-tape", "PTFE thread seal tape for leak-proof threaded joints."],
  ]),
]

const agricultureGroups: ProductGroup[] = [
  group("agriculture", "ss-hdp-fittings", "oxyjal-ss-hdp-fittings", "OXYJAL SS HDP Fittings", "Corrosion-resistant stainless steel HDP nipples, bends and jalis for borewells and pumps.", [
    ["SS HDP Nipple", "ss-hdp-nipple", "Stainless steel HDP nipple for secure HDPE pipe connections."],
    ["SS R/HDP Nipple", "ss-r-hdp-nipple", "Reducer HDP nipple in stainless steel for size transitions."],
    ["SS Ulta HDP Nipple", "ss-ulta-hdp-nipple", "Reverse-thread SS HDP nipple for special pump setups."],
    ["SS Nipple", "ss-nipple", "Precision-threaded stainless steel nipple."],
    ["SS HDP Bend", "ss-hdp-bend", "Stainless steel HDP bend for smooth direction change."],
    ["SS Elbow Jali", "ss-elbow-jali", "SS elbow strainer to keep debris out of suction lines."],
    ["SS Elbow Out Thread", "ss-elbow-out-ht", "Stainless steel elbow with male thread outlet."],
    ["SS Openwell Jali", "ss-openwell-jali", "Stainless steel strainer for open well pumps."],
    ["SS Nut Bolts", "ss-nut-bolts", "Rust-free stainless steel nut bolts for flanges."],
  ]),
  group("agriculture", "gi-fittings", "gi-fittings-isi-non-isi", "G.I Fittings (ISI / Non-ISI)", "Galvanised iron fittings in ISI and non-ISI grades for water and agricultural lines.", [
    ["G.I Elbow", "gi-elbow", "Galvanised 90° elbow for threaded G.I pipelines."],
    ["G.I Tee", "gi-tee", "Equal tee for branching G.I water lines."],
    ["G.I Socket", "gi-socket", "Threaded socket for joining two G.I pipes."],
    ["G.I R/Socket", "gi-r-socket", "Reducer socket for joining different pipe sizes."],
    ["G.I Union", "gi-union", "Union joint for easy assembly and maintenance."],
  ]),
  group("agriculture", "gi-bends", "g-i-bends", "G.I Bends", "Heavy-duty galvanised bends and jalis for pump and borewell installations.", [
    ["G.I Bend", "g-i-bend", "Galvanised long-radius bend for smooth flow."],
    ["G.I Short Bend", "g-i-short-bend", "Compact galvanised bend for tight spaces."],
    ["G.I HDP Bend", "g-i-hdp-bend", "G.I bend with HDP end for HDPE pipe connections."],
    ["G.I HDP Bend Plain", "g-i-hdp-bend-plane", "Plain-end G.I HDP bend for pump outlets."],
    ["G.I Bend Jali", "g-i-bend-jali", "G.I bend with strainer for suction lines."],
    ["G.I Elbow Jali", "gi-elbow-jali", "G.I elbow strainer for foot-valve setups."],
  ]),
  group("agriculture", "gi-nipples", "gi-nipples", "G.I & B.P Nipples (Heavy)", "Heavy galvanised and B.P nipples and connectors for HDPE and threaded pipes.", [
    ["G.I Nipple", "gi-nipple", "Heavy galvanised nipple with precise threading."],
    ["G.I HDP Nipple", "gi-hdp-nipple", "G.I HDP nipple for HDPE pipe to thread connections."],
    ["G.I HDP Connector", "gi-hdp-connector", "Heavy G.I connector for HDPE pipe joints."],
    ["R/HDP Nipple", "r-hdp-nipple", "Reducer HDP nipple for size transitions."],
    ["R/HDP Nipple (Long)", "r-hdp-nipple-1", "Long reducer HDP nipple for pump fittings."],
    ["R/HDP Connector", "r-hdp-connector", "Reducer HDP connector for different pipe sizes."],
    ["B.P Nipple", "b-p-nipple", "B.P nipple for strong threaded connections."],
    ["B.P HDP Nipple", "b-p-hdp-nipple", "B.P HDP nipple for HDPE pipe jointing."],
    ["B.P HDP Connector", "b-p-hdp-connector", "B.P HDP connector for agricultural lines."],
    ["Shambhu Nipple", "shambhu-nipple", "Popular Shambhu-pattern nipple for pump outlets."],
  ]),
  group("agriculture", "hdpe-fittings", "oxyjal-hdp-fittings", "OXYJAL HDPE Fittings", "OXYJAL G.I HDP nipples, bends and connectors for HDPE pipelines.", [
    ["G.I HDP Nipple", "gi-hdp-nipple", "OXYJAL G.I HDP nipple with deep grip serrations."],
    ["G.I R/HDP Nipple", "gi-r-hdp-nipple", "Reducer HDP nipple for HDPE size reduction."],
    ["G.I HDP Connector", "gi-hdp-connector", "Connector for joining two HDPE pipes."],
    ["G.I HDP Bend", "gi-hdp-bend", "HDP bend for direction change in HDPE lines."],
    ["G.I R/HDP Bend", "gi-r-hdp-bend", "Reducer HDP bend for size and direction change."],
  ]),
  group("agriculture", "ci-flanges", "oxyjal-ci-flanges", "OXYJAL C.I Flanges", "Precision-cast iron flanges with accurate drilling, clean threading and clear marking.", [
    ["C.I Flange", "c-i-flenge", "Cast iron flange with precise bolt holes."],
    ["Tail Piece Flange", "tail-pc-flenge", "C.I tail-piece flange for pump connections."],
    ["Square Flange", "square-flenge", "Square cast iron flange for pump outlets."],
  ]),
  group("agriculture", "cri-nrv", "oxyjal-cri-type-nrv-cv", "C.R.I Type C/V, F/V & Ball NRV", "OXYJAL C.R.I type check valves, foot valves and ball NRVs for pumps.", [
    ["C.R.I Type Check Valve", "cri-type-check-valve", "Swing check valve preventing reverse flow."],
    ["Check Valve with Hole", "cri-type-check-valve-with-hole", "Check valve with priming hole for easy pump priming."],
    ["C.R.I Type Foot Valve", "cri-type-foot-valve", "Foot valve with strainer to hold pump prime."],
    ["C.I Foot Valve NRV", "c-i-foot-valve-nrv", "Cast iron foot valve with non-return action."],
    ["C.I Flange Type NRV", "c-i-flenge-type-nrv", "Flanged non-return valve for pump delivery lines."],
    ["C.I Ball NRV (Heavy)", "c-i-boll-nrv-hy", "Heavy-duty ball-type NRV for submersible pumps."],
  ]),
  group("agriculture", "ci-fittings", "c-i-fittings", "C.I Jali, Ball Valve, SKT NRV & Air Valve", "Cast iron valves, jalis and NRVs for borewells and irrigation.", [
    ["C.I Ball Valve", "c-i-ball-valve", "Cast iron ball valve for full-bore flow control."],
    ["C.I SKT NRV", "c-i-skt-nrv", "Socket-end non-return valve in cast iron."],
    ["Aluminium Air Valve", "aliminium-air-valve", "Releases trapped air to protect pipelines."],
    ["SS Open Well Jali", "c-i-ss-open-well-jali", "Strainer for open well suction lines."],
    ["Round C/V Heavy (PCW)", "round-c-v-pcw-hy", "Heavy round check valve for pump outlets."],
    ["Round C/V Medium", "round-c-v-med", "Medium-duty round check valve."],
  ]),
  group("agriculture", "ci-hose-collar", "c-i-hose-coller", "C.I Hose Collars", "Cast iron hose collars and connectors for suction and delivery hoses.", [
    ["C.I Hose Collar", "c-i-hose-coller", "Cast iron hose collar for pump hose connections."],
    ["C.I R/Hose Collar", "c-i-r-hose-coller", "Reducer hose collar for hose size transitions."],
    ["C.I SKT Hose Collar", "skt-hose-coller", "Socket-end hose collar in cast iron."],
    ["C.I Hose Connector", "c-i-hose-connector", "Connector for joining two hoses securely."],
  ]),
  group("agriculture", "ci-a-brand-fittings", "c-i-a-brand-fittings", "C.I 'A' Brand Fittings", "Cast iron hex nipples, caps, plugs, bushes and C/V billas.", [
    ["C.I Hex Nipple", "c-i-hex-nipple", "Cast iron hex nipple with clean threads."],
    ["C.I Cap", "ci-cap-plug", "Cast iron end cap for sealing pipe ends."],
    ["C.I Plug", "c-i-plug", "Threaded cast iron plug for fittings."],
    ["C.I R/Bush", "ci-fitting-bush-500x500", "Reducer bush for size reduction in threaded joints."],
    ["C.I C/V Billa", "c-i-c-v-billa", "Replacement check valve disc (billa)."],
  ]),
  group("agriculture", "brass-items", "brass-fittings", "Brass Items", "Brass ball valves, NRVs and tee ferrules for long service life.", [
    ["Brass Ball Valve (Heavy)", "brass-ball-valve-hy", "Heavy brass ball valve with quarter-turn lever."],
    ["Brass Ball Valve (Medium)", "brass-ball-valve-med", "Medium-duty brass ball valve."],
    ["Brass NRV (Heavy)", "brass-nrv-hy", "Heavy brass non-return valve."],
    ["Brass NRV (Medium)", "brass-nrv-med-hy", "Medium brass non-return valve."],
    ["Brass Tee Ferrules", "brass-tee-ferrules", "Brass tee ferrules for service connections."],
  ]),
  group("agriculture", "pvc-items", "pvc-items", "PVC Agriculture Fittings", "Hero, Kelton and MDPE fittings and valves for irrigation.", [
    ["Hero PVC Fittings", "hero-pvc-fittings", "Hero agriculture PVC fittings for irrigation lines."],
    ["Kelton PVC Ball Valve", "kelton-pvc-ball-valve", "Kelton PVC ball valve with smooth operation."],
    ["PVC 3-Way Ball Valves", "pvc-3way-ball-valves", "3-way ball valves to divert irrigation flow."],
    ["PVC Union", "pvc-union", "PVC union for easy dismantling of lines."],
    ["PVC 4kg Bend", "pvc-4kg-bend", "4 kg/cm² rated PVC bend."],
    ["PVC 4kg Coupler", "pvc-4kg-coupler", "4 kg/cm² rated PVC coupler."],
    ["PVC RRJ / QFS", "pvc-rrj-qfs", "Rubber-ring joint and quick-fit system fittings."],
    ["MDPE Fittings", "mdpe-fittings", "Compression fittings for MDPE and HDPE pipes."],
  ]),
  group("agriculture", "clips-clamps", "clip-s-and-clamp-s", "Clips & Clamps", "Hose clips and submersible clamps for secure fastening.", [
    ["Butterfly Clips", "buterfly-clip-s", "Butterfly hose clips for quick tightening by hand."],
    ["Jubilee Clips", "jubli-clip", "Worm-drive jubilee clips for hoses."],
    ["Ajanta Clips", "ajanta-clip-s", "Ajanta-pattern hose clips."],
    ["White Clips (Heavy)", "white-clip-s-hy", "Heavy white pipe clips."],
    ["Submersible Clamp", "submersible-clamp", "Clamp to support submersible pump pipes."],
    ["SS Submersible Clamp", "ss-submersible-clamp", "Stainless steel submersible clamp."],
  ]),
  group("agriculture", "bore-covers-others", "other-item-s", "Bore Covers, Washers & Other Items", "Bore covers, washers, PVC foot valves and essential pump accessories.", [
    ["Iron Bore Cover (Heavy)", "iron-bore-cover-hy", "Heavy iron borewell cap for protection."],
    ["HDPE Bore Cover", "hdpe-bore-cover", "Rust-free HDPE borewell cover."],
    ["Aluminium Bore Cover", "aluminium-bore-cover", "Lightweight aluminium borewell cover."],
    ["Flange Washers", "flange-washer-s", "Rubber washers for leak-proof flange joints."],
    ["Round C/V Washers", "round-c-v-washer-s", "Replacement washers for round check valves."],
    ["C.R.I C/V Washers", "cri-c-v-washer-s", "Replacement washers for C.R.I check valves."],
    ["PVC F/V Red", "pvc-f-v-red", "Red PVC foot valve for pump suction lines."],
    ["PVC F/V", "pvc-f-v", "PVC foot valve with built-in strainer."],
    ["PVC Elbow Jali", "pvc-elbow-jali", "PVC elbow strainer for suction lines."],
    ["SS FCV", "ss-fcv", "Stainless steel flow control valve."],
    ["C.I Taps", "c-i-taps", "Heavy cast iron taps for outdoor use."],
    ["Owel Flange", "owel-flenge", "Oval flange for pump body connections."],
    ["Casing Billa", "casing-billa", "Borewell casing cap (billa)."],
    ["Hexa Blade", "hexa-blade", "Hacksaw blades for cutting pipes."],
    ["Jet Pump Bag", "jet-pump-bag", "Jet pump accessory kit bag."],
    ["Shellac", "shellac", "Shellac sealing compound for threaded joints."],
  ]),
]

export const categories: Category[] = [
  {
    slug: "sanitary-plumbing",
    title: "Sanitary & Plumbing",
    shortTitle: "Plumbing",
    tagline: "CPVC · UPVC · SWR · UGD · Taps · Accessories",
    description:
      "Pipes, fittings, taps, showers, solvents and accessories from trusted brands like Hero, Amrut, IZOTI, FLOZY and BOND-WELD.",
    cover: "/products/sanitary/hero-agro-plast/hero-group-photo.webp",
    groups: sanitaryGroups,
  },
  {
    slug: "agriculture-engineering",
    title: "Agriculture & Engineering",
    shortTitle: "Agriculture",
    tagline: "SS HDP · G.I · C.I Flanges · NRV · Brass · PVC",
    description:
      "SS HDP nipples, G.I & C.I fittings, flanges, valves, clamps and borewell accessories built for the field.",
    cover: "/products/agriculture/oxyjal-ss-hdp-fittings/ss-hdp-nipples-group-photo.webp",
    groups: agricultureGroups,
  },
]

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function countProducts(category: Category) {
  return category.groups.reduce((sum, g) => sum + g.products.length, 0)
}

/** Route for a single product page: /products/<category>/<group>/<product>. */
export function productPath(categorySlug: string, groupSlug: string, productSlug: string) {
  return `/products/${categorySlug}/${groupSlug}/${productSlug}`
}

/** Resolves a product together with its category and range. */
export function getProduct(categorySlug: string, groupSlug: string, productSlug: string) {
  const category = getCategory(categorySlug)
  if (!category) return undefined
  const group = category.groups.find((g) => g.slug === groupSlug)
  if (!group) return undefined
  const product = group.products.find((p) => p.slug === productSlug)
  if (!product) return undefined
  return { category, group, product }
}

/** Every product in the catalogue, flattened, with its category and range attached. */
export const allProducts = categories.flatMap((category) =>
  category.groups.flatMap((group) =>
    group.products.map((product) => ({ product, group, category })),
  ),
)

/** Flattens the catalogue for site-wide search. */
export function catalogueEntries() {
  return categories.flatMap((category) =>
    category.groups.flatMap((group) =>
      group.products.map((product) => ({
        product,
        groupTitle: group.title,
        categoryTitle: category.title,
        categorySlug: category.slug,
        groupSlug: group.slug,
        href: productPath(category.slug, group.slug, product.slug),
      })),
    ),
  )
}

/** Products that share a range with the given product — used for "related items". */
export function relatedProducts(category: Category, group: ProductGroup, excludeId: string, limit = 4) {
  const siblings = group.products
    .filter((p) => p.id !== excludeId)
    .map((product) => ({
      product,
      groupTitle: group.title,
      href: productPath(category.slug, group.slug, product.slug),
    }))

  const others = category.groups
    .filter((g) => g.slug !== group.slug)
    .flatMap((g) =>
      g.products.map((product) => ({
        product,
        groupTitle: g.title,
        href: productPath(category.slug, g.slug, product.slug),
      })),
    )

  return [...siblings, ...others].slice(0, limit)
}

export const brands = [
  { name: "Hero Agro Plast", logo: "/brands/hero-logo.webp" },
  { name: "OXYJAL", logo: "/brands/oxy-jal-logo.webp" },
  { name: "IZOTI Taps", logo: "/brands/izoti-logo.webp" },
  { name: "FLOZY Taps", logo: "/brands/flozy-logo.webp" },
  { name: "BOND-WELD Solvents", logo: "/brands/bond-weld-logo.webp" },
  { name: "KELTON Ball Valves", logo: "/brands/kelton-logo.webp" },
  { name: "JINDAL G.I Pipes", logo: "/brands/jindal-logo.webp" },
  { name: "AMRUT CPVC Pipes", logo: "/brands/amrut-logo.webp" },
  { name: "Quick Weld", logo: "/brands/quick-weld-logo.webp" },
]

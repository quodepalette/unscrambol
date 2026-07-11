(() => {
  'use strict';

  /* ============================================================
     Fully offline word bank. Five categories, each hand-tiered by
     word length into Easy / Medium / Hard so difficulty always
     makes sense for that category. Every entry carries:
       - hint: a short clue revealed progressively via the Hint button
       - fact: a brief, accurate explanation shown after the round
         ends (win, timeout, or skip) for learning & recollection
     ============================================================ */
  const WORD_BANK = [
    // ---------------- ANIMALS ----------------
    {
      word: 'DOG',
      category: 'animals',
      hint: "Humanity's oldest domesticated companion",
      fact: 'Dogs were domesticated from wolves at least 15,000 years ago, the first animal humans ever tamed.',
    },
    {
      word: 'CAT',
      category: 'animals',
      hint: 'Independent household hunter',
      fact: "Domestic cats retain much of their wild ancestors' hunting instinct even after thousands of years alongside humans.",
    },
    {
      word: 'OWL',
      category: 'animals',
      hint: 'Silent nighttime hunter with a swiveling head',
      fact: 'An owl can rotate its head up to about 270 degrees because it has far more neck vertebrae than humans.',
    },
    {
      word: 'LION',
      category: 'animals',
      hint: 'Big cat known as king of the savanna',
      fact: 'Lions are the only big cats that live in social groups, called prides, usually led by related females.',
    },
    {
      word: 'BEAR',
      category: 'animals',
      hint: 'Large mammal that hibernates through winter',
      fact: "During hibernation a bear's heart rate can drop from around 50 beats per minute to under 10.",
    },
    {
      word: 'FROG',
      category: 'animals',
      hint: 'Amphibian known for its powerful jump',
      fact: 'Frogs absorb water and breathe partly through their skin, which is why they need to stay moist.',
    },
    {
      word: 'DUCK',
      category: 'animals',
      hint: 'Waterfowl with a broad, flat bill',
      fact: "A duck's feathers are coated in oil from a preen gland, keeping it waterproof and buoyant.",
    },
    {
      word: 'WOLF',
      category: 'animals',
      hint: 'Ancestor of the domestic dog',
      fact: 'Wolves live in packs with a clear social structure and communicate through howls that can travel for miles.',
    },
    {
      word: 'HAWK',
      category: 'animals',
      hint: 'Sharp-eyed daytime bird of prey',
      fact: "A hawk's eyesight is estimated to be several times sharper than a human's, ideal for spotting prey from high up.",
    },
    {
      word: 'SHARK',
      category: 'animals',
      hint: 'Cartilaginous ocean predator',
      fact: "A shark's skeleton is made entirely of cartilage rather than bone, making it lighter and more flexible.",
    },
    {
      word: 'ZEBRA',
      category: 'animals',
      hint: 'Striped African relative of the horse',
      fact: "Every zebra's stripe pattern is unique, similar to a human fingerprint.",
    },
    {
      word: 'KOALA',
      category: 'animals',
      hint: 'Eucalyptus-eating Australian marsupial',
      fact: 'Koalas sleep up to 20 hours a day partly because eucalyptus leaves are low in energy and mildly toxic.',
    },
    {
      word: 'OTTER',
      category: 'animals',
      hint: 'Playful river-dwelling swimmer',
      fact: "Sea otters often hold hands while sleeping so they don't drift apart in the water.",
    },
    {
      word: 'EAGLE',
      category: 'animals',
      hint: 'Large raptor and national bird of the US',
      fact: "A bald eagle's grip strength is roughly ten times stronger than a human hand's.",
    },
    {
      word: 'TIGER',
      category: 'animals',
      hint: 'Largest striped big cat',
      fact: 'No two tigers have the same stripe pattern, and the stripes are on their skin, not just their fur.',
    },
    {
      word: 'MONKEY',
      category: 'animals',
      hint: 'Agile tree-dwelling primate',
      fact: 'Most monkeys have tails they use for balance, while great apes like gorillas do not have tails at all.',
    },
    {
      word: 'FALCON',
      category: 'animals',
      hint: 'Fastest bird, famous for its dive',
      fact: 'The peregrine falcon can exceed 240 mph in a hunting dive, making it the fastest animal on Earth.',
    },
    {
      word: 'RABBIT',
      category: 'animals',
      hint: 'Long-eared hopping mammal',
      fact: "A rabbit's teeth never stop growing, so it must constantly gnaw to keep them worn down.",
    },
    {
      word: 'DOLPHIN',
      category: 'animals',
      hint: 'Clever, playful marine mammal',
      fact: 'Dolphins sleep with one half of their brain at a time so they can keep breathing and stay alert to danger.',
    },
    {
      word: 'PENGUIN',
      category: 'animals',
      hint: 'Flightless bird built for swimming',
      fact: "Penguins can't fly, but their wings evolved into flippers that let them 'fly' through water instead.",
    },
    {
      word: 'GIRAFFE',
      category: 'animals',
      hint: 'Tallest living land animal',
      fact: 'Despite its long neck, a giraffe has the same number of neck vertebrae as a human: seven.',
    },
    {
      word: 'CHEETAH',
      category: 'animals',
      hint: 'Fastest land animal on the plains',
      fact: 'A cheetah can accelerate from 0 to 60 mph in about three seconds but can only sprint for short bursts.',
    },
    {
      word: 'PANTHER',
      category: 'animals',
      hint: 'Common name for a dark-coated big cat',
      fact: "'Panther' isn't a distinct species; it usually refers to a leopard or jaguar with a rare black coat.",
    },
    {
      word: 'GORILLA',
      category: 'animals',
      hint: 'Powerful, largest living primate',
      fact: 'Gorillas share about 98% of their DNA with humans and live in family groups led by a dominant male.',
    },
    {
      word: 'LEOPARD',
      category: 'animals',
      hint: 'Spotted big cat known for tree-climbing',
      fact: 'Leopards are strong enough to drag prey heavier than themselves up into trees, away from other predators.',
    },
    {
      word: 'ELEPHANT',
      category: 'animals',
      hint: 'Largest living land animal',
      fact: "An elephant's trunk contains no bones and has over 40,000 muscles, letting it perform incredibly delicate tasks.",
    },
    {
      word: 'FLAMINGO',
      category: 'animals',
      hint: 'Pink wading bird that stands on one leg',
      fact: "A flamingo's pink color comes from pigments in the algae and shrimp it eats, not its genetics.",
    },
    {
      word: 'MEERKAT',
      category: 'animals',
      hint: 'Small mongoose that stands guard upright',
      fact: "Meerkats live in tight social groups and take turns acting as a lookout, or 'sentry,' for predators.",
    },
    {
      word: 'ALLIGATOR',
      category: 'animals',
      hint: 'Broad-snouted reptile of American swamps',
      fact: 'Alligators have one of the strongest bite forces of any animal, but the muscles that open their jaws are surprisingly weak.',
    },
    {
      word: 'CHIMPANZEE',
      category: 'animals',
      hint: 'Highly intelligent great ape, close to humans',
      fact: 'Chimpanzees share about 98.8% of their DNA with humans, making them our closest living relatives.',
    },
    {
      word: 'SALAMANDER',
      category: 'animals',
      hint: 'Amphibian famous for regrowing lost limbs',
      fact: 'Some salamanders can fully regenerate an entire lost limb, including bone, muscle, and nerves.',
    },
    {
      word: 'RHINOCEROS',
      category: 'animals',
      hint: 'Thick-skinned mammal known for its horn',
      fact: "A rhino's horn is made of keratin, the same protein found in human hair and fingernails.",
    },
    {
      word: 'CROCODILE',
      category: 'animals',
      hint: 'Ancient reptilian ambush predator',
      fact: "Crocodiles have survived largely unchanged for tens of millions of years, predating even the dinosaurs' extinction.",
    },
    {
      word: 'ORANGUTAN',
      category: 'animals',
      hint: 'Red-haired, tree-dwelling Asian great ape',
      fact: 'Orangutans spend nearly their entire lives in trees and build a fresh sleeping nest almost every night.',
    },
    {
      word: 'ARMADILLO',
      category: 'animals',
      hint: 'Armor-plated mammal that can curl into a ball',
      fact: 'Armadillos are the only mammals covered in a hard, bony shell instead of thick fur or scales.',
    },
    {
      word: 'PORCUPINE',
      category: 'animals',
      hint: 'Rodent covered in sharp defensive quills',
      fact: "A porcupine cannot shoot its quills; they detach easily on contact and stay lodged in a predator's skin.",
    },
    {
      word: 'HUMMINGBIRD',
      category: 'animals',
      hint: 'Tiny bird that can hover and fly backward',
      fact: "A hummingbird's heart can beat over 1,200 times per minute during flight, faster than almost any other bird.",
    },
    {
      word: 'COW',
      category: 'animals',
      hint: 'Domesticated bovine kept for milk and meat',
      fact: 'Cows have an almost 360-degree field of vision thanks to the wide placement of their eyes on the sides of their head.',
    },
    {
      word: 'PIG',
      category: 'animals',
      hint: 'Intelligent farm animal known for rolling in mud',
      fact: "Pigs roll in mud not because they're dirty, but because it helps them cool down since they can't sweat effectively.",
    },
    {
      word: 'FOX',
      category: 'animals',
      hint: 'Cunning wild canine with a bushy tail',
      fact: "A fox's bushy tail, called a brush, helps it balance and wraps around its body like a blanket in the cold.",
    },
    {
      word: 'BAT',
      category: 'animals',
      hint: 'Only mammal capable of true, sustained flight',
      fact: 'Bats are the only mammals that can truly fly, using wings formed from thin skin stretched between elongated fingers.',
    },
    {
      word: 'ELK',
      category: 'animals',
      hint: 'Large deer species found in North America and Asia',
      fact: "A male elk's antlers can grow up to an inch a day during summer, among the fastest growth rates in nature.",
    },
    {
      word: 'HARE',
      category: 'animals',
      hint: 'Fast, long-eared relative of the rabbit',
      fact: 'Hares are born fully furred with open eyes, unlike rabbits, which are born blind and hairless.',
    },
    {
      word: 'GOAT',
      category: 'animals',
      hint: 'Sure-footed farm animal known for climbing',
      fact: "A goat's rectangular pupils give it an almost 320-degree field of view, helping it spot predators from any angle.",
    },
    {
      word: 'SEAL',
      category: 'animals',
      hint: 'Flippered marine mammal that hauls out on land',
      fact: 'Seals can dramatically slow their heart rate while diving, helping them conserve oxygen for long stretches underwater.',
    },
    {
      word: 'MOTH',
      category: 'animals',
      hint: 'Nocturnal cousin of the butterfly',
      fact: 'Most moths are nocturnal and are thought to navigate at night partly by keeping a fixed angle to the moon.',
    },
    {
      word: 'LYNX',
      category: 'animals',
      hint: 'Wild cat with tufted ears and a short tail',
      fact: "A lynx's large, padded paws act like snowshoes, spreading its weight so it can move easily across deep snow.",
    },
    {
      word: 'BISON',
      category: 'animals',
      hint: 'Massive shaggy grazer of the North American plains',
      fact: 'Bison can sprint up to 35 miles per hour despite weighing close to a ton.',
    },
    {
      word: 'HYENA',
      category: 'animals',
      hint: "Africa's skilled scavenger with a powerful bite",
      fact: "A spotted hyena's jaw is strong enough to crack open bones that most other predators can't touch.",
    },
    {
      word: 'RAVEN',
      category: 'animals',
      hint: 'Highly intelligent black-feathered bird',
      fact: 'Ravens can solve multi-step puzzles and have been observed using tools to obtain food.',
    },
    {
      word: 'WOMBAT',
      category: 'animals',
      hint: 'Burrowing Australian marsupial with cube-shaped droppings',
      fact: 'Wombats produce cube-shaped droppings, which scientists believe helps stop the waste from rolling away.',
    },
    {
      word: 'JAGUAR',
      category: 'animals',
      hint: 'Powerful spotted big cat of the Americas',
      fact: 'Unlike most cats, jaguars often kill prey by piercing the skull directly with their exceptionally strong bite.',
    },
    {
      word: 'TOUCAN',
      category: 'animals',
      hint: 'Tropical bird famous for its oversized bill',
      fact: "A toucan's large bill is mostly hollow and helps the bird regulate its body temperature in the heat.",
    },
    {
      word: 'BEAVER',
      category: 'animals',
      hint: 'Dam-building rodent with a flat, paddle-like tail',
      fact: 'Beavers build dams to create ponds deep enough to hide the underwater entrances to their lodges.',
    },
    {
      word: 'OCELOT',
      category: 'animals',
      hint: 'Small, spotted wild cat of Central and South America',
      fact: 'Ocelots are largely nocturnal and can rotate their ankles to climb down trees headfirst.',
    },
    {
      word: 'VULTURE',
      category: 'animals',
      hint: 'Scavenging bird with a bald, featherless head',
      fact: "A vulture's bald head helps keep it clean while feeding deep inside a carcass.",
    },
    {
      word: 'SEAHORSE',
      category: 'animals',
      hint: 'Tiny fish that swims upright and mates for life',
      fact: "Seahorses are unusual among animals because it's the male that carries and gives birth to the young.",
    },
    {
      word: 'TARANTULA',
      category: 'animals',
      hint: 'Large, hairy spider that can flick irritating bristles',
      fact: 'Many tarantulas can flick barbed hairs from their abdomen as a defense against approaching predators.',
    },
    {
      word: 'WOODPECKER',
      category: 'animals',
      hint: 'Bird known for drumming on tree trunks',
      fact: "A woodpecker's skull has spongy, shock-absorbing bone that protects its brain from repeated high-speed impacts.",
    },

    // ---------------- ELEMENTS ----------------
    {
      word: 'TIN',
      category: 'elements',
      hint: 'Soft metal historically alloyed with copper',
      fact: 'Tin combined with copper produces bronze, an alloy that gave the Bronze Age its name.',
    },
    {
      word: 'GOLD',
      category: 'elements',
      hint: 'Precious yellow metal, symbol Au',
      fact: 'Gold is so unreactive that it barely tarnishes, which is why ancient gold artifacts still shine today.',
    },
    {
      word: 'ZINC',
      category: 'elements',
      hint: 'Bluish-white metal used to coat steel',
      fact: 'Coating steel in zinc, called galvanizing, protects it from rusting for decades.',
    },
    {
      word: 'IRON',
      category: 'elements',
      hint: 'Metal at the core of hemoglobin',
      fact: 'Iron in hemoglobin is what makes blood red and lets it carry oxygen through the body.',
    },
    {
      word: 'NEON',
      category: 'elements',
      hint: 'Noble gas that glows in signs',
      fact: "Neon glows reddish-orange when electrified, which is why classic 'neon signs' often use it for that specific color.",
    },
    {
      word: 'LEAD',
      category: 'elements',
      hint: 'Heavy, soft metal, symbol Pb',
      fact: 'Lead was once common in paint and pipes but was phased out after its serious health risks were understood.',
    },
    {
      word: 'BORON',
      category: 'elements',
      hint: 'Element used to make heat-resistant glass',
      fact: 'Boron is added to glass to make borosilicate glass, prized for resisting thermal shock in lab equipment and cookware.',
    },
    {
      word: 'ARGON',
      category: 'elements',
      hint: 'Inert gas that fills incandescent bulbs',
      fact: "Argon is used inside light bulbs because it doesn't react with the hot filament, helping it last longer.",
    },
    {
      word: 'XENON',
      category: 'elements',
      hint: 'Rare gas used in bright car headlights',
      fact: "Xenon gas produces a bright, white light, which is why it's used in some high-intensity headlamps and flash lamps.",
    },
    {
      word: 'RADON',
      category: 'elements',
      hint: 'Radioactive gas that can seep into basements',
      fact: 'Radon is a naturally occurring radioactive gas and a leading cause of lung cancer among non-smokers.',
    },
    {
      word: 'OXYGEN',
      category: 'elements',
      hint: 'Gas humans breathe to survive',
      fact: "Oxygen makes up about 21% of Earth's atmosphere and is essential for the way most life releases energy.",
    },
    {
      word: 'CARBON',
      category: 'elements',
      hint: 'Element that forms the backbone of life',
      fact: 'Carbon can bond in more ways than almost any other element, which is why it forms the basis of all known life.',
    },
    {
      word: 'SILVER',
      category: 'elements',
      hint: 'Shiny metal, the best electrical conductor',
      fact: 'Silver conducts electricity and heat better than any other metal, even better than copper or gold.',
    },
    {
      word: 'COPPER',
      category: 'elements',
      hint: 'Reddish metal used in electrical wiring',
      fact: 'Copper is widely used in wiring because it conducts electricity extremely well and is more affordable than silver.',
    },
    {
      word: 'HELIUM',
      category: 'elements',
      hint: 'Light gas that makes balloons float',
      fact: "Helium is so light and unreactive that it constantly escapes Earth's atmosphere into space, so it must be mined from natural gas.",
    },
    {
      word: 'NICKEL',
      category: 'elements',
      hint: 'Metal used in stainless steel and coins',
      fact: "Nickel is added to steel to make it resist corrosion, which is why it's key to producing stainless steel.",
    },
    {
      word: 'SODIUM',
      category: 'elements',
      hint: 'Reactive metal found in table salt',
      fact: 'Pure sodium metal reacts violently with water, even though it forms harmless table salt when bonded with chlorine.',
    },
    {
      word: 'URANIUM',
      category: 'elements',
      hint: 'Heavy radioactive metal used as nuclear fuel',
      fact: "Uranium's atoms can split apart in a process called fission, releasing enormous energy used in nuclear reactors.",
    },
    {
      word: 'CALCIUM',
      category: 'elements',
      hint: 'Mineral element that builds bones and teeth',
      fact: 'About 99% of the calcium in the human body is stored in bones and teeth.',
    },
    {
      word: 'TITANIUM',
      category: 'elements',
      hint: 'Strong, lightweight metal used in aircraft',
      fact: "Titanium has one of the best strength-to-weight ratios of any metal, which is why it's used in jets and spacecraft.",
    },
    {
      word: 'PLATINUM',
      category: 'elements',
      hint: 'Dense precious metal used in catalytic converters',
      fact: "Platinum is so resistant to corrosion that it's used in car catalytic converters to withstand extreme heat and chemicals.",
    },
    {
      word: 'HYDROGEN',
      category: 'elements',
      hint: 'Lightest and most abundant element in the universe',
      fact: 'Hydrogen makes up roughly 75% of all the ordinary matter in the universe, mostly found inside stars.',
    },
    {
      word: 'NITROGEN',
      category: 'elements',
      hint: "Gas that makes up most of Earth's air",
      fact: 'Nitrogen makes up about 78% of the air we breathe, even though our bodies mostly use the oxygen instead.',
    },
    {
      word: 'CHLORINE',
      category: 'elements',
      hint: 'Greenish gas used to disinfect water',
      fact: 'Chlorine is added to drinking water and pools because it kills harmful bacteria and other pathogens.',
    },
    {
      word: 'MAGNESIUM',
      category: 'elements',
      hint: 'Light metal that burns with a bright white flame',
      fact: 'Magnesium is central to chlorophyll, the molecule that lets plants absorb sunlight for photosynthesis.',
    },
    {
      word: 'PHOSPHORUS',
      category: 'elements',
      hint: 'Element essential to DNA and glowing in the dark',
      fact: "White phosphorus glows faintly in the dark due to slow oxidation, which is how the element got its name, meaning 'light-bearer.'",
    },
    {
      word: 'POTASSIUM',
      category: 'elements',
      hint: 'Soft metal vital for nerve and muscle function',
      fact: 'Potassium ions are essential for sending the electrical signals that let your heart and nerves function properly.',
    },
    {
      word: 'ALUMINIUM',
      category: 'elements',
      hint: 'Lightweight metal used in cans and foil',
      fact: "Aluminium is the most abundant metal in Earth's crust, yet it wasn't isolated until the 1800s because it's hard to refine.",
    },
    {
      word: 'MANGANESE',
      category: 'elements',
      hint: 'Metal added to steel for extra hardness',
      fact: 'Adding manganese to steel dramatically increases its strength and resistance to wear, especially in railway tracks.',
    },
    {
      word: 'BERYLLIUM',
      category: 'elements',
      hint: 'Lightweight metal found in emeralds',
      fact: 'Beryllium is a key component of emeralds and aquamarine, which get their color from trace impurities in the mineral.',
    },
    {
      word: 'STRONTIUM',
      category: 'elements',
      hint: 'Metal that produces red fireworks',
      fact: "Strontium compounds burn with a brilliant red flame, which is why they're used in fireworks and road flares.",
    },
    {
      word: 'ZIRCONIUM',
      category: 'elements',
      hint: 'Corrosion-resistant metal used in nuclear reactors',
      fact: "Zirconium resists corrosion so well that it's used to encase nuclear fuel rods inside reactors.",
    },
    {
      word: 'SULFUR',
      category: 'elements',
      hint: 'Pale yellow nonmetal known for its rotten-egg smell',
      fact: 'Pure sulfur is actually odorless; its notorious rotten-egg smell comes from compounds it forms, like hydrogen sulfide.',
    },
    {
      word: 'COBALT',
      category: 'elements',
      hint: 'Metal that gives glass and glazes a deep blue color',
      fact: 'Cobalt compounds have been used to color glass and ceramics a vivid blue since ancient Egyptian times.',
    },
    {
      word: 'BARIUM',
      category: 'elements',
      hint: 'Metal compound used in imaging the digestive system',
      fact: 'Doctors use a barium compound as a contrast agent because it shows up clearly on X-rays of the gut.',
    },
    {
      word: 'CESIUM',
      category: 'elements',
      hint: 'Metal used to define the length of a second',
      fact: 'The official definition of one second is based on the precise vibrations of a cesium atom.',
    },
    {
      word: 'IODINE',
      category: 'elements',
      hint: 'Element essential for healthy thyroid function',
      fact: 'A lack of iodine in the diet can cause the thyroid gland to swell, a condition known as goiter.',
    },
    {
      word: 'KRYPTON',
      category: 'elements',
      hint: 'Noble gas used in some energy-efficient light bulbs',
      fact: 'Krypton gas is used to fill certain fluorescent and energy-saving light bulbs because it improves their efficiency.',
    },
    {
      word: 'SILICON',
      category: 'elements',
      hint: 'Element that forms the basis of computer chips',
      fact: 'Nearly all computer chips are built on silicon because of how precisely its conductivity can be controlled.',
    },
    {
      word: 'SELENIUM',
      category: 'elements',
      hint: 'Trace element essential in small amounts for human health',
      fact: 'Selenium is essential in tiny amounts for human health, but it becomes toxic at only slightly higher doses.',
    },
    {
      word: 'CADMIUM',
      category: 'elements',
      hint: 'Toxic metal once common in rechargeable batteries',
      fact: 'Cadmium was widely used in rechargeable nickel-cadmium batteries before health and environmental concerns reduced its use.',
    },
    {
      word: 'MERCURY',
      category: 'elements',
      hint: 'Liquid metal at room temperature, once used in thermometers',
      fact: "Mercury is the only metal that is liquid at room temperature, though it's now avoided due to its toxicity.",
    },
    {
      word: 'ANTIMONY',
      category: 'elements',
      hint: 'Brittle metal historically used in ancient cosmetics',
      fact: 'Antimony compounds were used as early eye cosmetics in ancient Egypt, similar to modern kohl eyeliner.',
    },
    {
      word: 'TUNGSTEN',
      category: 'elements',
      hint: 'Metal with the highest melting point of any element',
      fact: 'Tungsten has the highest melting point of any metal, which is why it was long used in incandescent light bulb filaments.',
    },
    {
      word: 'NEODYMIUM',
      category: 'elements',
      hint: 'Metal used to make extremely powerful magnets',
      fact: 'Neodymium magnets are among the strongest permanent magnets available, used in everything from headphones to hard drives.',
    },
    {
      word: 'YTTERBIUM',
      category: 'elements',
      hint: 'Rare earth metal used in precise atomic clocks',
      fact: 'Some of the most precise atomic clocks ever built use ytterbium atoms instead of the more common cesium.',
    },
    {
      word: 'PALLADIUM',
      category: 'elements',
      hint: 'Precious metal used in catalytic converters',
      fact: 'Palladium can absorb hydrogen gas in vast quantities, up to 900 times its own volume.',
    },
    {
      word: 'RUTHENIUM',
      category: 'elements',
      hint: 'Rare metal used to harden platinum and palladium alloys',
      fact: 'Ruthenium is often added to platinum and palladium jewelry alloys to make them more scratch-resistant.',
    },
    {
      word: 'MOLYBDENUM',
      category: 'elements',
      hint: 'Metal added to steel to boost strength at high heat',
      fact: 'Molybdenum is added to steel alloys to help them keep their strength at very high temperatures.',
    },
    {
      word: 'TECHNETIUM',
      category: 'elements',
      hint: 'First artificially produced chemical element',
      fact: 'Technetium was the first element created artificially rather than found in nature, first produced in 1937.',
    },
    {
      word: 'LANTHANUM',
      category: 'elements',
      hint: 'Rare earth metal used in camera and telescope lenses',
      fact: 'Lanthanum oxide is added to optical glass to improve the quality of camera and telescope lenses.',
    },
    {
      word: 'GADOLINIUM',
      category: 'elements',
      hint: 'Rare earth metal used as a contrast agent in MRI scans',
      fact: 'Gadolinium compounds are injected before some MRI scans because they make certain tissues show up more clearly.',
    },
    {
      word: 'DYSPROSIUM',
      category: 'elements',
      hint: 'Rare earth metal used in magnets for electric motors',
      fact: 'Small amounts of dysprosium are added to magnets in electric motors and wind turbines to keep them strong at high heat.',
    },

    // ---------------- FOODS ----------------
    {
      word: 'RICE',
      category: 'foods',
      hint: 'Staple grain feeding over half the world',
      fact: "Rice is the staple food for more than half of the world's population, especially across Asia.",
    },
    {
      word: 'TACO',
      category: 'foods',
      hint: 'Folded tortilla filled with savory ingredients',
      fact: "The taco's folded tortilla format is believed to date back centuries to Mexico's silver mines.",
    },
    {
      word: 'CORN',
      category: 'foods',
      hint: 'Golden kernel crop, also called maize',
      fact: 'Corn was first domesticated in Mexico thousands of years ago from a wild grass called teosinte.',
    },
    {
      word: 'MILK',
      category: 'foods',
      hint: 'White liquid drunk straight from the source',
      fact: 'Milk contains lactose, a sugar that many adults worldwide struggle to digest after childhood.',
    },
    {
      word: 'PEAR',
      category: 'foods',
      hint: 'Sweet fruit that ripens from the inside out',
      fact: 'Pears are picked while still hard and ripen best off the tree, unlike most other fruit.',
    },
    {
      word: 'APPLE',
      category: 'foods',
      hint: 'Crisp fruit that keeps the doctor away',
      fact: 'There are more than 7,500 varieties of apples grown around the world.',
    },
    {
      word: 'BREAD',
      category: 'foods',
      hint: 'Baked staple made from flour and water',
      fact: 'Bread rises because yeast ferments sugars in the dough, releasing carbon dioxide gas that forms air pockets.',
    },
    {
      word: 'PIZZA',
      category: 'foods',
      hint: 'Cheesy Italian classic on flatbread',
      fact: 'Modern pizza traces back to Naples, Italy, where flatbreads were topped with tomato in the 18th century.',
    },
    {
      word: 'LEMON',
      category: 'foods',
      hint: 'Sour yellow citrus fruit',
      fact: 'Lemons are packed with vitamin C and were historically carried on ships to prevent scurvy among sailors.',
    },
    {
      word: 'GRAPE',
      category: 'foods',
      hint: 'Small fruit that grows in clusters on vines',
      fact: "Grapes are one of the world's oldest cultivated fruits, with winemaking evidence dating back over 6,000 years.",
    },
    {
      word: 'MANGO',
      category: 'foods',
      hint: 'Sweet tropical stone fruit',
      fact: "Mango is sometimes called the 'king of fruits' and is the most widely consumed fruit in the world by volume.",
    },
    {
      word: 'HONEY',
      category: 'foods',
      hint: 'Golden syrup made by bees',
      fact: 'Honey never truly spoils; sealed jars found in ancient Egyptian tombs were still edible thousands of years later.',
    },
    {
      word: 'STEAK',
      category: 'foods',
      hint: 'Thick slice of grilled or pan-seared beef',
      fact: 'Resting a steak after cooking lets its juices redistribute, resulting in a more tender, evenly moist bite.',
    },
    {
      word: 'OLIVE',
      category: 'foods',
      hint: 'Small fruit pressed to make a common cooking oil',
      fact: "Raw olives straight off the tree are intensely bitter and must be cured before they're edible.",
    },
    {
      word: 'CHICKEN',
      category: 'foods',
      hint: 'Most widely eaten poultry meat',
      fact: 'Chicken is the most consumed meat globally, in part because it requires far less feed and land than beef.',
    },
    {
      word: 'BANANA',
      category: 'foods',
      hint: 'Curved yellow fruit rich in potassium',
      fact: 'Bananas are botanically classified as berries, while strawberries technically are not.',
    },
    {
      word: 'CHEESE',
      category: 'foods',
      hint: 'Fermented dairy product made from curdled milk',
      fact: 'Cheese is made by curdling milk and separating the solid curds from the liquid whey.',
    },
    {
      word: 'BURGER',
      category: 'foods',
      hint: 'Ground meat patty served in a bun',
      fact: 'The hamburger is named after Hamburg, Germany, though the sandwich as we know it was popularized in the US.',
    },
    {
      word: 'TOMATO',
      category: 'foods',
      hint: 'Red fruit often mistaken for a vegetable',
      fact: 'Tomatoes are botanically a fruit, but a US Supreme Court ruling in 1893 classified them as a vegetable for tax purposes.',
    },
    {
      word: 'GARLIC',
      category: 'foods',
      hint: 'Pungent bulb used to flavor countless dishes',
      fact: "Garlic's strong smell only develops once its cells are crushed or cut, triggering a chemical reaction.",
    },
    {
      word: 'CARROT',
      category: 'foods',
      hint: 'Crunchy orange root vegetable',
      fact: 'Carrots were originally purple or yellow; the common orange variety was bred in the Netherlands centuries later.',
    },
    {
      word: 'POTATO',
      category: 'foods',
      hint: 'Starchy root vegetable, often mashed or fried',
      fact: 'Potatoes were first domesticated in the Andes mountains of South America thousands of years ago.',
    },
    {
      word: 'PANCAKE',
      category: 'foods',
      hint: 'Griddled, stacked breakfast disc topped with syrup',
      fact: 'Pancakes in some form have been made since ancient times, with early versions found in Ancient Greece and Rome.',
    },
    {
      word: 'AVOCADO',
      category: 'foods',
      hint: 'Creamy green fruit used in guacamole',
      fact: 'Avocados are technically a large berry with a single seed, and they continue ripening only after being picked.',
    },
    {
      word: 'PRETZEL',
      category: 'foods',
      hint: 'Twisted, salty baked snack',
      fact: "The pretzel's knotted shape is said to have been designed by monks to resemble arms crossed in prayer.",
    },
    {
      word: 'BURRITO',
      category: 'foods',
      hint: 'Rolled tortilla stuffed with fillings',
      fact: "The word 'burrito' means 'little donkey' in Spanish, though the origin of the name is debated.",
    },
    {
      word: 'BROCCOLI',
      category: 'foods',
      hint: 'Green vegetable resembling tiny trees',
      fact: 'Broccoli, cauliflower, and kale are all the same species of plant, bred into different shapes over generations.',
    },
    {
      word: 'SANDWICH',
      category: 'foods',
      hint: 'Fillings held between two slices of bread',
      fact: 'The sandwich is named after the Earl of Sandwich, who reportedly wanted food he could eat without leaving a card game.',
    },
    {
      word: 'SPAGHETTI',
      category: 'foods',
      hint: 'Long, thin strands of Italian pasta',
      fact: 'Spaghetti is traditionally made from durum wheat semolina, which gives pasta its firm, chewy texture.',
    },
    {
      word: 'CHOCOLATE',
      category: 'foods',
      hint: 'Sweet treat made from roasted cacao beans',
      fact: 'Chocolate originally came from cacao beans used by Mesoamerican civilizations to make a bitter, spiced drink.',
    },
    {
      word: 'PINEAPPLE',
      category: 'foods',
      hint: 'Spiky tropical fruit with sweet yellow flesh',
      fact: "A pineapple isn't a single fruit but a cluster of many small fruits fused together around one core.",
    },
    {
      word: 'WATERMELON',
      category: 'foods',
      hint: "Large, juicy fruit that's over 90% water",
      fact: 'Watermelon is roughly 92% water by weight, making it one of the most hydrating fruits available.',
    },
    {
      word: 'CROISSANT',
      category: 'foods',
      hint: 'Flaky, buttery French pastry shaped like a crescent',
      fact: "The croissant's flaky texture comes from laminating dozens of thin layers of butter and dough together.",
    },
    {
      word: 'ASPARAGUS',
      category: 'foods',
      hint: "Green stalk vegetable that can change urine's smell",
      fact: 'A compound in asparagus can be broken down into sulfur-containing chemicals that give urine a distinct odor soon after eating it.',
    },
    {
      word: 'GUACAMOLE',
      category: 'foods',
      hint: 'Mashed avocado dip with lime and onion',
      fact: 'Guacamole traces back to Aztec cuisine in Mexico, where avocados were mashed long before Spanish contact.',
    },
    {
      word: 'SOUP',
      category: 'foods',
      hint: 'Warm liquid dish often served as a starter',
      fact: 'Soup was one of the earliest cooked foods, made possible once humans learned to boil water in containers.',
    },
    {
      word: 'CAKE',
      category: 'foods',
      hint: 'Sweet baked dessert often served at celebrations',
      fact: 'The tradition of a birthday cake with candles is believed to trace back to ancient Greek offerings to the moon goddess Artemis.',
    },
    {
      word: 'TOFU',
      category: 'foods',
      hint: 'Soft protein made from curdled soy milk',
      fact: 'Tofu is made by curdling fresh soy milk and pressing the curds into blocks, similar to how cheese is made from dairy.',
    },
    {
      word: 'KALE',
      category: 'foods',
      hint: 'Leafy green packed with vitamins',
      fact: "Kale is a member of the cabbage family and, unlike its relatives, doesn't form a tight head.",
    },
    {
      word: 'PASTA',
      category: 'foods',
      hint: 'General term for Italian dough shaped into countless forms',
      fact: 'Fresh pasta is typically made with eggs, while dried pasta is usually just flour and water.',
    },
    {
      word: 'SALSA',
      category: 'foods',
      hint: 'Chopped or blended sauce often made from tomatoes and chili',
      fact: "Salsa simply means 'sauce' in Spanish, and its use in Mesoamerican cooking predates European contact.",
    },
    {
      word: 'YOGURT',
      category: 'foods',
      hint: 'Fermented dairy product made using live bacterial cultures',
      fact: 'Yogurt is made by fermenting milk with live bacteria that convert lactose into lactic acid, thickening it and adding tang.',
    },
    {
      word: 'NOODLE',
      category: 'foods',
      hint: 'Long, thin strip of dough boiled and served in many cuisines',
      fact: 'Some of the earliest known noodles, over 4,000 years old, were discovered preserved at an archaeological site in China.',
    },
    {
      word: 'OMELET',
      category: 'foods',
      hint: 'Beaten eggs cooked flat and often folded around fillings',
      fact: "The word 'omelet' traces back to an old French word meaning a thin blade, describing its flat shape.",
    },
    {
      word: 'WAFFLE',
      category: 'foods',
      hint: 'Griddled batter dish known for its grid pattern',
      fact: "The waffle's grid pattern comes from patterned iron plates, a cooking method dating back to medieval Europe.",
    },
    {
      word: 'LASAGNA',
      category: 'foods',
      hint: 'Layered Italian pasta dish baked with cheese and sauce',
      fact: 'Lasagna is one of the oldest known pasta dishes, with references dating back to medieval Italy.',
    },
    {
      word: 'OATMEAL',
      category: 'foods',
      hint: 'Warm porridge made from rolled or ground oats',
      fact: 'Oats are unusually high in soluble fiber compared to most grains, which is why oatmeal is linked to heart health.',
    },
    {
      word: 'CUPCAKE',
      category: 'foods',
      hint: 'Small individual cake, often topped with frosting',
      fact: 'Cupcakes were originally baked in cups partly because they cooked faster than large cakes in early ovens.',
    },
    {
      word: 'HOTDOG',
      category: 'foods',
      hint: 'Grilled sausage served in a sliced bun',
      fact: 'The hot dog is closely tied to German immigrant sausage traditions, though its bun-served form became iconic in the US.',
    },
    {
      word: 'MEATBALL',
      category: 'foods',
      hint: 'Small ball of seasoned ground meat',
      fact: 'Meatballs appear in some form across dozens of global cuisines, from Italian polpette to Swedish köttbullar.',
    },
    {
      word: 'DUMPLING',
      category: 'foods',
      hint: 'Dough parcel wrapped around a savory or sweet filling',
      fact: 'Dumplings appear in nearly every culinary culture worldwide, from Chinese jiaozi to Polish pierogi.',
    },
    {
      word: 'CASSEROLE',
      category: 'foods',
      hint: 'Baked dish combining multiple ingredients in one dish',
      fact: "The word 'casserole' originally referred to the cooking dish itself before coming to describe the baked meal.",
    },
    {
      word: 'ENCHILADA',
      category: 'foods',
      hint: 'Rolled tortilla filled and covered in chili sauce',
      fact: 'Enchiladas trace back to ancient Mesoamerica, where corn tortillas were commonly wrapped around other foods.',
    },
    {
      word: 'QUESADILLA',
      category: 'foods',
      hint: 'Tortilla folded around melted cheese and grilled',
      fact: "The name 'quesadilla' comes directly from the Spanish word 'queso,' meaning cheese.",
    },
    {
      word: 'VINAIGRETTE',
      category: 'foods',
      hint: 'Oil-and-vinegar dressing used on salads',
      fact: 'A classic vinaigrette is typically made from three parts oil to one part vinegar, whisked into a temporary emulsion.',
    },

    // ---------------- COUNTRIES ----------------
    {
      word: 'CUBA',
      category: 'countries',
      hint: 'Caribbean island nation known for cigars',
      fact: 'Cuba is the largest island in the Caribbean and was long known for its tobacco and sugar industries.',
    },
    {
      word: 'EGYPT',
      category: 'countries',
      hint: 'Home to the ancient pyramids',
      fact: "Egypt's Great Pyramid of Giza was the tallest man-made structure on Earth for over 3,800 years.",
    },
    {
      word: 'ITALY',
      category: 'countries',
      hint: 'Boot-shaped country famous for pasta',
      fact: 'Italy has more UNESCO World Heritage Sites than any other country in the world.',
    },
    {
      word: 'JAPAN',
      category: 'countries',
      hint: "East Asian island nation, the 'Land of the Rising Sun'",
      fact: 'Japan is made up of thousands of islands, though the four largest make up about 97% of its land area.',
    },
    {
      word: 'PERU',
      category: 'countries',
      hint: 'South American country home to Machu Picchu',
      fact: 'Peru is home to Machu Picchu, a 15th-century Incan citadel built high in the Andes mountains.',
    },
    {
      word: 'SPAIN',
      category: 'countries',
      hint: 'Iberian nation known for flamenco and tapas',
      fact: 'Spain shares the Iberian Peninsula with Portugal and is the only European country with a border in Africa, via its enclaves.',
    },
    {
      word: 'CHINA',
      category: 'countries',
      hint: 'Most populous country in Asia',
      fact: 'China is home to the Great Wall, parts of which date back over 2,000 years.',
    },
    {
      word: 'CHAD',
      category: 'countries',
      hint: 'Landlocked African nation named after a lake',
      fact: "Chad is named after Lake Chad, once one of Africa's largest lakes, though it has shrunk dramatically in recent decades.",
    },
    {
      word: 'MALI',
      category: 'countries',
      hint: 'West African nation, home to ancient Timbuktu',
      fact: 'Mali was home to the ancient city of Timbuktu, a major center of Islamic scholarship and trade centuries ago.',
    },
    {
      word: 'LAOS',
      category: 'countries',
      hint: 'Landlocked Southeast Asian nation',
      fact: 'Laos is the only landlocked country in Southeast Asia, bordered by five other nations.',
    },
    {
      word: 'IRAN',
      category: 'countries',
      hint: 'Middle Eastern nation, formerly called Persia',
      fact: 'Iran was known as Persia to the Western world until it officially requested the name Iran be used in 1935.',
    },
    {
      word: 'IRAQ',
      category: 'countries',
      hint: 'Middle Eastern nation home to ancient Mesopotamia',
      fact: 'Iraq sits on land once called Mesopotamia, considered one of the earliest cradles of civilization.',
    },
    {
      word: 'INDIA',
      category: 'countries',
      hint: "South Asian nation, the world's most populous",
      fact: 'India overtook China in 2023 to become the most populous country in the world.',
    },
    {
      word: 'CANADA',
      category: 'countries',
      hint: 'Second-largest country by land area',
      fact: 'Canada has the longest coastline of any country in the world, bordering three oceans.',
    },
    {
      word: 'GERMANY',
      category: 'countries',
      hint: 'Central European nation, home to Oktoberfest',
      fact: "Germany is Europe's most populous country and a leading global exporter of machinery and vehicles.",
    },
    {
      word: 'FRANCE',
      category: 'countries',
      hint: 'European nation famous for the Eiffel Tower',
      fact: 'France is the most visited country in the world by international tourists.',
    },
    {
      word: 'JAMAICA',
      category: 'countries',
      hint: 'Caribbean island known for reggae music',
      fact: 'Jamaica is the birthplace of reggae music, popularized worldwide by artists like Bob Marley.',
    },
    {
      word: 'MEXICO',
      category: 'countries',
      hint: 'North American nation south of the US border',
      fact: 'Mexico City was built on the site of Tenochtitlan, the former capital of the Aztec Empire.',
    },
    {
      word: 'VIETNAM',
      category: 'countries',
      hint: "Southeast Asian nation shaped like a long 'S'",
      fact: "Vietnam is one of the world's largest exporters of coffee, second only to Brazil.",
    },
    {
      word: 'ICELAND',
      category: 'countries',
      hint: 'Nordic island nation of volcanoes and glaciers',
      fact: 'Iceland sits directly on the boundary between two tectonic plates, giving it intense volcanic and geothermal activity.',
    },
    {
      word: 'MOROCCO',
      category: 'countries',
      hint: 'North African nation known for its souks',
      fact: "Morocco's Sahara Desert region features some of the tallest sand dunes in the world.",
    },
    {
      word: 'NIGERIA',
      category: 'countries',
      hint: 'Most populous country in Africa',
      fact: "Nigeria is Africa's most populous nation and home to one of the world's largest film industries, Nollywood.",
    },
    {
      word: 'THAILAND',
      category: 'countries',
      hint: "Southeast Asian nation, the 'Land of Smiles'",
      fact: 'Thailand is the only Southeast Asian country never colonized by a European power.',
    },
    {
      word: 'PORTUGAL',
      category: 'countries',
      hint: 'Iberian nation famous for exploration voyages',
      fact: 'Portuguese explorers were among the first Europeans to establish sea routes to Asia and the Americas in the 15th century.',
    },
    {
      word: 'COLOMBIA',
      category: 'countries',
      hint: 'South American nation known for coffee',
      fact: 'Colombia is one of the few countries with coastlines on both the Pacific Ocean and the Caribbean Sea.',
    },
    {
      word: 'RUSSIA',
      category: 'countries',
      hint: "World's largest country by land area",
      fact: 'Russia spans 11 time zones, more than any other country in the world.',
    },
    {
      word: 'NORWAY',
      category: 'countries',
      hint: 'Scandinavian nation known for its fjords',
      fact: "Norway's coastline is carved with deep fjords, formed by glaciers thousands of years ago.",
    },
    {
      word: 'ARGENTINA',
      category: 'countries',
      hint: 'South American nation known for tango and beef',
      fact: 'Argentina is home to Aconcagua, the tallest mountain in the Americas at over 22,800 feet.',
    },
    {
      word: 'AUSTRALIA',
      category: 'countries',
      hint: 'Country that is also its own continent',
      fact: 'Australia is the only country that governs an entire continent, and most of its wildlife exists nowhere else on Earth.',
    },
    {
      word: 'INDONESIA',
      category: 'countries',
      hint: 'Southeast Asian archipelago of thousands of islands',
      fact: 'Indonesia is made up of more than 17,000 islands, more than any other country in the world.',
    },
    {
      word: 'MADAGASCAR',
      category: 'countries',
      hint: 'Island nation off Africa known for lemurs',
      fact: 'Because Madagascar split from mainland Africa millions of years ago, over 90% of its wildlife exists nowhere else on Earth.',
    },
    {
      word: 'SWITZERLAND',
      category: 'countries',
      hint: 'Mountainous European nation famous for neutrality',
      fact: 'Switzerland has maintained a policy of military neutrality in international conflicts since 1815.',
    },
    {
      word: 'PHILIPPINES',
      category: 'countries',
      hint: 'Southeast Asian archipelago of over 7,000 islands',
      fact: 'The Philippines consists of more than 7,600 islands and is one of the largest archipelago nations on Earth.',
    },
    {
      word: 'LUXEMBOURG',
      category: 'countries',
      hint: 'Tiny, wealthy nation in Western Europe',
      fact: 'Luxembourg is one of the smallest countries in Europe yet consistently ranks among the highest in GDP per capita.',
    },
    {
      word: 'AFGHANISTAN',
      category: 'countries',
      hint: "Landlocked Central Asian nation, the 'Graveyard of Empires'",
      fact: "Afghanistan's rugged, mountainous terrain has historically made it difficult for foreign powers to control long-term.",
    },
    {
      word: 'KAZAKHSTAN',
      category: 'countries',
      hint: "Central Asian nation, the world's largest landlocked country",
      fact: 'Kazakhstan is the largest landlocked country in the world, spanning both Europe and Asia.',
    },
    {
      word: 'VENEZUELA',
      category: 'countries',
      hint: "South American nation with the world's largest oil reserves",
      fact: 'Venezuela holds the largest proven crude oil reserves of any country on Earth.',
    },
    {
      word: 'FIJI',
      category: 'countries',
      hint: 'Pacific island nation of hundreds of islands',
      fact: 'Fiji is made up of more than 300 islands, though only about a third of them are inhabited.',
    },
    {
      word: 'CHILE',
      category: 'countries',
      hint: 'Long, narrow South American nation along the Pacific',
      fact: 'Chile stretches over 2,600 miles from north to south but averages only about 110 miles wide.',
    },
    {
      word: 'GHANA',
      category: 'countries',
      hint: 'West African nation, first in the region to gain independence',
      fact: 'Ghana became the first sub-Saharan African country to gain independence from colonial rule, in 1957.',
    },
    {
      word: 'KENYA',
      category: 'countries',
      hint: 'East African nation known for its wildlife safaris',
      fact: "Kenya's Great Rift Valley is part of a massive geological trench that stretches across East Africa.",
    },
    {
      word: 'NEPAL',
      category: 'countries',
      hint: 'Himalayan nation home to Mount Everest',
      fact: "Nepal is home to eight of the world's ten tallest mountains, including Mount Everest on its border with China.",
    },
    {
      word: 'QATAR',
      category: 'countries',
      hint: 'Small, wealthy Gulf peninsula nation',
      fact: 'Qatar has one of the highest GDP per capita in the world, driven largely by natural gas exports.',
    },
    {
      word: 'SUDAN',
      category: 'countries',
      hint: 'Northeast African nation along the Nile',
      fact: "Sudan was once Africa's largest country by area until South Sudan split off as its own nation in 2011.",
    },
    {
      word: 'TONGA',
      category: 'countries',
      hint: 'Polynesian kingdom of over 170 islands',
      fact: 'Tonga is one of the few nations in the world that has remained a monarchy without ever being formally colonized.',
    },
    {
      word: 'YEMEN',
      category: 'countries',
      hint: 'Nation on the southern tip of the Arabian Peninsula',
      fact: 'Yemen is home to Socotra, an isolated island famous for plant species found nowhere else on Earth.',
    },
    {
      word: 'UGANDA',
      category: 'countries',
      hint: 'East African nation known as a source of the Nile',
      fact: 'Uganda contains a stretch of the Nile River considered one of its main sources, near Lake Victoria.',
    },
    {
      word: 'FINLAND',
      category: 'countries',
      hint: 'Nordic nation with tens of thousands of lakes',
      fact: 'Finland has an estimated 188,000 lakes, giving it one of the highest lake densities of any country.',
    },
    {
      word: 'ETHIOPIA',
      category: 'countries',
      hint: 'East African nation believed to be the birthplace of coffee',
      fact: 'Ethiopia is widely credited as the birthplace of coffee, discovered centuries ago in its highland forests.',
    },
    {
      word: 'MONGOLIA',
      category: 'countries',
      hint: 'Landlocked Asian nation with a nomadic herding tradition',
      fact: 'Mongolia has one of the lowest population densities of any country, with vast open steppe outnumbering its cities.',
    },
    {
      word: 'SINGAPORE',
      category: 'countries',
      hint: 'Small, highly developed Southeast Asian city-state',
      fact: 'Singapore is one of the few city-states in the modern world, functioning as a single city and an independent country.',
    },
    {
      word: 'GUATEMALA',
      category: 'countries',
      hint: 'Central American nation with a strong Maya heritage',
      fact: 'Guatemala is home to Tikal, one of the largest ancient cities of the Maya civilization.',
    },
    {
      word: 'BOTSWANA',
      category: 'countries',
      hint: 'Southern African nation known for the Kalahari Desert',
      fact: "Botswana is home to a large portion of the Kalahari Desert and one of Africa's largest elephant populations.",
    },
    {
      word: 'CAMEROON',
      category: 'countries',
      hint: "Central African nation nicknamed 'Africa in miniature'",
      fact: "Cameroon is nicknamed 'Africa in miniature' because it contains nearly every major African landscape and climate.",
    },
    {
      word: 'MALAYSIA',
      category: 'countries',
      hint: 'Southeast Asian nation split between a peninsula and Borneo',
      fact: 'Malaysia is split into two regions separated by the South China Sea: Peninsular Malaysia and Malaysian Borneo.',
    },
    {
      word: 'AZERBAIJAN',
      category: 'countries',
      hint: 'Nation on the Caspian Sea known for ancient oil fields',
      fact: "Azerbaijan's capital, Baku, sits below sea level and was one of the first places on Earth to industrially drill for oil.",
    },
    {
      word: 'LIECHTENSTEIN',
      category: 'countries',
      hint: 'Tiny alpine nation between Switzerland and Austria',
      fact: "Liechtenstein is one of only two doubly landlocked countries in the world, meaning it's surrounded entirely by other landlocked nations.",
    },

    // ---------------- OCCUPATIONS ----------------
    {
      word: 'CHEF',
      category: 'occupations',
      hint: 'Trained professional who runs a kitchen',
      fact: "The title 'chef' comes from the French word for 'chief,' reflecting their role leading a kitchen brigade.",
    },
    {
      word: 'COOK',
      category: 'occupations',
      hint: 'Person who prepares food professionally',
      fact: 'Unlike a chef, a cook typically follows recipes and instructions rather than designing the menu.',
    },
    {
      word: 'BAKER',
      category: 'occupations',
      hint: 'Professional who makes bread and pastries',
      fact: 'Bakers traditionally worked overnight so fresh bread would be ready for customers each morning.',
    },
    {
      word: 'PILOT',
      category: 'occupations',
      hint: 'Trained professional who flies aircraft',
      fact: 'Commercial pilots must log a minimum number of flight hours and pass strict medical exams to keep their license.',
    },
    {
      word: 'ACTOR',
      category: 'occupations',
      hint: 'Performer who plays roles on stage or screen',
      fact: "The word 'actor' comes from the Latin 'actus,' referring to something done or performed.",
    },
    {
      word: 'COACH',
      category: 'occupations',
      hint: 'Person who trains and guides athletes',
      fact: "The word 'coach' for a trainer originated as slang at Oxford University, comparing tutors to a carriage that 'carries' a student through exams.",
    },
    {
      word: 'JUDGE',
      category: 'occupations',
      hint: 'Official who presides over a court of law',
      fact: 'Judges in many legal systems are expected to remain politically neutral and interpret law rather than create it.',
    },
    {
      word: 'NURSE',
      category: 'occupations',
      hint: 'Healthcare worker who cares for patients daily',
      fact: "Florence Nightingale's work in the 1850s is widely credited with founding the principles of modern nursing.",
    },
    {
      word: 'CLERK',
      category: 'occupations',
      hint: 'Office worker who handles records and paperwork',
      fact: "The word 'clerk' originally referred to a scholar or clergyman, since literacy was once rare outside the church.",
    },
    {
      word: 'GUARD',
      category: 'occupations',
      hint: 'Person employed to protect people or property',
      fact: "Security guards' duties can range from monitoring cameras to physically patrolling a property for threats.",
    },
    {
      word: 'TEACHER',
      category: 'occupations',
      hint: 'Educator who instructs students in a classroom',
      fact: 'Teaching is one of the oldest professions, with formal schools recorded in civilizations thousands of years ago.',
    },
    {
      word: 'FARMER',
      category: 'occupations',
      hint: 'Person who grows crops or raises livestock',
      fact: 'A single modern farmer can produce enough food to feed well over a hundred people, thanks to mechanization.',
    },
    {
      word: 'LAWYER',
      category: 'occupations',
      hint: 'Professional trained to advise and represent in legal matters',
      fact: "Lawyers must pass a bar exam in most countries before they're licensed to practice law.",
    },
    {
      word: 'ARTIST',
      category: 'occupations',
      hint: 'Person who creates visual or creative works',
      fact: "The term 'artist' can apply to painters, sculptors, and other creators across a wide range of visual media.",
    },
    {
      word: 'DRIVER',
      category: 'occupations',
      hint: 'Person who operates a vehicle for a living',
      fact: 'Professional drivers, such as truckers, often must follow strict rest-hour regulations to prevent fatigue-related accidents.',
    },
    {
      word: 'FIREMAN',
      category: 'occupations',
      hint: 'Emergency responder who extinguishes fires',
      fact: 'Modern firefighters do far more than fight fires; they also respond to medical emergencies and rescues.',
    },
    {
      word: 'SOLDIER',
      category: 'occupations',
      hint: "Member of a country's armed forces",
      fact: 'Soldiers undergo extensive physical and tactical training before serving in active military roles.',
    },
    {
      word: 'DENTIST',
      category: 'occupations',
      hint: 'Doctor who specializes in oral health',
      fact: 'Dentistry is considered one of the oldest medical specialties, with evidence of dental work dating back over 9,000 years.',
    },
    {
      word: 'BARBER',
      category: 'occupations',
      hint: 'Professional who cuts hair and shaves beards',
      fact: 'Historically, barbers also performed minor surgery and bloodletting, which is why barber poles are traditionally red and white.',
    },
    {
      word: 'BUTCHER',
      category: 'occupations',
      hint: 'Professional who prepares and sells meat',
      fact: 'Skilled butchers know how to break down an entire animal carcass into specific cuts with minimal waste.',
    },
    {
      word: 'PAINTER',
      category: 'occupations',
      hint: 'Person who applies paint, artistically or professionally',
      fact: 'The term covers both fine artists who paint canvases and tradespeople who paint buildings.',
    },
    {
      word: 'PLUMBER',
      category: 'occupations',
      hint: 'Tradesperson who installs and repairs pipes',
      fact: "The word 'plumber' comes from the Latin 'plumbum,' meaning lead, since ancient pipes were often made of that metal.",
    },
    {
      word: 'SURGEON',
      category: 'occupations',
      hint: 'Doctor who performs operations',
      fact: 'Surgeons undergo years of additional specialized training beyond medical school before operating independently.',
    },
    {
      word: 'MECHANIC',
      category: 'occupations',
      hint: 'Skilled worker who repairs machines and vehicles',
      fact: 'Modern auto mechanics increasingly rely on computer diagnostics as much as traditional hand tools.',
    },
    {
      word: 'ASTRONAUT',
      category: 'occupations',
      hint: 'Trained professional who travels to space',
      fact: 'Astronauts must train for years, including underwater simulations, to prepare for the effects of microgravity.',
    },
    {
      word: 'SCIENTIST',
      category: 'occupations',
      hint: 'Professional who studies the natural world through experiments',
      fact: "The word 'scientist' wasn't widely used until the 1830s; before that, such people were often called 'natural philosophers.'",
    },
    {
      word: 'ARCHITECT',
      category: 'occupations',
      hint: 'Professional who designs buildings and structures',
      fact: 'Architects must balance aesthetics, structural safety, and building regulations when designing any project.',
    },
    {
      word: 'CARPENTER',
      category: 'occupations',
      hint: 'Skilled tradesperson who builds with wood',
      fact: 'Carpentry is one of the oldest trades, with woodworking tools dating back tens of thousands of years.',
    },
    {
      word: 'ACCOUNTANT',
      category: 'occupations',
      hint: 'Professional who manages and audits financial records',
      fact: 'Double-entry bookkeeping, the basis of modern accounting, was formalized in 15th-century Italy.',
    },
    {
      word: 'JOURNALIST',
      category: 'occupations',
      hint: 'Professional who researches and reports the news',
      fact: "Journalism's core principle of verifying facts before publishing distinguishes it from simply sharing opinions or rumors.",
    },
    {
      word: 'ELECTRICIAN',
      category: 'occupations',
      hint: 'Tradesperson who installs and repairs electrical systems',
      fact: 'Electricians must follow strict safety codes since even small wiring mistakes can cause fires or shocks.',
    },
    {
      word: 'PHOTOGRAPHER',
      category: 'occupations',
      hint: 'Professional who captures images with a camera',
      fact: 'Early professional photographers in the 1800s often had to hold perfectly still for several minutes per exposure.',
    },
    {
      word: 'VETERINARIAN',
      category: 'occupations',
      hint: 'Doctor who treats sick and injured animals',
      fact: 'Veterinarians must be trained across many species, unlike human doctors who typically specialize in one.',
    },
    {
      word: 'PSYCHOLOGIST',
      category: 'occupations',
      hint: 'Professional who studies the mind and behavior',
      fact: 'Psychology only became a distinct scientific field in the late 1800s, separating from philosophy.',
    },
    {
      word: 'ILLUSTRATOR',
      category: 'occupations',
      hint: 'Artist who creates images for books or media',
      fact: 'Illustrators often work closely with authors or editors, translating written ideas into visual storytelling.',
    },
    {
      word: 'BIOLOGIST',
      category: 'occupations',
      hint: 'Scientist who studies living organisms',
      fact: "Biology as a unified science owes much to Charles Darwin's 19th-century theory of evolution by natural selection.",
    },
    {
      word: 'MAID',
      category: 'occupations',
      hint: 'Domestic worker who cleans and tidies homes',
      fact: "The word 'maid' historically referred broadly to an unmarried young woman before narrowing to describe domestic work.",
    },
    {
      word: 'MAYOR',
      category: 'occupations',
      hint: 'Elected leader of a city or town',
      fact: "In most systems, a mayor serves as a city's chief executive, though their exact powers vary widely by country.",
    },
    {
      word: 'TAILOR',
      category: 'occupations',
      hint: 'Craftsperson who makes and alters clothing to fit',
      fact: "A skilled tailor traditionally measures and cuts fabric to a client's exact body shape rather than using standard sizing.",
    },
    {
      word: 'WAITER',
      category: 'occupations',
      hint: 'Restaurant worker who takes orders and serves food',
      fact: 'The tipping custom associated with waitstaff began in Europe and later became a far more standardized wage practice in the US.',
    },
    {
      word: 'WELDER',
      category: 'occupations',
      hint: 'Tradesperson who joins metal using intense heat',
      fact: "Welders must wear specialized helmets because the arc's ultraviolet light can damage unprotected eyes within seconds.",
    },
    {
      word: 'BUTLER',
      category: 'occupations',
      hint: 'Senior household staff member who manages a residence',
      fact: 'A traditional butler historically oversaw the entire household staff, not just serving meals and answering doors.',
    },
    {
      word: 'CASHIER',
      category: 'occupations',
      hint: 'Worker who processes customer payments in a store',
      fact: 'Modern cashiers increasingly work alongside self-checkout systems, shifting more of their role toward customer assistance.',
    },
    {
      word: 'FLORIST',
      category: 'occupations',
      hint: 'Professional who arranges and sells flowers',
      fact: 'Florists must know which flowers wilt quickly, so arrangements are often cut and assembled close to delivery time.',
    },
    {
      word: 'LIBRARIAN',
      category: 'occupations',
      hint: 'Professional who manages and organizes library collections',
      fact: 'Modern librarians often need training in digital systems and data management, not just organizing physical books.',
    },
    {
      word: 'PLASTERER',
      category: 'occupations',
      hint: 'Tradesperson who applies plaster to walls and ceilings',
      fact: 'Plastering has been used since ancient Egypt, where lime and gypsum plasters coated the walls of tombs and temples.',
    },
    {
      word: 'LOCKSMITH',
      category: 'occupations',
      hint: 'Craftsperson who makes and repairs locks and keys',
      fact: 'Locksmithing dates back thousands of years, with early lock mechanisms found in ancient Egyptian ruins.',
    },
    {
      word: 'PARAMEDIC',
      category: 'occupations',
      hint: 'Emergency worker trained to give urgent medical care',
      fact: 'Paramedics carry more advanced medical equipment and training than basic emergency medical technicians.',
    },
    {
      word: 'ENGINEER',
      category: 'occupations',
      hint: 'Professional who designs and builds systems or structures',
      fact: 'Engineering is typically divided into major branches like civil, mechanical, and electrical, each with a distinct focus.',
    },
    {
      word: 'GEOLOGIST',
      category: 'occupations',
      hint: 'Scientist who studies rocks and the structure of the Earth',
      fact: "Geologists can estimate a rock's age by examining the layers, or strata, in which it was formed.",
    },
    {
      word: 'PHARMACIST',
      category: 'occupations',
      hint: 'Trained professional who prepares and dispenses medication',
      fact: 'Pharmacists must understand how different medications interact to avoid dangerous combinations for patients.',
    },
    {
      word: 'TRANSLATOR',
      category: 'occupations',
      hint: 'Professional who converts written text between languages',
      fact: 'Skilled translators must capture not just words but tone and cultural meaning to keep a message accurate.',
    },
    {
      word: 'UPHOLSTERER',
      category: 'occupations',
      hint: 'Craftsperson who repairs and covers furniture with fabric',
      fact: 'Upholsterers rebuild the padding and framework inside furniture, not just replace the outer fabric.',
    },
    {
      word: 'CHOREOGRAPHER',
      category: 'occupations',
      hint: 'Professional who designs sequences of dance movement',
      fact: 'Choreographers often work closely with composers and directors to match movement precisely to music or story.',
    },
    {
      word: 'ANESTHESIOLOGIST',
      category: 'occupations',
      hint: 'Doctor who manages pain and consciousness during surgery',
      fact: "Anesthesiologists continuously monitor a patient's vital signs throughout an operation to keep them safely unconscious.",
    },
  ];

  const CATEGORY_META = {
    animals: { label: 'Animals', emoji: '🐾' },
    elements: { label: 'Elements', emoji: '⚗️' },
    foods: { label: 'Foods', emoji: '🍔' },
    countries: { label: 'Countries', emoji: '🌍' },
    occupations: { label: 'Occupations', emoji: '👷' },
  };

  const DIFFICULTY = {
    easy: { min: 3, max: 5, time: 45, label: 'Easy', points: 10 },
    medium: { min: 6, max: 8, time: 60, label: 'Medium', points: 20 },
    hard: { min: 9, max: 99, time: 75, label: 'Hard', points: 30 },
  };

  const SESSION_LENGTH = 10;
  const LIVES_START = 3;
  const HINT_PENALTY = 5;
  const CONFETTI_COLORS = ['#F5A524', '#2FBE8F', '#FF6B5E', '#FBF5E9'];
  const STORAGE_STATS_KEY = 'Unscrambol_stats_v2';
  const STORAGE_SOUND_KEY = 'Unscrambol_sound_v1';

  /* ============================================================
     DOM refs
     ============================================================ */
  const el = {
    boardLoading: document.getElementById('boardLoading'),
    loadingText: document.getElementById('loadingText'),
    boardPlay: document.getElementById('boardPlay'),
    boardStart: document.getElementById('boardStart'),
    startGameBtn: document.getElementById('startGameBtn'),
    sessionProgressWrap: document.getElementById('sessionProgressWrap'),
    scrambleRow: document.getElementById('scrambleRow'),
    answerRow: document.getElementById('answerRow'),
    scoreValue: document.getElementById('scoreValue'),
    streakValue: document.getElementById('streakValue'),
    bestValue: document.getElementById('bestValue'),
    timerFill: document.getElementById('timerFill'),
    timerTrack: document.querySelector('.timer-track'),
    categoryTag: document.getElementById('categoryTag'),
    livesRow: document.getElementById('livesRow'),
    hintLine: document.getElementById('hintLine'),
    feedback: document.getElementById('feedback'),
    explainLine: document.getElementById('explainLine'),
    shuffleBtn: document.getElementById('shuffleBtn'),
    skipBtn: document.getElementById('skipBtn'),
    hintBtn: document.getElementById('hintBtn'),
    submitBtn: document.getElementById('submitBtn'),
    nextBtn: document.getElementById('nextBtn'),
    nextBtnLabel: document.getElementById('nextBtnLabel'),
    difficultyBtns: Array.from(document.querySelectorAll('[data-difficulty]')),
    categoryBtns: Array.from(document.querySelectorAll('[data-category]')),
    categorySelect: document.getElementById('categorySelect'),
    categorySelectWrap: document.getElementById('categorySelectWrap'),
    difficultySelect: document.querySelector('.difficulty-select'),
    sessionProgressLabel: document.getElementById('sessionProgressLabel'),
    sessionDots: document.getElementById('sessionDots'),
    soundToggle: document.getElementById('soundToggle'),
    confettiLayer: document.getElementById('confettiLayer'),
    toast: document.getElementById('toast'),
    statBest: document.getElementById('statBest'),
    statStreak: document.getElementById('statStreak'),
    statSolved: document.getElementById('statSolved'),
    resetStatsBtn: document.getElementById('resetStatsBtn'),
    scrollButtons: Array.from(document.querySelectorAll('[data-scroll]')),
    gameCard: document.getElementById('gameCard'),
    siteHeader: document.querySelector('.site-header'),
    sessionEndOverlay: document.getElementById('sessionEndOverlay'),
    sessionEndIcon: document.getElementById('sessionEndIcon'),
    sessionEndTitle: document.getElementById('sessionEndTitle'),
    sessionEndSub: document.getElementById('sessionEndSub'),
    recapSolved: document.getElementById('recapSolved'),
    recapScore: document.getElementById('recapScore'),
    recapStreak: document.getElementById('recapStreak'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    changeCategoryBtn: document.getElementById('changeCategoryBtn'),
    endSessionBtn: document.getElementById('endSessionBtn'),
    endSessionConfirmOverlay: document.getElementById(
      'endSessionConfirmOverlay',
    ),
    keepPlayingBtn: document.getElementById('keepPlayingBtn'),
    confirmEndSessionBtn: document.getElementById('confirmEndSessionBtn'),
  };

  /* ============================================================
     Persistent stats + sound preference
     ============================================================ */
  function loadStats() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_STATS_KEY));
      if (raw && typeof raw === 'object') {
        return {
          best: raw.best || 0,
          longestStreak: raw.longestStreak || 0,
          wordsSolved: raw.wordsSolved || 0,
        };
      }
    } catch (e) {
      /* ignore malformed storage */
    }
    return { best: 0, longestStreak: 0, wordsSolved: 0 };
  }
  function saveStats(stats) {
    try {
      localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      /* storage unavailable */
    }
  }

  /* ============================================================
     Game state
     ============================================================ */
  const state = {
    categoryKey: 'animals',
    difficulty: 'easy',
    sessionStarted: false,
    queue: [],
    outcomes: [],
    index: -1,
    currentEntry: null,
    scrambled: [],
    answer: [],
    score: 0,
    streak: 0,
    wrongStreak: 0,
    lives: LIVES_START,
    timeLeft: 0,
    totalTime: 0,
    timerId: null,
    hintsThisWord: 0,
    roundResolved: false,
    pendingFinish: false,
    wordsSolved: 0,
    wordsAttempted: 0,
    bestStreakSession: 0,
    soundOn: false,
    stats: loadStats(),
  };

  try {
    state.soundOn = localStorage.getItem(STORAGE_SOUND_KEY) === '1';
  } catch (e) {}

  /* ============================================================
     Sound (tiny WebAudio blips, no assets needed)
     ============================================================ */
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    return audioCtx;
  }
  function playTone(freq, duration, delay = 0, type = 'sine', gainVal = 0.06) {
    if (!state.soundOn) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = gainVal;
    osc.connect(gain).connect(ctx.destination);
    const t0 = ctx.currentTime + delay;
    osc.start(t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.stop(t0 + duration);
  }
  function soundCorrect() {
    playTone(523.25, 0.16, 0);
    playTone(659.25, 0.16, 0.09);
    playTone(783.99, 0.22, 0.18);
  }
  function soundWrong() {
    playTone(220, 0.22, 0, 'sawtooth', 0.045);
  }
  function soundTick() {
    playTone(880, 0.05, 0, 'square', 0.03);
  }
  function soundTimeout() {
    playTone(196, 0.35, 0, 'triangle', 0.05);
  }
  function soundSkip() {
    playTone(330, 0.12, 0, 'triangle', 0.04);
  }

  /* ============================================================
     Utilities
     ============================================================ */
  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function scrambleWord(word) {
    if (word.length < 2) return word.split('');
    let letters;
    let attempts = 0;
    do {
      letters = shuffleArray(word.split(''));
      attempts++;
    } while (letters.join('') === word && attempts < 12);
    return letters;
  }

  function showToast(message, duration = 2600) {
    el.toast.textContent = message;
    el.toast.classList.add('is-visible');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(
      () => el.toast.classList.remove('is-visible'),
      duration,
    );
  }

  const MOBILE_BREAKPOINT = 640;
  function isMobileViewport() {
    return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
  }

  // On mobile, entering/re-entering the game is centered in the viewport
  // instead of docked near the top — the card is taller than the screen
  // relative to desktop, so a top-anchored scroll tends to crop the
  // action row. `center: true` requests that treatment (mobile-only).
  function scrollToSection(target, { center = false } = {}) {
    if (!target) return;
    if (center && isMobileViewport()) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const headerH = el.siteHeader
      ? el.siteHeader.getBoundingClientRect().height
      : 0;
    const top =
      target.getBoundingClientRect().top + window.pageYOffset - headerH - 180;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }

  // Re-centers the game card in the viewport on mobile after its content
  // reflows (e.g. start-screen -> live board), so the newly revealed
  // controls stay in view without the player having to scroll manually.
  function recenterGameCardMobile() {
    if (!isMobileViewport() || !el.gameCard) return;
    requestAnimationFrame(() => {
      el.gameCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function spawnConfetti(count = 26) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      const left = Math.random() * 100;
      const duration = 1.6 + Math.random() * 1.2;
      const delay = Math.random() * 0.25;
      const color =
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const rotate = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.left = left + 'vw';
      piece.style.background = color;
      piece.style.borderRadius = rotate;
      piece.style.animationDuration = duration + 's';
      piece.style.animationDelay = delay + 's';
      frag.appendChild(piece);
      setTimeout(() => piece.remove(), (duration + delay) * 1000 + 100);
    }
    el.confettiLayer.appendChild(frag);
  }

  /* ============================================================
     Word source — fully offline, drawn straight from WORD_BANK.
     Difficulty is just a letter-count window (see DIFFICULTY),
     so each category naturally scales from short/simple words to
     long/complex ones.
     ============================================================ */
  function wordsInRange(cfg) {
    return WORD_BANK.filter(
      (w) => w.word.length >= cfg.min && w.word.length <= cfg.max,
    );
  }

  function buildSessionQueue(categoryKey, difficulty) {
    const cfg = DIFFICULTY[difficulty];
    const pool = shuffleArray(
      wordsInRange(cfg).filter((w) => w.category === categoryKey),
    );
    return pool.slice(0, SESSION_LENGTH);
  }

  /* ============================================================
     Rendering
     ============================================================ */
  function renderLives() {
    el.livesRow.innerHTML = '';
    for (let i = 0; i < LIVES_START; i++) {
      const span = document.createElement('span');
      span.className = 'life-heart' + (i >= state.lives ? ' is-lost' : '');
      span.textContent = '❤';
      span.setAttribute('aria-hidden', 'true');
      el.livesRow.appendChild(span);
    }
  }

  function renderScoreboard() {
    el.scoreValue.textContent = state.score;
    el.streakValue.textContent = state.streak;
    el.bestValue.textContent = Math.max(state.stats.best, state.score);
  }

  function renderStatsSection() {
    el.statBest.textContent = state.stats.best;
    el.statStreak.textContent = state.stats.longestStreak;
    el.statSolved.textContent = state.stats.wordsSolved;
  }

  function renderSessionProgress() {
    const current = Math.min(state.index + 1, SESSION_LENGTH);
    el.sessionProgressLabel.textContent = `Word ${Math.max(current, 1)} of ${SESSION_LENGTH}`;

    el.sessionDots.innerHTML = '';
    for (let i = 0; i < SESSION_LENGTH; i++) {
      const dot = document.createElement('span');
      dot.className = 'session-dot';
      const outcome = state.outcomes[i];
      if (outcome === 'solved') dot.classList.add('is-done');
      else if (outcome === 'failed') dot.classList.add('is-failed');
      else if (outcome === 'skipped') dot.classList.add('is-skipped');
      else if (i === state.index && !state.roundResolved)
        dot.classList.add('is-current');
      el.sessionDots.appendChild(dot);
    }
  }

  function buildScrambleRow() {
    el.scrambleRow.innerHTML = '';
    state.scrambled.forEach((tile, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'letter-tile';
      btn.textContent = tile.char;
      btn.disabled = tile.used;
      btn.style.animationDelay = idx * 0.04 + 's';
      btn.setAttribute('aria-label', 'Letter ' + tile.char);
      btn.addEventListener('click', () => selectLetter(idx));
      el.scrambleRow.appendChild(btn);
    });
  }

  function syncScrambleDisabledStates() {
    Array.from(el.scrambleRow.children).forEach((btn, idx) => {
      const tile = state.scrambled[idx];
      if (!tile) return;
      btn.disabled = tile.used;
    });
  }

  function renderAnswerRow() {
    el.answerRow.innerHTML = '';
    el.answerRow.classList.remove('is-shaking', 'is-correct');
    const wordLen = state.currentEntry.word.length;
    for (let i = 0; i < wordLen; i++) {
      if (i < state.answer.length) {
        const tileIdx = state.answer[i];
        const char = state.scrambled[tileIdx].char;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'letter-tile';
        btn.textContent = char;
        btn.disabled = state.roundResolved;
        btn.setAttribute('aria-label', 'Remove letter ' + char);
        btn.addEventListener('click', () => removeAnswerLetter(i));
        el.answerRow.appendChild(btn);
      } else {
        const slot = document.createElement('span');
        slot.className = 'slot-empty';
        slot.setAttribute('aria-hidden', 'true');
        el.answerRow.appendChild(slot);
      }
    }
  }

  function updateCategoryTag() {
    const label = CATEGORY_META[state.currentEntry.category]
      ? CATEGORY_META[state.currentEntry.category].label
      : state.currentEntry.category;
    el.categoryTag.textContent = 'Category: ' + label;
  }

  function updateHintLine(text) {
    el.hintLine.textContent = text || '';
  }

  function updateFeedback(text, type) {
    el.feedback.textContent = text || '';
    el.feedback.classList.remove('is-good', 'is-bad');
    if (type) el.feedback.classList.add(type === 'good' ? 'is-good' : 'is-bad');
  }

  function updateExplainLine(text) {
    if (!el.explainLine) return;
    el.explainLine.textContent = text || '';
  }

  function showLoading(text) {
    el.loadingText.textContent = text;
    el.boardStart.hidden = true;
    el.boardLoading.hidden = false;
    el.boardPlay.hidden = true;
  }
  function hideLoading() {
    el.boardLoading.hidden = true;
    el.boardPlay.hidden = false;
    el.sessionProgressWrap.hidden = false;
  }

  function lockPickers() {
    el.categorySelect.classList.add('is-locked');
    el.difficultySelect.classList.add('is-locked');
    el.categoryBtns.forEach((b) => {
      b.disabled = !b.classList.contains('is-active');
    });
    el.difficultyBtns.forEach((b) => {
      b.disabled = !b.classList.contains('is-active');
    });
  }

  function unlockPickers() {
    el.categorySelect.classList.remove('is-locked');
    el.difficultySelect.classList.remove('is-locked');
    el.categoryBtns.forEach((b) => {
      b.disabled = false;
    });
    el.difficultyBtns.forEach((b) => {
      b.disabled = false;
    });
  }

  function returnToPicker() {
    clearInterval(state.timerId);
    state.sessionStarted = false;
    unlockPickers();
    el.sessionEndOverlay.hidden = true;
    if (el.endSessionConfirmOverlay) el.endSessionConfirmOverlay.hidden = true;
    el.boardPlay.hidden = true;
    el.boardLoading.hidden = true;
    el.sessionProgressWrap.hidden = true;
    el.boardStart.hidden = false;
  }

  function setControlsForActiveRound() {
    el.shuffleBtn.disabled = false;
    el.skipBtn.disabled = false;
    el.hintBtn.disabled = false;
    el.submitBtn.disabled = false;
    el.submitBtn.hidden = false;
    el.nextBtn.classList.remove('is-visible');
    el.nextBtn.disabled = true;
  }

  function setControlsForResolvedRound() {
    el.shuffleBtn.disabled = true;
    el.skipBtn.disabled = true;
    el.hintBtn.disabled = true;
    el.submitBtn.disabled = true;
    el.nextBtn.disabled = false;
    el.nextBtn.classList.add('is-visible');
  }

  /* ============================================================
     Timer
     ============================================================ */
  function startTimer() {
    clearInterval(state.timerId);
    updateTimerBar();
    state.timerId = setInterval(() => {
      state.timeLeft -= 1;
      if (state.timeLeft <= 3 && state.timeLeft > 0) soundTick();
      updateTimerBar();
      if (state.timeLeft <= 0) {
        clearInterval(state.timerId);
        handleTimeout();
      }
    }, 1000);
  }

  function updateTimerBar() {
    const pct = Math.max(0, (state.timeLeft / state.totalTime) * 100);
    el.timerFill.style.width = pct + '%';
    el.timerTrack.setAttribute('aria-valuenow', Math.round(pct));
    el.timerFill.classList.remove('is-warn', 'is-danger');
    if (pct <= 20) el.timerFill.classList.add('is-danger');
    else if (pct <= 50) el.timerFill.classList.add('is-warn');
  }

  /* ============================================================
     Session + round flow
     ============================================================ */
  async function startSession(categoryKey, difficulty) {
    clearInterval(state.timerId);
    state.categoryKey = categoryKey;
    state.difficulty = difficulty;
    state.score = 0;
    state.streak = 0;
    state.wrongStreak = 0;
    state.lives = LIVES_START;
    state.wordsSolved = 0;
    state.wordsAttempted = 0;
    state.bestStreakSession = 0;
    state.index = -1;
    state.outcomes = new Array(SESSION_LENGTH).fill(null);
    state.pendingFinish = false;

    el.sessionEndOverlay.hidden = true;
    renderLives();
    renderScoreboard();
    renderSessionProgress();

    const meta = CATEGORY_META[categoryKey];
    showLoading(`Shuffling the ${meta.label.toLowerCase()} deck\u2026`);
    lockPickers();

    const queue = buildSessionQueue(categoryKey, difficulty);

    state.queue = queue;
    hideLoading();
    loadNextWord();
  }

  function loadNextWord() {
    state.index += 1;
    if (state.index >= state.queue.length) {
      finishSession();
      return;
    }
    const entry = state.queue[state.index];
    state.currentEntry = entry;
    state.answer = [];
    state.hintsThisWord = 0;
    state.roundResolved = false;
    state.scrambled = scrambleWord(entry.word).map((char) => ({
      char,
      used: false,
    }));
    state.totalTime = DIFFICULTY[state.difficulty].time;
    state.timeLeft = state.totalTime;

    buildScrambleRow();
    renderAnswerRow();
    updateCategoryTag();
    updateHintLine('');
    updateFeedback('', null);
    updateExplainLine('');
    renderSessionProgress();
    setControlsForActiveRound();
    startTimer();
  }

  function selectLetter(scrambleIdx) {
    if (state.roundResolved) return;
    const tile = state.scrambled[scrambleIdx];
    if (!tile || tile.used) return;
    if (state.answer.length >= state.currentEntry.word.length) return;
    tile.used = true;
    state.answer.push(scrambleIdx);
    syncScrambleDisabledStates();
    renderAnswerRow();
    const lastTile = el.answerRow.children[state.answer.length - 1];
    if (lastTile) lastTile.classList.add('is-popping');
  }

  function removeAnswerLetter(answerPos) {
    if (state.roundResolved) return;
    const scrambleIdx = state.answer[answerPos];
    if (scrambleIdx === undefined) return;
    state.scrambled[scrambleIdx].used = false;
    state.answer.splice(answerPos, 1);
    syncScrambleDisabledStates();
    renderAnswerRow();
  }

  function removeLastAnswerLetter() {
    if (state.answer.length === 0) return;
    removeAnswerLetter(state.answer.length - 1);
  }

  function shuffleUnusedTiles() {
    if (state.roundResolved) return;
    const answerTileObjs = state.answer.map((idx) => state.scrambled[idx]);
    const unusedTiles = state.scrambled.filter((t) => !t.used);
    const reshuffled = shuffleArray(unusedTiles);
    let ri = 0;
    state.scrambled = state.scrambled.map((t) =>
      t.used ? t : reshuffled[ri++],
    );
    state.answer = answerTileObjs.map((obj) => state.scrambled.indexOf(obj));
    buildScrambleRow();
  }

  function checkAnswer() {
    if (state.roundResolved) return;
    if (state.answer.length < state.currentEntry.word.length) {
      updateFeedback('Fill in all the letters first.', 'bad');
      return;
    }
    const guess = state.answer.map((idx) => state.scrambled[idx].char).join('');
    if (guess === state.currentEntry.word) handleCorrect();
    else handleWrong();
  }

  function handleCorrect() {
    clearInterval(state.timerId);
    el.answerRow.classList.add('is-correct');
    soundCorrect();
    spawnConfetti();

    const base = DIFFICULTY[state.difficulty].points;
    const hintPenalty = state.hintsThisWord * HINT_PENALTY;
    const roundScore = Math.max(0, base - hintPenalty);

    state.score += roundScore;
    state.streak += 1;
    state.wrongStreak = 0;
    state.wordsSolved += 1;
    state.wordsAttempted += 1;
    state.outcomes[state.index] = 'solved';
    if (state.streak > state.bestStreakSession)
      state.bestStreakSession = state.streak;

    if (state.score > state.stats.best) state.stats.best = state.score;
    if (state.streak > state.stats.longestStreak)
      state.stats.longestStreak = state.streak;
    state.stats.wordsSolved += 1;
    saveStats(state.stats);

    let breakdown = `Solved! +${roundScore} pts`;
    if (hintPenalty) breakdown += ` (${base} \u2212 ${hintPenalty} hint)`;
    updateFeedback(breakdown, 'good');

    renderScoreboard();
    renderStatsSection();
    resolveRound();
  }

  function handleWrong() {
    soundWrong();
    el.answerRow.classList.add('is-shaking');
    state.wrongStreak += 1;
    let msg = 'Not quite \u2014 try another arrangement.';
    if (state.wrongStreak >= 3) {
      state.streak = 0;
      state.wrongStreak = 0;
      renderScoreboard();
      msg = 'Streak reset after three misses. Keep going!';
    }
    updateFeedback(msg, 'bad');
    setTimeout(() => {
      clearAnswerTiles();
      el.answerRow.classList.remove('is-shaking');
    }, 420);
  }

  function clearAnswerTiles() {
    state.answer.forEach((idx) => {
      state.scrambled[idx].used = false;
    });
    state.answer = [];
    syncScrambleDisabledStates();
    renderAnswerRow();
  }

  function handleTimeout() {
    soundTimeout();
    state.lives -= 1;
    state.streak = 0;
    state.wrongStreak = 0;
    state.wordsAttempted += 1;
    state.outcomes[state.index] = 'failed';
    renderLives();
    renderScoreboard();
    updateFeedback(
      state.lives <= 0
        ? `Time's up! The word was ${state.currentEntry.word}. You're out of lives.`
        : `Time's up! The word was ${state.currentEntry.word}.`,
      'bad',
    );
    resolveRound();
  }

  function skipWord() {
    if (state.roundResolved) return;
    clearInterval(state.timerId);
    state.streak = 0;
    state.wrongStreak = 0;
    state.wordsAttempted += 1;
    state.lives -= 1;
    state.outcomes[state.index] = 'skipped';
    soundSkip();
    renderLives();
    updateFeedback(
      state.lives <= 0
        ? `Skipped. The word was ${state.currentEntry.word}. You're out of lives.`
        : `Skipped \u2014 that cost a life. The word was ${state.currentEntry.word}.`,
      'bad',
    );
    renderScoreboard();
    resolveRound();
  }

  function useHint() {
    if (state.roundResolved || !state.currentEntry) return;
    const word = state.currentEntry.word;
    const nextPos = state.answer.length;
    if (nextPos >= word.length) return;
    const neededChar = word[nextPos];
    const idx = state.scrambled.findIndex(
      (t) => !t.used && t.char === neededChar,
    );
    if (idx === -1) return;

    state.hintsThisWord += 1;
    selectLetter(idx);
    updateHintLine(
      `Hint: letter ${nextPos + 1} is "${neededChar}" \u00b7 ${state.currentEntry.hint}`,
    );
  }

  function resolveRound() {
    state.roundResolved = true;
    clearInterval(state.timerId);
    renderAnswerRow();
    setControlsForResolvedRound();
    if (state.currentEntry && state.currentEntry.fact) {
      updateExplainLine(`\ud83d\udcda ${state.currentEntry.fact}`);
    }
    renderSessionProgress();

    state.pendingFinish =
      state.lives <= 0 || state.wordsAttempted >= SESSION_LENGTH;
    el.nextBtnLabel.textContent = state.pendingFinish ? 'See results' : 'Next';
  }

  function finishSession() {
    clearInterval(state.timerId);
    const isGameOver = state.lives <= 0;

    el.sessionEndIcon.textContent = isGameOver
      ? '\ud83d\udca5'
      : '\ud83c\udf89';
    el.sessionEndTitle.textContent = isGameOver
      ? 'Game over'
      : 'Session complete!';
    el.sessionEndSub.textContent = isGameOver
      ? `You solved ${state.wordsSolved} of ${state.wordsAttempted} words before running out of lives.`
      : `You made it through the ${CATEGORY_META[state.categoryKey].label} deck \u2014 ${state.wordsSolved} of ${SESSION_LENGTH} solved.`;
    el.recapSolved.textContent = `${state.wordsSolved}/${state.wordsAttempted}`;
    el.recapScore.textContent = state.score;
    el.recapStreak.textContent = state.bestStreakSession;
    el.sessionEndOverlay.hidden = false;
    renderStatsSection();
  }

  /* ============================================================
     Difficulty / category switching
     ============================================================ */
  function setDifficulty(diff) {
    if (state.sessionStarted) return;
    if (!DIFFICULTY[diff] || diff === state.difficulty) return;
    el.difficultyBtns.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.difficulty === diff);
    });
    state.difficulty = diff;
  }

  function setCategory(catKey) {
    if (state.sessionStarted) return;
    if (!CATEGORY_META[catKey] || catKey === state.categoryKey) return;
    el.categoryBtns.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.category === catKey);
    });
    state.categoryKey = catKey;
  }

  /* ============================================================
     Event wiring
     ============================================================ */
  el.shuffleBtn.addEventListener('click', shuffleUnusedTiles);
  el.skipBtn.addEventListener('click', skipWord);
  el.hintBtn.addEventListener('click', useHint);
  el.submitBtn.addEventListener('click', checkAnswer);
  el.nextBtn.addEventListener('click', () => {
    if (!state.roundResolved) return;
    if (state.pendingFinish) finishSession();
    else loadNextWord();
  });

  el.difficultyBtns.forEach((btn) => {
    btn.addEventListener('click', () => setDifficulty(btn.dataset.difficulty));
  });
  el.categoryBtns.forEach((btn) => {
    btn.addEventListener('click', () => setCategory(btn.dataset.category));
  });

  el.startGameBtn.addEventListener('click', () => {
    state.sessionStarted = true;
    startSession(state.categoryKey, state.difficulty);
    recenterGameCardMobile();
  });

  el.playAgainBtn.addEventListener('click', () => {
    startSession(state.categoryKey, state.difficulty);
    recenterGameCardMobile();
  });
  el.changeCategoryBtn.addEventListener('click', () => {
    returnToPicker();
    scrollToSection(document.getElementById('game'), { center: true });
    el.categorySelect.classList.add('is-pulsing');
    setTimeout(() => el.categorySelect.classList.remove('is-pulsing'), 2400);
  });

  el.endSessionBtn.addEventListener('click', () => {
    if (!state.roundResolved) clearInterval(state.timerId);
    el.endSessionConfirmOverlay.hidden = false;
  });

  el.keepPlayingBtn.addEventListener('click', () => {
    el.endSessionConfirmOverlay.hidden = true;
    if (!state.roundResolved && state.sessionStarted) startTimer();
  });

  el.confirmEndSessionBtn.addEventListener('click', () => {
    el.endSessionConfirmOverlay.hidden = true;
    returnToPicker();
    showToast('Session ended.');
    scrollToSection(document.getElementById('game'), { center: true });
  });

  el.soundToggle.addEventListener('click', () => {
    state.soundOn = !state.soundOn;
    el.soundToggle.setAttribute('aria-pressed', String(state.soundOn));
    try {
      localStorage.setItem(STORAGE_SOUND_KEY, state.soundOn ? '1' : '0');
    } catch (e) {}
    if (state.soundOn) {
      getAudioCtx();
      playTone(660, 0.12, 0);
    }
  });
  el.soundToggle.setAttribute('aria-pressed', String(state.soundOn));

  el.resetStatsBtn.addEventListener('click', () => {
    state.stats = { best: 0, longestStreak: 0, wordsSolved: 0 };
    saveStats(state.stats);
    renderStatsSection();
    renderScoreboard();
    showToast('Saved stats cleared.');
  });

  el.scrollButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.scroll);
      // "Play" (header) and "Start playing" (hero) both point at #game —
      // on mobile, center that card in the viewport rather than just
      // docking it near the top, so the whole board is visible at once.
      const center = btn.dataset.scroll === '#game';
      scrollToSection(target, { center });
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (el.sessionEndOverlay && !el.sessionEndOverlay.hidden) return;
    if (el.endSessionConfirmOverlay && !el.endSessionConfirmOverlay.hidden)
      return;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (state.roundResolved) {
        if (!el.nextBtn.disabled) el.nextBtn.click();
      } else if (
        state.currentEntry &&
        state.answer.length === state.currentEntry.word.length
      ) {
        checkAnswer();
      }
      return;
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      removeLastAnswerLetter();
      return;
    }
    if (/^[a-zA-Z]$/.test(e.key)) {
      const char = e.key.toUpperCase();
      const idx = state.scrambled.findIndex((t) => !t.used && t.char === char);
      if (idx !== -1) selectLetter(idx);
    }
  });

  /* ============================================================
     Category row scroll-fade affordance
     ============================================================ */
  function updateCategoryScrollFade() {
    if (!el.categorySelect || !el.categorySelectWrap) return;
    const { scrollLeft, scrollWidth, clientWidth } = el.categorySelect;
    const maxScroll = scrollWidth - clientWidth;
    el.categorySelectWrap.classList.toggle('can-scroll-left', scrollLeft > 4);
    el.categorySelectWrap.classList.toggle(
      'can-scroll-right',
      scrollLeft < maxScroll - 4,
    );
  }

  /* ============================================================
     Init
     ============================================================ */
  function init() {
    renderStatsSection();
    if (el.categorySelect) {
      updateCategoryScrollFade();
      el.categorySelect.addEventListener('scroll', updateCategoryScrollFade, {
        passive: true,
      });
      window.addEventListener('resize', updateCategoryScrollFade);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();

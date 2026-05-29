export const QUESTION_BANK = {
  biology: [
    { id:"b1", topic:"Cell Biology", difficulty:"easy", q:"What is the powerhouse of the cell?", options:["Nucleus","Mitochondria","Ribosome","Golgi body"], answer:1, explanation:"The mitochondria generates most of the cell's ATP (adenosine triphosphate), the cell's energy currency. It's called the powerhouse because it produces energy through cellular respiration using oxygen and glucose." },
    { id:"b2", topic:"Genetics", difficulty:"medium", q:"Which molecule carries genetic information in most organisms?", options:["RNA","Protein","DNA","Lipid"], answer:2, explanation:"DNA (Deoxyribonucleic acid) carries genetic blueprints stored in sequences of four bases: Adenine (A), Thymine (T), Cytosine (C), and Guanine (G). RNA helps translate DNA but DNA is the primary genetic storage molecule." },
    { id:"b3", topic:"Photosynthesis", difficulty:"easy", q:"What process do plants use to convert sunlight into food?", options:["Respiration","Fermentation","Photosynthesis","Digestion"], answer:2, explanation:"Photosynthesis occurs in chloroplasts using chlorophyll to capture light. Equation: 6CO2 + 6H2O + light gives C6H12O6 + 6O2. Plants convert carbon dioxide and water into glucose and oxygen." },
    { id:"b4", topic:"Genetics", difficulty:"medium", q:"How many chromosomes do humans typically have?", options:["23","44","46","48"], answer:2, explanation:"Humans have 46 chromosomes in 23 pairs. 22 pairs are autosomes and 1 pair are sex chromosomes (XX female, XY male). Each parent contributes 23 chromosomes via gametes." },
    { id:"b5", topic:"Human Anatomy", difficulty:"easy", q:"Which organ produces insulin?", options:["Liver","Kidney","Stomach","Pancreas"], answer:3, explanation:"The pancreas produces insulin through beta cells in the Islets of Langerhans. Insulin regulates blood glucose. Failure leads to diabetes mellitus." },
    { id:"b6", topic:"Cell Biology", difficulty:"easy", q:"What is the basic unit of life?", options:["Atom","Cell","Tissue","Organ"], answer:1, explanation:"The cell is the smallest structural and functional unit of life. Robert Hooke first described cells in 1665 when examining cork. All living things are made of one or more cells." },
    { id:"b7", topic:"Human Biology", difficulty:"medium", q:"Which blood type is the universal donor?", options:["A","B","AB","O negative"], answer:3, explanation:"O negative is the universal donor. It has no A, B antigens or Rh factor so it can be given to any patient in emergencies without immune rejection." },
    { id:"b8", topic:"Cell Division", difficulty:"medium", q:"What process produces two genetically identical daughter cells?", options:["Meiosis","Mitosis","Budding","Binary fission"], answer:1, explanation:"Mitosis produces two genetically identical daughter cells with the same chromosome number as the parent. Used for growth and repair. Meiosis produces gametes with half the chromosomes." },
    { id:"b9", topic:"Photosynthesis", difficulty:"easy", q:"Which gas do plants absorb during photosynthesis?", options:["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"], answer:2, explanation:"Plants absorb CO2 through stomata on their leaves. Carbon dioxide is a raw material converted into glucose. Oxygen is released as a byproduct which is why plants are vital to life on Earth." },
    { id:"b10", topic:"Cell Biology", difficulty:"easy", q:"What structure surrounds plant cells but NOT animal cells?", options:["Cell membrane","Cell wall","Nucleus","Vacuole"], answer:1, explanation:"The plant cell wall is made of cellulose and provides rigidity and protection. Animal cells only have a flexible membrane. The wall allows plants to maintain turgor pressure." },
    { id:"b11", topic:"Ecology", difficulty:"medium", q:"What term describes organisms that make their own food?", options:["Consumers","Decomposers","Autotrophs","Heterotrophs"], answer:2, explanation:"Autotrophs (producers) synthesize organic compounds from inorganic sources. Plants use sunlight (photosynthesis). They form the base of every food chain." },
    { id:"b12", topic:"Human Anatomy", difficulty:"hard", q:"Which part of the brain controls balance and coordination?", options:["Cerebrum","Medulla oblongata","Cerebellum","Thalamus"], answer:2, explanation:"The cerebellum at the back of the brain fine-tunes motor movements and maintains balance. Damage causes ataxia which is loss of coordination." },
    { id:"b13", topic:"Reproduction", difficulty:"medium", q:"What is the term for the fusion of male and female gametes?", options:["Mitosis","Meiosis","Fertilization","Pollination"], answer:2, explanation:"Fertilization is the fusion of sperm and egg to form a zygote. This restores the diploid chromosome number of 46 in humans after meiosis halved it." },
    { id:"b14", topic:"Nutrition", difficulty:"easy", q:"Which vitamin is produced when skin is exposed to sunlight?", options:["Vitamin A","Vitamin B12","Vitamin C","Vitamin D"], answer:3, explanation:"Vitamin D is synthesized in skin upon exposure to UVB rays. It is essential for calcium absorption and bone health. Deficiency causes rickets in children." },
    { id:"b15", topic:"Evolution", difficulty:"hard", q:"Who proposed the theory of evolution by natural selection?", options:["Gregor Mendel","Louis Pasteur","Charles Darwin","Carl Linnaeus"], answer:2, explanation:"Charles Darwin proposed natural selection in On the Origin of Species in 1859. Organisms with favorable traits survive and reproduce more, passing those traits to offspring over generations." },
  ],
  chemistry: [
    { id:"c1", topic:"Periodic Table", difficulty:"easy", q:"What is the chemical symbol for Gold?", options:["Go","Gd","Au","Ag"], answer:2, explanation:"Gold's symbol Au comes from its Latin name Aurum. Many elements have Latin-derived symbols: Silver (Ag=Argentum), Iron (Fe=Ferrum), Lead (Pb=Plumbum), Copper (Cu=Cuprum)." },
    { id:"c2", topic:"Acids & Bases", difficulty:"easy", q:"What is the pH of pure water?", options:["5","6","7","8"], answer:2, explanation:"Pure water has pH 7 which is neutral. pH less than 7 is acidic, pH greater than 7 is basic. Each unit represents a 10 times change. The scale runs 0 most acidic to 14 most basic." },
    { id:"c3", topic:"Periodic Table", difficulty:"medium", q:"How many elements are in the periodic table?", options:["108","112","118","124"], answer:2, explanation:"The periodic table contains 118 confirmed elements. Element 118 is Oganesson. Elements 113 Nihonium, 115 Moscovium and 117 Tennessine were officially named in 2016." },
    { id:"c4", topic:"Atmospheric Chemistry", difficulty:"easy", q:"Most abundant gas in Earth's atmosphere?", options:["Oxygen","Argon","Carbon dioxide","Nitrogen"], answer:3, explanation:"Nitrogen N2 makes up about 78 percent of Earth's atmosphere. Oxygen is about 21 percent, Argon 0.93 percent, CO2 only 0.04 percent. Nitrogen is unreactive due to its strong triple bond." },
    { id:"c5", topic:"Chemical Bonding", difficulty:"medium", q:"What type of bond involves sharing electrons?", options:["Ionic","Covalent","Metallic","Hydrogen"], answer:1, explanation:"Covalent bonds form when atoms share electron pairs. This occurs between non-metals. In H2O oxygen shares electrons with two hydrogens. Ionic bonds involve electron transfer not sharing." },
    { id:"c6", topic:"Periodic Table", difficulty:"easy", q:"Which element has atomic number 1?", options:["Helium","Hydrogen","Lithium","Carbon"], answer:1, explanation:"Hydrogen H has 1 proton making it the lightest element. It makes up about 75 percent of the universe's normal matter by mass." },
    { id:"c7", topic:"Chemical Formulas", difficulty:"easy", q:"What is the chemical formula for table salt?", options:["KCl","NaBr","NaCl","CaCl2"], answer:2, explanation:"Sodium chloride NaCl forms when sodium donates one electron to chlorine creating an ionic bond. In water it dissociates into Na+ and Cl- ions. It is essential for human nerve and muscle function." },
    { id:"c8", topic:"Acids & Bases", difficulty:"medium", q:"Which acid is found in the stomach?", options:["Sulfuric acid","Hydrochloric acid","Nitric acid","Acetic acid"], answer:1, explanation:"HCl in gastric juice with pH 1.5 to 3.5 activates pepsin, kills bacteria and aids protein digestion. The stomach lining is protected by thick mucus to prevent self-digestion." },
    { id:"c9", topic:"Mole Concept", difficulty:"hard", q:"Avogadro's number is approximately?", options:["6.022x10^21","6.022x10^23","6.022x10^25","6.022x10^20"], answer:1, explanation:"6.022 times 10 to the power 23 defines one mole. One mole of carbon-12 equals 12 grams exactly. This bridges atomic scale to lab scale allowing chemists to count atoms by weighing them." },
    { id:"c10", topic:"States of Matter", difficulty:"easy", q:"Which state of matter has no definite shape or volume?", options:["Solid","Liquid","Gas","Plasma"], answer:2, explanation:"Gases have no fixed shape or volume and expand to fill any container. Solids have both. Liquids have fixed volume but take the container shape. Gas particles move fast and are far apart." },
    { id:"c11", topic:"Organic Chemistry", difficulty:"medium", q:"What is the simplest hydrocarbon?", options:["Ethane","Propane","Methane","Butane"], answer:2, explanation:"Methane CH4 has one carbon bonded to four hydrogens. It is the main component of natural gas. The alkane series continues: methane, ethane C2H6, propane C3H8, butane C4H10." },
    { id:"c12", topic:"Electrochemistry", difficulty:"hard", q:"In electrolysis, oxidation occurs at which electrode?", options:["Cathode","Anode","Both","Neither"], answer:1, explanation:"Oxidation which is loss of electrons occurs at the Anode. Reduction which is gain of electrons occurs at the Cathode. Memory trick: AN OX means ANode equals OXidation and RED CAT means REDuction at CAThode." },
    { id:"c13", topic:"Rates of Reaction", difficulty:"medium", q:"Which factor does NOT affect the rate of a chemical reaction?", options:["Temperature","Concentration","Colour of reactants","Surface area"], answer:2, explanation:"Colour of reactants has no effect on reaction rate. Rate is affected by temperature, concentration, surface area, catalysts and pressure for gases." },
    { id:"c14", topic:"Chemical Equations", difficulty:"medium", q:"What is conserved in every chemical reaction?", options:["Volume","Colour","Mass","Temperature"], answer:2, explanation:"Law of Conservation of Mass by Lavoisier states mass is neither created nor destroyed. Atoms are rearranged but their total number stays constant. This is why equations must be balanced." },
    { id:"c15", topic:"Periodic Table", difficulty:"hard", q:"Which group contains the noble gases?", options:["Group 1","Group 7","Group 0 (18)","Group 2"], answer:2, explanation:"Noble gases are in Group 0 also called Group 18: He, Ne, Ar, Kr, Xe, Rn. They have full outer shells making them extremely unreactive. Used in lighting, welding shields and balloons." },
  ],
  physics: [
    { id:"p1", topic:"Light & Waves", difficulty:"easy", q:"What is the speed of light in a vacuum?", options:["3x10^6 m/s","3x10^8 m/s","3x10^10 m/s","3x10^4 m/s"], answer:1, explanation:"Light travels at 3 times 10 to the power 8 metres per second in vacuum. This is the cosmic speed limit. Nothing with mass can reach this speed. Light from the Sun takes about 8 minutes to reach Earth." },
    { id:"p2", topic:"Mechanics", difficulty:"easy", q:"What is the SI unit of force?", options:["Watt","Joule","Newton","Pascal"], answer:2, explanation:"The Newton N equals the force needed to accelerate 1kg by 1 metre per second squared. Named after Isaac Newton. Formula: F equals ma." },
    { id:"p3", topic:"Newton's Laws", difficulty:"easy", q:"Every action has an equal and opposite reaction — which law?", options:["Newton's 1st Law","Newton's 2nd Law","Newton's 3rd Law","Hooke's Law"], answer:2, explanation:"Newton's 3rd Law. Examples: rocket expels gas down and moves up, swimming pushes water back and body moves forward, recoil when firing a gun. Forces always act in pairs on different objects." },
    { id:"p4", topic:"Energy", difficulty:"medium", q:"What type of energy is stored in a stretched spring?", options:["Kinetic energy","Thermal energy","Elastic potential energy","Nuclear energy"], answer:2, explanation:"Elastic potential energy equals half k times x squared where k is spring constant and x is displacement. When released it converts to kinetic energy. Hooke's Law states F equals kx." },
    { id:"p5", topic:"Electricity", difficulty:"easy", q:"What is the unit of electrical resistance?", options:["Ampere","Volt","Ohm","Watt"], answer:2, explanation:"The Ohm measures resistance. Ohm's Law: V equals IR. High resistance reduces current. Georg Ohm discovered this in 1827." },
    { id:"p6", topic:"Atomic Physics", difficulty:"medium", q:"Which subatomic particle has a negative charge?", options:["Proton","Neutron","Electron","Photon"], answer:2, explanation:"Electrons carry negative charge of 1.6 times 10 to the power negative 19 coulombs. Protons have equal positive charge. Neutrons are neutral. Electrons in outer shells determine bonding behaviour." },
    { id:"p7", topic:"Light & Optics", difficulty:"easy", q:"A straw appears bent in water due to?", options:["Reflection","Diffraction","Refraction","Dispersion"], answer:2, explanation:"Refraction occurs when light bends changing speed between media of different density. Light slows in water causing bending at the surface. Snell's Law: n1 sin theta1 equals n2 sin theta2." },
    { id:"p8", topic:"Energy", difficulty:"medium", q:"Formula for kinetic energy?", options:["mgh","half mv squared","mv","F times d"], answer:1, explanation:"Kinetic energy equals half m v squared where m is mass in kg and v is velocity in metres per second. Double the speed gives 4 times the kinetic energy because v is squared." },
    { id:"p9", topic:"Waves", difficulty:"medium", q:"Which wave type requires a medium to travel?", options:["Electromagnetic","Light","Mechanical","Radio"], answer:2, explanation:"Mechanical waves like sound, water waves and seismic waves need a physical medium. Electromagnetic waves like light and radio travel through vacuum. Space is silent because sound cannot travel in a vacuum." },
    { id:"p10", topic:"Modern Physics", difficulty:"hard", q:"E=mc² represents what?", options:["Kinetic energy","Mass-energy equivalence","Electric potential","Gravitational force"], answer:1, explanation:"Einstein's E equals mc squared shows mass and energy are interchangeable. c squared equals 9 times 10 to the power 16 metres squared per second squared. Tiny masses contain enormous energy. This is the basis of nuclear power." },
    { id:"p11", topic:"Electricity", difficulty:"medium", q:"Current equals?", options:["I = Q times t","I = Q divided by t","Q = I divided by t","t = Q times I"], answer:1, explanation:"Current I equals Charge Q divided by Time t. One Ampere equals one Coulomb per second. If 10 Coulombs flow in 2 seconds then I equals 10 divided by 2 equals 5 Amperes." },
    { id:"p12", topic:"Thermodynamics", difficulty:"hard", q:"Which law states energy cannot be created or destroyed?", options:["Zeroth Law","First Law","Second Law","Third Law"], answer:1, explanation:"First Law of Thermodynamics is conservation of energy. Delta U equals Q minus W. Energy converts between forms but total remains constant. This is the basis of all engines and biological systems." },
    { id:"p13", topic:"Mechanics", difficulty:"medium", q:"What is the unit of pressure?", options:["Newton","Joule","Pascal","Watt"], answer:2, explanation:"Pascal Pa equals 1 Newton per metre squared. Pressure equals Force divided by Area. Atmospheric pressure is approximately 101325 Pa. Sharp knives cut easily because small area creates high pressure from the same force." },
    { id:"p14", topic:"Electricity", difficulty:"medium", q:"What is the formula for electrical power?", options:["P = V divided by I","P = V times I","P = I divided by V","P = V plus I"], answer:1, explanation:"Power P equals Voltage V times Current I. Also P equals I squared R and P equals V squared divided by R. Unit is Watt. A 100W bulb at 240V draws current equals 100 divided by 240 equals 0.42 Amperes." },
    { id:"p15", topic:"Waves", difficulty:"medium", q:"Wave speed equals?", options:["frequency plus wavelength","frequency times wavelength","frequency divided by wavelength","wavelength divided by frequency"], answer:1, explanation:"Wave speed v equals frequency f times wavelength lambda. Sound at 340 metres per second with frequency 170 Hz has wavelength equals 340 divided by 170 equals 2 metres. All EM waves travel at c in vacuum." },
  ],
}

export const LESSON_CONTENT = {
  biology: [
    {
      id:"bl1", topic:"Cell Biology", icon:"🔬",
      title:"The Cell: Building Block of Life",
      duration:"8 min read", difficulty:"Beginner",
      sections:[
        { heading:"What is a Cell?", body:"A cell is the smallest structural and functional unit of all living organisms. Robert Hooke first used the term cell in 1665 after observing cork. All living things from single bacteria to humans with 37 trillion cells are made of cells.\n\nCell Theory states:\n1. All living things are made of cells\n2. The cell is the basic unit of life\n3. All cells come from pre-existing cells" },
        { heading:"Prokaryotes vs Eukaryotes", body:"Prokaryotic cells (bacteria, archaea):\n- No membrane-bound nucleus\n- DNA floats freely as a nucleoid\n- Smaller: 1-10 micrometres\n- No membrane-bound organelles\n\nEukaryotic cells (plants, animals, fungi):\n- True nucleus with membrane\n- Complex organelles\n- Larger: 10-100 micrometres\n- All human cells are eukaryotic" },
        { heading:"Key Organelles", body:"- Nucleus: Control centre, contains DNA\n- Mitochondria: ATP production via cellular respiration\n- Ribosome: Protein synthesis\n- Rough ER: Protein processing and transport\n- Smooth ER: Lipid synthesis\n- Golgi Apparatus: Packaging and shipping proteins\n- Lysosome: Waste disposal\n- Cell Membrane: Selectively permeable\n- Cell Wall (plants): Cellulose rigid outer protection\n- Chloroplast (plants): Photosynthesis\n- Large Vacuole (plants): Water storage" },
        { heading:"JAMB Exam Tip", body:"Always distinguish plant vs animal cells:\n\nPLANT ONLY: Cell wall (cellulose), chloroplasts, large central vacuole\n\nANIMAL ONLY: Centrioles, lysosomes prominent\n\nBOTH HAVE: Cell membrane, nucleus, mitochondria, ribosomes, ER, Golgi\n\nCommon JAMB question: Which organelle is responsible for protein synthesis? Answer: Ribosome" },
      ]
    },
    {
      id:"bl2", topic:"Genetics", icon:"🧬",
      title:"DNA, Genes & Heredity",
      duration:"10 min read", difficulty:"Intermediate",
      sections:[
        { heading:"DNA Structure", body:"DNA is a double helix made of nucleotides. Each nucleotide contains:\n- A deoxyribose sugar\n- A phosphate group\n- One of 4 nitrogenous bases\n\nBase pairing rules:\n- Adenine (A) pairs with Thymine (T) — 2 hydrogen bonds\n- Cytosine (C) pairs with Guanine (G) — 3 hydrogen bonds\n\nThe two strands are antiparallel running in opposite directions." },
        { heading:"Genes and Chromosomes", body:"A gene is a DNA segment that codes for a specific protein.\n\nHumans have:\n- About 20,000 to 25,000 genes\n- 46 chromosomes in 23 pairs\n- 22 pairs of autosomes\n- 1 pair of sex chromosomes: XX female, XY male\n\nGenome means the complete genetic material of an organism.\nAllele means an alternative form of a gene.\nLocus means the specific position of a gene on a chromosome." },
        { heading:"Mendel's Laws", body:"Gregor Mendel in 1866 discovered inheritance through pea plant experiments.\n\nLaw of Segregation: Each organism has 2 alleles per trait. They separate during gamete formation so each gamete gets only one.\n\nLaw of Independent Assortment: Genes for different traits are inherited independently when on different chromosomes.\n\nDominant (capital letter) masks recessive.\nRecessive (lowercase) only expressed when homozygous.\nHomozygous: AA or aa. Heterozygous: Aa" },
        { heading:"JAMB Exam Tip", body:"Punnett Square: Cross Aa times Aa gives:\n1 AA : 2 Aa : 1 aa (Genotype ratio)\nPhenotype ratio: 3 dominant : 1 recessive\n\nBlood group AB has codominant alleles. Both A and B are expressed equally. This is neither dominant nor recessive.\n\nJAMB trick: A woman with genotype XHXh (carrier) marries a normal man XHY. What is the probability their son has haemophilia? Answer: 50 percent" },
      ]
    },
    {
      id:"bl3", topic:"Ecology", icon:"🌍",
      title:"Ecology & The Environment",
      duration:"9 min read", difficulty:"Intermediate",
      sections:[
        { heading:"Levels of Organisation", body:"Organism → Population → Community → Ecosystem → Biome → Biosphere\n\n- Organism: single individual\n- Population: same species in an area\n- Community: all species in an area\n- Ecosystem: community plus its physical environment\n- Biome: large ecosystem such as forest, desert, ocean\n- Biosphere: all life on Earth" },
        { heading:"Food Chains & Webs", body:"Energy flows through ecosystems via feeding relationships:\n\nProducers (plants) → Primary consumers (herbivores) → Secondary consumers (carnivores) → Tertiary consumers → Decomposers\n\nExample: Grass → Grasshopper → Frog → Snake → Eagle\n\nOnly about 10 percent of energy transfers between each level. This is the 10 percent rule. This is why food chains rarely exceed 4 to 5 levels." },
        { heading:"Nutrient Cycles", body:"Carbon Cycle: CO2 absorbed by plants via photosynthesis. Eaten by animals whose respiration releases CO2. Decomposers return carbon to soil. Fossil fuels release stored carbon when burned.\n\nNitrogen Cycle: N2 in air is fixed by nitrogen-fixing bacteria such as Rhizobium in legume roots. Converts to NH3 then nitrites then nitrates. Absorbed by plants. Eaten by animals. Decomposers break down waste. Denitrifying bacteria return N2 to air." },
        { heading:"JAMB Exam Tip", body:"Common JAMB ecology questions:\n\nWhich organism is a primary producer? Answer: Plants and algae that make their own food.\n\nWhat is a niche? Answer: The role of an organism in its ecosystem not just where it lives.\n\nDecomposers include? Answer: Bacteria and fungi that break down dead organic matter.\n\nMutualism example? Answer: Rhizobium bacteria in legume roots where both benefit.\n\nParasitism example? Answer: Tapeworm in human intestine where one benefits and one is harmed." },
      ]
    },
  ],
  chemistry: [
    {
      id:"cl1", topic:"Atomic Structure", icon:"⚛️",
      title:"Atomic Structure & Periodic Table",
      duration:"9 min read", difficulty:"Beginner",
      sections:[
        { heading:"Structure of an Atom", body:"An atom has:\n- Nucleus: protons (positive) and neutrons (neutral) containing 99.9 percent of mass\n- Electron shells: electrons (negative) orbit the nucleus\n\nKey definitions:\n- Atomic number Z = number of protons\n- Mass number A = protons plus neutrons\n- Neutrons = Mass number minus Atomic number\n- In neutral atom: protons equals electrons\n\nIsotopes are the same element with different neutron numbers. Example: Carbon-12, Carbon-13, Carbon-14" },
        { heading:"Electronic Configuration", body:"Electrons fill shells in order: 2, 8, 8, 18...\n\nExamples:\n- Hydrogen (1): 1\n- Carbon (6): 2, 4\n- Nitrogen (7): 2, 5\n- Sodium (11): 2, 8, 1\n- Chlorine (17): 2, 8, 7\n- Calcium (20): 2, 8, 8, 2\n\nValence electrons are outer shell electrons and they determine reactivity and bonding." },
        { heading:"The Periodic Table", body:"Elements arranged by atomic number.\nPeriods (rows) represent energy levels.\nGroups (columns) have same valence electrons and similar properties.\n\nKey groups:\n- Group 1 Alkali metals: 1 valence electron, very reactive, react with water\n- Group 2 Alkaline earth metals: 2 valence electrons\n- Group 7 Halogens: 7 valence electrons, very reactive non-metals\n- Group 0/18 Noble gases: full shells, unreactive\n- Transition metals: d-block, variable valency, coloured compounds" },
        { heading:"JAMB Exam Tip", body:"Memorise the first 20 elements:\nH He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca\n\nJAMB often asks:\nAn element has configuration 2,8,7 — what group? Answer: Group 7 because it has 7 outer electrons.\n\nWhich element has configuration 2,8,8,2? Answer: Calcium with atomic number 20.\n\nWhat is the valency of nitrogen? Answer: 3 because it needs 3 more electrons to fill its outer shell." },
      ]
    },
    {
      id:"cl2", topic:"Chemical Bonding", icon:"🔗",
      title:"Chemical Bonding",
      duration:"8 min read", difficulty:"Intermediate",
      sections:[
        { heading:"Why Atoms Bond", body:"Atoms bond to achieve a full outer electron shell called the octet rule requiring 8 electrons. Hydrogen only needs 2. Bonding releases energy creating more stable arrangements.\n\nTypes of chemical bonds:\n1. Ionic bonding between metal and non-metal\n2. Covalent bonding between non-metal and non-metal\n3. Metallic bonding between metal and metal\n4. Hydrogen bonding which is a special intermolecular force" },
        { heading:"Ionic Bonding", body:"Metal LOSES electrons to become a positive cation.\nNon-metal GAINS electrons to become a negative anion.\nElectrostatic attraction holds them together.\n\nExamples:\n- NaCl: Na loses 1 electron to become Na+. Cl gains 1 electron to become Cl-.\n- MgO: Mg loses 2 electrons to become Mg2+. O gains 2 electrons to become O2-.\n- CaCl2: Ca loses 2 electrons. Each Cl gains 1 electron.\n\nProperties: high melting point, conduct electricity when dissolved or molten, form crystals, soluble in water." },
        { heading:"Covalent Bonding", body:"Non-metals SHARE electron pairs.\n- Single bond: 1 shared pair. Example: H-H, H-Cl\n- Double bond: 2 shared pairs. Example: O=O, C=O\n- Triple bond: 3 shared pairs. Example: N triple bond N\n\nExamples:\n- H2O: O shares 2 pairs with 2 H atoms\n- CO2: C shares 2 pairs with each O (double bonds)\n- NH3: N shares 3 pairs with 3 H atoms\n\nProperties: lower melting points, mostly do not conduct electricity, can be gas liquid or solid." },
        { heading:"JAMB Exam Tip", body:"For NaCl dot-cross diagram: Na gives its 1 outer electron to Cl. Show Na+ with empty outer shell and Cl- with full outer shell of 8 electrons.\n\nFor H2O: O in centre with 2 H atoms sharing. O has 2 bonding pairs and 2 lone pairs.\n\nKey rule: Count total valence electrons first then draw bonds to complete octets.\n\nDative bond also called coordinate bond: both electrons come from ONE atom. Example: in NH4+ the 4th H bond is dative." },
      ]
    },
    {
      id:"cl3", topic:"Acids, Bases & Salts", icon:"🧪",
      title:"Acids, Bases & Salts",
      duration:"7 min read", difficulty:"Beginner",
      sections:[
        { heading:"Defining Acids & Bases", body:"Arrhenius Theory:\n- Acid produces H+ (proton) in water\n- Base produces OH- in water\n\nBronsted-Lowry Theory (broader):\n- Acid is a proton (H+) donor\n- Base is a proton (H+) acceptor\n\nCommon acids: HCl (hydrochloric), H2SO4 (sulfuric), HNO3 (nitric), CH3COOH (ethanoic/vinegar)\nCommon bases: NaOH (sodium hydroxide), KOH, Ca(OH)2, NH3 (ammonia)" },
        { heading:"The pH Scale", body:"pH equals negative log of H+ concentration.\n\n- pH 0 to 6: Acidic (pH 0 is most acidic)\n- pH 7: Neutral (pure water)\n- pH 8 to 14: Alkaline or Basic\n\nEach unit means 10 times change:\npH 3 is 10 times more acidic than pH 4.\npH 3 is 100 times more acidic than pH 5.\n\nExamples:\n- Stomach acid: pH 1-2\n- Vinegar: pH 3\n- Blood: pH 7.35-7.45\n- Seawater: pH 8\n- Bleach: pH 12-13" },
        { heading:"Neutralisation & Salts", body:"Acid plus Base gives Salt plus Water\n\nExamples:\nHCl + NaOH gives NaCl + H2O\nH2SO4 + 2KOH gives K2SO4 + 2H2O\nHNO3 + NaOH gives NaNO3 + H2O\n\nSalt formation rules:\n- HCl acids make chloride salts\n- H2SO4 makes sulfate salts\n- HNO3 makes nitrate salts\n- H3PO4 makes phosphate salts" },
        { heading:"JAMB Exam Tip", body:"Indicators you must know:\n- Litmus: RED in acid, BLUE in alkali\n- Phenolphthalein: COLOURLESS in acid, PINK in alkali\n- Methyl orange: RED in acid, YELLOW in alkali\n- Universal indicator: full colour range\n\nJAMB trick: What salt forms when H2SO4 reacts with Ca(OH)2?\nAnswer: CaSO4 (calcium sulfate) plus H2O\nBalance: H2SO4 + Ca(OH)2 gives CaSO4 + 2H2O\nNote: CaSO4 is insoluble and forms a precipitate!" },
      ]
    },
  ],
  physics: [
    {
      id:"pl1", topic:"Mechanics", icon:"🏃",
      title:"Motion, Forces & Newton's Laws",
      duration:"9 min read", difficulty:"Beginner",
      sections:[
        { heading:"Scalars and Vectors", body:"Scalar quantities have magnitude only:\n- Speed, distance, mass, time, energy, temperature\n\nVector quantities have magnitude and direction:\n- Velocity, displacement, force, acceleration, momentum\n\nKey distinctions:\n- Distance (scalar) vs Displacement (vector)\n- Speed (scalar) vs Velocity (vector)\n\nVelocity equals displacement divided by time.\nSpeed equals distance divided by time.\nAcceleration equals change in velocity divided by time and is a vector." },
        { heading:"SUVAT Equations", body:"For uniform (constant) acceleration:\n\n- v = u + at\n- s = ut + half at squared\n- v squared = u squared + 2as\n- s = half (u + v) t\n\nWhere:\ns = displacement in metres\nu = initial velocity in metres per second\nv = final velocity in metres per second\na = acceleration in metres per second squared\nt = time in seconds\n\nFree fall: a = g = 9.8 metres per second squared" },
        { heading:"Newton's Three Laws", body:"1st Law (Inertia): An object remains at rest or moves at constant velocity unless acted on by a resultant external force.\n\n2nd Law: F = ma\nForce in Newtons equals mass in kg times acceleration in metres per second squared.\n\n3rd Law: For every action there is an equal and opposite reaction. Forces act on DIFFERENT objects.\n\nWeight W equals mg where m is mass in kg and g is 9.8 or approximately 10 N per kg." },
        { heading:"JAMB Exam Tip", body:"SUVAT example: A car accelerates from rest to 20 m/s in 5 seconds.\nu = 0, v = 20, t = 5\na = (v-u) divided by t = 20 divided by 5 = 4 metres per second squared\nF = ma = 1000 times 4 = 4000 N if mass is 1000 kg\n\nCommon JAMB question:\nA body of mass 5 kg is acted on by a force of 20N. What is its acceleration?\na = F divided by m = 20 divided by 5 = 4 metres per second squared\n\nWhat is the weight of a 70 kg person with g equals 10?\nW = mg = 70 times 10 = 700 N" },
      ]
    },
    {
      id:"pl2", topic:"Electricity", icon:"⚡",
      title:"Electricity & Circuits",
      duration:"8 min read", difficulty:"Intermediate",
      sections:[
        { heading:"Basic Concepts", body:"Electric current I: Rate of flow of charge. Unit: Ampere A\nI = Q divided by t where Q is charge in Coulombs and t is time in seconds.\n\nVoltage V: Energy transferred per unit charge. Unit: Volt V\nV = W divided by Q where W is work done in Joules.\n\nResistance R: Opposition to current flow. Unit: Ohm\nOhm's Law: V = IR\n\nResistivity: R = rho times L divided by A where L is length and A is cross-sectional area." },
        { heading:"Series vs Parallel Circuits", body:"SERIES circuit:\n- Same current through all components\n- Voltage splits: Vtotal = V1 + V2 + V3\n- Resistance adds: Rtotal = R1 + R2 + R3\n- One break means whole circuit fails\n\nPARALLEL circuit:\n- Same voltage across all branches\n- Current splits: Itotal = I1 + I2 + I3\n- Resistance: 1 divided by Rtotal = 1/R1 + 1/R2 + 1/R3\n- One break means other branches still work\n- Used in household wiring" },
        { heading:"Power & Energy", body:"Power P equals rate of energy transfer.\nP = IV = I squared R = V squared divided by R\nUnit: Watt W\n\nElectrical Energy:\nE = Pt = IVt = I squared Rt\nUnit: Joule J\n1 kWh = 3,600,000 J = 3.6 MJ\n\nElectricity cost:\nCost equals Power in kW times Time in hours times tariff rate\n\nExample: A 2kW heater runs 3 hours at 50 naira per kWh.\nCost = 2 times 3 times 50 = 300 naira" },
        { heading:"JAMB Exam Tip", body:"Parallel resistance trap that JAMB loves:\nTwo 6 Ohm resistors in parallel:\n1 divided by Rtotal = 1/6 + 1/6 = 2/6 = 1/3\nRtotal = 3 Ohms (NOT 12 Ohms!)\n\nParallel always DECREASES total resistance.\nSeries always INCREASES total resistance.\n\nPower calculation:\nA bulb rated 60W at 240V. What current?\nI = P divided by V = 60 divided by 240 = 0.25 A\n\nWhat is its resistance?\nR = V divided by I = 240 divided by 0.25 = 960 Ohms" },
      ]
    },
    {
      id:"pl3", topic:"Waves & Light", icon:"🌊",
      title:"Waves, Light & Optics",
      duration:"8 min read", difficulty:"Intermediate",
      sections:[
        { heading:"Wave Properties", body:"Wavelength lambda: Distance between successive crests. Unit: metres\nFrequency f: Waves per second. Unit: Hertz Hz\nAmplitude A: Maximum displacement from equilibrium\nPeriod T: Time for one complete wave. T = 1 divided by f\nWave speed: v = f times lambda\n\nTransverse waves: oscillations perpendicular to direction of travel.\nExamples: Light, water waves, EM waves. Can be polarised.\n\nLongitudinal waves: oscillations parallel to travel direction.\nExamples: Sound waves, compression waves. Cannot be polarised." },
        { heading:"Reflection & Refraction", body:"REFLECTION:\n- Angle of incidence equals Angle of reflection measured from normal\n- Used in mirrors, periscopes, optical fibres\n\nREFRACTION:\nLight bends when changing speed between media.\nSnell's Law: n1 sin theta1 = n2 sin theta2\nRefractive index n = speed in vacuum divided by speed in medium\n\nDenser medium means slower speed and bends TOWARDS normal.\nLess dense means faster and bends AWAY from normal.\n\nTotal Internal Reflection: when angle exceeds critical angle. Used in optical fibres for internet cables." },
        { heading:"EM Spectrum", body:"In order of INCREASING frequency and DECREASING wavelength:\n\nRadio → Microwave → Infrared → Visible → UV → X-ray → Gamma\n\nAll travel at c = 3 times 10 to the power 8 metres per second in vacuum.\n\nUses:\n- Radio: broadcasting and communications\n- Microwave: cooking, satellite TV, radar\n- Infrared: TV remotes, thermal imaging\n- Visible: sight, photography\n- UV: sterilisation, detecting fake notes\n- X-ray: medical imaging, security scanners\n- Gamma: cancer treatment, sterilising food" },
        { heading:"JAMB Exam Tip", body:"Speed of sound vs light:\n- Sound: approximately 340 m/s in air and needs a medium\n- Light: 3 times 10 to the power 8 m/s in vacuum and needs no medium\n\nThis is why you see lightning before hearing thunder!\n\nLens types:\n- Convex (converging): thicker in middle. Used in magnifying glass, camera, eye.\n- Concave (diverging): thinner in middle. Used in glasses for short-sight.\n\nMirror types:\n- Concave: converging. Used in telescopes, car headlights, shaving mirrors.\n- Convex: diverging. Used in car rear-view mirrors for wider field of view." },
      ]
    },
  ],
}

export const SUBJECTS = [
  { id:"biology", label:"Biology", icon:"🧬", color:"#22c55e", accent:"#4ade80" },
  { id:"chemistry", label:"Chemistry", icon:"⚗️", color:"#f59e0b", accent:"#fbbf24" },
  { id:"physics", label:"Physics", icon:"⚛️", color:"#3b82f6", accent:"#60a5fa" },
]

export const ACHIEVEMENTS = [
  { id:"first_correct", icon:"⭐", title:"First Star", desc:"Get your first correct answer" },
  { id:"streak_5", icon:"🔥", title:"On Fire", desc:"5 question streak" },
  { id:"streak_10", icon:"💥", title:"Unstoppable", desc:"10 question streak" },
  { id:"perfect_quiz", icon:"💯", title:"Perfect 10", desc:"Score 10/10 in a session" },
  { id:"biology_10", icon:"🧬", title:"Bio Master", desc:"Score 10+ in Biology" },
  { id:"chemistry_10", icon:"⚗️", title:"Chem Master", desc:"Score 10+ in Chemistry" },
  { id:"physics_10", icon:"⚛️", title:"Phys Master", desc:"Score 10+ in Physics" },
  { id:"notes_reader", icon:"📚", title:"Scholar", desc:"Read 3 lesson notes" },
  { id:"social_post", icon:"📢", title:"Contributor", desc:"Post in the community" },
  { id:"quiz_10", icon:"🏆", title:"Veteran", desc:"Complete 10 quizzes" },
]

export const DAILY_FREE_LIMIT = 10
export const SUBSCRIPTION_PRICE = "$1"
export const SUBSCRIPTION_MONTHS = 6

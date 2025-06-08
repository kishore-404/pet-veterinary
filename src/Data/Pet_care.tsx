import Cat_1 from "../assets/images/petcare/stress_cat.png";
import Cat_2 from "../assets/images/petcare/five_sings.png";
import Cat_3 from "../assets/images/petcare/diabetes.png";
import Cat_4 from "../assets/images/petcare/debunked.png";

export interface PetCardType {
  title: string;
  sub_title: string;
  img: string;
  history?: string; // optional if some cards don’t have history
}
export type PetCareSection = {
  [key: string]: PetCardType; // card_1, card_2 etc
};

export const Pet_Care: Record<string, PetCareSection> = {
 cat: {
  card_1: {
    title: "Nutrition",
    sub_title: "Understanding Cat Dietary Needs",
    img: Cat_1,
    history:
      "Cats require a balanced diet rich in protein and essential nutrients. Learn how to choose the right food to keep your feline healthy and energetic.",
  },
  card_2: {
    title: "Health",
    sub_title: "Preventing Common Feline Diseases",
    img: Cat_2,
    history:
      "Early detection and prevention are key to managing feline diseases. Explore vaccination schedules and signs to watch for to keep your cat in top shape.",
  },
  card_3: {
    title: "Safety",
    sub_title: "Keeping Your Cat Safe Indoors",
    img: Cat_3,
    history:
      "Indoor cats face unique hazards at home. Identify common risks and learn safety tips to create a secure environment for your beloved pet.",
  },
  card_4: {
    title: "Behavior",
    sub_title: "Decoding Cat Body Language",
    img: Cat_4,
    history:
      "Cats communicate through subtle body signals. Master the art of reading their gestures to better understand your cat’s feelings and needs.",
  },
  card_5: {
    title: "Grooming",
    sub_title: "Essential Cat Grooming Tips",
    img: Cat_1,
    history:
      "Regular grooming prevents matting and promotes a healthy coat. Discover techniques and tools to make grooming a stress-free experience for both you and your cat.",
  },
  card_6: {
    title: "Enrichment",
    sub_title: "Stimulating Your Cat’s Mind",
    img: Cat_2,
    history:
      "Mental stimulation is vital for preventing boredom and destructive behaviors. Learn creative ways to keep your cat engaged and happy indoors.",
  },
  card_7: {
    title: "Litter Training",
    sub_title: "Tips for Successful Litter Habits",
    img: Cat_3,
    history:
      "Proper litter training ensures a clean home and happy cat. Understand best practices and troubleshoot common litter box issues effectively.",
  },
  card_8: {
    title: "Senior Care",
    sub_title: "Caring for Older Cats",
    img: Cat_4,
    history:
      "As cats age, their needs change. Learn how to adapt your care routine to support your senior cat’s health and comfort in their golden years.",
  },
},
dog: {
  card_1: {
    title: "Training",
    sub_title: "Housebreaking Your Puppy",
    img: Cat_1,
    history:
      "Potty training is a vital step in raising a well-behaved dog. Learn effective techniques and routines to housebreak your puppy with confidence.",
  },
  card_2: {
    title: "Behavior",
    sub_title: "Why Dogs Chew Everything",
    img: Cat_2,
    history:
      "Chewing is a natural canine behavior, but excessive chewing can signal boredom or anxiety. Discover ways to redirect this behavior to appropriate toys and outlets.",
  },
  card_3: {
    title: "Health",
    sub_title: "Early Signs of Hip Dysplasia",
    img: Cat_3,
    history:
      "Hip dysplasia can severely affect your dog’s mobility. Learn to recognize early symptoms and explore treatment options to keep your dog active and comfortable.",
  },
  card_4: {
    title: "Nutrition",
    sub_title: "Human Foods Safe for Dogs",
    img: Cat_4,
    history:
      "While many human foods are toxic to dogs, some can be healthy treats in moderation. Get the definitive guide on which foods are safe and which to avoid.",
  },
  card_5: {
    title: "Exercise",
    sub_title: "Creating a Balanced Workout Routine",
    img: Cat_1,
    history:
      "Regular exercise is essential for your dog's physical and mental health. Tailor a routine that fits your dog’s breed, age, and energy level for maximum benefits.",
  },
  card_6: {
    title: "Grooming",
    sub_title: "Maintaining Your Dog’s Coat",
    img: Cat_2,
    history:
      "Proper grooming keeps your dog’s coat shiny and skin healthy. Learn the best brushing, bathing, and trimming practices specific to your dog’s breed.",
  },
  card_7: {
    title: "Safety",
    sub_title: "Preventing Common Household Hazards",
    img: Cat_3,
    history:
      "Homes can hide many dangers for dogs. Identify common hazards and implement safety measures to protect your furry friend indoors and outdoors.",
  },
  card_8: {
    title: "Socialization",
    sub_title: "Introducing Your Dog to New Experiences",
    img: Cat_4,
    history:
      "Early and consistent socialization helps prevent behavioral problems. Discover techniques to expose your dog safely to people, animals, and environments.",
  },
},

parrot: {
  card_1: {
    title: "Communication",
    sub_title: "Understanding Parrot Body Language",
    img: Cat_1,
    history:
      "Parrots communicate through subtle gestures and postures. Learn to interpret their mood and needs through body signals.",
  },
  card_2: {
    title: "Diet",
    sub_title: "Top Foods to Keep Your Parrot Healthy",
    img: Cat_2,
    history:
      "A balanced diet rich in seeds, fruits, and vegetables is crucial for your parrot’s wellbeing. Discover which foods promote longevity and vibrant feathers.",
  },
  card_3: {
    title: "Behavior",
    sub_title: "Why Parrots Scream and How to Manage It",
    img: Cat_3,
    history:
      "Excessive screaming often signals boredom or distress. Explore effective strategies to reduce noise and keep your parrot mentally engaged.",
  },
  card_4: {
    title: "Enrichment",
    sub_title: "DIY Toys That Stimulate Parrot Intelligence",
    img: Cat_4,
    history:
      "Creating interactive toys encourages natural foraging and problem-solving skills. Find easy DIY ideas to keep your parrot sharp and entertained.",
  },
  card_5: {
    title: "Health",
    sub_title: "Recognizing Signs of Illness in Parrots",
    img: Cat_1,
    history:
      "Early detection is vital for treating parrot illnesses. Learn common symptoms and when to seek veterinary care to ensure your bird stays healthy.",
  },
  card_6: {
    title: "Housing",
    sub_title: "Designing a Safe and Comfortable Cage",
    img: Cat_2,
    history:
      "A well-designed cage supports your parrot’s physical and emotional health. Get tips on cage size, placement, and accessories for optimal living conditions.",
  },
  card_7: {
    title: "Training",
    sub_title: "Basic Commands and Tricks for Parrots",
    img: Cat_3,
    history:
      "Training enhances your parrot’s confidence and strengthens your bond. Discover step-by-step methods to teach basic commands and fun tricks.",
  },
  card_8: {
    title: "Social Needs",
    sub_title: "Building Trust with Your Parrot",
    img: Cat_4,
    history:
      "Parrots are social creatures requiring interaction and affection. Learn techniques to build trust and develop a rewarding relationship with your feathered friend.",
  },
},

hamster: {
  card_1: {
    title: "Habitat",
    sub_title: "Setting Up a Cozy Home for Your Hamster",
    img: Cat_1,
    history:
      "A proper hamster habitat includes ample bedding, hideouts, a running wheel, and chew toys to mimic their natural burrowing behavior.",
  },
  card_2: {
    title: "Diet",
    sub_title: "What Should Hamsters Eat Daily?",
    img: Cat_2,
    history:
      "Hamsters require a balanced diet of seeds, fresh vegetables, and occasional treats. Learn how to provide nutritious meals that support their health.",
  },
  card_3: {
    title: "Behavior",
    sub_title: "Understanding Hamster Sleep Patterns",
    img: Cat_3,
    history:
      "Hamsters are nocturnal creatures with unique sleep cycles. Discover how to accommodate their natural rhythms to ensure a happy pet.",
  },
  card_4: {
    title: "Care Tips",
    sub_title: "Keeping Your Hamster Stress-Free",
    img: Cat_4,
    history:
      "Stress in hamsters can lead to health issues. Explore ways to create a calm environment and recognize signs of distress early.",
  },
  card_5: {
    title: "Health",
    sub_title: "Common Hamster Illnesses to Watch For",
    img: Cat_1,
    history:
      "Early detection of illnesses like wet tail or respiratory infections is critical. Learn symptoms and treatment options to keep your hamster thriving.",
  },
  card_6: {
    title: "Exercise",
    sub_title: "Encouraging Physical Activity Safely",
    img: Cat_2,
    history:
      "Providing a running wheel and supervised playtime boosts your hamster’s health. Get tips on safe exercise routines to prevent obesity and boredom.",
  },
  card_7: {
    title: "Handling",
    sub_title: "How to Gently Handle Your Hamster",
    img: Cat_3,
    history:
      "Proper handling builds trust and prevents injury. Learn step-by-step methods to safely pick up and interact with your hamster.",
  },
  card_8: {
    title: "Breeding",
    sub_title: "Important Facts Before Breeding Hamsters",
    img: Cat_4,
    history:
      "Breeding hamsters requires careful preparation and understanding of genetics. Discover best practices to ensure the health of both parents and pups.",
  },
},

fish: {
  card_1: {
    title: "Aquarium",
    sub_title: "Perfect Tank Setup for Healthy Fish",
    img: Cat_1,
    history:
      "An ideal fish tank should have proper filtration, temperature control, and space according to species size and count. A well-cycled aquarium is essential.",
  },
  card_2: {
    title: "Feeding",
    sub_title: "How Often Should You Feed Your Fish?",
    img: Cat_2,
    history:
      "Proper feeding schedules vary by fish species. Learn to avoid overfeeding and maintain a clean tank for your aquatic friends’ wellbeing.",
  },
  card_3: {
    title: "Health",
    sub_title: "Identifying Common Fish Diseases",
    img: Cat_3,
    history:
      "Early recognition of diseases like ich, fin rot, and swim bladder disorder can save your fish. Discover symptoms and effective treatments.",
  },
  card_4: {
    title: "Compatibility",
    sub_title: "Which Fish Can Live Together Peacefully?",
    img: Cat_4,
    history:
      "Not all fish species coexist harmoniously. Understand species compatibility to create a balanced and stress-free community tank.",
  },
  card_5: {
    title: "Water Quality",
    sub_title: "Maintaining Optimal Water Conditions",
    img: Cat_1,
    history:
      "Regular testing and maintenance of pH, ammonia, and nitrate levels are crucial for fish health. Learn best practices for clean, safe aquarium water.",
  },
  card_6: {
    title: "Breeding",
    sub_title: "Tips for Successful Fish Breeding",
    img: Cat_2,
    history:
      "Breeding fish requires specific tank setups and conditions. Explore species-specific breeding behaviors and how to care for fry effectively.",
  },
  card_7: {
    title: "Lighting",
    sub_title: "Choosing the Right Lighting for Your Aquarium",
    img: Cat_3,
    history:
      "Proper lighting enhances fish colors and supports plant growth. Discover the types of aquarium lighting and how to set timers for a natural cycle.",
  },
  card_8: {
    title: "Decor",
    sub_title: "Safe and Stimulating Aquarium Decorations",
    img: Cat_4,
    history:
      "Aquarium decor should provide hiding spots and enrichment without harming fish. Learn about safe materials and creative decoration ideas.",
  },
},

other: {
  card_1: {
    title: "Care",
    sub_title: "Creating the Right Habitat for Exotic Pets",
    img: Cat_1,
    history:
      "From temperature to humidity, exotic pets like reptiles and amphibians need very specific habitat conditions to thrive. Here's how to set it up safely.",
  },
  card_2: {
    title: "Feeding",
    sub_title: "Safe Foods for Guinea Pigs & Rabbits",
    img: Cat_2,
    history:
      "Guinea pigs and rabbits have sensitive digestive systems. Learn which fresh vegetables, hay, and pellets make up a balanced diet for these furry friends.",
  },
  card_3: {
    title: "Behavior",
    sub_title: "Understanding Ferret Play & Sleep Cycles",
    img: Cat_3,
    history:
      "Ferrets have unique activity bursts and rest periods. Discover how their playful antics and sleep patterns impact their care and bonding with owners.",
  },
  card_4: {
    title: "Health",
    sub_title: "Signs of Illness in Small Mammals",
    img: Cat_4,
    history:
      "Small mammals can mask illness until serious. Learn early symptoms to watch for and when to seek veterinary care for rabbits, guinea pigs, and ferrets.",
  },
  card_5: {
    title: "Enrichment",
    sub_title: "Creating Stimulating Environments for Exotic Pets",
    img: Cat_1,
    history:
      "Mental stimulation is crucial for exotic pet wellbeing. Explore ideas for toys, tunnels, and climbing structures to keep your pet engaged and happy.",
  },
  card_6: {
    title: "Safety",
    sub_title: "Preventing Common Household Hazards",
    img: Cat_2,
    history:
      "Exotic pets can be vulnerable to toxins and accidents indoors. Identify potential dangers and how to create a safe living space for your unique companions.",
  },
  card_7: {
    title: "Handling",
    sub_title: "Best Practices for Handling Exotic Pets",
    img: Cat_3,
    history:
      "Proper handling reduces stress and injury risks. Learn gentle techniques tailored to reptiles, amphibians, and small mammals to build trust and safety.",
  },
  card_8: {
    title: "Breeding",
    sub_title: "Guidelines for Responsible Breeding of Exotic Pets",
    img: Cat_4,
    history:
      "Breeding exotic pets requires knowledge of species-specific needs and ethics. Understand preparation, care, and legal considerations before breeding.",
  },
}


};

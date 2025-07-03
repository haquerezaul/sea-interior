// Optional: override room labels or provide fixed display order if needed

export const ROOM_DISPLAY_NAMES: Record<string, string> = {
    "Living Room": "Living & Dining",
    "Bedroom 1": "Master Bedroom",
    "Bedroom 2": "Guest Bedroom",
    "Bedroom 3": "Kid’s Bedroom",
    "Bedroom 4": "Additional Bedroom",
  };
  
  export const STYLES: string[] = ["Modern", "Traditional", "Luxury"];
  
  // Optional: For controlling display order in furniture UI
  export const ROOM_ORDER: string[] = [
    "Living Room",
    "Kitchen",
    "Bedroom 1",
    "Bedroom 2",
    "Bedroom 3",
    "Bedroom 4",
    "Bathroom",
    "Others"
  ];
  
  // Optional: If any categories need to be excluded from estimate (e.g., optional freebies)
  export const EXCLUDED_CATEGORIES_FROM_QUOTE: string[] = ["Notes"];
  
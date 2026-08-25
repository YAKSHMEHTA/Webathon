// Ring order, not filename order. Art is dealt straight down this list, so
// entry n sits one slot along from n-1 and the column can count 01..18 as the
// carousel turns. Reordering these rows moves the ring, the column and the
// numbering together; nothing else needs touching.
//
// TODO: every `type` and `year` is placeholder. Names marked (*) are guesses
// at the subject — the artwork carries no wordmark to read them off.
export const PROJECTS = [
  { file: "public/Step-by-Step Guide_ How to Create the Perfect Treasure Hunt.jpeg", name: "Treasure Hunt", type: "Fun", year: "2026",},
  { file: "public/Ten Lesser-Known Lost Treasures of the World - Historic Mysteries.jpeg", name: "Treasure Hunt", type: "Fun", year: "2026",},
  { file: "public/Join other #entrepreneurs this weekend for the chance to get your idea fully #crowdfunded!! #Hackathon.jpeg", name: "Hackathon", type: "Tech", year: "2026",},
  { file: "public/_.jpeg", name: "Hackathon", type: "Tech", year: "2026",},
  { file: "public/_ (1).jpeg", name: "Free fire", type: "Esports", year: "2026",},
  { file: "public/Free fire thumbnail.jpeg", name: "Free Fire", type: "Esports", year: "2026",},
  { file: "public/Hiromi Higuruma - 4k pc wallpaper.jpeg", name: "CTF Event", type: "Tech", year: "2026",},
  { file: "public/ctf1.jpeg", name: "CTF EVENT", type:"Tech", year: "2026",},
  { file: "public/_ (2).jpeg", name: "Workshop", type: "Fun", year: "2026",},
  { file: "", name: "Workshop", type: "Fun", year: "2026",},
  
  
];

export const IMAGE_FILES = PROJECTS.map((p) => p.file);

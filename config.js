// Edit this file to change the site. Everything else reads from it.
// x / y = where the object sits on the home scene (in %). icon = an id in icons.svg.
// Each section's content lives in its own file: pages/<id>.html
window.SITE = {
  name: "Chico",
  tagline: "Blog Mathieu",
  avatar: "images/website/avatarv1.png",
  sections: [
    { id: "map",       title: "Map",       icon: "map",       x: 18, y: 24, sub: "Places I've been." },
    { id: "earphones", title: "Listening", icon: "earphones", x: 80, y: 22, sub: "What's in my ears." },
    { id: "camera",    title: "Photos",    icon: "camera",    x: 10, y: 74, sub: "Pictures worth keeping." },
    { id: "music",     title: "Music",     icon: "music",     x: 90, y: 62, sub: "Tracks I made or love." },
    { id: "notepad",   title: "Notepad",   icon: "notepad",   x: 68, y: 84, sub: "Notes and articles." }
  ]
};

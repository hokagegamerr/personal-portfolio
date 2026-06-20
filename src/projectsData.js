// Tribby is the featured project — shown separately above the grid.
// The rest go into the regular unit-card grid.

export const TRIBBY = {
  id: "tribby",
  unitId: "FT-00",
  title: "Tribby",
  tagline: "Financial tracker — shipped across three platforms",
  summary: "Budget tracking and cash-flow management built three times over: once for the web, once for Windows desktop, and once for Android. Same core idea, different runtimes.",
  details: "Tribby started as a React web app for tracking cash flow and spending thresholds with local state — no backend needed. I then rebuilt it as a native Windows desktop app in Python with a Tkinter GUI, and again as an Android app in Dart/Flutter. Shipping the same product across three platforms forced deliberate decisions about what each runtime does well.",
  platforms: [
    {
      label: "Web",
      stack: ["React", "JavaScript"],
      status: "live",
      link: "https://github.com/hokagegamerr/financial-tracker",
      linkLabel: "Source code",
    },
    {
      label: "Desktop",
      stack: ["Python", "Tkinter"],
      status: "live",
      link: "https://github.com/hokagegamerr/Tribby-Desktop-app/raw/main/dist/Tribby.exe",
      linkLabel: "Download .exe",
    },
    {
      label: "Android",
      stack: ["Dart", "Flutter"],
      status: "live",
      link: "https://github.com/hokagegamerr/Tribby-Phone-app/raw/main/build/app/outputs/flutter-apk/app-release.apk",
      linkLabel: "Download APK",
    },
  ],
};

export const PROJECTS_DATA = [
  {
    id: "memory-visualizer",
    unitId: "SYS-01",
    title: "Memory Allocation Visualizer",
    category: "systems",
    stack: ["Python", "Tkinter"],
    summary: "Simulates First-Fit, Best-Fit, and paging strategies to study memory fragmentation.",
    details: "Built to study internal and external fragmentation patterns in operating systems. Tracks memory blocks in real time, simulates process lifetime requests, and logs allocation and deallocation events inside a console-style interface.",
    spec: { type: "Desktop App", runtime: "Python 3", interface: "Tkinter GUI" },
    downloadLink: "/downloads/MemoryVisualizer.zip"
  },
  {
    id: "ticketing-service",
    unitId: "APP-02",
    title: "Concert Ticketing Platform",
    category: "applications",
    stack: ["PHP", "MySQL"],
    summary: "Live seat-reservation system with real-time availability checks and booking validation.",
    details: "A deployed ticketing application supporting open seating with server-side validation to prevent double bookings. Handles concurrent reservation requests against a synchronized backend.",
    spec: { type: "Web Application", status: "Deployed", database: "MySQL" },
    liveLink: "https://smticketsconcert.free.nf/pickconcert.php"
  },
  {
    id: "inventory-dbms",
    unitId: "SYS-03",
    title: "Inventory Management System",
    category: "systems",
    stack: ["MySQL", "PHP"],
    summary: "Normalized relational database with transaction-safe stock tracking.",
    details: "A full-stack inventory system built around a normalized relational schema. Implements one-to-many relationships, cascading references, and transaction-safe stock updates to prevent data anomalies.",
    spec: { type: "Database System", schema: "Normalized 3NF", integrity: "Transaction-safe" },
    liveLink: "https://inventorydatabase.free.nf"
  }
];
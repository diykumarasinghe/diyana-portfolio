export const portfolioData = {
  hero: {
    name: "I.D. Diyana Kumarasinghe",
    title: "Full-Stack Developer",
    subtitle: "Information Technology Undergraduate",
    description: "Passionate about building responsive, user-friendly, and scalable web applications using modern technologies.",
    cvUrl: "/I.D.Diyana_Hasandi_Kumarasinghe_CV.pdf", // Path to download CV button
    githubUrl: "https://github.com/diykumarasinghe",
    linkedinUrl: "https://www.linkedin.com/in/diyana-kumarasinghe-2794ab215/?skipRedirect=true",
    email: "diykumarasinghe14@gmail.com",
    availableForInternships: true,
  },
  about: {
    heading: "Passionate About Crafting Digital Experiences",
    description: "I am a Year 3 Information Technology undergraduate with a strong interest in full-stack development, frontend development, and backend technologies. I enjoy transforming ideas into real-world applications using clean UI designs and efficient backend logic.",
    additionalText: "My technical experience includes working with React.js, Node.js, Express.js, MongoDB, Spring Boot, and MySQL. Through academic and personal projects, I have developed strong skills in frontend development, backend development, REST API design, database management, and responsive user interface design.",
    focusAreas: [
      {
        title: "Full-Stack Development",
        subtitle: "Web Applications",
        icon: "laptop",
        color: "from-blue-500 to-cyan-500",
      },
      {
        title: "MERN & Spring Boot Apps",
        subtitle: "Collaborative & Solo Products",
        icon: "rocket",
        color: "from-purple-500 to-pink-500",
      },
      {
        title: "Currently Studying",
        subtitle: "BSc (Hons) in IT - Year 3",
        icon: "sprout",
        color: "from-purple-500 to-pink-500",
      }
    ]
  },
  education: {
    degree: "BSc (Hons) in Information Technology",
    specialization: "Specializing in Information Technology",
    institute: "Sri Lanka Institute of Information Technology (SLIIT)",
    duration: "Year 3 Semester 2",
    status: "Active",
  },
  skills: [
    {
      category: "Programming Languages",
      items: ["Java", "JavaScript", "C", "C++", "Kotlin"],
      color: "border-cyan-500",
      textColor: "text-cyan-400"
    },
    {
      category: "Frontend Development",
      items: ["React.js", "HTML", "CSS", "JavaScript", "Tailwind CSS"],
      color: "border-purple-500",
      textColor: "text-purple-400"
    },
    {
      category: "Backend Development",
      items: ["Node.js", "Express.js", "Spring Boot", "REST APIs", "JWT Authentication"],
      color: "border-emerald-500",
      textColor: "text-emerald-400"
    },
    {
      category: "Databases",
      items: ["MongoDB", "MySQL", "SQLite", "MongoDB Atlas"],
      color: "border-orange-500",
      textColor: "text-orange-400"
    },
    {
      category: "Tools & Technologies",
      items: ["Git", "GitHub", "Postman", "VS Code", "Android Studio", "Vite", "MERN Stack"],
      color: "border-pink-500",
      textColor: "text-pink-400"
    }
  ],
  projects: [
    {
      id: "back2u",
      title: "Back2U – Smart Lost & Found Management System",
      type: "MERN Project",
      tech: ["MERN Stack", "MongoDB", "Express", "React", "Node.js"],
      shortDesc: "A smart lost and found platform with item reporting, search, matching suggestions, and claim management.",
      githubUrl: "https://github.com/chamodhlv/IT3040-ITPM-Back2U-WD_21_1.2",
      linkedinUrl: "https://www.linkedin.com/posts/diyana-kumarasinghe-2794ab215_sliit-mern-mongodb-ugcPost-7465681223978254336-yaMD/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZbNb0B4uwqtQHe5jQYkv6p1pXx7I670Z0",
      liveDemoUrl: "https://back2u-demo.netlify.app", // Mock demo link
      details: {
        problem: "University campuses lack a centralized and automated mechanism to track and matches lost items, leading to prolonged recovery times.",
        solution: "Developed Back2U, a full-stack platform featuring advanced text search, categorization, and item similarity matching algorithms to notify users of potential matches instantly.",
        role: "Lead Full-Stack Developer",
        contributions: [
          "Designed the primary MongoDB schema and indexes to optimize text searches.",
          "Implemented the similarity matching logic in Node.js that checks category, location, and description keywords.",
          "Built a responsive React interface with interactive forms, reporting dashboards, and status trackers."
        ],
        challenges: "Handling real-time image uploads for lost items without impacting database response times. Resolved by using cloud storage integration with lazy loading on the frontend."
      }
    },
    {
      id: "smart-campus",
      title: "Smart Campus Operations Hub",
      type: "Full-Stack Project",
      tech: ["Spring Boot", "React", "MongoDB", "REST API", "MySQL"],
      shortDesc: "A campus management system for handling resources, bookings, tickets, and KPI-based ticket lifecycle tracking.",
      githubUrl: "https://github.com/chamodhlv/it3030-paf-2026-smart-campus-group-Y3S1-WD-17",
      linkedinUrl: "https://www.linkedin.com/posts/diyana-kumarasinghe-2794ab215_sliit-paf-springboot-ugcPost-7465679991154872321-FRL8/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZbNb0B4uwqtQHe5jQYkv6p1pXx7I670Z0",
      liveDemoUrl: "https://smart-campus-demo.netlify.app",
      details: {
        problem: "Managing physical resource booking and campus maintenance issues manually leads to double-bookings and slow ticket response rates.",
        solution: "Designed a centralized Spring Boot dashboard enabling real-time slot bookings and tracking maintenance ticket lifecycles based on key performance indicators (KPIs).",
        role: "Backend & Integration Developer",
        contributions: [
          "Developed robust Java Spring Boot REST API endpoints for user authorization and bookings.",
          "Engineered the database layer incorporating MySQL transactional queries for booking slots, preventing race conditions.",
          "Integrated dashboard panels reflecting Time to First Response, Time to Resolve, and Time to Close metrics."
        ],
        challenges: "Managing concurrency on resource booking during peak college registration hours. Resolved using database isolation levels and pessimistic locking."
      }
    },
    {
      id: "cinnex",
      title: "Cinnex – Cinnamon Plantation Management",
      type: "MERN Project",
      tech: ["MERN Stack", "MongoDB", "React", "Node.js"],
      shortDesc: "A plantation management system where I contributed to the Issues and Response Management module.",
      githubUrl: "https://github.com/uduladapsara/ITP---cinnex",
      linkedinUrl: "https://www.linkedin.com/posts/diyana-kumarasinghe-2794ab215_cinnex-itp-cinnamonplantation-ugcPost-7467514861535735809-qM1y/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZbNb0B4uwqtQHe5jQYkv6p1pXx7I670Z0",
      liveDemoUrl: "https://cinnex-demo.netlify.app",
      details: {
        problem: "Agricultural plantation managers face disconnects reporting crop issues, delay in response execution, and lack of historical resolution logs.",
        solution: "Built a customized plantation management panel to log issues, track supervisor assignments, and provide step-by-step resolution reporting.",
        role: "Frontend Developer (Issues & Response Module)",
        contributions: [
          "Engineered dynamic forms for field supervisors to log pest infestations, soil problems, and weather damage with visual markers.",
          "Designed response logs detailing inventory utilization (fertilizers, pesticides used) and labor hours spent.",
          "Wrote automated notification triggers for field administrators upon high-priority issue logging."
        ],
        challenges: "Offline capabilities for supervisors working in areas of low cellular connectivity. Resolved using local storage data queuing and background synchronization upon reconnect."
      }
    },
    {
      id: "habit-tracker",
      title: "HabitTracker",
      type: "Mobile App",
      tech: ["Kotlin", "SQLite", "Android Studio"],
      shortDesc: "A mobile application for tracking daily habits and improving personal productivity.",
      githubUrl: "https://github.com/diykumarasinghe/HabitTracker",
      linkedinUrl: "https://www.linkedin.com/posts/diyana-kumarasinghe-2794ab215_sliit-androiddevelopment-kotlin-ugcPost-7465678982999470080-16_E/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZbNb0B4uwqtQHe5jQYkv6p1pXx7I670Z0",
      liveDemoUrl: "https://play.google.com/store", // Mock App Store demo link
      details: {
        problem: "Users struggle to form habits due to lack of visual analytics, reminders, and daily streak tracking.",
        solution: "A lightweight native Android application built in Kotlin that stores data locally in SQLite, presenting visual calendar streaks and charts.",
        role: "Solo Android Developer",
        contributions: [
          "Designed the Android user interface using XML and custom Material widgets for theme toggles.",
          "Created local SQLite helper layers to log daily completions, streaks, and historical metrics.",
          "Implemented local notification alarms utilizing Android AlarmManager to trigger gentle habit reminders."
        ],
        challenges: "Optimizing memory consumption for background reminders. Addressed by utilizing JobScheduler and WorkManager APIs, restricting activity wakeups."
      }
    },
    {
      id: "fintrack",
      title: "FinTrack – Personal Finance Tracker",
      type: "MERN Project",
      tech: ["MERN Stack", "JWT", "MongoDB"],
      shortDesc: "A finance tracking system with income, expense, budget, and dashboard features.",
      githubUrl: "https://github.com/diykumarasinghe/fintrack-personal",
      linkedinUrl: "https://www.linkedin.com/in/diyana-kumarasinghe-2794ab215/?skipRedirect=true",
      liveDemoUrl: "https://fintrack-demo.netlify.app",
      details: {
        problem: "Users often overspend because they lack real-time visual warnings of budget limits and categorised expense histories.",
        solution: "Designed FinTrack, a secure portal incorporating JWT verification, allowing users to categorize expenses, log incomes, set dynamic category limits, and view spending breakdowns.",
        role: "Full-Stack Developer",
        contributions: [
          "Wrote secure authorization middleware using JSON Web Tokens (JWT) and Bcrypt hashing.",
          "Constructed responsive analytical dashboard charts showing expense breakdowns (Food, Transport, Utilities).",
          "Implemented automated monthly reset triggers and transaction search query filters."
        ],
        challenges: "Securing token persistence on the client-side. Resolved by storing JWT in HTTP-Only cookies to mitigate cross-site scripting (XSS) attacks."
      }
    }
  ],
  certificates: [
    {
      title: "MongoDB Atlas Administrator Path",
      issuer: "MongoDB Inc.",
      skillsEarned: ["MongoDB", "Cloud Database", "NoSQL", "Database Security"],
      date: "2025"
    }
  ],
  contact: {
    email: "diykumarasinghe14@gmail.com",
    phone: "0767270603",
    linkedin: "https://www.linkedin.com/in/diyana-kumarasinghe-2794ab215/?skipRedirect=true",
    github: "https://github.com/diykumarasinghe",
  }
};

// Default Portfolio Configuration
const portfolioConfig = {
  profile: {
    name: "Dadi Sri Lakshmi Sivani",
    title: "Data Science & AI Engineer",
    email: "dadisrilakshmisivani@gmail.com",
    phone: "+91 8330989599",
    location: "Vijayawada, India",
    github: "https://github.com/", // Placeholder since exact URL wasn't in PDF, user can customize
    linkedin: "https://linkedin.com/", 
    leetcode: "https://leetcode.com/",
    codechef: "https://codechef.com/",
    resumeUrl: "#", // User can link their PDF
    avatarUrl: "", // Empty for a generated beautiful SVG/initials letter avatar
    summary: "Seeking an opportunity to start my career in a professional environment where I can apply my skills and knowledge effectively. Eager to learn new technologies, improve my abilities, and contribute to the growth of the organization through hard work and dedication."
  },
  education: [
    {
      institution: "Prasad V Potluri Siddhartha Institute of Technology",
      location: "Vijayawada",
      degree: "B.Tech in Computer Science and Engineering (Data Science)",
      duration: "2023 – Present",
      metrics: "CGPA: 9.68/10"
    }
  ],
  skills: [
    { name: "Python", category: "Programming Languages", icon: "code-2" },
    { name: "Java", category: "Programming Languages", icon: "code" },
    { name: "SQL", category: "Programming Languages", icon: "database" },
    { name: "Data Structures & Algorithms", category: "Core CS Concepts", icon: "binary" },
    { name: "OOP", category: "Core CS Concepts", icon: "box" },
    { name: "DBMS", category: "Core CS Concepts", icon: "database-backup" },
    { name: "Computer Networks", category: "Core CS Concepts", icon: "globe" },
    { name: "Node.js", category: "Backend Development", icon: "server" },
    { name: "Express.js", category: "Backend Development", icon: "cpu" },
    { name: "RESTful APIs", category: "Backend Development", icon: "webhook" },
    { name: "MySQL", category: "Databases", icon: "database" },
    { name: "MongoDB", category: "Databases", icon: "layers" },
    { name: "NumPy", category: "Libraries & Frameworks", icon: "bar-chart-3" },
    { name: "Pandas", category: "Libraries & Frameworks", icon: "table" },
    { name: "Matplotlib", category: "Libraries & Frameworks", icon: "pie-chart" },
    { name: "Seaborn", category: "Libraries & Frameworks", icon: "line-chart" },
    { name: "Git", category: "Tools & Platforms", icon: "git-branch" },
    { name: "GitHub", category: "Tools & Platforms", icon: "github" },
    { name: "VS Code", category: "Tools & Platforms", icon: "terminal" },
    { name: "Google Colab", category: "Tools & Platforms", icon: "book-open" },
    { name: "Power BI", category: "Tools & Platforms", icon: "trending-up" }
  ],
  experience: [
    {
      role: "Infosys SpringBoard Virtual Intern",
      company: "Infosys",
      duration: "Feb 2026 – April 2026",
      location: "Remote",
      link: "https://github.com/",
      bullets: [
        "Collected military and economic data through web scraping from multiple sources to build a comprehensive dataset.",
        "Consolidated and structured data covering 140+ countries, enabling large-scale analysis of global defense capabilities.",
        "Performed comparative analysis of nations to evaluate military strength, identify trends, and support insights on power rankings and coalition capabilities."
      ],
      techStack: ["Python", "Pandas", "NumPy", "BeautifulSoup", "Power BI", "GitHub"]
    }
  ],
  projects: [
    {
      title: "California Housing Analytics Dashboard",
      platform: "Power BI",
      link: "https://github.com/",
      bullets: [
        "Developed an interactive Power BI dashboard to analyze housing trends across major cities, leveraging EDA, data modeling, and visualization techniques to extract actionable insights.",
        "Performed data cleaning and transformation using Power Query, improving data quality and enabling accurate KPI tracking for metrics such as income, population, and housing prices.",
        "Designed dynamic visualizations (bar charts, maps, slicers) to uncover relationships between income, housing age, and property values, enhancing data-driven decision-making.",
        "Optimized dashboard performance and usability by applying efficient data modeling and query optimization, ensuring smooth user interaction and scalability."
      ],
      techStack: ["Power BI", "Power Query", "EDA", "Data Modeling"]
    },
    {
      title: "AI-Powered Security Alert Analysis & Assistant",
      platform: "Python & RAG",
      link: "https://github.com/",
      bullets: [
        "Developed a cybersecurity-focused AI assistant using Python, implementing secure coding practices, input validation, and controlled data handling for safe processing of sensitive security logs.",
        "Architected a RAG-based pipeline using vector embeddings (ChromaDB) and built a modular backend system with error handling, improving system reliability, scalability, and reducing hallucinations.",
        "Automated alert analysis workflows, enabling accurate threat analysis and improving response efficiency."
      ],
      techStack: ["Python", "ChromaDB", "LLM APIs", "RAG", "PDF/CSV Parsing"]
    }
  ],
  certifications: [
    { name: "Smart Interviews Problem-Solving Program", authority: "Diamond Certification" },
    { name: "Foundations of R Software", authority: "Silver + Elite (NPTEL)" },
    { name: "Design and Analysis of Algorithms", authority: "Elite (NPTEL)" }
  ],
  achievements: [
    { text: "Recipient of the Reliance Merit Scholarship, awarded to the top 1,500 students nationwide." },
    { text: "Won 1st Place among 20+ teams in a 12-hour LLM & RAG Hackathon." },
    { text: "Earned Diamond Certification and recognition as a Smart Coder from Smart Interviews." },
    { text: "Won 1st Prize among 50+ teams at National Level Tech Fest SITAR 2K25." },
    { text: "Active National Service Scheme (NSS) Volunteer contributing to social impact initiatives." }
  ],
  themes: [
    {
      id: "violet",
      name: "Electric Violet",
      primary: "hsla(263, 90%, 60%, 1)",
      accent: "hsla(320, 90%, 60%, 1)",
      gradient: "linear-gradient(135deg, hsla(263, 90%, 60%, 1) 0%, hsla(320, 90%, 60%, 1) 100%)",
      glow: "rgba(139, 92, 246, 0.4)",
      bg: "#0a0714",
      cardBg: "rgba(22, 17, 36, 0.7)"
    },
    {
      id: "cyan",
      name: "Cyberpunk Mint",
      primary: "hsla(180, 100%, 50%, 1)",
      accent: "hsla(280, 100%, 60%, 1)",
      gradient: "linear-gradient(135deg, hsla(180, 100%, 50%, 1) 0%, hsla(280, 100%, 60%, 1) 100%)",
      glow: "rgba(6, 182, 212, 0.4)",
      bg: "#030c14",
      cardBg: "rgba(12, 28, 48, 0.7)"
    },
    {
      id: "sunset",
      name: "Sunset Glow",
      primary: "hsla(20, 100%, 55%, 1)",
      accent: "hsla(340, 100%, 55%, 1)",
      gradient: "linear-gradient(135deg, hsla(20, 100%, 55%, 1) 0%, hsla(340, 100%, 55%, 1) 100%)",
      glow: "rgba(249, 115, 22, 0.4)",
      bg: "#120703",
      cardBg: "rgba(33, 17, 12, 0.7)"
    },
    {
      id: "emerald",
      name: "Emerald Forest",
      primary: "hsla(150, 90%, 45%, 1)",
      accent: "hsla(200, 90%, 50%, 1)",
      gradient: "linear-gradient(135deg, hsla(150, 90%, 45%, 1) 0%, hsla(200, 90%, 50%, 1) 100%)",
      glow: "rgba(16, 185, 129, 0.4)",
      bg: "#020f08",
      cardBg: "rgba(10, 31, 20, 0.7)"
    }
  ],
  selectedTheme: "violet"
};

export default portfolioConfig;

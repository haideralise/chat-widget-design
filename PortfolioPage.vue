<template>
  <div class="demo-page bg-grid">

    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0b]/80 backdrop-blur-lg border-b border-[#242428]">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <a href="#" class="text-xl font-bold gradient-text no-underline">HA</a>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#about" @click.prevent="scrollTo('about')" class="text-gray-400 hover:text-white transition-colors no-underline text-sm">About</a>
            <a href="#projects" @click.prevent="scrollTo('projects')" class="text-gray-400 hover:text-white transition-colors no-underline text-sm">Projects</a>
            <a href="#skills" @click.prevent="scrollTo('skills')" class="text-gray-400 hover:text-white transition-colors no-underline text-sm">Skills</a>
            <a href="#contact" @click.prevent="scrollTo('contact')" class="text-gray-400 hover:text-white transition-colors no-underline text-sm">Contact</a>
          </div>
          <div class="flex items-center space-x-2">
            <span class="w-2 h-2 bg-green-500 rounded-full pulse-dot"></span>
            <span class="text-sm text-gray-400">Available for work</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <div class="inline-flex items-center space-x-2 bg-[#1a1a1d] border border-[#242428] rounded-full px-4 py-2">
              <span class="w-2 h-2 bg-[#00d4ff] rounded-full"></span>
              <span class="text-sm mono text-gray-400">Senior Full-Stack Developer</span>
            </div>
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Hi, I'm <span class="gradient-text">Haider Ali</span>
            </h1>
            <p class="text-xl text-gray-400 leading-relaxed max-w-lg">
              8+ years building scalable SaaS platforms with <span class="text-[#00d4ff]">Laravel</span> & <span class="text-[#a855f7]">Vue.js</span>. Turning complex business logic into elegant, maintainable code.
            </p>
            <div class="flex flex-wrap gap-4 pt-4">
              <a href="#contact" @click.prevent="scrollTo('contact')" class="inline-flex items-center px-6 py-3 bg-[#00d4ff] text-[#0a0a0b] font-semibold rounded-lg hover:bg-[#00d4ff]/90 transition-all glow-cyan no-underline text-sm">
                <span>Let's Talk</span>
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a href="https://github.com/haideralise" target="_blank" class="inline-flex items-center px-6 py-3 bg-[#1a1a1d] border border-[#242428] rounded-lg hover:border-gray-500 transition-all no-underline text-white text-sm">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <!-- Profile Photo -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <div class="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-[#242428] shadow-2xl">
                <img src="/profile.png" alt="Haider Ali" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 px-6 border-y border-[#242428]">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-4xl font-bold gradient-text">{{ stat.value }}</div>
            <div class="text-gray-400 mt-1 text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h2 class="text-3xl md:text-4xl font-bold">
              Building <span class="gradient-text">SaaS Products</span> That Scale
            </h2>
            <div class="space-y-4 text-gray-400 leading-relaxed">
              <p>I specialize in transforming complex business requirements into clean, maintainable Laravel applications. From multi-tenant architectures to real-time APIs, I build systems designed for growth.</p>
              <p>My experience spans AI-powered customer service platforms, media buying dashboards, worker engagement systems, and enterprise analytics tools — all built with modern PHP and JavaScript.</p>
              <p>I believe in writing code that other developers can understand, test, and extend. Clean architecture, comprehensive testing, and clear documentation are non-negotiable.</p>
            </div>
            <div class="flex flex-wrap gap-3 pt-4">
              <span class="skill-tag px-4 py-2 rounded-full text-sm">SaaS Architecture</span>
              <span class="skill-tag px-4 py-2 rounded-full text-sm">API Development</span>
              <span class="skill-tag px-4 py-2 rounded-full text-sm">AI Integration</span>
              <span class="skill-tag px-4 py-2 rounded-full text-sm">Twilio/SMS</span>
            </div>
          </div>
          <div class="bg-[#121214] border border-[#242428] rounded-2xl p-8 space-y-6">
            <h3 class="text-xl font-semibold text-white">What I Bring</h3>
            <div class="space-y-4">
              <div v-for="item in whatIBring" :key="item.title" class="flex items-start space-x-4">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" :class="item.bgClass">
                  <i :class="item.icon" class="text-sm" :style="{ color: item.color }"></i>
                </div>
                <div>
                  <h4 class="font-medium text-white text-sm">{{ item.title }}</h4>
                  <p class="text-gray-400 text-sm">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 px-6 bg-[#121214]/50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Featured <span class="gradient-text">Projects</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto">
            A selection of SaaS platforms and applications I've built or contributed to significantly.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="project in projects" :key="project.name" class="project-card rounded-2xl p-6 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium px-3 py-1 rounded-full" :class="project.badgeClass">{{ project.badge }}</span>
              <a :href="project.url" target="_blank" class="text-gray-400 hover:text-white transition-colors no-underline">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>
            </div>
            <h3 class="text-xl font-semibold text-white">{{ project.name }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">{{ project.desc }}</p>
            <div class="flex flex-wrap gap-2 pt-2">
              <span v-for="tag in project.tags" :key="tag" class="text-xs bg-[#242428] px-2 py-1 rounded text-gray-300">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Tech <span class="gradient-text">Stack</span></h2>
          <p class="text-gray-400 max-w-2xl mx-auto">Tools and technologies I use to build modern web applications.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="cat in skillCategories" :key="cat.title" class="bg-[#121214] border border-[#242428] rounded-2xl p-6 space-y-6">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="cat.bgClass">
                <i :class="cat.icon" :style="{ color: cat.color }"></i>
              </div>
              <h3 class="text-lg font-semibold">{{ cat.title }}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in cat.skills" :key="skill" class="skill-tag px-3 py-2 rounded-lg text-sm">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 px-6 bg-[#121214]/50">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Let's <span class="gradient-text">Work Together</span></h2>
        <p class="text-gray-400 mb-12 max-w-2xl mx-auto">
          Available for freelance projects, contract work, and consulting. Let's discuss how I can help build your next product.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="mailto:se.haiderali@gmail.com" class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#00d4ff] text-[#0a0a0b] font-semibold rounded-xl hover:bg-[#00d4ff]/90 transition-all glow-cyan no-underline text-sm">
            <i class="fa-solid fa-envelope mr-2"></i> Email Me
          </a>
          <a href="https://www.upwork.com/freelancers/~01a04f704633ce2f72" target="_blank" class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#10b981] text-[#0a0a0b] font-semibold rounded-xl hover:bg-[#10b981]/90 transition-all glow-green no-underline text-sm">
            <i class="fa-solid fa-briefcase mr-2"></i> Hire on Upwork
          </a>
        </div>

        <div class="flex items-center justify-center space-x-6">
          <a href="https://github.com/haideralise" target="_blank" class="text-gray-400 hover:text-white transition-colors">
            <i class="fa-brands fa-github text-lg"></i>
          </a>
          <a href="https://www.linkedin.com/in/haider-ali-mirza-92670996/" target="_blank" class="text-gray-400 hover:text-white transition-colors">
            <i class="fa-brands fa-linkedin text-lg"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-6 border-t border-[#242428]">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div class="text-gray-400 text-sm">&copy; 2026 Haider Ali. Built with Laravel & Vue.js expertise.</div>
        <div class="flex items-center space-x-2 text-gray-400 text-sm">
          <span class="w-2 h-2 bg-green-500 rounded-full pulse-dot"></span>
          <span>Available for hire</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '$24K', label: 'Upwork Earnings' },
  { value: '100%', label: 'Job Success' },
]

const whatIBring = [
  { title: 'Production-Ready Code', desc: 'Tested, documented, and built for scale from day one.', icon: 'fa-solid fa-circle-check', color: '#00d4ff', bgClass: 'bg-[#00d4ff]/10' },
  { title: 'Fast Delivery', desc: 'Efficient workflows. Clear communication. No surprises.', icon: 'fa-solid fa-bolt', color: '#a855f7', bgClass: 'bg-[#a855f7]/10' },
  { title: 'Team Player', desc: 'Integrates smoothly with existing teams and codebases.', icon: 'fa-solid fa-users', color: '#10b981', bgClass: 'bg-[#10b981]/10' },
]

const projects = [
  {
    name: 'ReplyAgent',
    badge: 'AI SaaS',
    badgeClass: 'bg-[#00d4ff]/10 text-[#00d4ff]',
    url: 'https://replyagent.com',
    desc: 'AI-powered customer service automation platform. Built core features including Twilio SMS integration, OpenAI response generation, multi-tenant architecture, and real-time messaging.',
    tags: ['Laravel', 'Vue.js', 'Twilio', 'OpenAI'],
  },
  {
    name: 'Brax.io',
    badge: 'Ad Tech',
    badgeClass: 'bg-[#a855f7]/10 text-[#a855f7]',
    url: 'https://console.brax.io/login',
    desc: 'Media buying platform with multi-tenant workspace architecture. Implemented campaign management, real-time analytics dashboards, and cross-platform ad network integrations.',
    tags: ['Laravel', 'Vue.js', 'MySQL', 'Redis'],
  },
  {
    name: 'Ulula',
    badge: 'Enterprise',
    badgeClass: 'bg-[#10b981]/10 text-[#10b981]',
    url: 'https://app.ulula.app/login',
    desc: 'Worker engagement and supply chain transparency platform. Built survey systems, multi-language support, role-based access control, and enterprise reporting features.',
    tags: ['Laravel', 'Vue.js', 'PostgreSQL', 'AWS'],
  },
  {
    name: 'Looper Insights',
    badge: 'Analytics',
    badgeClass: 'bg-[#eab308]/10 text-[#eab308]',
    url: 'https://console.app.looperinsights.com',
    desc: 'Advertising analytics platform with real-time data visualization. Implemented multi-tenant dashboards, Stripe billing integration, and automated reporting systems.',
    tags: ['Laravel', 'Vue.js', 'Stripe', 'Charts'],
  },
]

const skillCategories = [
  {
    title: 'Backend',
    icon: 'fa-solid fa-server',
    color: '#00d4ff',
    bgClass: 'bg-[#00d4ff]/10',
    skills: ['PHP 8+', 'Laravel 10/11', 'MySQL', 'PostgreSQL', 'Redis', 'REST APIs', 'GraphQL'],
  },
  {
    title: 'Frontend',
    icon: 'fa-solid fa-desktop',
    color: '#a855f7',
    bgClass: 'bg-[#a855f7]/10',
    skills: ['Vue.js 3', 'React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Inertia.js'],
  },
  {
    title: 'Tools & Services',
    icon: 'fa-solid fa-puzzle-piece',
    color: '#10b981',
    bgClass: 'bg-[#10b981]/10',
    skills: ['Twilio', 'OpenAI', 'Stripe', 'AWS', 'Docker', 'Git', 'CI/CD'],
  },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.demo-page {
  min-height: 100vh;
  background: #0a0a0b;
  color: #f3f4f6;
  -webkit-font-smoothing: antialiased;
}

.mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

/* Grid background */
.bg-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glow effects */
.glow-cyan { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
.glow-green { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }

/* Project cards */
.project-card {
  background: linear-gradient(135deg, #1a1a1d 0%, #121214 100%);
  border: 1px solid #2d2d32;
  transition: all 0.3s ease;
}
.project-card:hover {
  border-color: #00d4ff;
  transform: translateY(-4px);
  box-shadow: 0 10px 40px rgba(0, 212, 255, 0.1);
}

/* Skill tags */
.skill-tag {
  background: linear-gradient(135deg, #1a1a1d 0%, #242428 100%);
  border: 1px solid #3d3d42;
  transition: all 0.2s ease;
  color: #d1d5db;
}
.skill-tag:hover {
  border-color: #00d4ff;
  background: linear-gradient(135deg, #1a1a1d 0%, #0a0a0b 100%);
}

/* Pulse animation */
@keyframes pulse-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.pulse-dot {
  animation: pulse-glow 2s ease-in-out infinite;
}
</style>

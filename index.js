/* -------------------------------------------------------------
 * Aurora AI Hub - JavaScript Core Controller
 * Handles glassmorphic dashboard interactivity, animations and data matrices
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. DATA CENTER (模型与评测数据库)
  // ==========================================
  const defaultModels = [
    {
      id: 'gpt-5-5-pro',
      name: 'GPT-5.5 Pro',
      developer: 'OpenAI',
      tag: 'OpenAI',
      logoChar: '5',
      logoBg: 'linear-gradient(135deg, #10a37f, #075f49)',
      mmlu: 94.8,
      gpqa: 82.5,
      humaneval: 98.2,
      gsm8k: 99.2,
      math: 96.5,
      alignbench: 96.0,
      lmsys: 98.2,
      superclue: 95.5,
      parameters: '闭源官方',
      context: '256k',
      cost: '$8 / M tokens',
      description: 'OpenAI 于2026年中发布的超强闭源旗舰推理模型。全面重构了数理图谱（AIME）与逻辑召回，应对超长长程自主 Agent 工作流的精确度行业第一。'
    },
    {
      id: 'claude-4-8-opus',
      name: 'Claude 4.8 Opus',
      developer: 'Anthropic',
      tag: 'Anthropic',
      logoChar: 'C',
      logoBg: 'linear-gradient(135deg, #d97706, #a15203)',
      mmlu: 93.6,
      gpqa: 79.4,
      humaneval: 97.8,
      gsm8k: 98.8,
      math: 95.2,
      alignbench: 94.8,
      lmsys: 97.5,
      superclue: 94.0,
      parameters: '闭源官方',
      context: '200k',
      cost: '$5 / M tokens',
      description: 'Anthropic 于2026年5月28日震撼发布的顶尖旗舰。针对高自主性 Agent 工作流、多步复杂代码工程（SWE-bench）及专业学术分析做出极限对齐，在多项硬核指标上全面登顶。'
    },
    {
      id: 'deepseek-v4-pro',
      name: 'DeepSeek V4-Pro',
      developer: 'DeepSeek',
      tag: 'China',
      logoChar: '4',
      logoBg: 'linear-gradient(135deg, #1d4ed8, #172554)',
      mmlu: 92.5,
      gpqa: 78.2,
      humaneval: 96.8,
      gsm8k: 98.2,
      math: 95.8,
      alignbench: 95.0,
      lmsys: 96.8,
      superclue: 94.8,
      parameters: '开源MoE旗舰',
      context: '256k',
      cost: '开源/极低 API',
      description: 'DeepSeek 2026年最新MoE超级旗舰，在极限逻辑深度（GPQA Diamond）以及自动化代码重构测试中，以百分之一的运行成本与海外最强闭源平起平坐。'
    },
    {
      id: 'deepseek-r1',
      name: 'DeepSeek-R1 (推理旗舰)',
      developer: 'DeepSeek',
      tag: 'China',
      logoChar: 'R',
      logoBg: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      mmlu: 90.5,
      gpqa: 74.3,
      humaneval: 95.8,
      gsm8k: 97.8,
      math: 94.8,
      alignbench: 92.8,
      lmsys: 95.2,
      superclue: 91.8,
      parameters: '671B (开源MoE)',
      context: '128k',
      cost: '开源/低廉 API',
      description: 'DeepSeek 现象级推理大模型迭代版。通过大规模强化学习自发形成思考链，竞赛数学（AIME）与代码测试逼近 GPT-5-Reasoning 表现。'
    },
    {
      id: 'gemini-3-1-pro',
      name: 'Gemini 3.1 Pro',
      developer: 'Google',
      tag: 'Google',
      logoChar: '3',
      logoBg: 'linear-gradient(135deg, #4f46e5, #1e1b4b)',
      mmlu: 91.8,
      gpqa: 72.8,
      humaneval: 92.0,
      gsm8k: 96.5,
      math: 85.8,
      alignbench: 90.5,
      lmsys: 94.8,
      superclue: 90.8,
      parameters: '闭源官方',
      context: '4,000k',
      cost: '$4.5 / M tokens',
      description: 'Google 2026最新第三代Pro级超强旗舰，首创无损的 400 万 Token 上下文框架，对极长篇全模态视频及工程库分析能力拔群。'
    },
    {
      id: 'qwen-3-6-max',
      name: 'Qwen3.6-Max',
      developer: '阿里巴巴',
      tag: 'China',
      logoChar: 'Q',
      logoBg: 'linear-gradient(135deg, #7c3aed, #4c1d95)',
      mmlu: 92.8,
      gpqa: 74.0,
      humaneval: 94.2,
      gsm8k: 97.5,
      math: 84.8,
      alignbench: 95.2,
      lmsys: 95.5,
      superclue: 95.2,
      parameters: '闭源官方',
      context: '128k',
      cost: '$1.2 / M tokens',
      description: '阿里通义千问2026全新3.6版本顶配闭源模型，多任务、中文本土对齐及工具协同排名中文生态首位，性价比极其强悍。'
    },
    {
      id: 'qwen-3-coder-next',
      name: 'Qwen3-Coder-Next',
      developer: '阿里巴巴',
      tag: 'OpenSource',
      logoChar: 'C',
      logoBg: 'linear-gradient(135deg, #a855f7, #581c87)',
      mmlu: 88.5,
      gpqa: 54.0,
      humaneval: 94.5,
      gsm8k: 94.2,
      math: 73.5,
      alignbench: 91.2,
      lmsys: 92.0,
      superclue: 90.5,
      parameters: '72B (开源编码型)',
      context: '128k',
      cost: '免费开源',
      description: '阿里 2026 最新代码专用型开源旗舰，专为长程自动化软件工程深度优化，其编码及 Debug 指令对齐性能在开源界无出其右。'
    },
    {
      id: 'glm-6-pro',
      name: 'GLM-6-Pro (智谱清言)',
      developer: '智谱 AI',
      tag: 'China',
      logoChar: '6',
      logoBg: 'linear-gradient(135deg, #10b981, #064e3b)',
      mmlu: 90.2,
      gpqa: 54.8,
      humaneval: 90.5,
      gsm8k: 94.8,
      math: 72.0,
      alignbench: 93.8,
      lmsys: 92.8,
      superclue: 93.5,
      parameters: '闭源官方',
      context: '128k',
      cost: '$2.5 / M tokens',
      description: '清华系智谱 AI 2026年中期最新发布的第六代Pro闭源旗舰，首创自研多维融合推理模式，工具协同与中文生态综合表现强劲。'
    },
    {
      id: 'llama-4-405b',
      name: 'Llama 4 405B',
      developer: 'Meta',
      tag: 'Meta',
      logoChar: 'L',
      logoBg: 'linear-gradient(135deg, #0064e0, #030712)',
      mmlu: 90.8,
      gpqa: 68.5,
      humaneval: 92.0,
      gsm8k: 95.5,
      math: 78.2,
      alignbench: 89.2,
      lmsys: 93.8,
      superclue: 88.0,
      parameters: '405B (开源旗舰)',
      context: '256k',
      cost: '免费开源',
      description: 'Meta 2026年最新发行的第四代超大开源基座，采用全新多模态大架构，吞吐速率与上下文处理均取得了划时代的重大突破。'
    },
    {
      id: 'kimi-2-0-pro',
      name: 'Kimi-2.0-Pro (Moonshot)',
      developer: '月之暗面',
      tag: 'China',
      logoChar: 'K',
      logoBg: 'linear-gradient(135deg, #f43f5e, #be123c)',
      mmlu: 86.2,
      gpqa: 45.0,
      humaneval: 82.5,
      gsm8k: 89.8,
      math: 60.5,
      alignbench: 90.0,
      lmsys: 90.2,
      superclue: 88.8,
      parameters: '闭源官方',
      context: '5,000k',
      cost: '按需调用',
      description: '新一代无损长文本专家，上下文能力拓展至极其惊人的 500 万字，超长复杂文档理解分析能力再度攀登行业之巅。'
    },
    {
      id: 'doubao-pro-2-0',
      name: 'Doubao-Pro-2.0 (豆包)',
      developer: '字节跳动',
      tag: 'China',
      logoChar: 'B',
      logoBg: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      mmlu: 84.8,
      gpqa: 41.2,
      humaneval: 81.0,
      gsm8k: 88.2,
      math: 56.5,
      alignbench: 88.5,
      lmsys: 89.0,
      superclue: 87.5,
      parameters: '闭源官方',
      context: '128k',
      cost: '$0.07 / M tokens',
      description: '火山引擎大并发企业级首选，性价比极其震撼，2.0版对长文本对话、逻辑对齐分析及通用Agent组件支持进行了重磅升级。'
    }
  ];

  // Load models from localStorage with version control
  const DB_VERSION = 'v3_2026_june';
  let models = JSON.parse(localStorage.getItem('aurora_models'));
  const storedVersion = localStorage.getItem('aurora_db_version');

  if (!models || models.length === 0 || storedVersion !== DB_VERSION) {
    models = defaultModels;
    localStorage.setItem('aurora_models', JSON.stringify(models));
    localStorage.setItem('aurora_db_version', DB_VERSION);
  }

  // Chart statistics for different periods (Traffic in 10k per day/week/month)
  const chartData = {
    day: {
      points: [115, 138, 108, 168, 155, 142, 192],
      labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      latency: '1.26s',
      trend: 'avg_down'
    },
    week: {
      points: [620, 680, 710, 695, 840, 875, 960],
      labels: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周'],
      latency: '1.18s',
      trend: 'avg_down'
    },
    month: {
      points: [2300, 2480, 2600, 2850, 3100, 3350, 3850],
      labels: ['12月', '1月', '2月', '3月', '4月', '5月', '6月'],
      latency: '1.09s',
      trend: 'avg_down'
    }
  };

  // ==========================================
  // 2. DOM ELEMENTS SELECTORS
  // ==========================================
  const sidebar = document.getElementById('sidebar');
  const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const navItems = document.querySelectorAll('.nav-item, .mobile-dock-item');
  const tabSections = document.querySelectorAll('.tab-section');
  const pageTitle = document.getElementById('pageTitle');
  
  const globalSearch = document.getElementById('globalSearch');
  const modelsGrid = document.getElementById('modelsGrid');
  const galleryTags = document.getElementById('galleryTags');
  
  const totalModelsCount = document.getElementById('totalModelsCount');
  const avgLatencyText = document.getElementById('avgLatencyText');

  // Chart Elements
  const chartSegmentController = document.getElementById('chartSegmentController');
  const chartSegmentSlider = document.getElementById('chartSegmentSlider');
  const chartLinePath = document.getElementById('chartLinePath');
  const chartAreaFill = document.getElementById('chartAreaFill');
  const chartXLabels = document.getElementById('chartXLabels');
  
  // Benchmark Elements
  const benchmarkList = document.getElementById('benchmarkList');
  const barChartContainer = document.getElementById('barChartContainer');
  const benchmarkChartTitle = document.getElementById('benchmarkChartTitle');

  // Comparison Selectors
  const compareSelectA = document.getElementById('compareSelectA');
  const compareSelectB = document.getElementById('compareSelectB');
  const compareGrid = document.getElementById('compareGrid');

  // Modal Dialog Elements
  const openNewModelModalBtn = document.getElementById('openNewModelModalBtn');
  const closeNewModelModalBtn = document.getElementById('closeNewModelModalBtn');
  const cancelNewModelModalBtn = document.getElementById('cancelNewModelFormBtn');
  const newModelModal = document.getElementById('newModelModal');
  const newModelForm = document.getElementById('newModelForm');

  // Toast Notify
  const globalToast = document.getElementById('globalToast');
  const toastText = document.getElementById('toastText');

  // ==========================================
  // 3. TOAST & NOTIFICATION SYSTEM
  // ==========================================
  function showToast(text, type = 'success') {
    toastText.innerText = text;
    globalToast.className = `toast glass ${type}-toast active`;
    
    // Play light visual spring sound
    setTimeout(() => {
      globalToast.classList.remove('active');
    }, 3500);
  }

  // ==========================================
  // 4. THEME & VIEWPORT ADAPTER (深浅色模式)
  // ==========================================
  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('aurora_theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('aurora_theme', 'light');
    }
  }

  // Initial Load Theme
  const savedTheme = localStorage.getItem('aurora_theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Media query fallback
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
    showToast(isDark ? '已切换至优雅日间模式' : '已进入极客暗黑夜间模式', 'info');
  });

  // Sidebar Folding Layout Toggle
  sidebarCollapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // ==========================================
  // 5. VIEW ROUTER (选项卡无缝页面切换)
  // ==========================================
  function switchTab(targetId) {
    // 1. Sync button active states
    navItems.forEach(item => {
      if (item.getAttribute('data-target') === targetId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // 2. Hide and show sections
    tabSections.forEach(sec => {
      const secId = sec.id.replace('Section', '');
      if (secId.toLowerCase() === targetId.toLowerCase()) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // 3. Update Title
    let titleStr = "概览分析";
    let subStr = "全局大模型统计看板与核心指数";
    if (targetId === 'gallery') {
      titleStr = "大模型图鉴";
      subStr = "收录目前主流开发厂商的顶流模型参数与特色描述";
    } else if (targetId === 'benchmarks') {
      titleStr = "多维基准测试";
      subStr = "学术评测基准多赛道直观对比，以硬分数见模型功底";
      // Force animate bar chart drawing
      const activeItem = benchmarkList.querySelector('.benchmark-select-item.active');
      if (activeItem) {
        renderBenchmarks(activeItem.getAttribute('data-benchmark'));
      }
    } else if (targetId === 'compare') {
      titleStr = "智能双模对比";
      subStr = "选择两个模型，进行深入细致的指标侧面PK";
      renderComparison();
    }

    pageTitle.innerText = titleStr;
    const subHeader = document.querySelector('.topbar-subtitle');
    if (subHeader) subHeader.innerText = subStr;
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');
      switchTab(target);
    });
  });

  // ==========================================
  // 6. SVG LINE CHART DRAWING ENGINE (趋势折线图)
  // ==========================================
  function drawChart(period) {
    const data = chartData[period];
    const points = data.points;
    const labels = data.labels;

    avgLatencyText.innerText = data.latency;

    // SVG coordinates computation: Width = 800, Height = 280
    // X goes from 50 to 770. Y goes from 40 to 220 (Max data 4000, Min 0 in general).
    const maxVal = Math.max(...points) * 1.15; // padding top
    const minVal = 0;
    const totalX = 770 - 50;
    const totalY = 220 - 40;

    let dLine = "";
    let dArea = "";
    const nodeCoords = [];

    points.forEach((val, index) => {
      const x = 50 + (index / (points.length - 1)) * totalX;
      // Calculate Y proportional
      const valRatio = (val - minVal) / (maxVal - minVal);
      const y = 220 - valRatio * totalY;
      nodeCoords.push({ x, y });

      if (index === 0) {
        dLine += `M ${x} ${y}`;
        dArea += `M ${x} 220 L ${x} ${y}`;
      } else {
        dLine += ` L ${x} ${y}`;
        dArea += ` L ${x} ${y}`;
      }
    });

    // Close the area path to the bottom boundary
    dArea += ` L 770 220 Z`;

    // Apply paths
    chartLinePath.setAttribute('d', dLine);
    chartAreaFill.setAttribute('d', dArea);

    // Update Dots position
    nodeCoords.forEach((coord, idx) => {
      const dot = document.getElementById(`chartDot${idx}`);
      if (dot) {
        dot.setAttribute('cx', coord.x);
        dot.setAttribute('cy', coord.y);
      }
    });

    // Update X-axis label texts
    const textEls = chartXLabels.querySelectorAll('text');
    labels.forEach((label, idx) => {
      if (textEls[idx]) {
        textEls[idx].textContent = label;
      }
    });

    // Trigger spring-like path drawing anim via JS
    chartLinePath.style.strokeDasharray = chartLinePath.getTotalLength();
    chartLinePath.style.strokeDashoffset = chartLinePath.getTotalLength();
    chartLinePath.getBoundingClientRect(); // trigger reflow
    chartLinePath.style.transition = 'stroke-dashoffset 1.2s var(--ease-spring), d 0.6s var(--ease-spring)';
    chartLinePath.style.strokeDashoffset = '0';
  }

  // Segment Controller Highlight movement
  const segmentBtns = chartSegmentController.querySelectorAll('.segment-btn');
  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segmentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const period = btn.getAttribute('data-period');
      
      // Update slider offset
      const btnRect = btn.getBoundingClientRect();
      const parentRect = chartSegmentController.getBoundingClientRect();
      const leftOffset = btnRect.left - parentRect.left - 1; // 1px border shift
      
      chartSegmentSlider.style.width = `${btnRect.width}px`;
      chartSegmentSlider.style.transform = `translateX(${leftOffset}px)`;

      drawChart(period);
    });
  });

  // Initial slider state
  setTimeout(() => {
    const activeBtn = chartSegmentController.querySelector('.segment-btn.active');
    if (activeBtn) {
      const btnRect = activeBtn.getBoundingClientRect();
      chartSegmentSlider.style.width = `${btnRect.width}px`;
      chartSegmentSlider.style.transform = `translateX(2px)`;
    }
  }, 100);

  // ==========================================
  // 7. MODEL GALLERY FILTER & GRID (大模型卡片库)
  // ==========================================
  function renderGallery(filterTag = 'all', keyword = '') {
    modelsGrid.innerHTML = '';
    let count = 0;

    const query = keyword.toLowerCase().trim();

    models.forEach(model => {
      // Check if show commercial switch is ON
      const showCommercialBtn = document.getElementById('showCommercialSwitch');
      const showCommercial = showCommercialBtn ? showCommercialBtn.classList.contains('on') : true;

      // Determine if model is commercial / closed source
      const isClosedSource = !model.cost.includes('免费') && !model.cost.includes('开源');

      if (isClosedSource && !showCommercial) {
        return; // skip closed source commercial models when toggle is OFF
      }

      // Tags filter
      const isChineseDeveloper = ['DeepSeek', '阿里巴巴', '智谱 AI', '月之暗面', '字节跳动'].includes(model.developer);
      const matchesTag = (filterTag === 'all') || 
                         (model.tag === filterTag) || 
                         (filterTag === 'OpenSource' && (model.tag === 'Meta' || model.tag === 'OpenSource' || model.id.includes('llama') || model.id.includes('deepseek') || model.name.includes('开源'))) ||
                         (filterTag === 'China' && isChineseDeveloper);
      
      // Text search filter
      const matchesSearch = !query || 
                            model.name.toLowerCase().includes(query) || 
                            model.developer.toLowerCase().includes(query) || 
                            model.description.toLowerCase().includes(query);

      if (matchesTag && matchesSearch) {
        count++;
        const card = document.createElement('div');
        card.className = 'model-card glass glass-interactive card-stagger-in';
        card.style.animationDelay = ((count - 1) * 60) + 'ms';
        
        card.innerHTML = `
          <div class="model-card-header">
            <div class="model-logo" style="background: ${model.logoBg}">${model.logoChar}</div>
            <div class="model-meta">
              <h3>${model.name}</h3>
              <span>${model.developer}</span>
            </div>
            <div class="model-rating-badge">${model.mmlu.toFixed(1)}%</div>
          </div>
          <p>${model.description}</p>
          <div class="model-card-stats">
            <div class="model-stat">
              <span class="label">上下文窗口</span>
              <span class="val">${model.context}</span>
            </div>
            <div class="model-stat">
              <span class="label">参数规模</span>
              <span class="val">${model.parameters}</span>
            </div>
            <div class="model-stat">
              <span class="label">调用单价</span>
              <span class="val">${model.cost}</span>
            </div>
          </div>
        `;
        modelsGrid.appendChild(card);
      }
    });

    if (count === 0) {
      modelsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--muted);">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 48px; height: 48px; margin-bottom: 12px; opacity: 0.5;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>未能寻找到契合该筛选条件的大模型，您可以点击右上角手动新增收录。</p>
        </div>
      `;
    }

    // Sync overview counter
    totalModelsCount.innerText = models.length;
  }

  // Tag filter logic
  const tagBtns = galleryTags.querySelectorAll('.tag-btn');
  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.getAttribute('data-tag'), globalSearch.value);
    });
  });

  // Global search input event
  globalSearch.addEventListener('input', (e) => {
    const activeTag = galleryTags.querySelector('.tag-btn.active').getAttribute('data-tag');
    // If not in gallery tab, auto transition tab to gallery for instant user search feedback
    const isGalleryActive = document.getElementById('gallerySection').classList.contains('active');
    if (!isGalleryActive && e.target.value.trim() !== '') {
      switchTab('gallery');
    }
    renderGallery(activeTag, e.target.value);
  });

  // ==========================================
  // 8. BENCHMARKS EVALUATIONS DRAWING (基准测试)
  // ==========================================
  function renderBenchmarks(type = 'mmlu') {
    barChartContainer.innerHTML = '';
    
    // Custom names mapper
    let benchmarkTitle = "MMLU 测评基准得分对比";
    if (type === 'gpqa') benchmarkTitle = "GPQA (研究生级科学问答) 测评对比";
    else if (type === 'humaneval') benchmarkTitle = "HumanEval (代码智能) 测评对比";
    else if (type === 'gsm8k') benchmarkTitle = "GSM8K (数学逻辑推理) 测评对比";
    else if (type === 'math') benchmarkTitle = "MATH (竞赛级数学) 评测对比 (数理逻辑上限)";
    else if (type === 'alignbench') benchmarkTitle = "AlignBench (清华中文对齐) 评测对比 (中文理解力标尺)";
    else if (type === 'lmsys') benchmarkTitle = "LMSYS ELO Arena (盲测竞技场) 评测对比 (全球人类真实盲测体验)";
    else if (type === 'superclue') benchmarkTitle = "SuperCLUE (中文综合评测) 对比 (中文本土生态权威基准)";

    benchmarkChartTitle.innerText = benchmarkTitle;

    // Sort models by chosen score descending for clean comparison hierarchy
    const sorted = [...models].sort((a, b) => b[type] - a[type]);

    sorted.forEach((model) => {
      const score = model[type];
      
      const row = document.createElement('div');
      row.className = 'bar-row';
      
      row.innerHTML = `
        <div class="bar-info">
          <div class="bar-name">
            <div class="model-logo" style="width: 24px; height: 24px; font-size: 11px; border-radius: 6px; background: ${model.logoBg}">${model.logoChar}</div>
            <span>${model.name}</span>
            <span style="font-size: 11px; color: var(--muted); margin-left: 4px;">(${model.developer})</span>
          </div>
          <div class="bar-score">${score.toFixed(1)}%</div>
        </div>
        <div class="bar-track">
          <div class="bar-fill" id="barFill-${model.id}" style="background: ${model.logoBg}"></div>
        </div>
      `;

      barChartContainer.appendChild(row);

      // Trigger width animation frame
      setTimeout(() => {
        const fill = document.getElementById(`barFill-${model.id}`);
        if (fill) fill.style.width = `${score}%`;
      }, 50);
    });
  }

  // Switch benchmarks category
  const bSelectItems = benchmarkList.querySelectorAll('.benchmark-select-item');
  bSelectItems.forEach(item => {
    item.addEventListener('click', () => {
      bSelectItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      renderBenchmarks(item.getAttribute('data-benchmark'));
    });
  });

  // ==========================================
  // 9. SIDE-BY-SIDE MATRIX COMPARE ENGINE (双模型PK)
  // ==========================================
  function setupCompareDropdowns() {
    compareSelectA.innerHTML = '';
    compareSelectB.innerHTML = '';

    models.forEach((model, index) => {
      const optA = document.createElement('option');
      optA.value = model.id;
      optA.textContent = `${model.name} (${model.developer})`;
      if (index === 0) optA.selected = true;
      compareSelectA.appendChild(optA);

      const optB = document.createElement('option');
      optB.value = model.id;
      optB.textContent = `${model.name} (${model.developer})`;
      if (index === 1 || (index === 0 && models.length === 1)) optB.selected = true;
      compareSelectB.appendChild(optB);
    });
  }

  function renderComparison() {
    const valA = compareSelectA.value;
    const valB = compareSelectB.value;

    const modelA = models.find(m => m.id === valA);
    const modelB = models.find(m => m.id === valB);

    if (!modelA || !modelB) return;

    compareGrid.innerHTML = `
      <!-- Row 1: Logo Headers -->
      <div class="compare-cell label-cell header">对比维度</div>
      <div class="compare-cell header" style="color: var(--accent-primary)">
        <div class="model-logo" style="width: 28px; height: 28px; font-size: 13px; border-radius: 8px; margin-right: 10px; background: ${modelA.logoBg}">${modelA.logoChar}</div>
        ${modelA.name}
      </div>
      <div class="compare-cell header" style="color: var(--accent-primary)">
        <div class="model-logo" style="width: 28px; height: 28px; font-size: 13px; border-radius: 8px; margin-right: 10px; background: ${modelB.logoBg}">${modelB.logoChar}</div>
        ${modelB.name}
      </div>

      <!-- Row 2: Developer -->
      <div class="compare-cell label-cell">厂商归属</div>
      <div class="compare-cell">${modelA.developer}</div>
      <div class="compare-cell">${modelB.developer}</div>

      <!-- Row 3: Parameter -->
      <div class="compare-cell label-cell">模型参数</div>
      <div class="compare-cell">${modelA.parameters}</div>
      <div class="compare-cell">${modelB.parameters}</div>

      <!-- Row 4: MMLU -->
      <div class="compare-cell label-cell">MMLU 表现</div>
      <div class="compare-cell ${modelA.mmlu > modelB.mmlu ? 'highlight' : ''}">${modelA.mmlu.toFixed(1)}% ${modelA.mmlu > modelB.mmlu ? '🏆' : ''}</div>
      <div class="compare-cell ${modelB.mmlu > modelA.mmlu ? 'highlight' : ''}">${modelB.mmlu.toFixed(1)}% ${modelB.mmlu > modelA.mmlu ? '🏆' : ''}</div>

      <!-- Row 5: GPQA -->
      <div class="compare-cell label-cell">GPQA 逻辑深度</div>
      <div class="compare-cell ${modelA.gpqa > modelB.gpqa ? 'highlight' : ''}">${modelA.gpqa.toFixed(1)}% ${modelA.gpqa > modelB.gpqa ? '🏆' : ''}</div>
      <div class="compare-cell ${modelB.gpqa > modelA.gpqa ? 'highlight' : ''}">${modelB.gpqa.toFixed(1)}% ${modelB.gpqa > modelA.gpqa ? '🏆' : ''}</div>

      <!-- Row 6: HumanEval -->
      <div class="compare-cell label-cell">HumanEval 编程</div>
      <div class="compare-cell ${modelA.humaneval > modelB.humaneval ? 'highlight' : ''}">${modelA.humaneval.toFixed(1)}% ${modelA.humaneval > modelB.humaneval ? '🏆' : ''}</div>
      <div class="compare-cell ${modelB.humaneval > modelA.humaneval ? 'highlight' : ''}">${modelB.humaneval.toFixed(1)}% ${modelB.humaneval > modelA.humaneval ? '🏆' : ''}</div>

      <!-- Row 7: GSM8K -->
      <div class="compare-cell label-cell">GSM8K 数理分析</div>
      <div class="compare-cell ${modelA.gsm8k > modelB.gsm8k ? 'highlight' : ''}">${modelA.gsm8k.toFixed(1)}% ${modelA.gsm8k > modelB.gsm8k ? '🏆' : ''}</div>
      <div class="compare-cell ${modelB.gsm8k > modelA.gsm8k ? 'highlight' : ''}">${modelB.gsm8k.toFixed(1)}% ${modelB.gsm8k > modelA.gsm8k ? '🏆' : ''}</div>

      <!-- Row: MATH -->
      <div class="compare-cell label-cell">MATH 竞赛级数学</div>
      <div class="compare-cell ${modelA.math > modelB.math ? 'highlight' : ''}">${modelA.math.toFixed(1)}% ${modelA.math > modelB.math ? '🏆' : ''}</div>
      <div class="compare-cell ${modelB.math > modelA.math ? 'highlight' : ''}">${modelB.math.toFixed(1)}% ${modelB.math > modelA.math ? '🏆' : ''}</div>

      <!-- Row: AlignBench -->
      <div class="compare-cell label-cell">AlignBench 中文指令</div>
      <div class="compare-cell ${modelA.alignbench > modelB.alignbench ? 'highlight' : ''}">${modelA.alignbench.toFixed(1)}% ${modelA.alignbench > modelB.alignbench ? '🏆' : ''}</div>
      <div class="compare-cell ${modelB.alignbench > modelA.alignbench ? 'highlight' : ''}">${modelB.alignbench.toFixed(1)}% ${modelB.alignbench > modelA.alignbench ? '🏆' : ''}</div>

      <!-- Row: LMSYS -->
      <div class="compare-cell label-cell">LMSYS 盲测竞技</div>
      <div class="compare-cell ${modelA.lmsys > modelB.lmsys ? 'highlight' : ''}">${modelA.lmsys.toFixed(1)}% ${modelA.lmsys > modelB.lmsys ? '🏆' : ''}</div>
      <div class="compare-cell ${modelB.lmsys > modelA.lmsys ? 'highlight' : ''}">${modelB.lmsys.toFixed(1)}% ${modelB.lmsys > modelA.lmsys ? '🏆' : ''}</div>

      <!-- Row: SuperCLUE -->
      <div class="compare-cell label-cell">SuperCLUE 中文综合</div>
      <div class="compare-cell ${modelA.superclue > modelB.superclue ? 'highlight' : ''}">${modelA.superclue.toFixed(1)}% ${modelA.superclue > modelB.superclue ? '🏆' : ''}</div>
      <div class="compare-cell ${modelB.superclue > modelA.superclue ? 'highlight' : ''}">${modelB.superclue.toFixed(1)}% ${modelB.superclue > modelA.superclue ? '🏆' : ''}</div>

      <!-- Row 8: Context -->
      <div class="compare-cell label-cell">上下文长度</div>
      <div class="compare-cell">${modelA.context}</div>
      <div class="compare-cell">${modelB.context}</div>

      <!-- Row 9: Cost -->
      <div class="compare-cell label-cell">API 价格</div>
      <div class="compare-cell">${modelA.cost}</div>
      <div class="compare-cell">${modelB.cost}</div>
    `;

    // Render interactive radar chart
    renderRadarChart(modelA, modelB);
  }

  compareSelectA.addEventListener('change', renderComparison);
  compareSelectB.addEventListener('change', renderComparison);

  // ==========================================
  // 10. NEW MODEL FORM MODAL (表单交互控制)
  // ==========================================
  openNewModelModalBtn.addEventListener('click', () => {
    newModelModal.classList.add('active');
  });

  function closeModal() {
    newModelModal.classList.remove('active');
    newModelForm.reset();
  }

  closeNewModelModalBtn.addEventListener('click', closeModal);
  cancelNewModelModalBtn.addEventListener('click', closeModal);

  // Modal backdrop click closes
  newModelModal.addEventListener('click', (e) => {
    if (e.target === newModelModal) {
      closeModal();
    }
  });

  // Submit model data form handler
  newModelForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('modelName').value.trim();
    const developer = document.getElementById('modelDeveloper').value;
    const tag = document.getElementById('modelTag').value;
    const mmlu = parseFloat(document.getElementById('modelMmlu').value);
    const desc = document.getElementById('modelDesc').value.trim();

    // Assign dynamic gradient styling on logo bg based on developer
    let logoBg = 'linear-gradient(135deg, #ec4899, #be185d)'; // Default elegant pink
    if (developer === 'OpenAI') logoBg = 'linear-gradient(135deg, #10a37f, #057d5c)';
    else if (developer === 'Anthropic') logoBg = 'linear-gradient(135deg, #d97706, #b45309)';
    else if (developer === 'Google') logoBg = 'linear-gradient(135deg, #4f46e5, #3730a3)';
    else if (developer === 'Meta') logoBg = 'linear-gradient(135deg, #0064e0, #004fb0)';

    // Simulated benchmark estimates based on MMLU score
    const newModelObj = {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: name,
      developer: developer,
      tag: tag,
      logoChar: name.charAt(0).toUpperCase(),
      logoBg: logoBg,
      mmlu: mmlu,
      gpqa: Math.max(20, mmlu * 0.61 - (Math.random() * 5)),
      humaneval: Math.max(30, mmlu * 0.95 - (Math.random() * 4)),
      gsm8k: Math.max(40, mmlu * 0.98 - (Math.random() * 3)),
      math: Math.max(10, mmlu * 0.75 - (Math.random() * 8)),
      alignbench: Math.max(20, mmlu * 0.95 - (Math.random() * 5)),
      lmsys: Math.max(30, mmlu * 0.96 - (Math.random() * 4)),
      superclue: Math.max(20, mmlu * 0.94 - (Math.random() * 6)),
      parameters: tag === 'OpenSource' || tag === 'Meta' ? '70B (开源估)' : '闭源收录',
      context: '128k',
      cost: '视服务商定',
      description: desc
    };

    // Push and sync database
    models.push(newModelObj);
    localStorage.setItem('aurora_models', JSON.stringify(models));

    // Reload active interfaces
    const activeTag = galleryTags.querySelector('.tag-btn.active').getAttribute('data-tag');
    renderGallery(activeTag, globalSearch.value);
    setupCompareDropdowns();
    renderComparison();

    closeModal();
    showToast(`大模型 "${name}" 已成功收录至图谱库！`, 'success');
  });

  // iOS Switches bounce feedback clicks
  const toggleSwitches = document.querySelectorAll('.sw');
  toggleSwitches.forEach(sw => {
    sw.addEventListener('click', () => {
      sw.classList.toggle('on');
      const isEn = sw.classList.contains('on');
      // Fix relative sibling lookup bug by querying parent for the exact title
      const text = sw.parentElement.querySelector('.rt').textContent;
      showToast(`${text}：${isEn ? '已启用' : '已停用'}`, 'info');

      // Realtime action: If commercial switch is toggled, re-render model grid
      if (sw.id === 'showCommercialSwitch') {
        const activeTag = galleryTags.querySelector('.tag-btn.active').getAttribute('data-tag');
        renderGallery(activeTag, globalSearch.value);
      }
    });
  });

  // ==========================================
  // 10.5 RADAR CHART (八维雷达图可视化)
  // ==========================================
  function renderRadarChart(mA, mB) {
    const el = document.getElementById('radarChartContainer');
    if (!el) return;
    const dims = ['mmlu','gpqa','humaneval','gsm8k','math','alignbench','lmsys','superclue'];
    const lbl = ['MMLU','GPQA','HumanEval','GSM8K','MATH','AlignBench','LMSYS','SuperCLUE'];
    const n = dims.length, cx = 200, cy = 200, R = 150;
    const stp = (2 * Math.PI) / n, a0 = -Math.PI / 2;
    const pt = (a, r) => ({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
    let sv = '<svg viewBox="0 0 400 400" class="radar-svg">';
    // Concentric rings
    [0.25, 0.5, 0.75, 1].forEach(k => {
      let d = '';
      for (let i = 0; i < n; i++) { const p = pt(a0 + i * stp, R * k); d += (i ? 'L' : 'M') + ` ${p.x.toFixed(1)} ${p.y.toFixed(1)}`; }
      sv += `<path d="${d} Z" class="radar-ring"/>`;
    });
    // Axis lines
    for (let i = 0; i < n; i++) { const p = pt(a0 + i * stp, R); sv += `<line x1="${cx}" y1="${cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" class="radar-axis"/>`; }
    // Polygon builder
    const poly = m => {
      let d = ''; const pts = [];
      dims.forEach((dim, i) => { const p = pt(a0 + i * stp, R * (m[dim] || 0) / 100); pts.push(p); d += (i ? 'L' : 'M') + ` ${p.x.toFixed(1)} ${p.y.toFixed(1)}`; });
      return { d: d + ' Z', pts };
    };
    const dA = poly(mA), dB = poly(mB);
    // Areas and strokes (B behind, A front)
    sv += `<path d="${dB.d}" class="radar-area radar-area-b"/>`;
    sv += `<path d="${dB.d}" class="radar-line radar-line-b" fill="none"/>`;
    sv += `<path d="${dA.d}" class="radar-area radar-area-a"/>`;
    sv += `<path d="${dA.d}" class="radar-line radar-line-a" fill="none"/>`;
    // Labels and data dots
    dims.forEach((dim, i) => {
      const lp = pt(a0 + i * stp, R + 28);
      let anc = 'middle'; if (lp.x < cx - 10) anc = 'end'; else if (lp.x > cx + 10) anc = 'start';
      sv += `<text x="${lp.x.toFixed(1)}" y="${lp.y.toFixed(1)}" text-anchor="${anc}" dominant-baseline="central" class="radar-label">${lbl[i]}</text>`;
      sv += `<circle cx="${dA.pts[i].x.toFixed(1)}" cy="${dA.pts[i].y.toFixed(1)}" r="4.5" class="radar-dot-a"><title>${mA.name}: ${(mA[dim] || 0).toFixed(1)}%</title></circle>`;
      sv += `<circle cx="${dB.pts[i].x.toFixed(1)}" cy="${dB.pts[i].y.toFixed(1)}" r="4.5" class="radar-dot-b"><title>${mB.name}: ${(mB[dim] || 0).toFixed(1)}%</title></circle>`;
    });
    // Ring percentage labels
    [0.25, 0.5, 0.75, 1].forEach(k => {
      const p = pt(a0, R * k);
      sv += `<text x="${(p.x + 6).toFixed(1)}" y="${(p.y - 6).toFixed(1)}" class="radar-ring-label">${Math.round(k * 100)}%</text>`;
    });
    sv += '</svg>';
    sv += `<div class="radar-legend">`;
    sv += `<div class="radar-legend-item"><span class="radar-legend-dot dot-a"></span><span>${mA.name}</span></div>`;
    sv += `<div class="radar-legend-item"><span class="radar-legend-dot dot-b"></span><span>${mB.name}</span></div>`;
    sv += `</div>`;
    el.innerHTML = sv;
  }

  // ==========================================
  // 10.6 COUNT-UP ANIMATION (数字滚动动画)
  // ==========================================
  function animateCountUp(el, target, dur) {
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.innerText = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  // ==========================================
  // 11. INITIAL RUNTIME BOOT
  // ==========================================
  drawChart('day');
  renderGallery('all', '');
  setupCompareDropdowns();

  // CountUp animation for overview numbers
  animateCountUp(totalModelsCount, models.length, 800);

  // Entrance animation stagger
  requestAnimationFrame(() => { document.body.classList.add('app-loaded'); });
  
  // Handle resizing segment highlights
  window.addEventListener('resize', () => {
    const activeBtn = chartSegmentController.querySelector('.segment-btn.active');
    if (activeBtn) {
      const btnRect = activeBtn.getBoundingClientRect();
      const parentRect = chartSegmentController.getBoundingClientRect();
      const leftOffset = btnRect.left - parentRect.left - 1;
      chartSegmentSlider.style.width = `${btnRect.width}px`;
      chartSegmentSlider.style.transform = `translateX(${leftOffset}px)`;
    }
  });

});

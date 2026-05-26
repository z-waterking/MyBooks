(function () {
  const scenarios = [
    { key: "daily", cn: "日常寒暄", focus: "daily conversation", focusCn: "日常交流", place: "a social situation", placeCn: "社交场合", issue: "a small misunderstanding", issueCn: "小误会", action: "start a friendly conversation", actionCn: "开始友好对话", goal: "keep the conversation comfortable", goalCn: "让对话保持舒服" },
    { key: "study", cn: "学习校园", focus: "school learning", focusCn: "学校学习", place: "the classroom", placeCn: "课堂", issue: "a difficult assignment", issueCn: "困难作业", action: "review the key points", actionCn: "复习重点", goal: "understand the lesson better", goalCn: "更好理解课程" },
    { key: "travel", cn: "旅行交通", focus: "travel planning", focusCn: "旅行规划", place: "the station", placeCn: "车站", issue: "a delayed train", issueCn: "火车延误", action: "check the route", actionCn: "查看路线", goal: "arrive on time", goalCn: "准时到达" },
    { key: "restaurant", cn: "餐厅咖啡", focus: "ordering food", focusCn: "点餐", place: "a restaurant", placeCn: "餐厅", issue: "a wrong order", issueCn: "上错菜", action: "explain the problem", actionCn: "解释问题", goal: "enjoy the meal", goalCn: "享受用餐" },
    { key: "shopping", cn: "购物退换", focus: "shopping decisions", focusCn: "购物决策", place: "a shop", placeCn: "商店", issue: "the wrong size", issueCn: "尺码不合适", action: "compare prices", actionCn: "比较价格", goal: "choose wisely", goalCn: "明智选择" },
    { key: "hotel", cn: "酒店住宿", focus: "hotel service", focusCn: "酒店服务", place: "a hotel", placeCn: "酒店", issue: "a room problem", issueCn: "房间问题", action: "request help", actionCn: "请求帮助", goal: "have a comfortable stay", goalCn: "住得舒服" },
    { key: "health", cn: "看病健康", focus: "health and habits", focusCn: "健康和习惯", place: "a clinic", placeCn: "诊所", issue: "a headache", issueCn: "头疼", action: "describe symptoms", actionCn: "描述症状", goal: "recover quickly", goalCn: "快速恢复" },
    { key: "phone", cn: "电话邮件", focus: "remote communication", focusCn: "远程沟通", place: "a phone call", placeCn: "电话", issue: "unclear information", issueCn: "信息不清楚", action: "leave a message", actionCn: "留言", goal: "confirm the details", goalCn: "确认细节" },
    { key: "work", cn: "面试工作", focus: "workplace skills", focusCn: "职场技能", place: "an interview", placeCn: "面试", issue: "a tight deadline", issueCn: "紧迫截止日期", action: "organise tasks", actionCn: "组织任务", goal: "show responsibility", goalCn: "展现责任感" },
    { key: "opinion", cn: "观点讨论", focus: "expressing opinions", focusCn: "表达观点", place: "a discussion", placeCn: "讨论", issue: "different views", issueCn: "不同观点", action: "give reasons", actionCn: "给出理由", goal: "reach a fair conclusion", goalCn: "得出公平结论" },
    { key: "ielts", cn: "雅思口语", focus: "IELTS speaking", focusCn: "雅思口语", place: "a speaking test", placeCn: "口语考试", issue: "an unfamiliar question", issueCn: "陌生问题", action: "extend the answer", actionCn: "扩展回答", goal: "answer clearly", goalCn: "清楚回答" },
    { key: "academic", cn: "学术写作", focus: "academic writing", focusCn: "学术写作", place: "an essay", placeCn: "作文", issue: "a weak argument", issueCn: "薄弱论证", action: "support the claim", actionCn: "支持主张", goal: "make the point convincing", goalCn: "让观点有说服力" },
    { key: "environment", cn: "环境社会", focus: "environmental protection", focusCn: "环境保护", place: "a local community", placeCn: "本地社区", issue: "waste and pollution", issueCn: "浪费和污染", action: "choose a greener option", actionCn: "选择更环保的方式", goal: "reduce pressure on the environment", goalCn: "减轻环境压力" },
    { key: "culture", cn: "文化阅读", focus: "culture and reading", focusCn: "文化和阅读", place: "a museum or library", placeCn: "博物馆或图书馆", issue: "losing local memory", issueCn: "失去地方记忆", action: "explain the meaning", actionCn: "解释意义", goal: "understand different values", goalCn: "理解不同价值观" },
    { key: "technology", cn: "科技媒体", focus: "technology and media", focusCn: "科技和媒体", place: "online", placeCn: "线上", issue: "false information", issueCn: "虚假信息", action: "check the source", actionCn: "核查来源", goal: "use information wisely", goalCn: "明智使用信息" },
    { key: "city", cn: "城市生活", focus: "city life", focusCn: "城市生活", place: "a large city", placeCn: "大城市", issue: "daily pressure", issueCn: "日常压力", action: "plan the journey", actionCn: "规划行程", goal: "save time and energy", goalCn: "节省时间和精力" }
  ];

  const commonWords = [
    ["time", "时间", "enough time"], ["people", "人们", "different people"], ["year", "年份", "a difficult year"], ["day", "一天", "a busy day"], ["way", "方式", "a better way"], ["work", "工作", "hard work"], ["life", "生活", "daily life"], ["world", "世界", "the wider world"], ["school", "学校", "a local school"], ["family", "家庭", "my family"],
    ["student", "学生", "a careful student"], ["teacher", "老师", "a helpful teacher"], ["friend", "朋友", "a close friend"], ["question", "问题", "a clear question"], ["answer", "回答", "a complete answer"], ["problem", "问题", "a common problem"], ["reason", "原因", "a strong reason"], ["example", "例子", "a specific example"], ["idea", "想法", "a useful idea"], ["story", "故事", "a simple story"],
    ["book", "书", "a good book"], ["word", "单词", "a useful word"], ["sentence", "句子", "a complete sentence"], ["language", "语言", "a second language"], ["English", "英语", "spoken English"], ["practice", "练习", "regular practice"], ["skill", "技能", "a practical skill"], ["plan", "计划", "a simple plan"], ["goal", "目标", "a realistic goal"], ["habit", "习惯", "a daily habit"],
    ["home", "家", "a quiet home"], ["room", "房间", "a clean room"], ["food", "食物", "healthy food"], ["water", "水", "enough water"], ["money", "钱", "extra money"], ["price", "价格", "a fair price"], ["service", "服务", "good service"], ["ticket", "票", "a train ticket"], ["place", "地方", "a safe place"], ["city", "城市", "a modern city"],
    ["country", "国家", "another country"], ["community", "社区", "a friendly community"], ["health", "健康", "good health"], ["body", "身体", "a healthy body"], ["mind", "头脑", "a calm mind"], ["stress", "压力", "too much stress"], ["sleep", "睡眠", "better sleep"], ["exercise", "运动", "regular exercise"], ["change", "变化", "a small change"], ["choice", "选择", "a smart choice"],
    ["information", "信息", "reliable information"], ["news", "新闻", "daily news"], ["media", "媒体", "social media"], ["phone", "手机", "a mobile phone"], ["computer", "电脑", "a personal computer"], ["technology", "科技", "new technology"], ["internet", "互联网", "the internet"], ["message", "消息", "a short message"], ["email", "邮件", "a formal email"], ["call", "电话", "a quick call"],
    ["meeting", "会议", "a team meeting"], ["project", "项目", "a group project"], ["team", "团队", "a small team"], ["job", "工作", "a good job"], ["career", "职业", "a future career"], ["company", "公司", "a small company"], ["manager", "经理", "a busy manager"], ["customer", "顾客", "a regular customer"], ["shop", "商店", "an online shop"], ["market", "市场", "a local market"],
    ["travel", "旅行", "safe travel"], ["station", "车站", "a crowded station"], ["airport", "机场", "a busy airport"], ["hotel", "酒店", "a quiet hotel"], ["restaurant", "餐厅", "a popular restaurant"], ["doctor", "医生", "a family doctor"], ["medicine", "药", "the right medicine"], ["environment", "环境", "the natural environment"], ["energy", "能源", "clean energy"], ["pollution", "污染", "air pollution"],
    ["culture", "文化", "local culture"], ["history", "历史", "local history"], ["music", "音乐", "live music"], ["film", "电影", "a short film"], ["sport", "运动", "a team sport"], ["game", "游戏", "a simple game"], ["art", "艺术", "modern art"], ["science", "科学", "basic science"], ["nature", "自然", "nature"], ["animal", "动物", "a wild animal"],
    ["important", "重要的", "an important decision"], ["different", "不同的", "different opinions"], ["clear", "清楚的", "a clear explanation"], ["simple", "简单的", "a simple method"], ["difficult", "困难的", "a difficult task"], ["possible", "可能的", "a possible solution"], ["useful", "有用的", "useful feedback"], ["free", "空闲/免费的", "free time"], ["safe", "安全的", "a safe choice"], ["common", "常见的", "a common mistake"]
  ].map(([word, cn, phrase]) => ({ word, cn, phrase }));

  const templates = [
    { level: "foundation", type: "short", note: "常用词基础句。", text: (s, w) => `I need ${w.phrase} when I ${s.action}.`, cn: (s, w) => `当我${s.actionCn}时，我需要${w.cn}相关表达。` },
    { level: "foundation", type: "short", note: "常用词解释句。", text: (s, w) => `The word "${w.word}" is useful in ${s.focus}.`, cn: (s, w) => `单词“${w.word}”在${s.focusCn}中很有用。` },
    { level: "bridge", type: "short", note: "情景应用句。", text: (s, w) => `In ${s.place}, ${w.phrase} can help me ${s.goal}.`, cn: (s, w) => `在${s.placeCn}中，${w.cn}相关表达能帮助我${s.goalCn}。` },
    { level: "ielts", type: "long", note: "雅思原因句。", text: (s, w) => `One reason ${w.word} matters in ${s.focus} is that it helps people deal with ${s.issue} more clearly.`, cn: (s, w) => `${w.cn}在${s.focusCn}中重要的一个原因是，它帮助人们更清楚地处理${s.issueCn}。` },
    { level: "band7", type: "long", note: "高阶平衡句。", text: (s, w) => `Although ${s.issue} can make ${s.focus} stressful, a good understanding of ${w.phrase} gives people a more practical way to ${s.goal}.`, cn: (s, w) => `虽然${s.issueCn}会让${s.focusCn}有压力，但充分理解${w.cn}相关表达能给人们更实际的方法去${s.goalCn}。` }
  ];

  const sentences = [];
  scenarios.forEach((scenario) => {
    commonWords.forEach((word, wordIndex) => {
      templates.forEach((template, templateIndex) => {
        sentences.push({
          id: `corp-${scenario.key}-${String(wordIndex + 1).padStart(3, "0")}-${templateIndex + 1}`,
          level: template.level,
          type: template.type,
          topic: scenario.key,
          text: template.text(scenario, word),
          cn: template.cn(scenario, word),
          note: `${scenario.cn} · ${template.note} 常用词：${word.word}（${word.cn}）。`,
          keywords: [[word.word, word.cn], [word.phrase, "常用搭配"], [scenario.focus, scenario.cn]],
          source: "common-word-corpus"
        });
      });
    });
  });

  window.LARGE_SENTENCE_CORPUS = {
    version: "2026-05-26-common-word-8000",
    description: "100 个常用词 × 16 个情景 × 5 个句型模板生成的 8000 句语料库。",
    commonWords: commonWords.map(item => ({ word: item.word, cn: item.cn, phrase: item.phrase })),
    scenarios: scenarios.map(item => ({ key: item.key, cn: item.cn })),
    frames: templates.length,
    sentences,
    stats: {
      target: 8000,
      commonWords: commonWords.length,
      scenarios: scenarios.length,
      frames: templates.length,
      sentences: sentences.length,
      shortSentences: sentences.filter(item => item.type === "short").length,
      longSentences: sentences.filter(item => item.type === "long").length,
      byLevel: sentences.reduce((acc, item) => {
        acc[item.level] = (acc[item.level] || 0) + 1;
        return acc;
      }, {})
    }
  };
})();

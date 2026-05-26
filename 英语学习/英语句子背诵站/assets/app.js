const levelNames = {
  foundation: "奠基",
  bridge: "过渡",
  ielts: "雅思",
  band7: "冲 7"
};

const scenarioNames = {
  daily: "日常寒暄",
  study: "学习校园",
  travel: "旅行交通",
  restaurant: "餐厅咖啡",
  shopping: "购物退换",
  hotel: "酒店住宿",
  health: "看病健康",
  phone: "电话邮件",
  work: "面试工作",
  opinion: "观点讨论",
  ielts: "雅思口语",
  academic: "学术写作",
  city: "城市生活",
  media: "媒体科技",
  environment: "环境社会",
  culture: "文化阅读",
  habit: "习惯方法",
  feeling: "感受表达",
  technology: "科技"
};

const sentences = [
  { id: "s01", level: "foundation", type: "short", topic: "daily", text: "Could you say that again, please?", cn: "你能再说一遍吗？", note: "听力没跟上时的礼貌请求。", keywords: [["could you", "礼貌请求"], ["say that again", "再说一遍"]] },
  { id: "s02", level: "foundation", type: "short", topic: "daily", text: "I am not sure how to explain it.", cn: "我不太确定该怎么解释。", note: "口语中给自己争取思考时间。", keywords: [["not sure", "不确定"], ["how to", "如何做某事"]] },
  { id: "s03", level: "foundation", type: "short", topic: "study", text: "It depends on the situation.", cn: "这取决于具体情况。", note: "雅思口语 Part 3 常用开场。", keywords: [["depend on", "取决于"], ["situation", "情况"]] },
  { id: "s04", level: "foundation", type: "short", topic: "opinion", text: "I agree with you to some extent.", cn: "我在某种程度上同意你。", note: "比 I agree 更有分寸。", keywords: [["to some extent", "在某种程度上"], ["agree with", "同意某人"]] },
  { id: "s05", level: "foundation", type: "short", topic: "study", text: "This word is often used in academic writing.", cn: "这个词经常用于学术写作。", note: "用于词汇积累和解释。", keywords: [["be used in", "被用于"], ["academic writing", "学术写作"]] },
  { id: "s06", level: "foundation", type: "short", topic: "daily", text: "I need a little more time to think.", cn: "我需要多一点时间思考。", note: "口语卡顿时自然表达。", keywords: [["a little more", "多一点"], ["think", "思考"]] },
  { id: "s07", level: "foundation", type: "short", topic: "habit", text: "I usually review new words before going to bed.", cn: "我通常睡前复习新单词。", note: "描述习惯，用 usually + 动词。", keywords: [["review", "复习"], ["before going to bed", "睡前"]] },
  { id: "s08", level: "foundation", type: "short", topic: "feeling", text: "That sounds difficult, but I want to try.", cn: "那听起来很难，但我想试试。", note: "表达困难和积极态度。", keywords: [["sound", "听起来"], ["try", "尝试"]] },
  { id: "s09", level: "bridge", type: "short", topic: "conversation", text: "What do you usually do to relax after school?", cn: "放学后你通常怎么放松？", note: "常用对话题，也可转入口语 Part 1。", keywords: [["relax", "放松"], ["after school", "放学后"]] },
  { id: "s10", level: "bridge", type: "short", topic: "study", text: "I find it easier to remember words in context.", cn: "我发现把单词放在语境里更容易记住。", note: "find it + adj + to do 结构。", keywords: [["in context", "在语境中"], ["find it easier", "发现更容易"]] },
  { id: "s11", level: "bridge", type: "short", topic: "opinion", text: "From my point of view, practice is more important than talent.", cn: "在我看来，练习比天赋更重要。", note: "观点句，可用于写作和口语。", keywords: [["from my point of view", "在我看来"], ["talent", "天赋"]] },
  { id: "s12", level: "bridge", type: "short", topic: "study", text: "The main reason is that I did not manage my time well.", cn: "主要原因是我没有很好地管理时间。", note: "解释原因，清楚直接。", keywords: [["main reason", "主要原因"], ["manage my time", "管理时间"]] },
  { id: "s13", level: "bridge", type: "short", topic: "city", text: "Public transport is convenient, but it can be crowded during rush hour.", cn: "公共交通很方便，但高峰期可能很拥挤。", note: "城市话题高频句。", keywords: [["public transport", "公共交通"], ["rush hour", "高峰期"]] },
  { id: "s14", level: "bridge", type: "short", topic: "media", text: "Social media helps people stay connected, but it can also waste time.", cn: "社交媒体帮助人们保持联系，但也可能浪费时间。", note: "平衡观点的基础句。", keywords: [["stay connected", "保持联系"], ["waste time", "浪费时间"]] },
  { id: "s15", level: "ielts", type: "short", topic: "education", text: "Education should teach students how to think, not just what to remember.", cn: "教育应该教学生如何思考，而不只是记住什么。", note: "教育类观点句。", keywords: [["not just", "不只是"], ["how to think", "如何思考"]] },
  { id: "s16", level: "ielts", type: "short", topic: "environment", text: "Small changes in daily life can make a real difference to the environment.", cn: "日常生活中的小改变能对环境产生真正影响。", note: "环境话题万能句。", keywords: [["make a difference", "产生影响"], ["daily life", "日常生活"]] },
  { id: "s17", level: "ielts", type: "short", topic: "work", text: "A good job should offer both financial security and personal growth.", cn: "一份好工作应该同时提供经济保障和个人成长。", note: "工作价值观表达。", keywords: [["financial security", "经济保障"], ["personal growth", "个人成长"]] },
  { id: "s18", level: "ielts", type: "short", topic: "technology", text: "Technology is useful only when it solves real problems.", cn: "科技只有在解决真实问题时才有用。", note: "科技话题观点句。", keywords: [["only when", "只有当"], ["real problems", "真实问题"]] },
  { id: "s19", level: "band7", type: "short", topic: "society", text: "A balanced policy needs to protect individual freedom while serving the public interest.", cn: "一项平衡的政策需要在服务公共利益的同时保护个人自由。", note: "Band 7 写作常用抽象表达。", keywords: [["balanced policy", "平衡的政策"], ["public interest", "公共利益"]] },
  { id: "s20", level: "band7", type: "short", topic: "culture", text: "Cultural traditions remain meaningful when people adapt them to modern life.", cn: "当人们把文化传统适应现代生活时，它们仍然有意义。", note: "文化类写作和口语句。", keywords: [["remain meaningful", "仍有意义"], ["adapt to", "适应"]] },
  { id: "l01", level: "foundation", type: "long", topic: "study", text: "When I learn a new sentence, I read it aloud several times and then try to use it in my own example.", cn: "当我学习一个新句子时，我会大声读几遍，然后尝试把它用在自己的例子里。", note: "when 引导时间状语从句，适合描述学习方法。", keywords: [["read aloud", "大声读"], ["several times", "几次"], ["my own example", "自己的例子"]] },
  { id: "l02", level: "foundation", type: "long", topic: "habit", text: "If I make a mistake, I write it down and review it the next day.", cn: "如果我犯错，我会把它写下来并在第二天复习。", note: "if 条件句，适合学习计划。", keywords: [["make a mistake", "犯错"], ["write it down", "写下来"], ["review", "复习"]] },
  { id: "l03", level: "bridge", type: "long", topic: "education", text: "Although online learning is flexible, students still need clear goals and regular feedback from teachers.", cn: "尽管在线学习很灵活，学生仍然需要明确目标和来自老师的定期反馈。", note: "although 让步从句 + 主句。", keywords: [["flexible", "灵活的"], ["clear goals", "明确目标"], ["regular feedback", "定期反馈"]] },
  { id: "l04", level: "bridge", type: "long", topic: "health", text: "Many teenagers know that exercise is important, but they often find it hard to keep a routine.", cn: "许多青少年知道锻炼很重要，但他们常常发现很难坚持规律。", note: "find it hard to do 结构。", keywords: [["teenagers", "青少年"], ["keep a routine", "保持规律"], ["exercise", "锻炼"]] },
  { id: "l05", level: "ielts", type: "long", topic: "environment", text: "Governments can encourage greener choices by improving public transport and making recycling easier for ordinary families.", cn: "政府可以通过改善公共交通、让普通家庭更容易回收来鼓励更环保的选择。", note: "by doing 表方式，适合 Task 2。", keywords: [["encourage", "鼓励"], ["greener choices", "更环保的选择"], ["ordinary families", "普通家庭"]] },
  { id: "l06", level: "ielts", type: "long", topic: "work", text: "People are more likely to enjoy their work when they feel respected and have opportunities to improve their skills.", cn: "当人们感到被尊重并有机会提升技能时，他们更可能享受工作。", note: "be likely to + when 从句。", keywords: [["be likely to", "很可能"], ["feel respected", "感到被尊重"], ["opportunities", "机会"]] },
  { id: "l07", level: "ielts", type: "long", topic: "technology", text: "While artificial intelligence can save time, it should not replace the human judgement needed in education and healthcare.", cn: "虽然人工智能可以节省时间，但它不应取代教育和医疗中所需的人类判断。", note: "while 引导让步，适合平衡观点。", keywords: [["artificial intelligence", "人工智能"], ["replace", "取代"], ["human judgement", "人类判断"]] },
  { id: "l08", level: "band7", type: "long", topic: "society", text: "Instead of treating economic growth as the only measure of success, societies should also consider health, equality and environmental quality.", cn: "社会不应把经济增长当作成功的唯一衡量标准，也应考虑健康、平等和环境质量。", note: "instead of doing + should also。", keywords: [["measure of success", "成功标准"], ["equality", "平等"], ["environmental quality", "环境质量"]] },
  { id: "l09", level: "band7", type: "long", topic: "media", text: "The main challenge is not the amount of information available online, but the ability to judge whether that information is reliable.", cn: "主要挑战不是网上可获得的信息量，而是判断这些信息是否可靠的能力。", note: "not A but B 强调结构。", keywords: [["available online", "网上可获得"], ["reliable", "可靠的"], ["ability to judge", "判断能力"]] },
  { id: "l10", level: "band7", type: "long", topic: "culture", text: "Museums and libraries can keep local history alive by turning it into stories that younger generations can understand and share.", cn: "博物馆和图书馆可以把地方历史变成年轻一代理解并分享的故事，从而让它保持生命力。", note: "keep sth alive + by doing。", keywords: [["local history", "地方历史"], ["younger generations", "年轻一代"], ["share", "分享"]] }
];

const dialogues = [
  { title: "在图书馆借书", level: "foundation", kind: "常用对话", lines: [
    ["A", "Excuse me, where can I find books about English writing?", "打扰一下，我在哪里能找到英语写作方面的书？"],
    ["B", "They are on the second floor, next to the language section.", "它们在二楼，语言区旁边。"],
    ["A", "Can I borrow two books at the same time?", "我可以同时借两本书吗？"],
    ["B", "Yes, but you need to return them within three weeks.", "可以，但你需要在三周内归还。"]
  ]},
  { title: "讨论学习计划", level: "bridge", kind: "常用对话", lines: [
    ["A", "I want to improve my speaking, but I do not know where to start.", "我想提高口语，但不知道从哪里开始。"],
    ["B", "Start with short answers, then expand them with reasons and examples.", "从短回答开始，然后用原因和例子扩展。"],
    ["A", "How often should I practise?", "我应该多久练一次？"],
    ["B", "Ten minutes every day is better than one long session once a week.", "每天十分钟比每周一次长时间练习更好。"]
  ]},
  { title: "雅思口语 Part 1：家乡", level: "ielts", kind: "常用对话", lines: [
    ["Examiner", "Do you like your hometown?", "你喜欢你的家乡吗？"],
    ["Candidate", "Yes, I do. It is not very big, but it is safe, friendly and easy to get around.", "喜欢。它不大，但安全、友好，出行方便。"],
    ["Examiner", "Has it changed much in recent years?", "它近年来变化大吗？"],
    ["Candidate", "Yes. There are more shopping centres and better public transport than before.", "是的。现在有更多购物中心，公共交通也比以前更好。"]
  ]},
  { title: "长对话：选择大学课程", level: "ielts", kind: "长对话", lines: [
    ["Mia", "I am thinking about taking environmental science, but I am worried about the amount of reading.", "我在考虑选环境科学，但担心阅读量太大。"],
    ["Leo", "The reading is heavy, but the course also includes fieldwork, so it is not only theoretical.", "阅读量确实大，但课程也包括实地考察，所以不只是理论。"],
    ["Mia", "That sounds useful. I learn better when I can connect ideas with real places.", "听起来很有用。当我能把观点和真实地点联系起来时，我学得更好。"],
    ["Leo", "Then it may suit you. The final project asks students to analyse a local environmental problem.", "那它可能适合你。期末项目要求学生分析一个本地环境问题。"],
    ["Mia", "In that case, I will talk to the tutor and check the reading list before I decide.", "这样的话，我会先和导师聊聊，并在决定前查看阅读清单。"]
  ]},
  { title: "长对话：城市生活与压力", level: "band7", kind: "长对话", lines: [
    ["A", "Many people move to large cities because they expect better jobs and better education.", "许多人搬到大城市，因为他们期待更好的工作和教育。"],
    ["B", "That is true, but the cost of living can make those opportunities less attractive.", "确实如此，但生活成本会让这些机会没那么有吸引力。"],
    ["A", "I suppose the problem is not city life itself, but whether cities are planned for ordinary residents.", "我想问题不在城市生活本身，而在城市是否为普通居民规划。"],
    ["B", "Exactly. Affordable housing, public transport and green spaces can reduce pressure significantly.", "正是如此。可负担住房、公共交通和绿色空间能显著减轻压力。"],
    ["A", "So a successful city should be efficient, but also humane.", "所以成功的城市应该高效，但也要有人情味。"]
  ]}
];

const articles = [
  { title: "Why Sentences Matter", level: "foundation", topic: "learning", cn: "为什么句子重要", sentences: [
    ["Words are easier to remember when they live inside sentences.", "当单词存在于句子中时，它们更容易被记住。"],
    ["A sentence shows grammar, meaning and situation at the same time.", "一个句子同时展示语法、意义和情境。"],
    ["If you read useful sentences aloud every day, your mouth slowly learns English patterns.", "如果你每天大声读有用的句子，你的嘴会慢慢学会英语模式。"]
  ]},
  { title: "A Better Study Routine", level: "bridge", topic: "study", cn: "更好的学习规律", sentences: [
    ["A good routine does not need to be complicated.", "好的学习规律不需要复杂。"],
    ["First, choose ten sentences that are connected to your current goal.", "首先，选择十个与你当前目标相关的句子。"],
    ["Next, listen to them, read them aloud, cover the Chinese meaning and say them again.", "接着，听它们，大声读，遮住中文意思，再说一遍。"],
    ["Finally, use two or three sentences in your own short speech.", "最后，把两三个句子用在你自己的简短表达中。"]
  ]},
  { title: "Technology and Learning", level: "ielts", topic: "technology", cn: "科技与学习", sentences: [
    ["Technology has changed the way students learn languages.", "科技改变了学生学习语言的方式。"],
    ["Online dictionaries, podcasts and video lessons can give learners more input than a single textbook.", "在线词典、播客和视频课程能给学习者比单本教材更多的输入。"],
    ["However, tools only become useful when learners use them with clear goals and regular practice.", "然而，只有当学习者带着明确目标并定期练习时，工具才会有用。"],
    ["For this reason, a simple daily plan is often more powerful than a long list of apps.", "因此，一个简单的每日计划往往比一长串应用更有力量。"]
  ]},
  { title: "From High School English to IELTS 7", level: "band7", topic: "ielts", cn: "从高中英语到雅思 7 分", sentences: [
    ["The journey from high school English to IELTS 7 is not a jump; it is a series of small upgrades.", "从高中英语到雅思 7 分不是一次跳跃，而是一系列小升级。"],
    ["Learners need to move from translating single words to understanding complete ideas.", "学习者需要从翻译单个单词转向理解完整思想。"],
    ["They also need to express opinions with reasons, examples and a clear sense of balance.", "他们还需要用原因、例子和清晰的平衡感来表达观点。"],
    ["Sentence recitation is useful because it builds the bridge between memory and real communication.", "句子背诵有用，是因为它在记忆和真实交流之间搭起桥梁。"]
  ]}
];

const resources = [
  { title: "British Council LearnEnglish", url: "https://learnenglish.britishcouncil.org/", desc: "分级阅读、听力、语法和口语材料，适合从高中水平逐步提升。" },
  { title: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish", desc: "短视频、新闻英语、发音和实用表达，适合每天 10 分钟输入。" },
  { title: "Cambridge Dictionary", url: "https://dictionary.cambridge.org/", desc: "查词、例句、英美发音、搭配和学习者词典释义。" },
  { title: "Oxford Learner's Dictionaries", url: "https://www.oxfordlearnersdictionaries.com/", desc: "适合学习者的英文释义、例句、词族和用法说明。" },
  { title: "IELTS Official", url: "https://ielts.org/", desc: "雅思考试官方信息、题型说明和备考建议。" },
  { title: "IELTS Liz", url: "https://ieltsliz.com/", desc: "清晰的雅思写作、口语、阅读和听力策略讲解。" },
  { title: "TED-Ed", url: "https://ed.ted.com/", desc: "短视频适合精听、复述和积累观点类表达。" },
  { title: "Breaking News English", url: "https://breakingnewsenglish.com/", desc: "分级新闻阅读和听力材料，适合练复述。" },
  { title: "Project Gutenberg", url: "https://www.gutenberg.org/", desc: "公版英文读物，可从短篇和简写友好的作品开始。" },
  { title: "推荐阅读：Charlotte's Web", url: "https://www.goodreads.com/book/show/24178.Charlotte_s_Web", desc: "语言清楚，适合从高中水平进入英文原版阅读。" },
  { title: "推荐阅读：The Little Prince", url: "https://www.goodreads.com/book/show/157993.The_Little_Prince", desc: "句子短、哲理性强，适合背诵优美表达。" },
  { title: "推荐阅读：Atomic Habits", url: "https://jamesclear.com/atomic-habits", desc: "非虚构写作清晰，适合积累学习、习惯和效率话题表达。" }
];

sentences.push(
  { id: "ex001", level: "foundation", type: "short", topic: "daily", text: "How have you been recently?", cn: "你最近怎么样？", note: "比 How are you 更适合熟人寒暄。", keywords: [["recently", "最近"], ["How have you been", "近况如何"]] },
  { id: "ex002", level: "foundation", type: "short", topic: "daily", text: "I am just looking around, thanks.", cn: "我只是随便看看，谢谢。", note: "购物或展览场景很常用。", keywords: [["look around", "四处看看"], ["just", "只是"]] },
  { id: "ex003", level: "foundation", type: "short", topic: "daily", text: "Could you give me a hand with this?", cn: "你能帮我一下这个吗？", note: "请求帮助，语气自然。", keywords: [["give me a hand", "帮我一把"], ["with this", "关于这个"]] },
  { id: "ex004", level: "foundation", type: "short", topic: "daily", text: "No worries. It happens all the time.", cn: "没关系。这种事经常发生。", note: "安慰别人时用。", keywords: [["No worries", "没关系"], ["all the time", "一直，经常"]] },
  { id: "ex005", level: "bridge", type: "short", topic: "daily", text: "I did not mean to interrupt you.", cn: "我不是有意打断你的。", note: "会议、课堂和聊天都适用。", keywords: [["mean to", "有意做"], ["interrupt", "打断"]] },
  { id: "ex006", level: "bridge", type: "short", topic: "daily", text: "Let's keep in touch after the course ends.", cn: "课程结束后我们保持联系吧。", note: "告别和社交场景。", keywords: [["keep in touch", "保持联系"], ["course", "课程"]] },
  { id: "ex007", level: "foundation", type: "short", topic: "study", text: "I missed the deadline by accident.", cn: "我不小心错过了截止日期。", note: "解释失误。", keywords: [["deadline", "截止日期"], ["by accident", "意外地"]] },
  { id: "ex008", level: "foundation", type: "short", topic: "study", text: "Could you explain this question in another way?", cn: "你能换一种方式解释这道题吗？", note: "课堂提问。", keywords: [["explain", "解释"], ["in another way", "用另一种方式"]] },
  { id: "ex009", level: "bridge", type: "short", topic: "study", text: "I need to catch up with the rest of the class.", cn: "我需要赶上班里的其他人。", note: "学习进度落后时用。", keywords: [["catch up with", "赶上"], ["the rest of", "其余的"]] },
  { id: "ex010", level: "bridge", type: "short", topic: "study", text: "This topic is difficult at first, but it becomes clearer with practice.", cn: "这个话题一开始很难，但练习后会更清楚。", note: "鼓励自己或别人。", keywords: [["at first", "起初"], ["with practice", "通过练习"]] },
  { id: "ex011", level: "ielts", type: "long", topic: "study", text: "Instead of memorising isolated words, I try to learn expressions that I can actually use in speaking and writing.", cn: "我不背孤立单词，而是学习那些我真的能在口语和写作中使用的表达。", note: "学习方法类长句。", keywords: [["instead of", "而不是"], ["isolated words", "孤立单词"], ["actually use", "真正使用"]] },
  { id: "ex012", level: "band7", type: "long", topic: "study", text: "A learner who reviews mistakes regularly is more likely to make steady progress than one who simply moves on to new exercises.", cn: "定期复盘错误的学习者，比只是一味做新练习的人更可能稳定进步。", note: "比较结构，可用于学习类写作。", keywords: [["regularly", "定期地"], ["steady progress", "稳定进步"], ["move on to", "继续转向"]] },
  { id: "ex013", level: "foundation", type: "short", topic: "travel", text: "Which platform does the train leave from?", cn: "这趟火车从哪个站台出发？", note: "车站高频句。", keywords: [["platform", "站台"], ["leave from", "从……出发"]] },
  { id: "ex014", level: "foundation", type: "short", topic: "travel", text: "Is this seat taken?", cn: "这个座位有人吗？", note: "火车、教室、咖啡店都能用。", keywords: [["seat", "座位"], ["taken", "被占用的"]] },
  { id: "ex015", level: "bridge", type: "short", topic: "travel", text: "I would like to change my ticket to an earlier flight.", cn: "我想把票改成更早的航班。", note: "机场改签。", keywords: [["change my ticket", "改签"], ["earlier flight", "更早的航班"]] },
  { id: "ex016", level: "ielts", type: "long", topic: "travel", text: "Travelling by train is often slower than flying, but it gives passengers more space and a better view of the countryside.", cn: "坐火车通常比坐飞机慢，但它给乘客更多空间，也能更好地欣赏乡村景色。", note: "旅行比较类表达。", keywords: [["passengers", "乘客"], ["countryside", "乡村"], ["view", "景色"]] },
  { id: "ex017", level: "foundation", type: "short", topic: "restaurant", text: "Could I see the menu, please?", cn: "我可以看一下菜单吗？", note: "餐厅第一句。", keywords: [["menu", "菜单"], ["Could I", "我可以……吗"]] },
  { id: "ex018", level: "foundation", type: "short", topic: "restaurant", text: "I would like this without onions.", cn: "我想要这份不要洋葱。", note: "点餐备注。", keywords: [["without", "不要，不带"], ["onions", "洋葱"]] },
  { id: "ex019", level: "bridge", type: "short", topic: "restaurant", text: "Could we have the bill when you have a moment?", cn: "你有空时可以给我们账单吗？", note: "礼貌结账。", keywords: [["bill", "账单"], ["when you have a moment", "你有空时"]] },
  { id: "ex020", level: "ielts", type: "long", topic: "restaurant", text: "Local restaurants can attract customers not only with good food, but also with friendly service and a comfortable atmosphere.", cn: "本地餐厅不仅能用好食物吸引顾客，也能用友好的服务和舒适的氛围吸引顾客。", note: "商业和生活话题。", keywords: [["not only...but also", "不仅……而且"], ["atmosphere", "氛围"], ["customers", "顾客"]] },
  { id: "ex021", level: "foundation", type: "short", topic: "shopping", text: "Do you have this in a smaller size?", cn: "这个有小一点的尺码吗？", note: "购物试衣。", keywords: [["size", "尺码"], ["smaller", "更小的"]] },
  { id: "ex022", level: "foundation", type: "short", topic: "shopping", text: "Can I return it if it does not fit?", cn: "如果不合适，我能退吗？", note: "退货前确认。", keywords: [["return", "退货"], ["fit", "合身，合适"]] },
  { id: "ex023", level: "bridge", type: "short", topic: "shopping", text: "The quality is good, but it is a little over my budget.", cn: "质量不错，但有点超出我的预算。", note: "砍价或婉拒。", keywords: [["quality", "质量"], ["over my budget", "超预算"]] },
  { id: "ex024", level: "ielts", type: "long", topic: "shopping", text: "Online shopping is convenient because people can compare prices quickly, but it may also encourage unnecessary spending.", cn: "网购很方便，因为人们可以快速比较价格，但它也可能鼓励不必要的消费。", note: "消费类雅思表达。", keywords: [["compare prices", "比较价格"], ["unnecessary spending", "不必要消费"], ["encourage", "促使"]] },
  { id: "ex025", level: "foundation", type: "short", topic: "hotel", text: "I have a reservation under the name Zhang.", cn: "我有一个姓张的预订。", note: "酒店入住。", keywords: [["reservation", "预订"], ["under the name", "以……名字"]] },
  { id: "ex026", level: "foundation", type: "short", topic: "hotel", text: "Could I have a room on a higher floor?", cn: "我可以要一间高楼层的房间吗？", note: "酒店需求。", keywords: [["higher floor", "更高楼层"], ["room", "房间"]] },
  { id: "ex027", level: "bridge", type: "short", topic: "hotel", text: "The air conditioner does not seem to be working.", cn: "空调好像坏了。", note: "报修。", keywords: [["air conditioner", "空调"], ["does not seem to", "似乎没有"]] },
  { id: "ex028", level: "ielts", type: "long", topic: "hotel", text: "A memorable hotel experience depends on small details, such as cleanliness, quiet rooms and staff who respond quickly.", cn: "一次难忘的酒店体验取决于小细节，比如清洁、安静的房间和反应迅速的员工。", note: "服务行业话题。", keywords: [["memorable", "难忘的"], ["cleanliness", "清洁"], ["respond quickly", "迅速回应"]] },
  { id: "ex029", level: "foundation", type: "short", topic: "health", text: "I have had a sore throat since yesterday.", cn: "我从昨天开始喉咙痛。", note: "看病描述症状。", keywords: [["sore throat", "喉咙痛"], ["since yesterday", "从昨天起"]] },
  { id: "ex030", level: "foundation", type: "short", topic: "health", text: "How often should I take this medicine?", cn: "这种药我多久吃一次？", note: "问用药频率。", keywords: [["how often", "多久一次"], ["medicine", "药"]] },
  { id: "ex031", level: "bridge", type: "short", topic: "health", text: "I feel much better after getting enough sleep.", cn: "睡够之后我感觉好多了。", note: "健康恢复。", keywords: [["feel much better", "感觉好多了"], ["enough sleep", "足够睡眠"]] },
  { id: "ex032", level: "ielts", type: "long", topic: "health", text: "Regular exercise is not only good for physical health, but it also helps people deal with stress more effectively.", cn: "规律运动不仅有益身体健康，也帮助人们更有效地应对压力。", note: "健康类观点句。", keywords: [["regular exercise", "规律运动"], ["deal with stress", "应对压力"], ["effectively", "有效地"]] },
  { id: "ex033", level: "foundation", type: "short", topic: "phone", text: "Could you speak a little more slowly?", cn: "你能说慢一点吗？", note: "电话听不清时用。", keywords: [["a little more slowly", "再慢一点"], ["speak", "说话"]] },
  { id: "ex034", level: "foundation", type: "short", topic: "phone", text: "I will send you the details by email.", cn: "我会把细节通过邮件发给你。", note: "电话后跟进。", keywords: [["details", "细节"], ["by email", "通过邮件"]] },
  { id: "ex035", level: "bridge", type: "short", topic: "phone", text: "Sorry, the line is not very clear on my side.", cn: "不好意思，我这边线路不太清楚。", note: "电话沟通。", keywords: [["line", "线路"], ["on my side", "我这边"]] },
  { id: "ex036", level: "ielts", type: "long", topic: "phone", text: "Written messages are useful for simple information, but complicated problems are often easier to solve through a real conversation.", cn: "文字消息适合简单信息，但复杂问题通常通过真实对话更容易解决。", note: "沟通方式比较。", keywords: [["written messages", "文字消息"], ["complicated", "复杂的"], ["real conversation", "真实对话"]] },
  { id: "ex037", level: "foundation", type: "short", topic: "work", text: "I am interested in this position.", cn: "我对这个职位感兴趣。", note: "面试开场。", keywords: [["be interested in", "对……感兴趣"], ["position", "职位"]] },
  { id: "ex038", level: "foundation", type: "short", topic: "work", text: "I am good at organising information.", cn: "我擅长整理信息。", note: "自我介绍能力。", keywords: [["be good at", "擅长"], ["organising information", "整理信息"]] },
  { id: "ex039", level: "bridge", type: "short", topic: "work", text: "I learned how to work under pressure during the project.", cn: "我在项目中学会了如何在压力下工作。", note: "面试经历描述。", keywords: [["under pressure", "在压力下"], ["during the project", "在项目期间"]] },
  { id: "ex040", level: "ielts", type: "long", topic: "work", text: "Employers value people who can communicate clearly, solve problems independently and keep learning new skills.", cn: "雇主重视那些能清楚沟通、独立解决问题并持续学习新技能的人。", note: "工作类雅思表达。", keywords: [["employers", "雇主"], ["independently", "独立地"], ["keep learning", "持续学习"]] },
  { id: "ex041", level: "bridge", type: "short", topic: "opinion", text: "I see your point, but I have a different view.", cn: "我明白你的观点，但我有不同看法。", note: "礼貌反驳。", keywords: [["see your point", "明白你的观点"], ["different view", "不同看法"]] },
  { id: "ex042", level: "bridge", type: "short", topic: "opinion", text: "There are two sides to this issue.", cn: "这个问题有两面。", note: "平衡讨论开场。", keywords: [["two sides", "两面"], ["issue", "问题，议题"]] },
  { id: "ex043", level: "ielts", type: "long", topic: "opinion", text: "I partly agree with this view because it recognises the benefits of technology without ignoring its possible risks.", cn: "我部分同意这个观点，因为它承认科技的好处，同时没有忽视其可能风险。", note: "雅思写作让步句。", keywords: [["partly agree", "部分同意"], ["recognise", "承认"], ["possible risks", "可能风险"]] },
  { id: "ex044", level: "band7", type: "long", topic: "opinion", text: "A more reasonable solution would be to combine personal responsibility with support from schools, families and the wider community.", cn: "更合理的解决方案是把个人责任与学校、家庭和更广泛社区的支持结合起来。", note: "解决方案类 Band 7 句。", keywords: [["reasonable solution", "合理方案"], ["combine", "结合"], ["wider community", "更广泛社区"]] },
  { id: "ex045", level: "foundation", type: "short", topic: "ielts", text: "I would like to talk about a book that changed my way of thinking.", cn: "我想谈一本改变我思维方式的书。", note: "Part 2 开头句。", keywords: [["talk about", "谈论"], ["way of thinking", "思维方式"]] },
  { id: "ex046", level: "bridge", type: "short", topic: "ielts", text: "The first reason is that it is closely related to my daily life.", cn: "第一个原因是它和我的日常生活密切相关。", note: "Part 3 和写作都能用。", keywords: [["closely related to", "与……密切相关"], ["daily life", "日常生活"]] },
  { id: "ex047", level: "ielts", type: "long", topic: "ielts", text: "What impressed me most was not the story itself, but the way the writer described ordinary people with warmth and humour.", cn: "最打动我的不是故事本身，而是作者用温暖和幽默描写普通人的方式。", note: "Part 2 高分描述。", keywords: [["What impressed me most", "最打动我的是"], ["ordinary people", "普通人"], ["warmth and humour", "温暖和幽默"]] },
  { id: "ex048", level: "band7", type: "long", topic: "ielts", text: "If I had to describe the experience in one word, I would say it was eye-opening because it made me question many assumptions I used to take for granted.", cn: "如果必须用一个词描述这次经历，我会说它开阔眼界，因为它让我质疑许多过去认为理所当然的假设。", note: "口语 Part 2/3 高阶句。", keywords: [["eye-opening", "开阔眼界的"], ["assumptions", "假设"], ["take for granted", "认为理所当然"]] },
  { id: "ex049", level: "ielts", type: "long", topic: "academic", text: "The chart shows a steady increase in the number of students choosing online courses between 2015 and 2025.", cn: "图表显示，2015 到 2025 年间选择在线课程的学生人数稳步上升。", note: "Task 1 图表描述。", keywords: [["steady increase", "稳步上升"], ["the number of", "……的数量"], ["between...and", "在……之间"]] },
  { id: "ex050", level: "ielts", type: "long", topic: "academic", text: "One possible explanation for this trend is that flexible learning has become more acceptable to both students and employers.", cn: "这一趋势的一个可能解释是，灵活学习已经更被学生和雇主接受。", note: "Task 1/2 解释趋势。", keywords: [["possible explanation", "可能解释"], ["trend", "趋势"], ["acceptable", "可接受的"]] },
  { id: "ex051", level: "band7", type: "long", topic: "academic", text: "While the data does not prove a direct causal relationship, it does suggest a strong connection between access to technology and learning opportunities.", cn: "虽然数据不能证明直接因果关系，但它确实表明技术可及性和学习机会之间存在强关联。", note: "学术谨慎表达。", keywords: [["causal relationship", "因果关系"], ["suggest", "表明"], ["access to", "获得……的机会"]] },
  { id: "ex052", level: "band7", type: "long", topic: "academic", text: "It is important to distinguish between short-term convenience and long-term educational value when evaluating digital tools.", cn: "评估数字工具时，区分短期便利和长期教育价值很重要。", note: "抽象论证句。", keywords: [["distinguish between", "区分"], ["short-term", "短期的"], ["educational value", "教育价值"]] },
  { id: "ex053", level: "foundation", type: "short", topic: "feeling", text: "I felt nervous at first, but I soon calmed down.", cn: "我一开始很紧张，但很快平静下来。", note: "讲经历时常用。", keywords: [["nervous", "紧张的"], ["calm down", "平静下来"]] },
  { id: "ex054", level: "bridge", type: "short", topic: "feeling", text: "I was disappointed with the result, but I learned a lot from the process.", cn: "我对结果失望，但从过程中学到了很多。", note: "反思表达。", keywords: [["be disappointed with", "对……失望"], ["process", "过程"]] },
  { id: "ex055", level: "ielts", type: "long", topic: "culture", text: "Traditional festivals are valuable because they give people a sense of identity and bring families together.", cn: "传统节日很有价值，因为它们给人身份认同感，并让家人团聚。", note: "文化话题。", keywords: [["sense of identity", "身份认同感"], ["bring families together", "让家人团聚"]] },
  { id: "ex056", level: "band7", type: "long", topic: "culture", text: "Preserving cultural heritage does not mean rejecting change; it means choosing what should be carried into the future.", cn: "保护文化遗产并不意味着拒绝变化，而是选择哪些东西应该被带向未来。", note: "文化类高分观点。", keywords: [["preserve", "保护"], ["heritage", "遗产"], ["rejecting change", "拒绝变化"]] },
  { id: "ex057", level: "ielts", type: "long", topic: "environment", text: "Individuals can reduce waste by carrying reusable bags, avoiding single-use plastic and buying only what they need.", cn: "个人可以通过携带可重复使用的袋子、避免一次性塑料、只买需要的东西来减少浪费。", note: "环境措施句。", keywords: [["reusable", "可重复使用的"], ["single-use plastic", "一次性塑料"], ["reduce waste", "减少浪费"]] },
  { id: "ex058", level: "band7", type: "long", topic: "environment", text: "Environmental protection becomes more realistic when governments make green choices affordable and convenient for ordinary people.", cn: "当政府让绿色选择对普通人来说负担得起且方便时，环保会变得更现实。", note: "环境政策句。", keywords: [["realistic", "现实可行的"], ["affordable", "负担得起的"], ["ordinary people", "普通人"]] },
  { id: "ex059", level: "ielts", type: "long", topic: "media", text: "News on social media spreads quickly, but readers need to check whether the source is trustworthy.", cn: "社交媒体上的新闻传播很快，但读者需要核查来源是否可靠。", note: "媒体话题。", keywords: [["spread quickly", "快速传播"], ["source", "来源"], ["trustworthy", "可靠的"]] },
  { id: "ex060", level: "band7", type: "long", topic: "technology", text: "The purpose of technology should be to extend human ability rather than weaken people's capacity to think independently.", cn: "科技的目的应是扩展人的能力，而不是削弱人独立思考的能力。", note: "科技抽象观点。", keywords: [["extend", "扩展"], ["capacity", "能力"], ["think independently", "独立思考"]] }
);

dialogues.push(
  { title: "咖啡店点单", level: "foundation", kind: "常用对话", topic: "restaurant", lines: [
    ["Customer", "Could I have a medium latte, please?", "我可以要一杯中杯拿铁吗？"],
    ["Staff", "Sure. Would you like it hot or iced?", "当然。您要热的还是冰的？"],
    ["Customer", "Iced, please. And can I have less sugar?", "冰的。可以少糖吗？"],
    ["Staff", "No problem. That will be four dollars.", "没问题。一共四美元。"]
  ]},
  { title: "餐厅投诉：菜上错了", level: "bridge", kind: "常用对话", topic: "restaurant", lines: [
    ["Guest", "Excuse me, I think this is not what I ordered.", "不好意思，我想这不是我点的。"],
    ["Waiter", "I am sorry about that. What did you order?", "非常抱歉。您点的是什么？"],
    ["Guest", "I ordered the chicken salad, but this is a beef sandwich.", "我点的是鸡肉沙拉，但这是牛肉三明治。"],
    ["Waiter", "I will replace it right away.", "我马上为您更换。"]
  ]},
  { title: "商店退货", level: "bridge", kind: "常用对话", topic: "shopping", lines: [
    ["Customer", "I bought this jacket yesterday, but it does not fit me well.", "我昨天买了这件夹克，但不太合身。"],
    ["Assistant", "Do you have the receipt with you?", "您带小票了吗？"],
    ["Customer", "Yes, here it is. Can I exchange it for a larger size?", "带了，在这里。我可以换大一号吗？"],
    ["Assistant", "Of course. Let me check the stock for you.", "当然。我帮您查一下库存。"]
  ]},
  { title: "酒店入住", level: "foundation", kind: "常用对话", topic: "hotel", lines: [
    ["Guest", "Hello, I have a reservation for two nights.", "你好，我预订了两晚。"],
    ["Receptionist", "May I have your name and passport, please?", "请问您的姓名和护照？"],
    ["Guest", "Sure. Is breakfast included?", "当然。包含早餐吗？"],
    ["Receptionist", "Yes, breakfast is served from seven to ten.", "包含。早餐从七点供应到十点。"]
  ]},
  { title: "看医生", level: "bridge", kind: "常用对话", topic: "health", lines: [
    ["Doctor", "What seems to be the problem?", "你哪里不舒服？"],
    ["Patient", "I have a headache and a sore throat.", "我头疼，喉咙也痛。"],
    ["Doctor", "How long have you had these symptoms?", "这些症状持续多久了？"],
    ["Patient", "Since yesterday morning.", "从昨天早上开始。"],
    ["Doctor", "Get some rest and drink plenty of water.", "多休息，多喝水。"]
  ]},
  { title: "电话预约", level: "bridge", kind: "常用对话", topic: "phone", lines: [
    ["Caller", "Good afternoon. I would like to make an appointment.", "下午好。我想预约。"],
    ["Receptionist", "Certainly. What day would be convenient for you?", "当然。您哪一天方便？"],
    ["Caller", "Would Friday morning be possible?", "周五上午可以吗？"],
    ["Receptionist", "Yes. We have an opening at ten thirty.", "可以。我们十点半有空档。"]
  ]},
  { title: "工作面试", level: "ielts", kind: "长对话", topic: "work", lines: [
    ["Interviewer", "Could you tell me why you are interested in this position?", "你能告诉我为什么对这个职位感兴趣吗？"],
    ["Candidate", "I am interested because the role combines communication, research and problem-solving, which are areas I would like to develop.", "我感兴趣是因为这个岗位结合了沟通、研究和问题解决，这些都是我想发展的领域。"],
    ["Interviewer", "Can you give me an example of working under pressure?", "你能举一个在压力下工作的例子吗？"],
    ["Candidate", "During a school project, our deadline was moved forward, so I helped the team divide tasks and finish the report on time.", "在一个学校项目中，截止日期提前了，所以我帮助团队分工并按时完成报告。"],
    ["Interviewer", "What did you learn from that experience?", "你从那次经历中学到了什么？"],
    ["Candidate", "I learned that clear communication can reduce stress and make a team more efficient.", "我学到清晰沟通可以减轻压力并让团队更高效。"]
  ]},
  { title: "雅思口语 Part 2：难忘旅行", level: "ielts", kind: "长对话", topic: "ielts", lines: [
    ["Examiner", "Describe a trip that you remember well.", "描述一次你记忆深刻的旅行。"],
    ["Candidate", "I would like to talk about a short trip to a coastal city last summer.", "我想谈谈去年夏天去一个海滨城市的短途旅行。"],
    ["Candidate", "What made it memorable was not the place itself, but the fact that I travelled with my closest friends after a stressful exam period.", "让它难忘的不是地点本身，而是在紧张考试期后我和最亲近的朋友一起旅行。"],
    ["Candidate", "We walked along the beach, tried local food and talked about our future plans.", "我们沿着海滩散步，尝了当地食物，并聊了未来计划。"],
    ["Candidate", "The trip helped me realise that rest is not a waste of time; it can give people energy to move forward.", "这次旅行让我意识到休息不是浪费时间；它能给人继续前进的能量。"]
  ]},
  { title: "学术讨论：是否应该限制手机", level: "band7", kind: "长对话", topic: "academic", lines: [
    ["Tutor", "Do you think schools should ban smartphones completely?", "你认为学校应该完全禁止智能手机吗？"],
    ["Student", "A complete ban may be too simple because phones can also support learning when used properly.", "完全禁止可能过于简单，因为手机如果使用得当也能支持学习。"],
    ["Tutor", "What would be a more balanced approach?", "更平衡的方法是什么？"],
    ["Student", "Schools could limit phones during lessons but allow them for research, translation and emergency communication.", "学校可以在课堂期间限制手机，但允许它们用于研究、翻译和紧急沟通。"],
    ["Tutor", "So the key issue is not the device itself.", "所以关键问题不是设备本身。"],
    ["Student", "Exactly. The key is whether students have clear rules and enough self-discipline.", "正是。关键在于学生是否有清晰规则和足够自律。"]
  ]}
);

articles.push(
  { title: "A Day in a New City", level: "foundation", topic: "travel", cn: "在新城市的一天", sentences: [
    ["When you arrive in a new city, start with simple questions.", "当你到达一个新城市时，从简单问题开始。"],
    ["Ask where the station is, how much the ticket costs and which bus you should take.", "问车站在哪里、票价多少、应该坐哪辆公交。"],
    ["These small sentences help you solve real problems and build confidence.", "这些小句子帮助你解决真实问题并建立信心。"]
  ]},
  { title: "Eating Out Politely", level: "bridge", topic: "restaurant", cn: "礼貌外出就餐", sentences: [
    ["In a restaurant, polite language makes communication smoother.", "在餐厅里，礼貌语言让沟通更顺畅。"],
    ["Instead of saying I want this, you can say I would like this, please.", "与其说 I want this，你可以说 I would like this, please。"],
    ["If there is a problem, explain it calmly and ask for a solution.", "如果有问题，冷静解释并请求解决方案。"]
  ]},
  { title: "Shopping and Choice", level: "bridge", topic: "shopping", cn: "购物与选择", sentences: [
    ["Shopping is not only about price; it is also about quality and need.", "购物不只是价格问题，也关乎质量和需求。"],
    ["A cheap product may become expensive if it breaks quickly.", "如果一个便宜产品很快坏掉，它可能反而变贵。"],
    ["Before buying something, it is useful to ask whether you will really use it.", "买东西前，问问自己是否真的会使用它是有用的。"]
  ]},
  { title: "Health Is a Daily Choice", level: "ielts", topic: "health", cn: "健康是每日选择", sentences: [
    ["Health is often shaped by small daily choices rather than one big decision.", "健康往往由日常小选择塑造，而不是由一个重大决定决定。"],
    ["Sleeping well, eating regularly and moving your body can improve both energy and mood.", "睡得好、规律饮食和活动身体能同时改善精力和情绪。"],
    ["For students, good health is not separate from study; it is the foundation of effective learning.", "对学生来说，健康并不与学习分离；它是高效学习的基础。"]
  ]},
  { title: "Work Skills for the Future", level: "ielts", topic: "work", cn: "面向未来的工作技能", sentences: [
    ["Future workers will need more than technical knowledge.", "未来工作者需要的不只是技术知识。"],
    ["They will also need to communicate clearly, learn quickly and work with people from different backgrounds.", "他们还需要清晰沟通、快速学习，并与不同背景的人合作。"],
    ["For this reason, schools should give students more chances to solve real problems in teams.", "因此，学校应该给学生更多团队解决真实问题的机会。"]
  ]},
  { title: "How to Build an IELTS Answer", level: "ielts", topic: "ielts", cn: "如何构建雅思回答", sentences: [
    ["A strong IELTS answer usually has three parts: a clear opinion, a reason and a specific example.", "一个有力的雅思回答通常有三部分：清晰观点、原因和具体例子。"],
    ["The opinion tells the examiner what you think.", "观点告诉考官你的想法。"],
    ["The reason explains why you think so, and the example makes your answer believable.", "原因解释你为什么这么想，例子让回答可信。"],
    ["If you practise this structure with familiar topics, you will sound more organised under pressure.", "如果你用熟悉话题练习这个结构，在压力下会听起来更有条理。"]
  ]},
  { title: "A Balanced View of Technology", level: "band7", topic: "technology", cn: "对科技的平衡看法", sentences: [
    ["Technology should be judged by the quality of problems it solves, not by how modern it appears.", "评价科技应看它解决问题的质量，而不是它看起来多现代。"],
    ["A tool that saves time but reduces deep thinking may not be truly helpful in education.", "一个节省时间却削弱深度思考的工具，在教育中未必真正有帮助。"],
    ["The best use of technology is to support human judgement rather than replace it.", "科技的最佳用途是支持人类判断，而不是取代它。"]
  ]},
  { title: "City Life and Human Needs", level: "band7", topic: "city", cn: "城市生活与人的需求", sentences: [
    ["A successful city is not simply a place with tall buildings and fast transport.", "成功的城市并不只是一个拥有高楼和快速交通的地方。"],
    ["It should also provide affordable homes, safe public spaces and a sense of belonging.", "它还应提供可负担住房、安全公共空间和归属感。"],
    ["When urban planning ignores human needs, efficiency can easily turn into pressure.", "当城市规划忽视人的需求时，效率很容易变成压力。"]
  ]}
);

const extraSentences = [
  { id: "x001", level: "foundation", type: "short", topic: "daily", text: "Nice to meet you. I have heard a lot about you.", cn: "很高兴见到你。我听说过很多关于你的事。", note: "初次见面更自然的寒暄。", keywords: [["nice to meet you", "初次见面"], ["hear a lot about", "听说很多"]] },
  { id: "x002", level: "foundation", type: "short", topic: "daily", text: "I am sorry I am late. The traffic was heavier than I expected.", cn: "抱歉我迟到了。交通比我预想的更堵。", note: "解释迟到，原因清楚。", keywords: [["heavier than expected", "比预期更严重"], ["traffic", "交通"]] },
  { id: "x003", level: "foundation", type: "short", topic: "daily", text: "Could you give me a hand with this bag?", cn: "你能帮我拿一下这个包吗？", note: "give me a hand 表示帮忙。", keywords: [["give me a hand", "帮我一下"], ["with this bag", "处理这个包"]] },
  { id: "x004", level: "foundation", type: "short", topic: "daily", text: "No worries. It happens all the time.", cn: "没关系。这种事经常发生。", note: "回应道歉，比 never mind 更口语。", keywords: [["no worries", "没事"], ["all the time", "经常"]] },
  { id: "x005", level: "bridge", type: "short", topic: "daily", text: "I would love to join you, but I already have plans tonight.", cn: "我很想和你一起去，但今晚已经有安排了。", note: "礼貌拒绝邀请。", keywords: [["would love to", "很想"], ["already have plans", "已有安排"]] },
  { id: "x006", level: "bridge", type: "short", topic: "daily", text: "Let us catch up sometime next week when we are both free.", cn: "我们下周都有空的时候再聊聊吧。", note: "约时间叙旧。", keywords: [["catch up", "叙旧/聊近况"], ["sometime next week", "下周某个时间"]] },

  { id: "x010", level: "foundation", type: "short", topic: "study", text: "Could you explain this grammar point in a simpler way?", cn: "你能用更简单的方式解释这个语法点吗？", note: "课堂提问常用。", keywords: [["grammar point", "语法点"], ["in a simpler way", "用更简单的方式"]] },
  { id: "x011", level: "foundation", type: "short", topic: "study", text: "I missed the main idea of the passage.", cn: "我没抓住这篇文章的主旨。", note: "阅读复盘句。", keywords: [["miss", "没抓住"], ["main idea", "主旨"]] },
  { id: "x012", level: "bridge", type: "short", topic: "study", text: "I can understand the sentence, but I cannot use it naturally yet.", cn: "我能理解这个句子，但还不能自然使用它。", note: "描述学习瓶颈。", keywords: [["use it naturally", "自然使用"], ["yet", "还没有"]] },
  { id: "x013", level: "bridge", type: "long", topic: "study", text: "The best way to prepare for a speaking test is to practise answering familiar questions until your answers sound clear and natural.", cn: "准备口语考试的最好方法，是练习回答熟悉的问题，直到答案听起来自然清楚。", note: "until 引导结果目标。", keywords: [["prepare for", "准备"], ["familiar questions", "熟悉的问题"], ["clear and natural", "清楚自然"]] },
  { id: "x014", level: "ielts", type: "long", topic: "study", text: "Instead of memorising isolated words, learners should collect useful sentence patterns and reuse them in different topics.", cn: "学习者不应背孤立单词，而应收集有用句型，并在不同话题中重复使用。", note: "学习方法类观点句。", keywords: [["isolated words", "孤立单词"], ["sentence patterns", "句型"], ["reuse", "重复使用"]] },

  { id: "x020", level: "foundation", type: "short", topic: "travel", text: "Which platform does the train leave from?", cn: "这趟火车从哪个站台出发？", note: "车站高频句。", keywords: [["platform", "站台"], ["leave from", "从……出发"]] },
  { id: "x021", level: "foundation", type: "short", topic: "travel", text: "Is this seat taken?", cn: "这个座位有人吗？", note: "火车、图书馆、咖啡馆都可用。", keywords: [["seat", "座位"], ["taken", "被占用的"]] },
  { id: "x022", level: "bridge", type: "short", topic: "travel", text: "I would like a one-way ticket to the city centre, please.", cn: "我想买一张去市中心的单程票。", note: "购票完整句。", keywords: [["one-way ticket", "单程票"], ["city centre", "市中心"]] },
  { id: "x023", level: "bridge", type: "long", topic: "travel", text: "If the next bus is too crowded, we can wait for another one because we are not in a hurry.", cn: "如果下一班公交太挤，我们可以等另一班，因为我们不着急。", note: "if + because 双从句。", keywords: [["crowded", "拥挤"], ["another one", "另一辆"], ["in a hurry", "着急"]] },
  { id: "x024", level: "ielts", type: "long", topic: "travel", text: "Travelling by train can be slower than flying, but it often gives passengers a more comfortable and less stressful experience.", cn: "坐火车可能比坐飞机慢，但它通常给乘客更舒适、更少压力的体验。", note: "旅游/交通比较句。", keywords: [["passengers", "乘客"], ["less stressful", "压力更小"], ["experience", "体验"]] },

  { id: "x030", level: "foundation", type: "short", topic: "restaurant", text: "Could I see the menu, please?", cn: "我可以看一下菜单吗？", note: "餐厅开场句。", keywords: [["menu", "菜单"], ["could I", "我可以……吗"]] },
  { id: "x031", level: "foundation", type: "short", topic: "restaurant", text: "I would like the chicken salad without onions.", cn: "我想要鸡肉沙拉，不要洋葱。", note: "点餐 + 去掉配料。", keywords: [["would like", "想要"], ["without onions", "不要洋葱"]] },
  { id: "x032", level: "bridge", type: "short", topic: "restaurant", text: "Could we have the bill when you have a moment?", cn: "你有空的时候可以给我们账单吗？", note: "礼貌结账。", keywords: [["bill", "账单"], ["when you have a moment", "你有空时"]] },
  { id: "x033", level: "bridge", type: "long", topic: "restaurant", text: "The food was excellent, but the service was a little slow because the restaurant was extremely busy.", cn: "食物很好，但服务有点慢，因为餐厅特别忙。", note: "评价体验，可用于口语。", keywords: [["excellent", "极好的"], ["service", "服务"], ["extremely busy", "特别忙"]] },

  { id: "x040", level: "foundation", type: "short", topic: "shopping", text: "How much is this jacket?", cn: "这件夹克多少钱？", note: "购物基础句。", keywords: [["how much", "多少钱"], ["jacket", "夹克"]] },
  { id: "x041", level: "foundation", type: "short", topic: "shopping", text: "Do you have this in a smaller size?", cn: "这个有小一点的尺码吗？", note: "试衣常用句。", keywords: [["smaller size", "小一号"], ["have this in", "有这个……的吗"]] },
  { id: "x042", level: "bridge", type: "short", topic: "shopping", text: "I would like to return this because it does not fit me well.", cn: "我想退掉这个，因为它不太合身。", note: "退货场景完整句。", keywords: [["return", "退货"], ["fit", "合身"]] },
  { id: "x043", level: "bridge", type: "long", topic: "shopping", text: "Before buying something online, I usually check the reviews to see whether the product is reliable.", cn: "网购前，我通常查看评论，看看产品是否可靠。", note: "网购经验句。", keywords: [["reviews", "评论"], ["whether", "是否"], ["reliable", "可靠"]] },

  { id: "x050", level: "foundation", type: "short", topic: "hotel", text: "I have a reservation under the name Li.", cn: "我用李这个名字订了房。", note: "酒店入住必备。", keywords: [["reservation", "预订"], ["under the name", "以……名字"]] },
  { id: "x051", level: "foundation", type: "short", topic: "hotel", text: "Could I check out a little later?", cn: "我可以晚一点退房吗？", note: "延迟退房。", keywords: [["check out", "退房"], ["a little later", "晚一点"]] },
  { id: "x052", level: "bridge", type: "short", topic: "hotel", text: "The air conditioner in my room does not seem to work.", cn: "我房间的空调好像不能用。", note: "投诉设备问题。", keywords: [["air conditioner", "空调"], ["does not seem to", "似乎不"]] },
  { id: "x053", level: "bridge", type: "long", topic: "hotel", text: "I enjoyed the location of the hotel because it was close to the station and easy to find at night.", cn: "我喜欢这家酒店的位置，因为它离车站近，晚上也容易找到。", note: "住宿评价句。", keywords: [["location", "位置"], ["close to", "靠近"], ["easy to find", "容易找到"]] },

  { id: "x060", level: "foundation", type: "short", topic: "health", text: "I have had a headache since this morning.", cn: "我从今天早上开始头疼。", note: "现在完成时表达持续症状。", keywords: [["headache", "头疼"], ["since this morning", "从今天早上起"]] },
  { id: "x061", level: "foundation", type: "short", topic: "health", text: "Do I need to take this medicine after meals?", cn: "我需要饭后服这种药吗？", note: "用药询问。", keywords: [["medicine", "药"], ["after meals", "饭后"]] },
  { id: "x062", level: "bridge", type: "short", topic: "health", text: "I feel much better than yesterday, but I still need some rest.", cn: "我感觉比昨天好多了，但仍然需要休息。", note: "描述恢复情况。", keywords: [["much better", "好多了"], ["some rest", "休息"]] },
  { id: "x063", level: "ielts", type: "long", topic: "health", text: "A healthy lifestyle is not only about exercise; it also includes sleep, diet and the ability to manage stress.", cn: "健康的生活方式不只关乎锻炼，还包括睡眠、饮食和管理压力的能力。", note: "健康话题雅思观点句。", keywords: [["not only", "不只是"], ["diet", "饮食"], ["manage stress", "管理压力"]] },

  { id: "x070", level: "foundation", type: "short", topic: "phone", text: "May I speak to Mr. Brown, please?", cn: "请问我可以和布朗先生通话吗？", note: "电话开场。", keywords: [["may I speak to", "我可以和……通话吗"], ["please", "礼貌语气"]] },
  { id: "x071", level: "foundation", type: "short", topic: "phone", text: "Could you leave a message for me?", cn: "你能给我留个口信吗？", note: "电话留言。", keywords: [["leave a message", "留言"], ["for me", "给我"]] },
  { id: "x072", level: "bridge", type: "short", topic: "phone", text: "I am writing to ask whether the position is still available.", cn: "我写信是想询问这个职位是否仍然开放。", note: "正式邮件句。", keywords: [["I am writing to", "我写信是为了"], ["available", "可用/开放"]] },
  { id: "x073", level: "ielts", type: "long", topic: "phone", text: "Please let me know if you need any further information, and I would be happy to provide it.", cn: "如果你需要更多信息，请告诉我，我很乐意提供。", note: "邮件结尾常用句。", keywords: [["further information", "更多信息"], ["be happy to", "很乐意"]] },

  { id: "x080", level: "foundation", type: "short", topic: "work", text: "I am interested in this position because it matches my skills.", cn: "我对这个职位感兴趣，因为它符合我的技能。", note: "面试基础句。", keywords: [["be interested in", "对……感兴趣"], ["match my skills", "符合我的技能"]] },
  { id: "x081", level: "bridge", type: "short", topic: "work", text: "One of my strengths is that I learn quickly and ask questions when necessary.", cn: "我的优势之一是学得快，并且必要时会提问。", note: "面试优势句。", keywords: [["strength", "优势"], ["when necessary", "必要时"]] },
  { id: "x082", level: "ielts", type: "long", topic: "work", text: "A meaningful career should provide opportunities to solve problems, work with others and continue learning.", cn: "有意义的职业应该提供解决问题、与他人合作并持续学习的机会。", note: "工作类价值观句。", keywords: [["meaningful career", "有意义的职业"], ["opportunities", "机会"], ["continue learning", "持续学习"]] },
  { id: "x083", level: "band7", type: "long", topic: "work", text: "In a changing economy, employees need transferable skills such as communication, problem-solving and the ability to learn independently.", cn: "在变化的经济中，员工需要沟通、解决问题和独立学习等可迁移技能。", note: "Band 7 工作/教育通用句。", keywords: [["changing economy", "变化的经济"], ["transferable skills", "可迁移技能"], ["independently", "独立地"]] },

  { id: "x090", level: "bridge", type: "short", topic: "opinion", text: "I see your point, but I look at it differently.", cn: "我明白你的观点，但我有不同看法。", note: "礼貌反驳。", keywords: [["see your point", "明白你的观点"], ["differently", "不同地"]] },
  { id: "x091", level: "bridge", type: "short", topic: "opinion", text: "There are two sides to this question.", cn: "这个问题有两个方面。", note: "观点讨论开头。", keywords: [["two sides", "两个方面"], ["question", "问题"]] },
  { id: "x092", level: "ielts", type: "long", topic: "opinion", text: "This may be true in some cases, but it does not mean that the same solution will work everywhere.", cn: "这在某些情况下可能是真的，但并不意味着同一种解决方案到处都有效。", note: "让步 + 限定，雅思口语高分结构。", keywords: [["in some cases", "在某些情况下"], ["solution", "解决方案"], ["work everywhere", "到处有效"]] },
  { id: "x093", level: "band7", type: "long", topic: "opinion", text: "Rather than choosing one extreme, it is wiser to find a practical balance between efficiency and fairness.", cn: "与其选择一个极端，不如在效率和公平之间找到实际的平衡。", note: "抽象议论文万能句。", keywords: [["rather than", "与其"], ["practical balance", "实际平衡"], ["fairness", "公平"]] },

  { id: "x100", level: "ielts", type: "short", topic: "ielts", text: "I have never thought about this question before, but I would say yes.", cn: "我以前从没想过这个问题，但我会说是的。", note: "雅思口语卡住时自然开头。", keywords: [["never thought about", "从未想过"], ["I would say", "我会说"]] },
  { id: "x101", level: "ielts", type: "short", topic: "ielts", text: "A good example from my own life is my English learning experience.", cn: "我自己生活中的一个好例子是我的英语学习经历。", note: "举例过渡句。", keywords: [["a good example", "一个好例子"], ["from my own life", "来自我自己的生活"]] },
  { id: "x102", level: "ielts", type: "long", topic: "ielts", text: "If I had to choose one important skill for young people, I would choose communication because it affects almost every part of life.", cn: "如果必须为年轻人选择一项重要技能，我会选择沟通，因为它几乎影响生活的每个部分。", note: "假设回答句，适合 Part 3。", keywords: [["if I had to choose", "如果必须选择"], ["communication", "沟通"], ["affect", "影响"]] },
  { id: "x103", level: "band7", type: "long", topic: "ielts", text: "What matters most is not whether a person makes mistakes, but whether they can learn from them and keep improving.", cn: "最重要的不是一个人是否犯错，而是他们能否从错误中学习并持续进步。", note: "not whether..., but whether... 高分结构。", keywords: [["what matters most", "最重要的是"], ["learn from", "从……学习"], ["keep improving", "持续进步"]] },

  { id: "x110", level: "ielts", type: "long", topic: "academic", text: "One possible explanation is that people are more willing to change their behaviour when they can see immediate benefits.", cn: "一个可能的解释是，当人们能看到即时好处时，他们更愿意改变行为。", note: "写作解释原因句。", keywords: [["possible explanation", "可能解释"], ["be willing to", "愿意"], ["immediate benefits", "即时好处"]] },
  { id: "x111", level: "ielts", type: "long", topic: "academic", text: "This trend may continue unless schools and families work together to guide children more carefully.", cn: "除非学校和家庭共同更谨慎地引导孩子，否则这一趋势可能继续。", note: "unless 条件句。", keywords: [["trend", "趋势"], ["unless", "除非"], ["guide", "引导"]] },
  { id: "x112", level: "band7", type: "long", topic: "academic", text: "The evidence suggests that long-term progress depends less on sudden effort than on consistent habits.", cn: "证据表明，长期进步与其说依靠突然的努力，不如说依靠稳定的习惯。", note: "depends less on A than on B。", keywords: [["evidence suggests", "证据表明"], ["long-term progress", "长期进步"], ["consistent habits", "稳定习惯"]] },
  { id: "x113", level: "band7", type: "long", topic: "academic", text: "Although this solution may not be perfect, it is realistic, affordable and easier to apply on a large scale.", cn: "尽管这个解决方案可能并不完美，但它现实、负担得起，并且更容易大规模应用。", note: "评价政策可行性。", keywords: [["realistic", "现实的"], ["affordable", "负担得起的"], ["on a large scale", "大规模"]] }
];

const extraDialogues = [
  { title: "咖啡店点单", level: "foundation", kind: "常用对话", topic: "restaurant", lines: [
    ["Customer", "Could I have a medium latte and a sandwich, please?", "我可以要一杯中杯拿铁和一个三明治吗？"],
    ["Barista", "Sure. Would you like it hot or iced?", "当然。你想要热的还是冰的？"],
    ["Customer", "Hot, please. Could you make it less sweet?", "热的。可以少甜一点吗？"],
    ["Barista", "No problem. That will be ready in a few minutes.", "没问题。几分钟后就好。"]
  ]},
  { title: "餐厅投诉与解决", level: "bridge", kind: "常用对话", topic: "restaurant", lines: [
    ["Guest", "Excuse me, I ordered the beef noodles, but this is chicken.", "打扰一下，我点的是牛肉面，但这是鸡肉。"],
    ["Server", "I am very sorry about that. I will change it for you right away.", "非常抱歉。我马上给您换。"],
    ["Guest", "Thank you. I am in a bit of a hurry.", "谢谢。我有点赶时间。"],
    ["Server", "I understand. We will make your order a priority.", "我理解。我们会优先处理您的订单。"]
  ]},
  { title: "机场办理登机", level: "bridge", kind: "常用对话", topic: "travel", lines: [
    ["Agent", "May I see your passport and ticket, please?", "请给我看一下您的护照和机票好吗？"],
    ["Passenger", "Here you are. Could I have an aisle seat?", "给您。我可以要靠过道的座位吗？"],
    ["Agent", "Let me check. Yes, there is one available.", "我查一下。可以，还有一个。"],
    ["Passenger", "Great. What time does boarding start?", "太好了。什么时候开始登机？"],
    ["Agent", "Boarding starts at 3:20 at Gate 16.", "3:20 在 16 号登机口开始登机。"]
  ]},
  { title: "问路到地铁站", level: "foundation", kind: "常用对话", topic: "travel", lines: [
    ["A", "Excuse me, is there a subway station near here?", "打扰一下，这附近有地铁站吗？"],
    ["B", "Yes. Go straight for two blocks and turn left.", "有。直走两个街区然后左转。"],
    ["A", "Is it far from here?", "离这里远吗？"],
    ["B", "No, it takes about five minutes on foot.", "不远，步行大约五分钟。"]
  ]},
  { title: "酒店入住", level: "foundation", kind: "常用对话", topic: "hotel", lines: [
    ["Receptionist", "Good evening. How can I help you?", "晚上好。有什么可以帮您？"],
    ["Guest", "I have a reservation under the name Wang.", "我用王这个名字订了房。"],
    ["Receptionist", "May I see your passport, please?", "请给我看一下您的护照好吗？"],
    ["Guest", "Of course. Could you tell me what time breakfast starts?", "当然。您能告诉我早餐几点开始吗？"],
    ["Receptionist", "Breakfast is served from 7 to 10 on the first floor.", "早餐 7 点到 10 点在一楼供应。"]
  ]},
  { title: "购物退货", level: "bridge", kind: "常用对话", topic: "shopping", lines: [
    ["Customer", "I bought this shirt yesterday, but it is too small.", "我昨天买了这件衬衫，但它太小了。"],
    ["Assistant", "Would you like to exchange it or return it?", "您想换货还是退货？"],
    ["Customer", "I would like to exchange it for a larger size.", "我想换成大一号。"],
    ["Assistant", "No problem. Do you have the receipt with you?", "没问题。您带收据了吗？"]
  ]},
  { title: "看病描述症状", level: "bridge", kind: "常用对话", topic: "health", lines: [
    ["Doctor", "What seems to be the problem?", "你哪里不舒服？"],
    ["Patient", "I have had a sore throat and a headache since yesterday.", "我从昨天开始喉咙痛、头疼。"],
    ["Doctor", "Do you have a fever?", "你发烧吗？"],
    ["Patient", "A little. I also feel tired all the time.", "有一点。我也一直觉得累。"],
    ["Doctor", "You should drink more water and rest for two days.", "你应该多喝水并休息两天。"]
  ]},
  { title: "电话改约时间", level: "bridge", kind: "常用对话", topic: "phone", lines: [
    ["A", "Hi, I am calling about our appointment tomorrow.", "你好，我打电话是关于我们明天的预约。"],
    ["B", "Is there a problem?", "有什么问题吗？"],
    ["A", "Something urgent has come up. Could we move it to Friday afternoon?", "我临时有急事。我们能改到周五下午吗？"],
    ["B", "Friday afternoon works for me.", "周五下午我可以。"],
    ["A", "Thank you for being flexible.", "谢谢你这么灵活。"]
  ]},
  { title: "面试自我介绍", level: "ielts", kind: "长对话", topic: "work", lines: [
    ["Interviewer", "Could you tell me a little about yourself?", "你能简单介绍一下自己吗？"],
    ["Candidate", "Certainly. I am a careful and curious learner, and I enjoy solving problems with other people.", "当然。我是一个细心且有好奇心的学习者，也喜欢和别人一起解决问题。"],
    ["Interviewer", "What do you think is your strongest skill?", "你认为你最强的技能是什么？"],
    ["Candidate", "I would say communication. I try to listen first, understand the goal and then explain my ideas clearly.", "我会说是沟通。我会先倾听，理解目标，然后清楚解释自己的想法。"],
    ["Interviewer", "Can you give me an example?", "你能给我一个例子吗？"],
    ["Candidate", "In a school project, I helped my group divide the work and keep the discussion focused.", "在一个学校项目中，我帮助小组分工，并让讨论保持聚焦。"]
  ]},
  { title: "雅思口语 Part 2：描述一个帮助过你的人", level: "ielts", kind: "长对话", topic: "ielts", lines: [
    ["Candidate", "I would like to talk about my English teacher, who helped me become more confident.", "我想谈谈我的英语老师，她帮助我变得更自信。"],
    ["Candidate", "When I first started speaking English, I was afraid of making mistakes.", "刚开始说英语时，我害怕犯错。"],
    ["Candidate", "She told me that fluency grows from practice, not from waiting until everything is perfect.", "她告诉我，流利来自练习，而不是等一切完美。"],
    ["Candidate", "Because of her advice, I began to read sentences aloud every day and record my voice.", "因为她的建议，我开始每天朗读句子并录音。"],
    ["Candidate", "I still remember her because she changed the way I think about learning.", "我仍然记得她，因为她改变了我对学习的看法。"]
  ]},
  { title: "雅思 Part 3：科技与教育", level: "band7", kind: "长对话", topic: "ielts", lines: [
    ["Examiner", "Do you think technology will replace teachers?", "你认为科技会取代老师吗？"],
    ["Candidate", "I do not think so. Technology can provide information quickly, but teachers help students understand how to use that information.", "我不这么认为。科技能快速提供信息，但老师帮助学生理解如何使用这些信息。"],
    ["Examiner", "What can teachers do better than machines?", "老师在哪些方面比机器做得更好？"],
    ["Candidate", "Teachers can notice emotions, adjust explanations and encourage students when they lose confidence.", "老师能注意到情绪、调整解释，并在学生失去信心时鼓励他们。"],
    ["Examiner", "So what is the best role for technology?", "那么科技最好的角色是什么？"],
    ["Candidate", "It should support learning rather than control it, especially by giving students more chances to practise independently.", "它应该支持学习，而不是控制学习，尤其是给学生更多独立练习的机会。"]
  ]},
  { title: "学术讨论：城市交通", level: "band7", kind: "长对话", topic: "academic", lines: [
    ["Tutor", "What is the main problem with transport in large cities?", "大城市交通的主要问题是什么？"],
    ["Student", "The main problem is that too many people depend on private cars, which creates congestion and pollution.", "主要问题是太多人依赖私家车，这造成拥堵和污染。"],
    ["Tutor", "What would be a realistic solution?", "什么是现实的解决方案？"],
    ["Student", "Cities could improve public transport first, because people will not change their habits unless the alternative is convenient.", "城市可以先改善公共交通，因为除非替代方案方便，否则人们不会改变习惯。"],
    ["Tutor", "That is a good point. Can you add an example?", "这是个好观点。你能加个例子吗？"],
    ["Student", "For example, cheaper subway passes and safer bike lanes could reduce short car trips.", "例如，更便宜的地铁月票和更安全的自行车道可以减少短途开车。"]
  ]}
];

const extraArticles = [
  { title: "At a Restaurant", level: "foundation", topic: "restaurant", cn: "在餐厅", sentences: [
    ["Eating out is a useful situation for English learners because the language is practical and repeated.", "外出就餐对英语学习者很有用，因为语言实用且重复。"],
    ["You need to ask for a menu, order food, explain preferences and pay the bill.", "你需要要菜单、点餐、说明偏好并结账。"],
    ["If you can handle this situation, you will feel more confident in many other daily conversations.", "如果你能处理这个场景，你在许多其他日常对话中也会更自信。"]
  ]},
  { title: "A Trip by Train", level: "foundation", topic: "travel", cn: "坐火车旅行", sentences: [
    ["Travelling by train is often less stressful than travelling by plane.", "坐火车旅行通常比坐飞机压力小。"],
    ["You can arrive at the station, find the platform and get on the train without too many complicated steps.", "你可以到达车站、找到站台并上车，不需要太多复杂步骤。"],
    ["For learners, train stations are also good places to practise signs, announcements and polite questions.", "对学习者来说，火车站也是练习标识、广播和礼貌提问的好地方。"]
  ]},
  { title: "Learning with a Partner", level: "bridge", topic: "study", cn: "和伙伴一起学习", sentences: [
    ["Studying alone is useful, but studying with a partner can make speaking practice easier.", "独自学习有用，但和伙伴学习能让口语练习更容易。"],
    ["One student can ask questions while the other answers, and then they can exchange roles.", "一个学生可以提问，另一个回答，然后他们可以交换角色。"],
    ["This simple routine helps learners notice mistakes and become more comfortable with real communication.", "这个简单流程帮助学习者注意错误，并更适应真实交流。"]
  ]},
  { title: "Online Shopping", level: "bridge", topic: "shopping", cn: "网上购物", sentences: [
    ["Online shopping is convenient, but it also requires careful judgement.", "网上购物很方便，但也需要谨慎判断。"],
    ["Before buying a product, customers should compare prices, read reviews and check the return policy.", "购买产品前，顾客应该比较价格、阅读评论并查看退货政策。"],
    ["These small steps can help people avoid wasting money on low-quality products.", "这些小步骤能帮助人们避免把钱浪费在低质量产品上。"]
  ]},
  { title: "A Healthy Routine", level: "ielts", topic: "health", cn: "健康规律", sentences: [
    ["A healthy routine is built through small decisions rather than sudden changes.", "健康规律是通过小决定建立的，而不是突然改变。"],
    ["People are more likely to keep exercising when the activity is simple, enjoyable and easy to repeat.", "当运动简单、有趣且容易重复时，人们更可能坚持锻炼。"],
    ["For students, regular sleep may be just as important as extra study time because it improves memory and attention.", "对学生来说，规律睡眠可能和额外学习时间一样重要，因为它提高记忆力和注意力。"]
  ]},
  { title: "Why Communication Matters", level: "ielts", topic: "work", cn: "为什么沟通重要", sentences: [
    ["Communication is not only about speaking clearly; it is also about listening carefully.", "沟通不只是清楚表达，也包括认真倾听。"],
    ["In group work, many problems appear because people make assumptions instead of asking questions.", "在小组合作中，许多问题出现是因为人们做假设而不是提问。"],
    ["A good communicator checks understanding, explains reasons and respects different opinions.", "好的沟通者会确认理解、解释原因并尊重不同意见。"]
  ]},
  { title: "Public Transport and City Life", level: "band7", topic: "academic", cn: "公共交通与城市生活", sentences: [
    ["Public transport is not simply a way to move people from one place to another.", "公共交通不只是把人从一个地方运到另一个地方的方式。"],
    ["It affects pollution, social equality and the amount of time people spend travelling every day.", "它影响污染、社会平等以及人们每天花在通勤上的时间。"],
    ["When buses and trains are reliable, affordable and comfortable, residents are more willing to leave their cars at home.", "当公交和火车可靠、负担得起且舒适时，居民更愿意把车留在家里。"],
    ["For this reason, transport policy should be seen as part of a wider plan for healthier cities.", "因此，交通政策应被视为更广泛健康城市规划的一部分。"]
  ]},
  { title: "Reading Beyond Translation", level: "band7", topic: "academic", cn: "超越翻译的阅读", sentences: [
    ["Many learners read slowly because they try to translate every word into their first language.", "许多学习者读得慢，是因为他们试图把每个词翻译成母语。"],
    ["This habit may help with simple sentences, but it becomes a serious problem in academic reading.", "这个习惯可能有助于简单句，但在学术阅读中会变成严重问题。"],
    ["A better approach is to identify the function of each paragraph, such as introducing a problem or presenting evidence.", "更好的方法是识别每个段落的功能，例如提出问题或呈现证据。"],
    ["Once learners understand structure, unfamiliar words become less frightening.", "一旦学习者理解结构，生词就没那么吓人了。"]
  ]}
];

sentences.push(...extraSentences);
dialogues.push(...extraDialogues);
articles.push(...extraArticles);

const state = {
  hiddenChinese: false,
  mastered: JSON.parse(localStorage.getItem("sentenceStudioMastered") || "[]")
};

function speak(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = Number(document.querySelector("#rateControl").value || 0.85);
  window.speechSynthesis.speak(utterance);
}

function badge(level) {
  return `<span class="badge level-${level}">${levelNames[level]}</span>`;
}

function renderSentences() {
  const search = document.querySelector("#searchBox").value.trim().toLowerCase();
  const level = document.querySelector("#levelFilter").value;
  const type = document.querySelector("#typeFilter").value;
  const scenario = document.querySelector("#scenarioFilter").value;
  const filtered = sentences.filter(item => {
    const haystack = [item.text, item.cn, item.topic, item.note, item.keywords.flat().join(" ")].join(" ").toLowerCase();
    return (level === "all" || item.level === level)
      && (type === "all" || item.type === type)
      && (scenario === "all" || item.topic === scenario)
      && (!search || haystack.includes(search));
  });
  document.querySelector("#sentenceCount").textContent = ` 当前显示 ${filtered.length} / ${sentences.length} 条。`;
  document.querySelector("#sentenceGrid").innerHTML = filtered.map(item => {
    const done = state.mastered.includes(item.id);
    return `<article class="sentence-card" data-id="${item.id}">
      <div class="card-top">
        <div class="badges">${badge(item.level)}<span class="badge">${item.type === "short" ? "短句" : "长句"}</span><span class="badge">${scenarioNames[item.topic] || item.topic}</span></div>
        <button class="speak" type="button" title="朗读句子" data-speak="${escapeAttr(item.text)}">▶</button>
      </div>
      <p class="english">${item.text}</p>
      <p class="translation">${item.cn}</p>
      <p class="note">${item.note}</p>
      <div class="keywords">${item.keywords.map(([word, meaning]) => `<span class="keyword"><strong>${word}</strong>：${meaning}</span>`).join("")}</div>
      <button class="master ${done ? "done" : ""}" type="button" data-master="${item.id}">${done ? "已掌握" : "标记掌握"}</button>
    </article>`;
  }).join("") || `<p>没有匹配内容，换个关键词试试。</p>`;
}

function renderDialogues() {
  const search = document.querySelector("#searchBox").value.trim().toLowerCase();
  const level = document.querySelector("#levelFilter").value;
  const scenario = document.querySelector("#scenarioFilter").value;
  const filtered = dialogues.filter(dialogue => {
    const topic = dialogue.topic || "ielts";
    const haystack = [dialogue.title, dialogue.kind, topic, dialogue.lines.flat().join(" ")].join(" ").toLowerCase();
    return (level === "all" || dialogue.level === level)
      && (scenario === "all" || topic === scenario)
      && (!search || haystack.includes(search));
  });
  document.querySelector("#dialogueList").innerHTML = filtered.map(dialogue => `<article class="dialogue-card">
    <div class="dialogue-title"><h3>${dialogue.title}</h3><div class="badges">${badge(dialogue.level)}<span class="badge">${dialogue.kind}</span><span class="badge">${scenarioNames[dialogue.topic] || dialogue.topic || "雅思口语"}</span></div></div>
    ${dialogue.lines.map(([speaker, en, cn]) => `<div class="line-row">
      <button class="speak" type="button" title="朗读这一句" data-speak="${escapeAttr(en)}">▶</button>
      <div><div><span class="speaker">${speaker}:</span> ${en}</div><div class="cn">${cn}</div></div>
    </div>`).join("")}
  </article>`).join("") || `<p>没有匹配对话，换个阶段、情景或关键词试试。</p>`;
}

function renderArticles() {
  const search = document.querySelector("#searchBox").value.trim().toLowerCase();
  const level = document.querySelector("#levelFilter").value;
  const scenario = document.querySelector("#scenarioFilter").value;
  const filtered = articles.filter(article => {
    const haystack = [article.title, article.cn, article.topic, article.sentences.flat().join(" ")].join(" ").toLowerCase();
    return (level === "all" || article.level === level)
      && (scenario === "all" || article.topic === scenario)
      && (!search || haystack.includes(search));
  });
  document.querySelector("#articleList").innerHTML = filtered.map(article => `<article class="article-card">
    <h3>${article.title}</h3>
    <p class="article-meta">${article.cn} · ${levelNames[article.level]} · ${scenarioNames[article.topic] || article.topic}</p>
    ${article.sentences.map(([en, cn]) => `<div class="article-sentence">
      <button class="speak" type="button" title="朗读这一句" data-speak="${escapeAttr(en)}">▶</button>
      <div><div>${en}</div><div class="cn">${cn}</div></div>
    </div>`).join("")}
  </article>`).join("") || `<p>没有匹配文章，换个阶段、情景或关键词试试。</p>`;
}

function renderAllPractice() {
  renderSentences();
  renderDialogues();
  renderArticles();
}

function renderResources() {
  document.querySelector("#resourceGrid").innerHTML = resources.map(resource => `<article class="resource-card">
    <h3>${resource.title}</h3>
    <p>${resource.desc}</p>
    <a href="${resource.url}" target="_blank" rel="noopener">打开链接</a>
  </article>`).join("");
}

function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

document.addEventListener("click", event => {
  const speakButton = event.target.closest("[data-speak]");
  if (speakButton) speak(speakButton.dataset.speak);

  const masterButton = event.target.closest("[data-master]");
  if (masterButton) {
    const id = masterButton.dataset.master;
    state.mastered = state.mastered.includes(id) ? state.mastered.filter(item => item !== id) : [...state.mastered, id];
    localStorage.setItem("sentenceStudioMastered", JSON.stringify(state.mastered));
    renderAllPractice();
  }
});

document.querySelector("#searchBox").addEventListener("input", renderAllPractice);
document.querySelector("#levelFilter").addEventListener("change", renderAllPractice);
document.querySelector("#typeFilter").addEventListener("change", renderSentences);
document.querySelector("#scenarioFilter").addEventListener("change", renderAllPractice);
document.querySelector("#toggleChinese").addEventListener("click", () => {
  state.hiddenChinese = !state.hiddenChinese;
  document.body.classList.toggle("hidden-cn", state.hiddenChinese);
  document.querySelector("#toggleChinese").textContent = state.hiddenChinese ? "显示中文" : "隐藏中文";
});
document.querySelector("#stopAudio").addEventListener("click", () => window.speechSynthesis.cancel());

renderAllPractice();
renderResources();
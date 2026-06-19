const PRODUCTS = [
  // Men's Shoes
  {
    id: "men_1",
    name: "經典皮革牛津鞋",
    englishName: "Classic Leather Oxford",
    category: "men",
    categoryName: "男性鞋子",
    price: 4200,
    image: "assets/products/men_1.png",
    description: "精選頂級牛皮，由資深鞋匠手工縫製而成。經典的雕花細節與舒適的柔軟面料，是每位紳士出席正式場合與日常商務的完美首選。內裡採用吸濕透氣真皮，即使整天穿著依然乾爽舒適。",
    specs: ["面料：進口頭層牛皮", "內裡：透氣真皮", "鞋底：耐磨橡膠大底", "跟高：3 cm"],
    sizes: [39, 40, 41, 42, 43, 44]
  },
  {
    id: "men_2",
    name: "現代針織運動跑鞋",
    englishName: "Modern Knit Running Sneaker",
    category: "men",
    categoryName: "男性鞋子",
    price: 3200,
    image: "assets/products/men_2.png",
    description: "採用透氣的 3D 針織科技鞋面，貼合足部線條。搭載超輕量緩震中底，為您的每一步提供卓越的回彈力與支撐，兼顧時尚都市感與卓越運動機能。",
    specs: ["面料：3D 科技飛行針織網面", "內裡：親膚吸汗網布", "鞋底：超輕量彈力 EVA + 橡膠防滑貼片", "重量：單隻約 240g"],
    sizes: [40, 41, 42, 43, 44]
  },
  {
    id: "men_3",
    name: "高階麂皮切爾西靴",
    englishName: "Premium Suede Chelsea Boot",
    category: "men",
    categoryName: "男性鞋子",
    price: 4800,
    image: "assets/products/men_3.png",
    description: "細緻的進口麂皮面料，呈現低調奢華的質感。側邊經典彈性鬆緊帶設計，不僅穿脫方便，更能完美修飾腳踝線條，增添秋冬英倫雅痞風采。",
    specs: ["面料：進口細緻麂皮", "內裡：舒適豬皮內裡", "鞋底：防滑生膠大底", "筒高：13 cm"],
    sizes: [39, 40, 41, 42, 43]
  },
  {
    id: "men_4",
    name: "奢華皮革樂福鞋",
    englishName: "Luxury Leather Loafer",
    category: "men",
    categoryName: "男性鞋子",
    price: 3900,
    image: "assets/products/men_4.png",
    description: "極簡雅致的套腳設計，選用極致柔軟的義大利小牛皮料。無拘無束的輕便腳感，不論搭配休閒西裝褲或九分褲，都能展現隨意悠閒的紳士時尚態度。",
    specs: ["面料：義大利進口小牛皮", "內裡：防霉真皮內裡", "鞋底：手工真皮複合橡膠底", "穿脫方式：套腳式"],
    sizes: [39, 40, 41, 42, 43, 44]
  },

  // Women's Shoes
  {
    id: "women_1",
    name: "優雅絲絨細高跟鞋",
    englishName: "Elegant Velvet Stiletto",
    category: "women",
    categoryName: "女性鞋子",
    price: 4500,
    image: "assets/products/women_1.png",
    description: "高貴的絲絨質地，在光影下閃耀微光。精心設計的優美弧度與人體工學鞋楦，完美拉長腿部視覺比例，是晚宴與特別時刻的耀眼焦點。",
    specs: ["面料：奢華高密真絲絨", "內裡：羊皮墊腳", "鞋底：義大利真皮大底", "跟高：8 cm 細高跟"],
    sizes: [35, 36, 37, 38, 39]
  },
  {
    id: "women_2",
    name: "都市皮革短靴",
    englishName: "Urban Leather Ankle Boot",
    category: "women",
    categoryName: "女性鞋子",
    price: 4900,
    image: "assets/products/women_2.png",
    description: "現代俐落的粗跟設計，完美平衡舒適度與高度。精選全粒面小牛皮，觸感細膩，防潑水耐穿，展現自信幹練的都市女性魅力與英倫復古風情。",
    specs: ["面料：全粒面小牛皮", "內裡：保暖親膚超細纖維", "鞋底：耐磨橡膠防滑大底", "跟高：5 cm 粗跟 / 筒高：11 cm"],
    sizes: [35, 36, 37, 38, 39, 40]
  },
  {
    id: "women_3",
    name: "復古帆布厚底運動鞋",
    englishName: "Retro Canvas Platform Sneaker",
    category: "women",
    categoryName: "女性鞋子",
    price: 2800,
    image: "assets/products/women_3.png",
    description: "復古厚底設計，瞬間增高並修飾腿型。高品質厚磅帆布鞋面，透氣舒適，簡約而經典的配色充滿青春活力，是日常街頭休閒穿搭的吸睛首選。",
    specs: ["面料：加厚耐磨棉質帆布", "內裡：吸汗棉織網布", "鞋底：防滑耐磨厚底橡膠 (4cm)", "重量：單隻約 320g"],
    sizes: [35, 36, 37, 38, 39]
  },
  {
    id: "women_4",
    name: "極簡美學皮革拖鞋",
    englishName: "Minimalist Leather Slide",
    category: "women",
    categoryName: "女性鞋子",
    price: 2300,
    image: "assets/products/women_4.png",
    description: "極簡的線條與大氣的皮革寬帶剪裁，透露著優雅乾淨的品味。加厚真皮乳膠鞋墊，軟彈貼合足弓，是盛夏午後漫步或度假休閒的精緻首選。",
    specs: ["面料：柔軟牛皮", "內裡：真皮鞋墊 (內置高回彈乳膠)", "鞋底：輕便防滑耐磨大底", "跟高：1.5 cm 平底"],
    sizes: [35, 36, 37, 38, 39]
  },

  // Kids' Shoes
  {
    id: "kids_1",
    name: "透氣網眼兒童運動鞋",
    englishName: "Breathable Mesh Sport Sneaker",
    category: "kids",
    categoryName: "兒童鞋子",
    price: 1800,
    image: "assets/products/kids_1.png",
    description: "專為成長中孩童設計的超透氣大網眼鞋面，防撞寬大楦頭保護幼嫩腳趾。高彈力耐磨橡膠大底與避震中底，讓寶貝盡情奔跑、探索世界而無負擔。",
    specs: ["面料：三層透氣大網眼布", "內裡：除菌防臭功能鞋墊", "鞋底：雙彈 EVA 緩震大底", "扣合方式：寬版魔鬼氈 + 鬆緊帶"],
    sizes: [28, 29, 30, 31, 32, 33, 34]
  },
  {
    id: "kids_2",
    name: "可愛帆布魔鬼氈休閒鞋",
    englishName: "Cute Canvas Strap Sneaker",
    category: "kids",
    categoryName: "兒童鞋子",
    price: 1500,
    image: "assets/products/kids_2.png",
    description: "精選環保親膚純棉帆布，可愛的多彩魔鬼氈設計，方便孩童自主快速穿脫。柔軟防滑的硫化橡膠底，安全守護寶貝踏出的每一步成長旅程。",
    specs: ["面料：100% 環保有機純棉帆布", "內裡：舒適防摩擦棉布", "鞋底：超柔軟硫化防滑橡膠底", "特點：可機洗設計"],
    sizes: [26, 27, 28, 29, 30, 31, 32]
  },
  {
    id: "kids_3",
    name: "防水戶外兒童登山鞋",
    englishName: "Waterproof Active Hiking Shoe",
    category: "kids",
    categoryName: "兒童鞋子",
    price: 2600,
    image: "assets/products/kids_3.png",
    description: "專業級戶外防潑水科技，搭配高筒包覆腳踝設計，防扭傷防泥沙。抓地力極佳的深齒輪鞋底，安全陪伴孩子踏遍山野與森林步道，享受大自然樂趣。",
    specs: ["面料：高強度防水複合面料", "內裡：網布 + 防水透氣薄膜", "鞋底：抓地耐磨齒輪橡膠大底", "特點：反光條安全設計"],
    sizes: [30, 31, 32, 33, 34, 35]
  },
  {
    id: "kids_4",
    name: "溫暖羊羔絨幼童雪地靴",
    englishName: "Cozy Fleece Toddler Boot",
    category: "kids",
    categoryName: "兒童鞋子",
    price: 1980,
    image: "assets/products/kids_4.png",
    description: "內裡採用極致保暖的加厚仿羊羔絨，柔軟親膚，阻絕寒風。超輕量防滑生膠鞋底，在寒冷冬日裡溫暖守護寶貝幼嫩雙腳，保暖不累腳。",
    specs: ["面料：防風仿麂皮超纖", "內裡：加厚保暖仿羊羔絨", "鞋底：超輕量TPR防滑底", "特點：後跟魔鬼氈易穿脫"],
    sizes: [24, 25, 26, 27, 28, 29]
  },

  // Shoe Accessories
  {
    id: "acc_1",
    name: "頂級雪松木鞋撐",
    englishName: "Premium Cedar Wood Shoe Tree",
    category: "accessories",
    categoryName: "鞋子配件",
    price: 980,
    image: "assets/products/acc_1.png",
    description: "天然北美雪松木（紅雪松）製成，散發清新香氣，自然吸濕除臭。彈簧雙向伸縮設計完美維持鞋型，防止皮革產生皺褶與乾裂變形，是高端皮鞋保養的終極伴侶。",
    specs: ["材質：頂級天然紅雪松木", "金屬：高強度防鏽彈簧五金", "產地：美國原木進口", "規格：男款 / 女款"],
    sizes: ["S (35-37)", "M (38-40)", "L (41-43)", "XL (44-46)"]
  },
  {
    id: "acc_2",
    name: "天然馬毛鞋刷",
    englishName: "Natural Horsehair Shoe Brush",
    category: "accessories",
    categoryName: "鞋子配件",
    price: 450,
    image: "assets/products/acc_2.png",
    description: "精選 100% 天然馬毛，毛質軟硬適中，彈力極佳，絕不傷害嬌貴皮面。人體工學拋光實木手柄，握感極佳，能有效清除鞋縫灰塵並能讓保養油均勻吸收亮麗如新。",
    specs: ["刷毛：100% 天然精選尾馬毛", "手柄：高級山毛櫸實木", "用途：除塵、拋光、塗油", "尺寸：17 cm x 5.5 cm"],
    sizes: ["單一尺寸"]
  },
  {
    id: "acc_3",
    name: "奢華皮革保養乳霜",
    englishName: "Luxury Leather Conditioner Cream",
    category: "accessories",
    categoryName: "鞋子配件",
    price: 680,
    image: "assets/products/acc_3.png",
    description: "富含天然蜂蠟、巴西棕櫚蠟與荷荷巴油的溫和滋養配方，深層滋養皮革，恢復皮革自然柔韌的光澤與防水防塵屏障。適用於各種真皮鞋靴、皮夾與高檔皮包。",
    specs: ["成分：蜂蠟、荷荷巴油、天然植物精華", "顏色：無色通用型", "容量：100 ml", "適用：各類平滑真皮皮革"],
    sizes: ["100ml"]
  },
  {
    id: "acc_4",
    name: "環保竹炭除臭除濕包",
    englishName: "Eco-friendly Odor Deodorizer Ball",
    category: "accessories",
    categoryName: "鞋子配件",
    price: 350,
    image: "assets/products/acc_4.png",
    description: "高溫燒製的天然竹炭，吸附力超強，能有效吸附鞋內難聞異味、潮濕水氣並抑制黴菌滋生。高質感亞麻布袋包裝，可每月曝曬後重複循環使用，環保又省心。",
    specs: ["內含：100% 天然高溫活性竹炭", "外袋：雙層透氣天然亞麻布", "包裝：一組兩入（左鞋+右鞋）", "使用期：可重複使用達2年"],
    sizes: ["2入/組"]
  }
];

// Export product helper functions
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

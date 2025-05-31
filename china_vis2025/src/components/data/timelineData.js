// 定义不同地标的颜色，用于区分
export const landmarkColors = {
  '故宫': '#e4572e', // 橙红色
  '天坛': '#2c7da0', // 蓝色
  '长城 (北京段)': '#8ac926', // 绿色
  '北海公园': '#ffc107', // 黄色
  '颐和园': '#6a057f', // 紫色
};

// 示例地标事件数据
// 实际数据会更详细和丰富
export const timelineEvents = [
  // 故宫
  {
    id: 'gugong-1',
    landmark: '故宫',
    year: 1406,
    era: '明代',
    type: '建造',
    title: '紫禁城始建',
    description: '明成祖朱棣下诏营建北京宫殿，即紫禁城。',
    color: landmarkColors['故宫']
  },
  {
    id: 'gugong-2',
    landmark: '故宫',
    year: 1420,
    era: '明代',
    type: '建成',
    title: '紫禁城落成',
    description: '历时14年建成，并迁都北京。',
    color: landmarkColors['故宫']
  },
  {
    id: 'gugong-3',
    landmark: '故宫',
    year: 1644,
    era: '明清之际',
    type: '战乱影响',
    title: '李自成攻入北京',
    description: '部分宫殿被焚毁，后清朝入关重建。',
    color: landmarkColors['故宫']
  },
  {
    id: 'gugong-4',
    landmark: '故宫',
    year: 1912,
    era: '民国',
    type: '转变',
    title: '清帝退位，紫禁城仍为皇室居住地',
    description: '宣统帝在此居住至1924年。',
    color: landmarkColors['故宫']
  },
  {
    id: 'gugong-5',
    landmark: '故宫',
    year: 1925,
    era: '民国',
    type: '开放',
    title: '故宫博物院成立',
    description: '紫禁城正式对外开放，成为故宫博物院。',
    color: landmarkColors['故宫']
  },
  // 天坛
  {
    id: 'tiantan-1',
    landmark: '天坛',
    year: 1420,
    era: '明代',
    type: '建造',
    title: '天地坛建成',
    description: '明成祖朱棣在北京建立天地坛，即天坛前身。',
    color: landmarkColors['天坛']
  },
  {
    id: 'tiantan-2',
    landmark: '天坛',
    year: 1530,
    era: '明代',
    type: '改建',
    title: '天地坛改称天坛',
    description: '嘉靖帝时期分设天地坛，天地坛更名为天坛，并扩建。',
    color: landmarkColors['天坛']
  },
  {
    id: 'tiantan-3',
    landmark: '天坛',
    year: 1754,
    era: '清代',
    type: '修缮',
    title: '祈年殿大修',
    description: '乾隆时期对祈年殿进行大规模修缮，并改为蓝色琉璃瓦。',
    color: landmarkColors['天坛']
  },
  // 长城 (北京段)
  {
    id: 'greatwall-1',
    landmark: '长城 (北京段)',
    year: 1368,
    era: '明代',
    type: '修建',
    title: '明长城开始大规模修筑',
    description: '明朝为防御北方蒙古侵扰，开始大规模修筑长城。',
    color: landmarkColors['长城 (北京段)']
  },
  {
    id: 'greatwall-2',
    landmark: '长城 (北京段)',
    year: 1573,
    era: '明代',
    type: '修缮',
    title: '戚继光修筑蓟镇长城',
    description: '民族英雄戚继光奉命修筑北京段长城，使其更加坚固。',
    color: landmarkColors['长城 (北京段)']
  },
  // 北海公园
  {
    id: 'beihai-1',
    landmark: '北海公园',
    year: 938,
    era: '辽金',
    type: '建造',
    title: '太宁宫琼华岛',
    description: '辽代已在此地建有离宫，金代在此地建太宁宫。',
    color: landmarkColors['北海公园']
  },
  {
    id: 'beihai-2',
    landmark: '北海公园',
    year: 1271,
    era: '元代',
    type: '扩建',
    title: '太液池和琼华岛',
    description: '元世祖忽必烈营建大都，以琼华岛为中心扩建太液池。',
    color: landmarkColors['北海公园']
  },
  {
    id: 'beihai-3',
    landmark: '北海公园',
    year: 1757,
    era: '清代',
    type: '重修',
    title: '北海大规模修缮',
    description: '乾隆时期对北海进行大规模修缮和扩建，形成今日格局。',
    color: landmarkColors['北海公园']
  },
  // 颐和园
  {
    id: 'yiheyuan-1',
    landmark: '颐和园',
    year: 1153,
    era: '金代',
    type: '建造',
    title: '金山行宫',
    description: '金海陵王完颜亮在此地建金山行宫。',
    color: landmarkColors['颐和园']
  },
  {
    id: 'yiheyuan-2',
    landmark: '颐和园',
    year: 1750,
    era: '清代',
    type: '建造',
    title: '清漪园建成',
    description: '乾隆帝为母祝寿，在此修建清漪园。',
    color: landmarkColors['颐和园']
  },
  {
    id: 'yiheyuan-3',
    landmark: '颐和园',
    year: 1860,
    era: '清代',
    type: '毁坏',
    title: '英法联军焚毁清漪园',
    description: '第二次鸦片战争期间，英法联军焚毁圆明园和清漪园。',
    color: landmarkColors['颐和园']
  },
  {
    id: 'yiheyuan-4',
    landmark: '颐he园',
    year: 1888,
    era: '清代',
    type: '重修',
    title: '慈禧挪用海军经费重修',
    description: '慈禧太后挪用海军经费重修清漪园，改名颐和园。',
    color: landmarkColors['颐和园']
  }
];

// 提取所有独特的朝代/时期，并按时间排序
export const eras = Array.from(new Set(timelineEvents.map(e => e.era)))
  .sort((a, b) => {
    const eraOrder = {
      '辽金': 1, '元代': 2, '明代': 3, '明清之际': 4, '清代': 5, '民国': 6, '新中国': 7
    };
    return eraOrder[a] - eraOrder[b];
  });
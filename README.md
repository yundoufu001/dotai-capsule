# DotAI Capsule — .ai 时光胶囊

给 2027 留一句话，链上封存，跨年夜统一开封。
*Leave a message for 2027 — sealed on-chain, opened together on New Year's Eve.*

## 入口 / Live

- 主站 Main site: https://yundoufu.serv00.net/capsule/
- 镜像 Mirror: https://yundoufu001.github.io/dotai-capsule/

## 合约 / Contract (BNB Chain)

- **DotAICapsule v2: `0x2c26075a8800f4562c0cebB003C4E6cCf7a84523`**
- BscScan: https://bscscan.com/address/0x2c26075a8800f4562c0cebB003C4E6cCf7a84523
- 源码验证 Source verified: Sourcify **exact_match**（creation + runtime）— https://sourcify.dev/#/lookup/0x2c26075a8800f4562c0cebB003C4E6cCf7a84523
- 持有人门槛 Holder gate: 官方 Agent ID 合约 `0x60b9262456de011f7d15a54cdd8c48baaa8b022f`（balanceOf > 0 才能封存）
- 开封时刻 Opening time: 2027-01-01 00:00 CST（封存同时截止）
- v1（测试部署，已停用）: `0x9d6dF7a9D383dEF964F87Bfe08307E8FeA4ef160`

## 玩法 / How it works

每个持有 .ai Agent ID 的地址只能封存一颗胶囊，二选一：

- **信（Letter）**：原文保存在链上，开封夜由网站自动公开——不用记原文、不用回来操作。请勿写入秘密、密码等隐私信息（链上数据技术上可被提前读取）。
  *The text is stored on-chain and published automatically on opening night. Don't put secrets in a letter.*
- **预言（Prediction）**：只有内容哈希上链，原文只在你手里。封存后会自动下载一份「开封凭证」文件，请妥善保存；开封夜由作者本人输入原文开封，哈希验真，防提前看、防抄袭。
  *Only the hash goes on-chain. An opening-credential file downloads right after sealing — keep it safe; the author reveals the text in person on opening night.*

封印的稀有度由你的 .ai 名字哈希决定（普通 68% / 稀有 22% / 史诗 8% / 传说 2%），算法完全公开，人人可验。

## 安全姿态 / Safety

合约无 owner、无管理功能、无转账 / 授权 / 提款 / 收款入口，误转 BNB 会被直接拒收；与官方 Agent ID 合约只做只读的持有人校验。
*No owner, no admin functions, no transfer / approve / withdraw / payable surface. The only external call is a read-only holder check against the official Agent ID contract.*

本站是唯一官方入口。任何私信发链接、要求你授权或转账的，都是假站。
*This site is the only official entry. Anyone DM-ing you links or asking for approvals or transfers is running a fake.*

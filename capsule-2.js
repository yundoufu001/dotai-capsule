
const OFFICIAL_ABI = ["function balanceOf(address) view returns (uint256)",
  "function handleOf(address) view returns (string)",
  "function ownerOfHandle(string) view returns (address)",
  "function ownerOf(uint256) view returns (address)",
  "function isValidHandle(string) view returns (bool)"];
const CAP_ABI = [
  "function sealLetter(string text)",
  "function sealPrediction(bytes32 contentHash)",
  "function reveal(string text)",
  "function capsuleCount() view returns (uint256)",
  "function openTime() view returns (uint256)",
  "function capsuleIndexOf(address) view returns (uint256)",
  "function capsuleOf(address) view returns (uint8 kind, bytes32 contentHash, uint256 sealedAt, bool revealed, string text)",
  "function capsulesList(uint256 offset, uint256 limit) view returns (address[] users, uint8[] kinds, bytes32[] hashes, uint256[] sealedAts, bool[] revealedFlags, string[] texts)",
  "event Sealed(address indexed user, uint256 seq, uint8 kind, bytes32 contentHash)",
  "event Revealed(address indexed user, uint256 seq)"];
const QS = new URLSearchParams(location.search);
/* Production build: NO URL overrides of contract/agent/rpc/pk.
   Local ganache testing uses a generated preview.html build, never this file. */
const PREVIEW = false;
const CFG = { cap: CONTRACT_ADDRESS, agent: AGENT_ID_OFFICIAL, rpc: BSC_RPC, pk: null, chainId: 56 };
const DEPLOYED = /^0x[0-9a-fA-F]{40}$/.test(CFG.cap);

const I18N={
zh:{brand_sub:'.ai 时光胶囊 · 给 2027 留一句话',
  pill:'时光胶囊 · <i>TIME CAPSULE</i> · 2027-01-01 开封',
  h1:'给 2027<br><span class="thin">留一句话。</span>',
  hero_p:'DotAI Capsule 是给 Agent ID 持有人的时光胶囊。写一封给 2027 的信：原文保存在链上，2027 年 1 月 1 日零点由网站统一公开，你什么都不用做。或者留一个预言：只有哈希上链、原文只在你手里，开封夜由你本人回来开封。一人一颗，封存一次。',
  stat1:'已封存胶囊',stat2:'距跨年夜开封',stat3:'合约碰过的资产（永远是 0）',
  gal_h2:'胶囊陈列 · The Capsules',
  gal_sub:'每一颗都已上链封存：名字、封印与日期公开。信件在开封夜统一亮出原文；预言保持密封，等作者本人开封。以下为链上实时数据。',
  tag_real:'真实 · 主号钱包',legendary:'传说',rare:'稀有',epic:'史诗',
  kind0:'给 2027 的信',kind1:'对 Agent 生态的预言',
  panel_h:'封存我的胶囊',
  panel_p:'连接持有 Agent ID 的钱包，前端会自动从官方合约带出你的 .ai 名字并双查验真。选一种：给 2027 的信——原文上链保存、开封夜自动公开，请勿写入任何秘密；对 Agent 生态的预言——只有哈希上链，原文只在你手里，开封夜回来亲手打开。',
  input_ph:'写给 2027 的一句话（≤280 字节，中文约 93 字）',btn_connect:'连接钱包',btn_seal:'封存上链',
  note:'封存只付你自己的 gas。信：原文保存在链上（技术上可被提前读取，请勿写秘密），开封夜自动公开；预言：链上只存哈希，原文只在你手里。合约无 owner、无转账、无授权、无收款功能，源码已开源，并已在 Sourcify 完成 exact match 验证（BscScan 同步可查）。',
  btn_cert:'生成我的胶囊证书',btn_download:'下载证书 PNG（1200×630）',
  reveal_ph:'开封时间已到：在这里写下当初那句原文，哈希对上即可开封',btn_reveal:'开封我的胶囊',
  st_connect:'请先连接钱包。',st_connecting:'连接中…',st_no_wallet:'未检测到钱包，请用支持 Web3 的钱包打开本页。',
  st_resolving:'正在从官方合约解析你的 .ai 名字…',
  st_holder:(n)=>'已验真：'+n+(DEPLOYED?' · 可以封存你的胶囊了。':' · 合约部署完成后即可封存。'),
  st_notdeployed_op:'合约尚未部署，这项功能还没开放——部署完成后回到这里即可使用。',
  st_readonly:'链上数据读取失败（网络或 RPC 暂不可用）。这一步没有发出任何交易，请稍后重试。',
  st_sealed:(s)=>'你的胶囊是 #'+s+'，已封存。可以生成证书了。',
  st_no_id:'这个钱包没有 Agent ID（官方合约 balanceOf = 0），无法封存。换一个持有 .ai 的钱包试试。',
  st_bad_verify:'名字验真未通过（ownerOfHandle / ownerOf 双查不一致），已拒绝封存。',
  st_sealing:'封存交易已发出，等待上链确认…',st_done:'已封存上链，跨年夜见！',
  st_revealing:'开封交易已发出，等待确认…',st_revealed_ok:'开封成功——你的预言已经公开上链。',
  st_err:(m)=>'出错了：'+m,
  st_cancelled:'你取消了钱包签名，什么都没有发生。',
  st_funds:'钱包余额不足以支付 gas，请先补充一点 BNB。',
  st_wrong_chain:'钱包不在 BNB Chain 上：请切换到 BNB Chain（chainId 56）后再试。',
  st_switching:'正在请求钱包切换到 BNB Chain…',
  st_dup_seal:'你已经封存过一颗胶囊了——一人一颗，这是规矩。',
  st_not_open:'还没到开封时间，胶囊继续密封。',
  st_hash_mismatch:'这句话和封存时的哈希对不上，开封被拒。请确认原文一字不差（包括标点与空格）。',
  st_generic:'交易没有成功。请检查钱包与网络后再试。',
  st_acct:'检测到钱包账户已切换，请重新连接钱包。',
  st_seal_closed:'封存期已结束（2027-01-01 00:00 已过），不能再封存新胶囊了。已封存的信已自动公开，预言仍可由作者开封。',
  st_hash_precheck:'这句话和封存时的哈希对不上——交易还没发出，没有花 gas。请确认原文一字不差（包括标点与空格），或打开封存时下载的开封凭证文件核对。',
  seal_deadline:'封存截止：2027-01-01 00:00（即开封时刻）。截止后不能再封存新胶囊。',
  kind_hint0:'信：原文保存在链上，开封夜由网站统一公开，你什么都不用做。请勿写入秘密——链上数据技术上可被提前读取。',
  kind_hint1:'预言：只有哈希上链，原文只在你手里。封存成功后会自动下载一份开封凭证文件，请务必保存好——原文丢了谁也找不回。',
  letter_warn:'你正在封存一封「给 2027 的信」：原文将保存在链上，开封夜统一公开。链上数据技术上可被提前读取——请勿写入秘密、密码或隐私信息。确定封存？',
  btn_seal_confirm:'我明白，确认封存',btn_switch:'切换到 BNB Chain',btn_cred:'下载开封凭证',
  cred_saved:'开封凭证已下载，请保存好——开封时要用里面的原文。',
  cred_again:'开封凭证在封存成功时已自动下载；本页无法重新生成（原文不在我们手里）——请到你封存那天的下载文件夹里找。',
  cap_wait_author:'预言已封存 · 等待作者在开封夜亲手开封',cap_letter_wait:'信已封存 · 开封夜自动公开',
  antiphish:'防钓鱼：本站唯一入口是当前域名；我们永不私信发链接、永不要求你授权或转账。认准下方合约地址。',
  contract_addr_lbl:'合约地址（BNB Chain）',copy_addr:'复制地址',copied:'已复制',
  footer_pending:'（v2 地址待部署回填；当前所示为 v1 测试部署）',
  cap_empty:'还没有胶囊——连接持有 Agent ID 的钱包，你可以封存第一颗。',
  cap_loaderr:'链上数据加载失败（网络或 RPC 暂不可用），请稍后刷新重试。',
  cap_loading:'正在从链上加载胶囊…',
  cap_notdeployed:'合约尚未部署：部署完成后，这里会实时显示链上胶囊。',
  cap_sealed:'内容封存中',cap_opened:'已开封',
  cap_info:(s,k)=>'胶囊 #'+s+' · '+(k===0?'给 2027 的信':'对 Agent 生态的预言'),
  cap_hash:(h)=>'内容指纹 '+h,
  cap_wait:(k)=>k===0?'开封时间：2027-01-01 00:00（跨年夜）。你的信已保存在链上，开封夜网站会自动公开，你不用做任何事。':'开封时间：2027-01-01 00:00（跨年夜）。到时回到这里，写下原文即可开封——请务必自己记好原文（封存时下载的开封凭证里有），链上只有哈希，谁也找不回。',
  cap_can_reveal:(k)=>k===0?'开封时间已到！你的信已经公开——原文就在上方。':'开封时间已到！在下方写下当初的原文即可开封。',
  cap_revealed:(t)=>'已开封，原文：“'+t+'”',
  footer:'DotAI Capsule · .ai 时光胶囊<br>设计原则：信件原文上链保存、开封夜统一公开；预言只有哈希上链、原文只在作者手里 · 名字由官方 Agent ID 合约当场解析验真 · 合约不碰资产 · 合约没有 owner、没有任何管理权力。',
  tag_unresolved:'名字未解析',msg_bytes:(n)=>n+' / 280 字节',
  st_msg_empty:'先写一句话再封存吧——内容不能为空。',
  st_msg_long:(n)=>'太长了：现在 '+n+' 字节，上限 280 字节（中文约 93 字），请删短一点。',
  tier_common:'普通',m_common:'哑光纯色 · 16 色',m_rare:'抛光双色渐变',m_epic:'流光三色 · 金标',m_legend:'镭射箔金属虹彩',
  sample_tag:'示例 SAMPLE',sample_line:'#777 · 给 2027 的信 · 原文已上链保存 · 开封夜自动公开',sample_fp:'内容指纹 0x8f3c…9a21 · 2027-01-01 跨年夜开封',
  how_h2:'玩法 · 三步',how_sub:'信只需你出现一次（封存）；预言出现两次（封存、开封）。',
  s1t:'写一句话',s1p:'给 2027 的信，或对 Agent 生态的预言，一句话即可（≤280 字节，中文约 93 字）。',
  s2t:'按种类封存上链',s2p:'信的原文保存在链上，开封夜自动公开；预言只有哈希上链，原文不离开你的浏览器，哈希连同你的钱包地址一起计算，别人抄走也开不了。',
  s3t:'跨年夜开封',s3p:'2027 年 1 月 1 日零点：所有信自动公开；预言由作者本人回来写下原文，哈希对上当场开封，对不上合约直接拒绝。',
  kind_h2:'两种胶囊 · 选一种心情',k0p:'写给一年后的自己：一个愿望、一个约定，或一个留给未来的问题。开封夜它会自动亮出来，是 2026 的你和 2027 的你打个照面。注意：原文保存在链上，请勿写秘密。',
  k1p:'对 Agent 生态下一个断言：谁会赢、什么会发生。只有哈希上链、原文只在你手里，时间作证——到时说对了赖不掉，说错了也改不了。',
  trust_h2:'为什么可信',t1t:'两种封存口径',t1p:'信：原文上链、开封夜自动公开；预言：只有哈希、本人开封。页面写明，不玩文字游戏。',t2t:'一人一颗',t2p:'合约按地址拦截第二次封存，物理防刷。',
  t3t:'预言只能本人开',t3p:'原文与哈希对不上，合约直接拒绝；信则在开封夜统一自动公开。',t4t:'合约无 owner',t4p:'不碰资产、没有任何管理权力，源码开源可查。',
  tier_h2:'封印图鉴 · 你的章由名字决定',tier_sub:'印章的档位与颜色由你的 .ai 名字哈希决定，公式公开、任何人可复算：普通 68% / 稀有 22% / 史诗 8% / 传说 2%。以下为样式样例，名字为演示用。',
  banner_k:'开封夜 · Opening Night',banner_p:'2027 年 1 月 1 日零点：所有信件同时自动公开；预言进入可开封状态，等作者本人回来逐句对账。',
  faq_h2:'常见问题',q1:'信需要我回来开封吗？',a1:'不需要。信的原文已保存在链上，开封夜网站自动公开，你什么都不用做。需要回来亲手开封的是预言。',
  q2:'谁能看到我的内容？',a2:'信：原文在链上，开封前网站不展示，但技术上可被读取——所以别写秘密。预言：开封前没有人能读，链上只有哈希；2027 年 1 月 1 日之后由你亲手开封，原文才公开上链。',
  q3:'封存要花多少钱？',a3:'只付你自己那笔封存交易的 gas（BNB Chain 上一笔合约交易，按当前网络状况估算约几美分，以钱包确认时显示为准）。产品本身不收费，合约没有任何收款功能。',
  q4:'封了能改吗？',a4:'不能。信的原文一旦上链不可更改；预言的哈希就是承诺，改一个字就开不了。这正是它们可信的原因。',
  q5:'信和预言有什么区别？',a5:'信：原文保存在链上，开封夜（2027-01-01 零点）网站自动把所有信公开，你不需要回来操作——但正因如此，请勿在信里写秘密。预言：只有哈希上链，原文只在你手里，开封夜由你本人回来输入原文开封——防提前看、防抄袭，时间作证。',
  q6:'预言的原文丢了怎么办？',a6:'找不回。链上只有哈希、没有原文，任何人（包括我们）都无法恢复。所以封存预言成功后，页面会自动下载一份开封凭证文件（内含原文），请把它和这句话一起保存好。',
  q7:'信里能写秘密吗？',a7:'不能。信的原文保存在链上，任何人用区块链工具都能读到（网站只是不在开封前展示）。秘密、密码、隐私信息请不要写进信里；真正想保密的内容请写成预言——预言只有哈希上链。',
  q8:'2027 年之后还能封存吗？',a8:'不能。封存截止就是开封时刻：2027-01-01 00:00。截止后合约拒绝一切新封存；已封存的信在那一刻起自动公开，预言等作者回来开封。',
  slot_name:'虚位以待',slot_msg:'这颗胶囊还在等它的主人。',
  cd_unavail:'开封倒计时待链上确认',cd_opened:'已开封',cd_days:(d,t)=>d+' 天 '+t},
en:{brand_sub:'.ai Time Capsule · A message to 2027',
  pill:'Time Capsule · <i>TIME CAPSULE</i> · opens 2027-01-01',
  h1:'Leave one line<br><span class="thin">for 2027.</span>',
  hero_p:'DotAI Capsule is a time capsule for Agent ID holders. Write a letter to 2027: the text is stored on-chain and the site publishes every letter automatically at midnight on 2027-01-01 — you never have to come back. Or seal a prediction: only its hash goes on-chain and the text stays with you, to be opened by you in person on opening night. One capsule per holder.',
  stat1:'Capsules sealed',stat2:'Until New Year’s Eve opening',stat3:'Assets ever touched by the contract (always 0)',
  gal_h2:'The Capsules',
  gal_sub:'Every capsule is sealed on-chain: name, seal stamp and date are public. Letters show their text automatically on opening night; predictions stay sealed until their author opens them. Live on-chain data below.',
  tag_real:'Real · main wallet',legendary:'LEGENDARY',rare:'RARE',epic:'EPIC',
  kind0:'A letter to 2027',kind1:'A prediction for the Agent ecosystem',
  panel_h:'Seal my capsule',
  panel_p:'Connect a wallet that holds an Agent ID. The front-end resolves your .ai name from the official contract and cross-verifies it twice. Pick a kind: a letter to 2027 — its text is stored on-chain and published automatically on opening night, so never write secrets in it; or a prediction for the Agent ecosystem — only the hash goes on-chain, the text stays with you, and you come back to open it yourself.',
  input_ph:'One line for 2027 (≤280 bytes)',btn_connect:'Connect wallet',btn_seal:'Seal on-chain',
  note:'Sealing costs only your own gas. Letters: the text is stored on-chain (technically readable early with chain tooling — never write secrets) and published automatically on opening night. Predictions: only the hash is stored and the text stays with you. The contract has no owner, no transfer, no approval and no payment functions; source is open and verified on Sourcify (exact match; also shown on BscScan).',
  btn_cert:'Create my capsule certificate',btn_download:'Download certificate PNG (1200×630)',
  reveal_ph:'Opening time is here: type the exact original sentence — it opens only if the hash matches',btn_reveal:'Open my capsule',
  st_connect:'Connect your wallet first.',st_connecting:'Connecting…',st_no_wallet:'No wallet detected. Open this page in a Web3 wallet browser.',
  st_resolving:'Resolving your .ai name from the official contract…',
  st_holder:(n)=>'Verified: '+n+(DEPLOYED?' · you can seal your capsule now.':' · sealing opens once the contract is deployed.'),
  st_notdeployed_op:'The contract is not deployed yet, so this is not open yet — come back here once it is deployed.',
  st_readonly:'Could not read on-chain data (network or RPC unavailable). No transaction was sent in this step — please try again later.',
  st_sealed:(s)=>'Your capsule is #'+s+', sealed. Your certificate is ready to create.',
  st_no_id:'This wallet holds no Agent ID (official balanceOf = 0) and cannot seal. Try a wallet that holds a .ai name.',
  st_bad_verify:'Name verification failed (ownerOfHandle / ownerOf cross-check mismatch). Sealing refused.',
  st_sealing:'Sealing sent, waiting for on-chain confirmation…',st_done:'Sealed on-chain — see you on New Year’s Eve!',
  st_revealing:'Opening sent, waiting for confirmation…',st_revealed_ok:'Opened — your prediction is now public on-chain.',
  st_err:(m)=>'Error: '+m,
  st_cancelled:'You cancelled the wallet signature. Nothing happened.',
  st_funds:'Insufficient balance for gas. Please top up a little BNB first.',
  st_wrong_chain:'Your wallet is not on BNB Chain: please switch to BNB Chain (chainId 56) and try again.',
  st_switching:'Asking the wallet to switch to BNB Chain…',
  st_dup_seal:'You have already sealed a capsule — one per holder, that is the rule.',
  st_not_open:'Opening time has not come yet. The capsule stays sealed.',
  st_hash_mismatch:'That sentence does not match the sealed hash, so the opening was refused. Check the original text character for character (punctuation and spaces included).',
  st_generic:'The transaction did not succeed. Check your wallet and network, then try again.',
  st_acct:'Wallet account changed — please reconnect your wallet.',
  st_seal_closed:'Sealing has ended (the 2027-01-01 00:00 opening moment has passed) — no new capsules can be sealed. Letters are already public; predictions can still be opened by their authors.',
  st_hash_precheck:'That sentence does not match the sealed hash — no transaction was sent and no gas was spent. Check the original character for character (punctuation and spaces included), or look it up in the opening credential file you downloaded when sealing.',
  seal_deadline:'Sealing deadline: 2027-01-01 00:00 — the opening moment itself. No new capsules can be sealed after it.',
  kind_hint0:'Letter: the text is stored on-chain and published by the site on opening night — nothing for you to do. Never write secrets: chain data is technically readable early.',
  kind_hint1:'Prediction: only the hash goes on-chain; the text stays with you. Right after sealing, an opening credential file will download automatically — keep it safe: if the text is lost, nobody can recover it.',
  letter_warn:'You are sealing a LETTER to 2027: the text will be stored on-chain and published on opening night. Chain data is technically readable early — never include secrets, passwords or private information. Seal it?',
  btn_seal_confirm:'I understand — seal it',btn_switch:'Switch to BNB Chain',btn_cred:'Download opening credential',
  cred_saved:'Your opening credential file has been downloaded — keep it safe; you will need the text inside to open your prediction.',
  cred_again:'The opening credential was downloaded automatically when you sealed. This page cannot regenerate it (the text is not with us) — check your downloads folder from sealing day.',
  cap_wait_author:'Prediction sealed · waiting for its author to open it on opening night',cap_letter_wait:'Letter sealed · published automatically on opening night',
  antiphish:'Anti-phishing: the only entrance to this site is the current domain. We never DM links, and never ask you to approve tokens or send funds. Check the contract address below.',
  contract_addr_lbl:'Contract address (BNB Chain)',copy_addr:'Copy address',copied:'Copied',
  footer_pending:'(V2 address — filled in at deployment; currently showing the V1 test deployment)',
  cap_empty:'No capsules yet — connect a wallet holding an Agent ID and seal the first one.',
  cap_loaderr:'Could not load on-chain data (network or RPC unavailable). Please refresh and try again.',
  cap_loading:'Loading capsules from the chain…',
  cap_notdeployed:'Contract not deployed yet: once deployed, the live on-chain capsules will appear here.',
  cap_sealed:'Sealed',cap_opened:'Opened',
  cap_info:(s,k)=>'Capsule #'+s+' · '+(k===0?'A letter to 2027':'A prediction for the Agent ecosystem'),
  cap_hash:(h)=>'Content fingerprint '+h,
  cap_wait:(k)=>k===0?'Opens 2027-01-01 00:00 (New Year’s Eve). Your letter is stored on-chain and the site will publish it automatically — nothing for you to do.':'Opens 2027-01-01 00:00 (New Year’s Eve). Come back then and type the original sentence to open it — keep it safe (it is in the opening credential file downloaded when you sealed): only the hash is on-chain and nobody can recover the text.',
  cap_can_reveal:(k)=>k===0?'Opening time is here — your letter is public; its text is shown above.':'Opening time is here! Type the original sentence below to open your prediction.',
  cap_revealed:(t)=>'Opened: “'+t+'”',
  footer:'DotAI Capsule · .ai Time Capsule<br>Principles: letters are stored on-chain and published automatically on opening night; predictions keep only their hash on-chain and the text stays with the author · names are resolved and verified on the spot against the official Agent ID contract · the contract never touches assets · the contract has no owner and no admin powers at all.',
  tag_unresolved:'name unresolved',msg_bytes:(n)=>n+' / 280 bytes',
  st_msg_empty:'Write your line first — the content cannot be empty.',
  st_msg_long:(n)=>'Too long: '+n+' bytes now; the limit is 280 bytes (~93 Chinese chars). Please shorten it.',
  tier_common:'COMMON',m_common:'Matte solid · 16 colors',m_rare:'Polished two-tone gradient',m_epic:'Flowing three-tone · gold tag',m_legend:'Holographic foil metallic rainbow',
  sample_tag:'SAMPLE',sample_line:'#777 · A letter to 2027 · Text stored on-chain · Published automatically on opening night',sample_fp:'Fingerprint 0x8f3c…9a21 · Opens New Year’s Eve 2027-01-01',
  how_h2:'How it works · 3 steps',how_sub:'A letter needs you once (sealing); a prediction needs you twice (sealing, then opening).',
  s1t:'Write one line',s1p:'A letter to 2027, or a prediction for the Agent ecosystem — one line is enough (≤280 bytes).',
  s2t:'Seal it, by kind',s2p:'A letter’s text is stored on-chain and published automatically on opening night. A prediction sends only its hash on-chain — the text never leaves your browser — and the hash is computed together with your wallet address, so nobody can copy it and open it as theirs.',
  s3t:'Opening night',s3p:'At midnight on 2027-01-01 every letter is published automatically; predictions become openable by their authors in person: type the original line — if the hash matches, the capsule opens on the spot; if not, the contract refuses.',
  kind_h2:'Two kinds of capsule',k0p:'For your future self: a wish, a promise, or a question left for later. It lights up automatically on opening night — 2026-you meeting 2027-you. Note: the text is stored on-chain, so never write secrets.',
  k1p:'Make a call about the Agent ecosystem: who wins, what happens. Only the hash goes on-chain and the text stays with you — sealed by hash and witnessed by time: no taking it back, no quiet edits.',
  trust_h2:'Why it can be trusted',t1t:'Two honest sealing rules',t1p:'Letters: text on-chain, published automatically on opening night. Predictions: hash only, opened by the author. Stated plainly, no word games.',t2t:'One capsule per holder',t2p:'The contract rejects a second seal from the same address: farming-proof by design.',
  t3t:'Predictions open only by their author',t3p:'If the text does not match the hash, the contract refuses; letters are published together automatically on opening night.',t4t:'No owner, ever',t4p:'The contract touches no assets and has no admin powers; the source is open to audit.',
  tier_h2:'Seal gallery · Your name decides your seal',tier_sub:'A seal’s tier and colors are decided by the hash of your .ai name. The formula is public and anyone can recompute it: Common 68% / Rare 22% / Epic 8% / Legendary 2%. Style samples below; names are for demonstration.',
  banner_k:'Opening Night',banner_p:'At midnight on 2027-01-01 every letter is published at once, and predictions become openable — their authors come back and the words written for the future are settled line by line.',
  faq_h2:'FAQ',q1:'Do I have to come back to open a letter?',a1:'No. A letter’s text is already stored on-chain and the site publishes it automatically on opening night — there is nothing for you to do. Predictions are the ones you open in person.',
  q2:'Who can see my content?',a2:'Letters: the text is on-chain; the site does not display it before opening, but it is technically readable with chain tooling — so never write secrets. Predictions: nobody can read them before opening; only the hash is on-chain, and the text goes public only when you open it yourself after 2027-01-01.',
  q3:'What does sealing cost?',a3:'Only the gas of your own sealing transaction (one contract call on BNB Chain, estimated at a few cents at current network conditions — your wallet shows the exact figure before you confirm). The product charges nothing, and the contract has no payment function at all.',
  q4:'Can I change it after sealing?',a4:'No. A letter’s text cannot be changed once it is on-chain; a prediction’s hash is the commitment — change one character and it will not open. That is exactly why both can be trusted.',
  q5:'What is the difference between a letter and a prediction?',a5:'A letter: the text is stored on-chain and the site publishes every letter automatically on opening night (midnight, 2027-01-01) — you never have to come back; but exactly because of that, never write secrets in a letter. A prediction: only the hash goes on-chain, the text stays with you, and you come back on opening night to open it in person — safe from early peeking and copying, witnessed by time.',
  q6:'What if I lose my prediction’s original text?',a6:'It cannot be recovered. Only the hash is on-chain — no text — so nobody, including us, can restore it. That is why an opening credential file (containing your text) downloads automatically right after you seal a prediction: keep it together with the sentence itself.',
  q7:'Can I write secrets in a letter?',a7:'No. A letter’s text is stored on-chain and anyone with blockchain tooling can read it (the site simply does not display it before opening). Never put secrets, passwords or private information in a letter; for anything confidential, use a prediction instead — predictions keep only the hash on-chain.',
  q8:'Can I still seal after 2027 begins?',a8:'No. The sealing deadline is the opening moment itself: 2027-01-01 00:00. After that the contract refuses every new seal; letters sealed before it are public from that moment, and predictions wait for their authors to open them.',
  slot_name:'Awaiting its owner',slot_msg:'This capsule is still waiting to be sealed.',
  cd_unavail:'Opening countdown awaiting on-chain data',cd_opened:'Opened',cd_days:(d,t)=>d+'d '+t}
};
let LANG='zh';
const T=()=>I18N[LANG];
function setStatus(s){const el=document.getElementById('statusBar');if(el)el.textContent=s||'';}
let STATUS_FN=null;
function setStatusFn(fn){STATUS_FN=fn;setStatus(fn?fn():'');}
function setLang(l){
  LANG=l;const d=I18N[l];
  document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(d[k]!==undefined)el.innerHTML=d[k];});
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{const k=el.getAttribute('data-i18n-ph');if(d[k]!==undefined)el.placeholder=d[k];});
  document.getElementById('btn-zh').classList.toggle('on',l==='zh');
  document.getElementById('btn-en').classList.toggle('on',l==='en');
  document.documentElement.lang=(l==='zh'?'zh-CN':'en');
  document.title=(l==='zh'?'DotAI Capsule · .ai 时光胶囊':'DotAI Capsule · .ai Time Capsule');
  renderCapsules();renderMyPanel();
  if(STATUS_FN)setStatus(STATUS_FN());
  if(typeof _updBytes==='function')_updBytes();
  if(MY.name&&MY.seq)drawCert();
  tickCountdown();
}
function humanErr(e,kind){
  const code=e&&(e.code||(e.info&&e.info.error&&e.info.error.code));
  const msg=String((e&&(e.shortMessage||e.message))||'');
  if(code===4001||code==='ACTION_REJECTED'||/user rejected|denied/i.test(msg))return T().st_cancelled;
  if(/insufficient funds/i.test(msg))return T().st_funds;
  if(/already sealed/.test(msg))return T().st_dup_seal;
  if(/sealing closed/.test(msg))return T().st_seal_closed;
  if(/letters open automatically/.test(msg))return T().cap_can_reveal(0);
  if(/not opened yet/.test(msg))return T().st_not_open;
  if(/hash mismatch/.test(msg))return T().st_hash_mismatch;
  if(/no Agent ID/.test(msg))return T().st_no_id;
  if(kind==='read')return T().st_readonly;
  return T().st_generic;
}

/* ---------- rarity seals (same FNV-1a draw as the wall; TIER-SYSTEM v1) ---------- */
const SEAL_PAL16=['#E7BB41','#C0C6CE','#C87F5A','#7FA8C9','#6FB3A6','#A68BD8','#D87FA0','#A9B86B','#5B84AE','#4FA08A','#B85C6E','#D89A4E','#9AA3AD','#7E7FD1','#A98A5F','#D89BB4'];
const SEAL_RARE=[['#E7BB41','#C87F5A'],['#7FA8C9','#A68BD8'],['#6FB3A6','#A9B86B'],['#D87FA0','#7E7FD1'],['#C0C6CE','#5B84AE'],['#B85C6E','#E7BB41']];
const SEAL_EPIC=[['#6FB3A6','#7FA8C9','#A68BD8'],['#D89A4E','#D87FA0','#A68BD8'],['#5B84AE','#4FA08A','#6FB3A6'],['#D89A4E','#B85C6E','#E7BB41']];
function sealHash(s){let x=2166136261;for(let i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619)>>>0}return x>>>0}
function tierOf(name){const h=sealHash(name),t=h%100,pick=h>>>8;
  if(t<68)return{cls:'t-common',kind:'common',color:SEAL_PAL16[pick%16]};
  if(t<90){const g=SEAL_RARE[pick%6];return{cls:'t-rare',kind:'rare',g:g};}
  if(t<98){const g=SEAL_EPIC[pick%4];return{cls:'t-epic',kind:'epic',g:g};}
  return{cls:'t-legend',kind:'legend'};}
function paintSealEl(el,name){
  el.className='seal';el.innerHTML='';
  const lt=document.createElement('span');lt.className='lt';lt.textContent=name.charAt(0).toUpperCase();el.appendChild(lt);
  const ti=tierOf(name);el.classList.add(ti.cls);
  if(ti.kind==='common')el.style.setProperty('--sc',ti.color);
  if(ti.kind==='rare'){el.style.setProperty('--g1',ti.g[0]);el.style.setProperty('--g2',ti.g[1]);}
  if(ti.kind==='epic'){el.style.setProperty('--g1',ti.g[0]);el.style.setProperty('--g2',ti.g[1]);el.style.setProperty('--g3',ti.g[2]);}
  return ti;
}

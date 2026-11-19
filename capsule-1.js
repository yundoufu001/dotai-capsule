
/* ================= DotAI Capsule · front-end =================
   CONTRACT_ADDRESS is a placeholder until deployment. Deployment day:
   change it AND bump every ?v= tag in index.html in the SAME upload
   (LAUNCH-CHECKLIST step 3 is one atomic step — see DEPLOYED-QA M2).  */
const CONTRACT_ADDRESS = "PASTE_AFTER_DEPLOY";
const AGENT_ID_OFFICIAL = "0x60b9262456de011f7d15a54cdd8c48baaa8b022f";
const BSC_RPC = "https://bsc-rpc.publicnode.com";
/* Read endpoints in FallbackProvider priority order. drpc sits LAST: its
   free tier answers sustained HTTP 429 under load (LIVE-QA R1 + DEPLOYED-QA
   M1 evidence); the official dataseed endpoints go first after publicnode. */
const BSC_RPCS = ["https://bsc-rpc.publicnode.com","https://bsc-dataseed.bnbchain.org","https://bsc-dataseed.binance.org","https://bsc-dataseed1.binance.org","https://bsc.drpc.org"];
const OPEN_TIME_MAINNET = 1798732800; /* 2027-01-01 00:00 CST */


/* ================= DotAI Capsule · front-end (V2 staging build) =================
   V2: two seal entries (sealLetter / sealPrediction), sealing deadline,
   read endpoints re-picked — every endpoint below was verified from a real
   browser context (CORS + live response) before inclusion; the two official
   dataseed endpoints from V1 were dropped (no CORS headers, dead in
   browsers — COMPAT-QA Q4-1). drpc stays LAST (free-tier 429s under load).
   CONTRACT_ADDRESS below is the V2 production deployment (filled and
   uploaded together with the ?v= bump in index.html on 2026-11-19,
   LAUNCH-CHECKLIST atomic step). V1 test deployment is retired.  */
const CONTRACT_ADDRESS = "0x2c26075a8800f4562c0cebB003C4E6cCf7a84523"; /* V2 production deployment (2026-11-19) */
const AGENT_ID_OFFICIAL = "0x60b9262456de011f7d15a54cdd8c48baaa8b022f";
const BSC_RPC = "https://bsc-rpc.publicnode.com";
const BSC_RPCS = ["https://bsc-rpc.publicnode.com","https://bsc-dataseed1.defibit.io","https://bsc-dataseed1.ninicoin.io","https://bsc.meowrpc.com","https://bsc.drpc.org"];
const OPEN_TIME_MAINNET = 1798732800; /* 2027-01-01 00:00 CST */

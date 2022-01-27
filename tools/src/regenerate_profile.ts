import { Agent } from "secret-agent";
import { setTimeout } from "timers/promises";
import { promises as fs } from "fs";

const main = async () => {
  const agent = new Agent({
    showReplay: false,
    userProfile: {},
  });

  await agent.goto("https://duckduckgo.com/?t=ffab&q=angel.co+gitcoin&ia=web");
  await setTimeout(15000);

  const firstResultNode = await agent.document.querySelector(
    'a[href*="angel.co"]'
  );

  await agent.interact({ click: firstResultNode });

  await setTimeout(30000);

  console.log("Exporting profile to .env...");

  const currentUserProfile = await agent.exportUserProfile();
  const datadomeCookie = currentUserProfile.cookies.find(
    ({ name }) => name === "datadome"
  ).value;

  await agent.close();
  await fs.writeFile(".env", `DATADOME_COOKIE=${datadomeCookie}`);
  console.log("Profile stored! Relaunch app");
  return;
};

main();

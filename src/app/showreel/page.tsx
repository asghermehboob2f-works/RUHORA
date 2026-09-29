import { getSite } from "@/lib/site";
import { db } from "@/lib/db";
import { ShowreelClient } from "./ShowreelClient";

export const metadata = {
  title: "Cinema Showreel",
  description: "Distraction-free cinema reel experience of RUHORA visual production.",
};

export default async function ShowreelPage() {
  const site = await getSite();

  let projects: any[] = [];
  try {
    projects = await db.project.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch {
    projects = [];
  }

  return <ShowreelClient site={site} projects={projects} />;
}

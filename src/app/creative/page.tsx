import { getSite } from "@/lib/site";
import { db } from "@/lib/db";
import { NavShell } from "@/components/navigation/NavShell";
import { FooterShell } from "@/components/navigation/FooterShell";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata = {
  title: "Creative Directory",
  description: "Curated directory of editors, creative directors, and synthetic AI artists at RUHORA.",
};

export default async function CreativePage() {
  const site = await getSite();

  let members: any[] = [];
  try {
    members = await db.teamMember.findMany({
      where: { isVisible: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch {
    members = [];
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <CustomCursor />
      <NavShell brandName={site.brandName} />

      <main className="container-full mx-auto pt-36 pb-32 space-y-24">
        <header className="space-y-4 border-b border-[var(--line)] pb-12 max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            // SPECIALIZED ROLES & TALENT
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[var(--text)]">
            Creative <span className="italic text-[var(--accent)]">Directory</span>
          </h1>
          <p className="font-sans text-base text-[var(--text-muted)] leading-relaxed">
            Every timeline is led by craftsmen who obsess over frame cadence, audio depth, and visual
            composition.
          </p>
        </header>

        {members.length === 0 ? (
          <div className="p-16 border border-[var(--line)] bg-[var(--bg-sunken)] text-center space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
              CREATIVE DIRECTORY UPDATING
            </p>
            <p className="font-sans text-xs text-[var(--text-faint)]">
              Team profiles are managed directly via CMS.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {members.map((member, idx) => {
              let parsedSkills: string[] = [];
              if (typeof member.skills === "string") {
                try {
                  parsedSkills = JSON.parse(member.skills);
                } catch {
                  parsedSkills = [];
                }
              } else if (Array.isArray(member.skills)) {
                parsedSkills = member.skills;
              }

              return (
                <div
                  key={member.id}
                  className="bg-[var(--bg-raised)] border border-[var(--line)] p-8 md:p-12 space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline font-mono text-[10px] uppercase text-[var(--text-faint)]">
                      <span>0{idx + 1} // TALENT PROFILE</span>
                      <span className="text-[var(--accent)]">ACTIVE ROSTER</span>
                    </div>

                    <h3 className="text-3xl font-serif text-[var(--text)]">{member.name}</h3>
                    <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)]">
                      {member.role}
                    </p>

                    {member.specialization && (
                      <p className="font-mono text-[11px] text-[var(--text-muted)]">
                        FOCUS: {member.specialization}
                      </p>
                    )}

                    <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed pt-2">
                      {member.bio}
                    </p>
                  </div>

                  {parsedSkills.length > 0 && (
                    <div className="pt-6 border-t border-[var(--line)] space-y-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
                        CORE STACK & MASTERY
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {parsedSkills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-[var(--bg-sunken)] border border-[var(--line)] font-mono text-[10px] text-[var(--text)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <FooterShell
        brandName={site.brandName}
        closingHeadline={site.footerClosing}
        contactEmail={site.contactEmail}
      />
    </div>
  );
}

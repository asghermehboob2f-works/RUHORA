import { db } from "@/lib/db";

export default async function AdminCreativePage() {
  let members: any[] = [];
  try {
    members = await db.teamMember.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (e) {
    console.error("DB error fetching creative team:", e);
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-[var(--line)] pb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
          // CREATIVE DIRECTORY
        </span>
        <h1 className="text-3xl font-serif text-[var(--text)]">Team & Talent</h1>
      </div>

      <div className="bg-[var(--bg-raised)] border border-[var(--line)] overflow-hidden">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[var(--bg-sunken)] border-b border-[var(--line)] text-[var(--text-faint)]">
            <tr>
              <th className="p-4">NAME</th>
              <th className="p-4">ROLE</th>
              <th className="p-4">SPECIALIZATION</th>
              <th className="p-4">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-[rgba(236,234,230,0.02)]">
                <td className="p-4 font-semibold text-[var(--text)]">{member.name}</td>
                <td className="p-4 text-[var(--accent)]">{member.role}</td>
                <td className="p-4 text-[var(--text-muted)] font-sans text-xs">
                  {member.specialization || "General Post"}
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-[rgba(201,185,154,0.1)] border border-[var(--accent)] text-[10px] text-[var(--accent)]">
                    ROSTER
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

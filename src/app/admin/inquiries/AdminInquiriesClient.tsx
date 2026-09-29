"use client";

import React, { useState } from "react";
import { clsx } from "clsx";

export const AdminInquiriesClient: React.FC<{ initialInquiries: any[] }> = ({
  initialInquiries,
}) => {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  const statuses = ["NEW", "REVIEWING", "CONTACTED", "ACTIVE", "COMPLETED", "ARCHIVED"];

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setInquiries(
          inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status });
        }
      }
    } catch (err) {
      console.error("Status error:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Table List */}
      <div className="lg:col-span-7 bg-[var(--bg-raised)] border border-[var(--line)] overflow-hidden">
        {inquiries.length === 0 ? (
          <div className="p-12 text-center font-mono text-xs text-[var(--text-faint)]">
            NO INCOMING SLATES FOUND.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[var(--bg-sunken)] border-b border-[var(--line)] text-[var(--text-faint)]">
                <tr>
                  <th className="p-4">SLATE</th>
                  <th className="p-4">CLIENT</th>
                  <th className="p-4">TYPE</th>
                  <th className="p-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={clsx(
                      "cursor-pointer transition-colors",
                      selectedInquiry?.id === inq.id
                        ? "bg-[rgba(201,185,154,0.08)]"
                        : "hover:bg-[rgba(236,234,230,0.02)]"
                    )}
                  >
                    <td className="p-4 text-[var(--accent)] font-semibold">{inq.timecode}</td>
                    <td className="p-4 font-semibold text-[var(--text)]">{inq.name}</td>
                    <td className="p-4 text-[var(--text-muted)]">{inq.projectType}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 border border-[var(--line)] bg-[var(--bg-sunken)] text-[10px] text-[var(--text-muted)]">
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      <div className="lg:col-span-5 bg-[var(--bg-raised)] border border-[var(--line)] p-6 md:p-8 space-y-6 sticky top-20">
        {selectedInquiry ? (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-[var(--line)] pb-4">
              <div>
                <span className="font-mono text-[10px] text-[var(--accent)]">
                  {selectedInquiry.timecode}
                </span>
                <h3 className="text-2xl font-serif text-[var(--text)]">{selectedInquiry.name}</h3>
                <p className="font-mono text-xs text-[var(--text-muted)]">{selectedInquiry.email}</p>
                {selectedInquiry.company && (
                  <p className="font-mono text-xs text-[var(--text-faint)]">
                    COMPANY: {selectedInquiry.company}
                  </p>
                )}
              </div>
            </div>

            {/* Status Selector */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
                PRODUCTION STATUS
              </span>
              <div className="grid grid-cols-3 gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(selectedInquiry.id, status)}
                    className={clsx(
                      "py-1.5 px-2 text-[10px] font-mono border text-center transition-colors",
                      selectedInquiry.status === status
                        ? "bg-[var(--accent)] text-[var(--bg-sunken)] border-[var(--accent)] font-bold"
                        : "bg-[var(--bg-sunken)] text-[var(--text-muted)] border-[var(--line)] hover:border-[var(--line-strong)]"
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 font-mono text-xs text-[var(--text-muted)] border-t border-[var(--line)] pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[var(--text-faint)] text-[10px]">BUDGET</p>
                  <p className="text-[var(--text)]">{selectedInquiry.budget}</p>
                </div>
                <div>
                  <p className="text-[var(--text-faint)] text-[10px]">TIMELINE</p>
                  <p className="text-[var(--text)]">{selectedInquiry.timeline}</p>
                </div>
              </div>

              {selectedInquiry.referenceLinks && (
                <div>
                  <p className="text-[var(--text-faint)] text-[10px]">REFERENCE LINKS</p>
                  <a
                    href={selectedInquiry.referenceLinks}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--accent)] hover:underline truncate block"
                  >
                    {selectedInquiry.referenceLinks}
                  </a>
                </div>
              )}

              <div>
                <p className="text-[var(--text-faint)] text-[10px]">PROJECT BRIEF</p>
                <p className="font-sans text-xs text-[var(--text)] leading-relaxed pt-1 bg-[var(--bg-sunken)] p-3 border border-[var(--line)] whitespace-pre-wrap">
                  {selectedInquiry.description}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center font-mono text-xs text-[var(--text-faint)] py-16">
            SELECT A SLATE TO INSPECT BRIEF
          </div>
        )}
      </div>
    </div>
  );
};

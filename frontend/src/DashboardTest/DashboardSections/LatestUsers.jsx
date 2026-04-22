import React, { useEffect, useMemo, useState } from "react";
import { FaPen, FaSearch, FaTrash } from "react-icons/fa";

function LatestUsers() {
  const [userQ, setUserQ] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [delUser, setDelUser] = useState(null);
  const [pieSelected, setPieSelected] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 4;

  // Demo base data
  const baseData = useMemo(
    () => ({
      users: 1245,
      tutors: 48,
      courses: 12,
      trials: 56,
      sparkUsers: [220, 260, 310, 420, 520, 610, 720, 840],
      sparkTrials: [6, 9, 13, 18, 15, 22, 28, 33],
      sparkTutors: [4, 7, 12, 15, 18, 28, 38, 48],
      sparkCourses: [3, 4, 6, 8, 9, 10, 11, 12],
      delta: { users: +12, tutors: +3, courses: +1, trials: +6 },
      latestUsers: [
        {
          name: "Aisha Rahman",
          email: "aisha@example.com",
          status: "Inactive",
          joined: "5d ago",
          role: "Student",
          avatar: "https://i.pravatar.cc/40?img=17",
        },
      ],
    }),
    []
  );

  const [users, setUsers] = useState(baseData.latestUsers);
  const pages = Math.max(1, Math.ceil(users.length / perPage));

  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [pages, page]);

  const filteredUsers = useMemo(() => {
    const t = userQ.trim().toLowerCase();
    let arr = users.filter((u) =>
      (u.name + u.email + u.status + u.joined + u.role)
        .toLowerCase()
        .includes(t)
    );
    if (pieSelected) arr = arr.filter((u) => u.status === pieSelected);
    return arr;
  }, [users, userQ, pieSelected]);

  const StatusBadge = ({ s }) => {
    const map = {
      Active: { fg: "#0E7C5A", bg: "#0E7C5A1A" },
      Trial: { fg: "#B45309", bg: "#B453091A" },
      Inactive: { fg: "#64748B", bg: "#64748B1A" },
    };
    const { fg, bg } = map[s] || map.Inactive;
    return (
      <span
        className="px-2.5 py-1 rounded-full text-xs font-semibold"
        style={{ color: fg, background: bg }}
      >
        {s}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 items-start">
      {/* Latest Users */}
      <div className="xl:col-span-2 rounded-2xl px-4 sm:px-5 pt-4 sm:pt-5 pb-3 min-w-0 self-start border border-green-800">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold">Latest Users</h2>
            <p className="text-sm">New sign-ups and recent activity</p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none inline-flex items-center gap-2 rounded-lg px-3 py-1.5 w-full sm:w-auto border border-green-800">
              <FaSearch />
              <input
                value={userQ}
                onChange={(e) => setUserQ(e.target.value)}
                placeholder="Filter users…"
                className="outline-none text-sm bg-transparent w-full"
              />
            </div>
          </div>
        </div>

        {/* MOBILE: card list */}
        <div className="md:hidden">
          <ul className="grid gap-3">
            {filteredUsers
              .slice((page - 1) * perPage, page * perPage)
              .map((u, i) => (
                <li key={i} className="rounded-xl p-3 border border-green-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{u.name}</div>
                      <div className="text-xs truncate">{u.email}</div>
                    </div>
                    <StatusBadge s={u.status} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span>{u.role}</span>
                    <span>{u.joined}</span>
                  </div>
                </li>
              ))}
          </ul>
          {/* Pagination mobile */}
          <div className="mt-2 flex items-center justify-between px-1 py-2 text-sm">
            <span>
              Page {page}/{pages}
            </span>
            <div className="flex items-center gap-1">
              <button
                className="px-2 py-1 rounded border border-green-800"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <button
                className="px-2 py-1 rounded border border-green-800"
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page === pages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP: table */}
        <div className="hidden md:block overflow-x-auto rounded-xl min-w-0 border border-green-800">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="text-xs uppercase tracking-wide">
                <th className="py-3 pl-4 pr-2">Name</th>
                <th className="py-3 px-2">Email</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Joined</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 && (
                <div className="p-4 text-center text-sm text-gray-500">
                  No users found.
                </div>
              )}

              {filteredUsers
                .slice((page - 1) * perPage, page * perPage)
                .map((u, i) => (
                  <tr
                    key={i}
                    className="transition-colors border-t border-green-800"
                  >
                    <td className="py-3 pl-4 pr-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="min-w-0">
                          <div className="font-medium truncate">{u.name}</div>
                          <div className="text-xs">{u.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">{u.email}</td>
                    <td className="py-3 px-2">
                      <StatusBadge s={u.status} />
                    </td>
                    <td className="py-3 px-2">{u.joined}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-green-800"
                          title="Edit"
                          onClick={() => setEditUser(u)}
                        >
                          <FaPen className="text-yellow-700" />
                        </button>
                        <button
                          className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-green-800"
                          title="Delete"
                          onClick={() => setDelUser(u)}
                        >
                          <FaTrash className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Pagination desktop */}
          <div className="flex items-center justify-between px-4 py-3 text-sm border-t border-green-800">
            <span>
              Showing {filteredUsers.length ? (page - 1) * perPage + 1 : 0}–
              {Math.min(page * perPage, filteredUsers.length)} of{" "}
              {filteredUsers.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                className="px-2 py-1 rounded border border-green-800"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <button
                className="px-2 py-1 rounded text-white"
                style={{ background: "#0E7C5A" }}
              >
                {page}
              </button>
              <button
                className="px-2 py-1 rounded border border-green-800"
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page === pages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestUsers;

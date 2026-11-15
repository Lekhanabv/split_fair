
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

function PageHeading({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-7">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="muted mt-2">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="empty-state">
      <div className="emoji-box mx-auto mb-3">📋</div>
      <p>{text}</p>
    </div>
  );
}

function Groups({ groups, addGroup, deleteGroup }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [members, setMembers] = useState("");

  const submit = e => {
    e.preventDefault();

    const people = [
      "You",
      ...members.split(",").map(x => x.trim()).filter(Boolean)
    ];

    if (people.length < 2) {
      return alert("Please add at least one member.");
    }

    addGroup({ name: name.trim(), members: people, emoji: "👥" });
    setName("");
    setMembers("");
    setShow(false);
  };

  return (
    <>
      <PageHeading
        title="My Groups"
        subtitle="Create groups and manage shared spaces."
        action={
          <button className="primary" onClick={() => setShow(!show)}>
            <Plus size={18} /> Create Group
          </button>
        }
      />

      {show && (
        <form onSubmit={submit} className="panel p-6 mb-6 space-y-4">
          <h3 className="section-title">Create a new group</h3>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Group name
            </label>
            <input
              className="field"
              placeholder="Example: Roommates"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Member names (comma separated)
            </label>
            <input
              className="field"
              placeholder="Rahul, Priya, Ananya"
              value={members}
              onChange={e => setMembers(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button className="primary">Save Group</button>
            <button
              type="button"
              className="secondary"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {groups.map(g => (
          <div className="panel p-6" key={g.id}>
            <div className="flex justify-between items-center">
              <span className="emoji-box text-2xl">👥</span>
              <button
                className="icon-button danger"
                onClick={() => deleteGroup(g.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>

            <h3 className="text-xl font-bold mt-5">{g.name}</h3>
            <p className="muted text-sm mt-2">{g.members.join(", ")}</p>
            <p className="brand font-semibold mt-5">
              {g.members.length} Members
            </p>
          </div>
        ))}
      </div>

      {!groups.length && (
        <Empty text="No groups yet. Create your first group!" />
      )}
    </>
  );
}

export default Groups;

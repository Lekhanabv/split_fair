
import React, { useState } from "react";
import { UserRound, Mail, Save, Settings as SettingsIcon } from "lucide-react";

function Settings({ user, setUser }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  const update = e => {
    e.preventDefault();

    setUser({ ...user, name, email });
    alert("Profile updated successfully.");
  };

  return (
    <div className="settings-page">

      <div className="settings-heading">
        <div>
          <p className="settings-eyebrow">PERSONAL PREFERENCES</p>
          <h2>Settings</h2>
          <p>Manage your SplitFair profile details.</p>
        </div>

        <div className="settings-heading-icon">
          <SettingsIcon size={22} />
        </div>
      </div>

      <form onSubmit={update} className="settings-card">

        <div className="settings-profile">
          <div className="settings-avatar">
            {name.charAt(0).toUpperCase() || <UserRound size={25} />}
          </div>

          <div>
            <h3>Profile Information</h3>
            <p>Update your personal details below.</p>
          </div>
        </div>

        <div className="settings-divider" />

        <div className="settings-field">
          <label>
            <UserRound size={14} />
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="settings-field">
          <label>
            <Mail size={14} />
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="settings-footer">
          <span>Your profile details are saved locally.</span>

          <button type="submit" className="settings-save">
            <Save size={15} />
            Save Profile
          </button>
        </div>

      </form>

      <style>{`
        .settings-page {
          max-width: 850px;
          margin: 0 auto;
        }

        .settings-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 19px;
        }

        .settings-eyebrow {
          color: #8993b1;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.3px;
          margin-bottom: 5px;
        }

        .settings-heading h2 {
          color: #465775;
          font-size: 21px;
          font-weight: 700;
        }

        .settings-heading p:last-child {
          color: #929bb1;
          font-size: 12px;
          margin-top: 4px;
        }

        .settings-heading-icon {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          background: #e9eafa;
          color: #7885b5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settings-card {
          max-width: 570px;
          padding: 20px;
          border-radius: 14px;
          background: linear-gradient(145deg, #fbfaff, #f2f4fc);
          border: 1px solid #e5e7f3;
          box-shadow: 0 4px 14px rgba(82, 91, 135, 0.05);
        }

        .settings-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .settings-avatar {
          width: 46px;
          height: 46px;
          border-radius: 13px;
          background: linear-gradient(135deg, #dfe8fa, #eae2f5);
          color: #687eae;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
        }

        .settings-profile h3 {
          font-size: 14px;
          color: #4c5d7b;
          font-weight: 700;
        }

        .settings-profile p {
          font-size: 11px;
          color: #929bb1;
          margin-top: 3px;
        }

        .settings-divider {
          height: 1px;
          background: #e7e8f2;
          margin: 17px 0;
        }

        .settings-field {
          margin-bottom: 15px;
        }

        .settings-field label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #63718e;
          margin-bottom: 7px;
        }

        .settings-field label svg {
          color: #8795bd;
        }

        .settings-field input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e0e3f0;
          border-radius: 9px;
          background: #f8f8fe;
          outline: none;
          color: #45536d;
          font-size: 12px;
        }

        .settings-field input:focus {
          border-color: #9ba8d0;
          box-shadow: 0 0 0 3px #e9eafa;
        }

        .settings-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: 19px;
          padding-top: 14px;
          border-top: 1px solid #e7e8f2;
        }

        .settings-footer span {
          color: #929bb1;
          font-size: 10px;
        }

        .settings-save {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 9px 13px;
          border-radius: 9px;
          background: linear-gradient(120deg, #718abd, #8988bd);
          color: white;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .settings-save:hover {
          opacity: 0.9;
        }

        @media (max-width: 500px) {
          .settings-card {
            padding: 15px;
          }

          .settings-footer {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

    </div>
  );
}

export default Settings;

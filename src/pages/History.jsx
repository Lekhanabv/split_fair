
import React from "react";
import {
  Clock,
  History as HistoryIcon,
  Receipt,
  Users,
  CheckCircle,
  Trash2,
  CalendarDays
} from "lucide-react";

function getActivityIcon(title = "") {
  const value = title.toLowerCase();

  if (value.includes("expense")) {
    return { Icon: Receipt, color: "history-blue" };
  }

  if (value.includes("group")) {
    return { Icon: Users, color: "history-purple" };
  }

  if (value.includes("settlement")) {
    return { Icon: CheckCircle, color: "history-green" };
  }

  if (value.includes("deleted")) {
    return { Icon: Trash2, color: "history-pink" };
  }

  return { Icon: Clock, color: "history-default" };
}

function History({ activities }) {
  return (
    <div className="history-page">

      <div className="history-heading">
        <div>
          <p className="history-eyebrow">YOUR RECENT ACTIVITIES</p>
          <h2>Activity History</h2>
          <p>Keep track of what's happening in SplitFair.</p>
        </div>

        <div className="history-heading-icon">
          <HistoryIcon size={22} />
        </div>
      </div>

      <div className="history-summary">
        <div className="history-summary-icon">
          <CalendarDays size={19} />
        </div>
        <div>
          <h3>{activities.length} Activities</h3>
          <p>Your recorded account activity</p>
        </div>
      </div>

      <div className="history-card">
        <div className="history-card-heading">
          <div>
            <h3>Recent Activity</h3>
            <p>Your latest updates and actions</p>
          </div>
          <Clock size={18} />
        </div>

        {activities.length > 0 ? (
          <div className="history-list">
            {activities.map((activity, index) => {
              const { Icon, color } = getActivityIcon(activity.title);

              return (
                <div className="history-item" key={activity.id}>
                  <div className="history-timeline">
                    <div className={`history-icon ${color}`}>
                      <Icon size={16} />
                    </div>
                    {index !== activities.length - 1 && (
                      <div className="history-line" />
                    )}
                  </div>

                  <div className="history-item-content">
                    <div className="history-item-top">
                      <h4>{activity.title}</h4>
                      <span>{activity.date}</span>
                    </div>

                    <p>{activity.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="history-empty">
            <div className="history-empty-icon">
              <HistoryIcon size={25} />
            </div>
            <h4>No activity yet</h4>
            <p>Your activity will appear here when you use SplitFair.</p>
          </div>
        )}
      </div>

      <style>{`
        .history-page {
          max-width: 850px;
          margin: 0 auto;
        }

        .history-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 17px;
        }

        .history-eyebrow {
          color: #8993b1;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.3px;
          margin-bottom: 5px;
        }

        .history-heading h2 {
          color: #465775;
          font-size: 21px;
          font-weight: 700;
        }

        .history-heading p:last-child {
          color: #929bb1;
          font-size: 12px;
          margin-top: 4px;
        }

        .history-heading-icon {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          background: #e9eafa;
          color: #7885b5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .history-summary {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 13px 16px;
          background: linear-gradient(120deg, #e1eafa, #eee7f8);
          border: 1px solid #dfe4f3;
          border-radius: 12px;
          margin-bottom: 15px;
        }

        .history-summary-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #f8f8ff;
          color: #7885b5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .history-summary h3 {
          color: #586e9c;
          font-size: 13px;
          font-weight: 700;
        }

        .history-summary p {
          color: #8995b0;
          font-size: 10px;
          margin-top: 2px;
        }

        .history-card {
          padding: 17px 19px;
          background: #faf9ff;
          border: 1px solid #e5e6f2;
          border-radius: 14px;
          box-shadow: 0 3px 12px rgba(82, 91, 135, 0.04);
        }

        .history-card-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 13px;
          border-bottom: 1px solid #e9eaf3;
          margin-bottom: 7px;
          color: #8793b5;
        }

        .history-card-heading h3 {
          color: #4c5d7b;
          font-size: 15px;
          font-weight: 700;
        }

        .history-card-heading p {
          color: #929bb1;
          font-size: 11px;
          margin-top: 3px;
        }

        .history-item {
          display: flex;
          gap: 12px;
          min-height: 66px;
        }

        .history-timeline {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 32px;
        }

        .history-icon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .history-blue {
          background: #e5edfb;
          color: #7086b7;
        }

        .history-purple {
          background: #eee8f8;
          color: #927eb8;
        }

        .history-green {
          background: #e6f1eb;
          color: #729985;
        }

        .history-pink {
          background: #f8eaf0;
          color: #b77e9b;
        }

        .history-default {
          background: #eeecfa;
          color: #897db5;
        }

        .history-line {
          width: 1px;
          flex: 1;
          min-height: 18px;
          background: #e1e4f0;
          margin: 4px 0;
        }

        .history-item-content {
          flex: 1;
          min-width: 0;
          padding: 3px 0 13px;
          border-bottom: 1px solid #eff0f6;
        }

        .history-item:last-child .history-item-content {
          border-bottom: 0;
        }

        .history-item-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .history-item-top h4 {
          color: #52627f;
          font-size: 12px;
          font-weight: 700;
        }

        .history-item-top span {
          color: #929bb1;
          font-size: 10px;
          white-space: nowrap;
        }

        .history-item-content p {
          color: #8b96ad;
          font-size: 11px;
          margin-top: 4px;
        }

        .history-empty {
          text-align: center;
          padding: 28px 12px;
        }

        .history-empty-icon {
          width: 46px;
          height: 46px;
          margin: 0 auto 10px;
          border-radius: 14px;
          background: #eeecfa;
          color: #8a7eb7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .history-empty h4 {
          color: #596b8d;
          font-size: 13px;
          font-weight: 700;
        }

        .history-empty p {
          color: #929bb1;
          font-size: 11px;
          margin-top: 5px;
        }

        @media (max-width: 500px) {
          .history-card {
            padding: 13px;
          }

          .history-item-top {
            align-items: flex-start;
            flex-direction: column;
            gap: 3px;
          }
        }
      `}</style>
    </div>
  );
}

export default History;

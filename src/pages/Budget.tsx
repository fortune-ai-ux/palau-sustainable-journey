import { useState, type FormEvent } from "react";
import {
  Plus,
  Download,
  Pencil,
  Trash2,
  Search,
  Wallet,
  Settings2,
} from "lucide-react";
import { PageHeading, Modal, Empty } from "../components/UI";
import { useStore } from "../lib/store";
import {
  totals,
  money,
  cents,
  validMoney,
  validRate,
  csv,
  download,
} from "../lib/money";
import type { Transaction } from "../types";
const categories = ["餐飲", "交通", "住宿", "購物", "活動", "其他"];
const fresh = (): Transaction => ({
  id: crypto.randomUUID(),
  type: "expense",
  title: "",
  amount: "",
  currency: "TWD",
  category: "餐飲",
  date: "2027-07-29",
  note: "",
});
export default function Budget() {
  const { transactions, settings, notify } = useStore();
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [settingOpen, setSettingOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("全部");
  const [order, setOrder] = useState("desc");
  const [error, setError] = useState("");
  const summary = totals(
    transactions.value,
    settings.value.budget,
    settings.value.rate,
  );
  const shown = transactions.value
    .filter(
      (t) =>
        (category === "全部" || t.category === category) &&
        `${t.title} ${t.note}`.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      order === "desc"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date),
    );
  function save(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    if (!editing.title.trim() || !validMoney(editing.amount)) {
      setError(
        "請輸入項目名稱，以及大於 0、最多兩位小數的金額（上限 999,999,999.99）。",
      );
      return;
    }
    const next = { ...editing, title: editing.title.trim() };
    if (
      transactions.save(
        transactions.value.some((t) => t.id === next.id)
          ? transactions.value.map((t) => (t.id === next.id ? next : t))
          : [...transactions.value, next],
      )
    ) {
      setEditing(null);
      notify("交易已儲存。");
    }
  }
  return (
    <div className="page-wrap">
      <PageHeading
        eyebrow="TRAVEL WALLET"
        title="旅行記帳"
        description="把花費記下來，讓每一份預算都有清楚的方向。"
      >
        <button
          className="button primary"
          onClick={() => {
            setEditing(fresh());
            setError("");
          }}
        >
          <Plus size={18} />
          新增收支
        </button>
      </PageHeading>
      <div className="budget-stats">
        {[
          {
            label: "旅遊總預算",
            value: cents(settings.value.budget, "TWD", "1"),
          },
          { label: "總收入", value: summary.income },
          { label: "總支出", value: summary.expense },
          { label: "剩餘預算", value: summary.remaining },
        ].map((s, i) => (
          <div key={s.label} className={`stat-card ${i === 3 ? "dark" : ""}`}>
            <span>{s.label}</span>
            <strong className={s.value < 0 ? "negative" : ""}>
              {money(s.value)}
            </strong>
            <small>{i === 3 ? "總預算 + 收入 − 支出" : "TWD · 新臺幣"}</small>
          </div>
        ))}
      </div>
      <div className="budget-settings">
        <span>
          <Wallet size={18} />
          手動匯率：1 USD = {settings.value.rate} TWD
          <span className="muted"> · 非即時匯率</span>
        </span>
        <button className="text-link" onClick={() => setSettingOpen(true)}>
          <Settings2 size={16} />
          預算與匯率設定
        </button>
      </div>
      <div className="budget-layout">
        <section className="panel transactions">
          <div className="section-title">
            <h2>收支紀錄</h2>
            <button
              className="text-link"
              onClick={() => {
                download(
                  "palau-transactions.csv",
                  csv(transactions.value, settings.value.rate),
                  "text/csv;charset=utf-8",
                );
                notify("已匯出全部交易 CSV。");
              }}
            >
              <Download size={16} />
              匯出 CSV
            </button>
          </div>
          <div className="transaction-filters">
            <label className="search-box">
              <Search size={18} />
              <input
                aria-label="搜尋交易"
                placeholder="搜尋項目或備註"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <select
              aria-label="依分類篩選交易"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {["全部", ...categories].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              aria-label="日期排序"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="desc">日期由新到舊</option>
              <option value="asc">日期由舊到新</option>
            </select>
          </div>
          {shown.length === 0 ? (
            <Empty>
              {transactions.value.length === 0
                ? "還沒有收支紀錄。新增第一筆，開始記錄這趟旅程。"
                : "沒有符合條件的紀錄。"}
            </Empty>
          ) : (
            <div className="transaction-list">
              {shown.map((t) => (
                <article className="transaction" key={t.id}>
                  <div className={`transaction-symbol ${t.type}`}>
                    {t.type === "income" ? "+" : "−"}
                  </div>
                  <div className="transaction-info">
                    <h3>{t.title}</h3>
                    <span className="mini muted">
                      {t.date} · {t.category} ·{" "}
                      {t.type === "income" ? "收入" : "支出"}
                    </span>
                    {t.note && <p className="mini">{t.note}</p>}
                  </div>
                  <div className="transaction-amount">
                    <b className={t.type === "income" ? "teal" : ""}>
                      {t.type === "income" ? "+" : "−"}
                      {money(cents(t.amount, t.currency, settings.value.rate))}
                    </b>
                    <small>
                      {t.currency} {t.amount}
                    </small>
                  </div>
                  <div className="actions">
                    <button
                      className="icon-btn"
                      aria-label={`修改${t.title}`}
                      onClick={() => {
                        setEditing({ ...t });
                        setError("");
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="icon-btn"
                      aria-label={`刪除${t.title}`}
                      onClick={() => {
                        if (confirm(`刪除交易「${t.title}」？`))
                          if (
                            transactions.save(
                              transactions.value.filter((x) => x.id !== t.id),
                            )
                          )
                            notify("交易已刪除。");
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
        <aside className="panel">
          <h2>支出分布</h2>
          <p className="muted mini">依目前設定匯率換算為 TWD</p>
          {summary.expense === 0 ? (
            <Empty>新增支出後，在這裡看見分類統計。</Empty>
          ) : (
            categories.map((c) => {
              const val = summary.categories[c] ?? 0;
              return (
                <div className="category-bar" key={c}>
                  <div>
                    <span>{c}</span>
                    <b>{money(val)}</b>
                  </div>
                  <div className="progress">
                    <i style={{ width: `${(val / summary.expense) * 100}%` }} />
                  </div>
                  <small>{((val / summary.expense) * 100).toFixed(1)}%</small>
                </div>
              );
            })
          )}
        </aside>
      </div>
      <p className="notice">
        資料僅儲存在此瀏覽器，不會跨裝置同步。變更匯率會重新換算所有 USD
        紀錄；原始金額與幣別會保留。建議定期匯出備份。
      </p>
      {editing && (
        <Modal
          title={
            transactions.value.some((t) => t.id === editing.id)
              ? "修改收支"
              : "新增收支"
          }
          onClose={() => setEditing(null)}
        >
          <form onSubmit={save} className="form-grid">
            <label>
              收支類型
              <select
                aria-label="收支類型"
                value={editing.type}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    type: e.target.value as Transaction["type"],
                  })
                }
              >
                <option value="expense">支出</option>
                <option value="income">收入</option>
              </select>
            </label>
            <label>
              日期
              <input
                type="date"
                required
                value={editing.date}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
              />
            </label>
            <label className="full">
              項目名稱
              <input
                autoFocus
                required
                maxLength={100}
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
                placeholder="例如：午餐、交通費"
              />
            </label>
            <label>
              金額
              <input
                required
                inputMode="decimal"
                value={editing.amount}
                onChange={(e) =>
                  setEditing({ ...editing, amount: e.target.value })
                }
                placeholder="0.00"
              />
            </label>
            <label>
              幣別
              <select
                aria-label="幣別"
                value={editing.currency}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    currency: e.target.value as Transaction["currency"],
                  })
                }
              >
                <option>TWD</option>
                <option>USD</option>
              </select>
            </label>
            <label className="full">
              類別
              <select
                value={editing.category}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="full">
              備註
              <textarea
                maxLength={500}
                value={editing.note}
                onChange={(e) =>
                  setEditing({ ...editing, note: e.target.value })
                }
              />
            </label>
            {error && (
              <p className="error full" role="alert">
                {error}
              </p>
            )}
            <div className="form-actions full">
              <button
                type="button"
                className="button outline"
                onClick={() => setEditing(null)}
              >
                取消
              </button>
              <button className="button primary" type="submit">
                儲存交易
              </button>
            </div>
          </form>
        </Modal>
      )}
      {settingOpen && <SettingsModal onClose={() => setSettingOpen(false)} />}
    </div>
  );
}
function SettingsModal({ onClose }: { onClose: () => void }) {
  const { settings, notify } = useStore();
  const [draft, setDraft] = useState({ ...settings.value });
  const [error, setError] = useState("");
  return (
    <Modal title="預算與匯率設定" onClose={onClose}>
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          if (!validMoney(draft.budget, true) || !validRate(draft.rate)) {
            setError(
              "總預算需為非負金額、最多兩位小數；匯率需大於 0、最多六位小數。",
            );
            return;
          }
          if (settings.save(draft)) {
            notify("預算與手動匯率已更新。");
            onClose();
          }
        }}
      >
        <label className="full">
          旅遊總預算（TWD）
          <input
            autoFocus
            inputMode="decimal"
            required
            value={draft.budget}
            onChange={(e) => setDraft({ ...draft, budget: e.target.value })}
          />
        </label>
        <label className="full">
          1 USD 換算 TWD（手動設定）
          <input
            required
            inputMode="decimal"
            value={draft.rate}
            onChange={(e) => setDraft({ ...draft, rate: e.target.value })}
          />
        </label>
        <p className="notice full">
          預設 32 為示範值，並非即時或建議匯率。更新後，所有 USD
          紀錄會使用此匯率重新換算。
        </p>
        {error && (
          <p role="alert" className="error full">
            {error}
          </p>
        )}
        <div className="form-actions full">
          <button type="button" className="button outline" onClick={onClose}>
            取消
          </button>
          <button className="button primary">儲存設定</button>
        </div>
      </form>
    </Modal>
  );
}

import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Waves,
  Sprout,
  Users,
  Compass,
} from "lucide-react";
import { places } from "../data/places";
import { useStore } from "../lib/store";
import { PlaceCard } from "../components/UI";
export default function Home() {
  const { days } = useStore();
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src="/images/rock-islands-aerial.jpg"
          alt="帛琉洛克群島，翠綠島嶼環繞湛藍海洋"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">PALAU SUSTAINABLE JOURNEY</p>
          <div className="hero-kicker">
            青年百億海外圓夢基金計畫 · 海外翱翔組
          </div>
          <h1>
            帛琉南島
            <br />
            永續實踐計畫
            <span>
              讓每一步，
              <br className="mobile-break" />
              都與島嶼更靠近。
            </span>
          </h1>
          <p className="hero-sub">探索海洋、走進文化、實踐永續</p>
          <div className="hero-meta">
            <span>
              <CalendarDays size={18} />
              2027.07.29 — 08.12
            </span>
            <span>
              <MapPin size={18} />
              帛琉 Palau
            </span>
          </div>
          <div className="hero-actions">
            <Link className="button primary" to="/itinerary">
              <Compass size={18} />
              探索行程
            </Link>
            <Link className="button glass" to="/attractions">
              查看景點
            </Link>
            <Link className="hero-link" to="/checklist">
              行前準備
            </Link>
          </div>
        </div>
        <div className="hero-side">
          15 DAYS OF DISCOVERY
          <br />
          WESTERN PACIFIC OCEAN
        </div>
        <span className="hero-credit">
          Rock Islands, Palau · Luka Peternel / CC BY-SA 4.0
        </span>
      </section>
      <div className="trip-strip">
        <div>
          <strong>
            15<span>天</span>
          </strong>
          <p>走進島嶼的日常</p>
        </div>
        <div>
          <strong>
            16<span>個</span>
          </strong>
          <p>景點與參訪地點</p>
        </div>
        <div>
          <strong>
            6<span>項</span>
          </strong>
          <p>SDGs 永續主題</p>
        </div>
        <Link to="/about">
          <span className="mini">出發前，一起做好準備</span>
          <b>07.14 行前培訓</b>
        </Link>
      </div>
      <section className="section intro">
        <div>
          <p className="eyebrow">A JOURNEY WITH PURPOSE</p>
          <h2>
            不只是旅行，
            <br />
            是一次與世界的對話。
          </h2>
        </div>
        <div>
          <p>
            從洛克群島的海洋生態，到原民部落的生活智慧，我們用 15
            天走入帛琉，以觀察、交流與實作，認識永續真正的樣貌。
          </p>
          <p className="muted">
            帶著好奇心出發，將在地的故事與田野的發現，化為能帶回生活的行動。
          </p>
          <Link className="text-link" to="/about">
            認識我們的計畫
          </Link>
        </div>
      </section>
      <section className="section themes">
        <div className="section-title">
          <div>
            <p className="eyebrow">OUR FOCUS</p>
            <h2>和島嶼一起，練習永續</h2>
          </div>
          <Link className="text-link" to="/about#sdgs">
            認識 ESG 與 SDGs
          </Link>
        </div>
        <div className="theme-grid">
          {[
            {
              icon: Waves,
              title: "守護一片海",
              sub: "ENVIRONMENT · 環境",
              text: "走進海洋與森林，認識復育、生物多樣性與藍炭。",
              tag: "SDG 14 / 15",
            },
            {
              icon: Users,
              title: "聽見在地的聲音",
              sub: "SOCIAL · 社會",
              text: "從部落文化到田野訪談，學習尊重與跨文化溝通。",
              tag: "SDG 4 / 11",
            },
            {
              icon: Sprout,
              title: "讓日常成為改變",
              sub: "GOVERNANCE · 治理",
              text: "觀察糧食、產業與環境治理，思考負責任的選擇。",
              tag: "SDG 2 / 12",
            },
          ].map((t) => (
            <article className="theme-card" key={t.title}>
              <t.icon />
              <p className="mini">{t.sub}</p>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              <span className="tag">{t.tag}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-title">
          <div>
            <p className="eyebrow">PLACES & STORIES</p>
            <h2>在這些地方，遇見帛琉</h2>
          </div>
          <Link className="text-link" to="/attractions">
            探索所有景點
          </Link>
        </div>
        <div className="cards-grid">
          {[places[0], places[4], places[13]].map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </section>
      <section className="section preview-section">
        <div className="section-title">
          <div>
            <p className="eyebrow">YOUR 15-DAY JOURNEY</p>
            <h2>把探索，一天一天展開</h2>
          </div>
          <Link to="/itinerary" className="text-link">
            完整 15 天行程
          </Link>
        </div>
        <div className="preview-grid">
          {days.value.slice(0, 3).map((d) => (
            <Link
              className="day-preview"
              key={d.id}
              to={`/itinerary?day=${d.dayNumber}`}
            >
              <span className="mini teal">
                DAY {String(d.dayNumber).padStart(2, "0")} ·{" "}
                {d.date.slice(5).replace("-", "/")}
              </span>
              <h3>{d.title}</h3>
              <p className="muted">
                {d.activities.length} 項活動 · 時間依主辦安排
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="ready-banner">
        <div>
          <p className="eyebrow">BEFORE WE GO</p>
          <h2>帶著準備好的自己出發。</h2>
          <p>整理行囊、規劃預算，讓旅途多一點從容。</p>
        </div>
        <div className="actions">
          <Link to="/checklist" className="button primary">
            整理行前清單
          </Link>
          <Link to="/budget" className="button light-btn">
            開始旅行記帳
          </Link>
        </div>
      </section>
    </>
  );
}

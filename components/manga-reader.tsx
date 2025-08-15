"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

// Manga pages data based on the story
const mangaPages = [
  {
    id: 1,
    title: "オープニング",
    panels: [
      {
        type: "scene",
        content: "夜の渋谷、オフィスの灯り",
        dialogue: "納期…10日。AI面接官SaaS、PoC必達。",
        speaker: "燈（心の声）",
        image: "/images/p1-1-shibuya-night.png",
      },
      {
        type: "scene",
        content: "会議室、天草社長が資料をドン",
        dialogue: "逃げ道はない。勝て。",
        speaker: "天草社長",
        image: "/images/p1-2-meeting-room.png",
      },
      {
        type: "scene",
        content: "燈、ノートPCを睨む",
        dialogue: "やるしかない。",
        speaker: "燈",
        image: "/images/p1-3-programmer-laptop.png",
      },
      {
        type: "terminal",
        content: '端末に"_"カーソル点滅',
        dialogue: "呼ばれた？",
        speaker: "MARIA",
        image: "/images/p1-4-terminal-cursor.png",
      },
    ],
  },
  {
    id: 2,
    title: "相棒AI起動",
    panels: [
      {
        type: "terminal",
        content: "ターミナル画面からアバター化",
        dialogue: "前提、足りない。R:誰？T:何？F:どの形式？",
        speaker: "MARIA",
        image: "/images/p2-1-maria-avatar.png",
      },
      {
        type: "scene",
        content: "燈、苦笑",
        dialogue: "自己紹介から？",
        speaker: "燈",
        image: "/images/p2-2-akari-smile.png",
      },
      {
        type: "scene",
        content: "早乙女ミナ登場",
        dialogue: '要件は"正確・早い・安い"。顧客は面接のばらつきを嫌う。',
        speaker: "ミナ",
        image: "/images/p2-3-mina-requirements.png",
      },
      {
        type: "terminal",
        content: "MARIAが3C/RTFのフレームを投影",
        dialogue: "3Cでコンテキスト整理、RTFで役割固定。まずは完全性（Complete）。",
        speaker: "MARIA",
        image: "/images/p2-4-rtf-framework.png",
      },
      {
        type: "scene",
        content: "燈決意",
        dialogue: 'プロンプトは"設計"。走ろう。',
        speaker: "燈",
        image: "/images/p2-5-akari-determined.png",
      },
    ],
  },
  {
    id: 3,
    title: "チーム集合",
    panels: [
      {
        type: "scene",
        content: "氷室、腕組み",
        dialogue: "AI任せは危険だ。",
        speaker: "氷室",
        image: "/images/p3-1-himuro-skeptical.png",
      },
      {
        type: "scene",
        content: "机上、分厚いテスト観点リスト",
        dialogue: "人は変な操作をする生き物です。",
        speaker: "紬",
        image: "/images/p3-2-tsumugi-checklist.png",
      },
      {
        type: "scene",
        content: "結城、法務書類",
        dialogue: "個人情報、扱いを一行で台無しにできる。",
        speaker: "結城",
        image: "/images/p3-3-yuki-legal.png",
      },
      {
        type: "scene",
        content: "白石",
        dialogue: "ぼく、ユーザー登録で毎回失敗するタイプです。",
        speaker: "白石",
        image: "/images/p3-4-shiraishi-nervous.png",
      },
      {
        type: "scene",
        content: "ミナ",
        dialogue: "役割を刻む。燈は設計と実装、氷室はレビュー、紬はQA、結城は法務、私は交渉。",
        speaker: "ミナ",
        image: "/images/p3-5-team-roles.png",
      },
    ],
  },
  {
    id: 4,
    title: "要件定義",
    panels: [
      {
        type: "scene",
        content: "ホワイトボード：KPI＝正答率・応答速度・コスト上限",
        dialogue: "KPIは三角形。最初は速度重視、次に品質、最後にコスト最適。",
        speaker: "ミナ",
        image: "/images/p4-1-kpi-triangle.png",
      },
      {
        type: "terminal",
        content: "MARIA",
        dialogue: "評価基盤を先に——テスト先行（TDD）。",
        speaker: "MARIA",
        image: "/images/p4-2-tdd-approach.png",
      },
      {
        type: "scene",
        content: "燈メモ",
        dialogue: "UI-DBコントラクトでAPIを先に固定。",
        speaker: "燈",
        image: "/images/p4-3-api-contract.png",
      },
      {
        type: "scene",
        content: "氷室",
        dialogue: "雰囲気実装を封じる良い縛りだ。",
        speaker: "氷室",
        image: "/images/p4-4-himuro-approval.png",
      },
    ],
  },
  {
    id: 5,
    title: "設計",
    panels: [
      {
        type: "scene",
        content: "アーキ図：面接質問生成→回答解析→スコア→レポート",
        dialogue: 'RAGは"社内規範+役割定義"のみ。狭く正しく。',
        speaker: "MARIA",
        image: "/images/p5-1-architecture.png",
      },
      {
        type: "scene",
        content: "結城",
        dialogue: "ログ匿名化・保持期間・説明可能性を。",
        speaker: "結城",
        image: "/images/p5-2-security-compliance.png",
      },
      {
        type: "scene",
        content: "紬",
        dialogue: '異常入力、方言、沈黙…"人間"を入れる。',
        speaker: "紬",
        image: "/images/p5-3-human-testing.png",
      },
      {
        type: "scene",
        content: "燈",
        dialogue: "監視は最初から。ダッシュボードはMVP以内。",
        speaker: "燈",
        image: "/images/p5-4-monitoring-dashboard.png",
      },
      {
        type: "scene",
        content: "ミナ",
        dialogue: "デモ脚本も並行で。",
        speaker: "ミナ",
        image: "/images/p5-5-demo-script.png",
      },
    ],
  },
  {
    id: 6,
    title: "プロンプト／コンテキスト設計",
    panels: [
      {
        type: "terminal",
        content: "MARIAがRTFテンプレ投影",
        dialogue: "R:面接官、T:質問/深掘り/採点、F:JSON+要因説明。",
        speaker: "MARIA",
        image: "/images/p6-1-rtf-template.png",
      },
      {
        type: "scene",
        content: "燈",
        dialogue: "Complete/Compact/Correct…冗長を削って根拠は残す。",
        speaker: "燈",
        image: "/images/p6-2-3c-principles.png",
      },
      {
        type: "scene",
        content: "氷室",
        dialogue: "禁止事項も明示せよ。法令逸脱ゼロ。",
        speaker: "氷室",
        image: "/images/p6-3-restrictions.png",
      },
      {
        type: "scene",
        content: "結城",
        dialogue: "外部データ参照の透明性表示も追加。",
        speaker: "結城",
        image: "/images/p6-4-transparency.png",
      },
    ],
  },
  {
    id: 7,
    title: "実装開始",
    panels: [
      {
        type: "terminal",
        content: "ターミナルに走るテスト",
        dialogue: "タタタ",
        speaker: "SFX",
        image: "/images/p7-1-terminal-tests.png",
      },
      {
        type: "scene",
        content: "紬",
        dialogue: "UI-DB差分検知パス。",
        speaker: "紬",
        image: "/images/p7-2-ui-db-pass.png",
      },
      {
        type: "scene",
        content: "燈",
        dialogue: "MARIA、候補者要約のアブレーション出して。",
        speaker: "燈",
        image: "/images/p7-3-ablation-request.png",
      },
      {
        type: "terminal",
        content: "MARIA",
        dialogue: "長文要約はコスト高、面接ログ分割＆キーフレーズ抽出推奨。",
        speaker: "MARIA",
        image: "/images/p7-4-cost-optimization.png",
      },
      {
        type: "scene",
        content: "氷室、ニヤリ",
        dialogue: "やるな。",
        speaker: "氷室",
        image: "/images/p7-5-himuro-impressed.png",
      },
    ],
  },
  {
    id: 8,
    title: "初回デモ通し",
    panels: [
      {
        type: "scene",
        content: "社内デモ、白石が受験",
        dialogue: "え、緊張する…",
        speaker: "白石",
        image: "/images/p8-1-demo-setup.png",
      },
      {
        type: "scene",
        content: "面接官AIの質問→間→フォロー質問",
        dialogue: "",
        speaker: "",
        image: "/images/p8-2-ai-interview.png",
      },
      {
        type: "terminal",
        content: "スコアと根拠表示",
        dialogue: "評価理由：具体例の明確性、STAR不足1点。",
        speaker: "MARIA",
        image: "/images/p8-3-scoring-result.png",
      },
      {
        type: "scene",
        content: "ミナ",
        dialogue: "いける…！",
        speaker: "ミナ",
        image: "/images/p8-4-mina-excited.png",
      },
    ],
  },
  {
    id: 9,
    title: "バグ出現",
    panels: [
      {
        type: "scene",
        content: "紬",
        dialogue: "多言語で質問が崩壊。",
        speaker: "紬",
        image: "/images/p9-1-multilingual-bug.png",
      },
      {
        type: "scene",
        content: "燈",
        dialogue: "コンテキストの言語タグ不足…",
        speaker: "燈",
        image: "/images/p9-2-language-tag-issue.png",
      },
      {
        type: "scene",
        content: "氷室",
        dialogue: "UI-DBコントラクトにlocale追加、既存APIは非互換フラグで。",
        speaker: "氷室",
        image: "/images/p9-3-locale-fix.png",
      },
      {
        type: "scene",
        content: "結城",
        dialogue: "利用規約に言語サポート範囲を追記。",
        speaker: "結城",
        image: "/images/p9-4-terms-update.png",
      },
      {
        type: "terminal",
        content: "修正コミット",
        dialogue: "",
        speaker: "",
        image: "/images/p9-5-commit-fix.png",
      },
    ],
  },
  {
    id: 10,
    title: "コストの影",
    panels: [
      {
        type: "scene",
        content: "ダッシュボード：急上昇グラフ",
        dialogue: "推論コストが跳ねた！",
        speaker: "燈",
        image: "/images/p10-1-cost-spike.png",
      },
      {
        type: "terminal",
        content: "MARIA",
        dialogue: "長文の再採点多発。キャッシュ戦略不足。",
        speaker: "MARIA",
        image: "/images/p10-2-cache-issue.png",
      },
      {
        type: "scene",
        content: "氷室",
        dialogue: "フォーム制御で無駄な再送信を防げ。",
        speaker: "氷室",
        image: "/images/p10-3-form-control.png",
      },
      {
        type: "scene",
        content: "燈",
        dialogue: "段階出力＆関数呼び出しで安く早く。",
        speaker: "燈",
        image: "/images/p10-4-optimization.png",
      },
      {
        type: "scene",
        content: "グラフ下降",
        dialogue: "戻った。",
        speaker: "紬",
        image: "/images/p10-5-cost-down.png",
      },
    ],
  },
  {
    id: 11,
    title: "倫理チェック",
    panels: [
      {
        type: "scene",
        content: "結城",
        dialogue: "年齢・性別・出身校バイアスの検証を。",
        speaker: "結城",
        image: "/images/p11-1-bias-check.png",
      },
      {
        type: "terminal",
        content: "MARIA",
        dialogue: "採点は行動基準のみ。属性を遮断。",
        speaker: "MARIA",
        image: "/images/p11-2-attribute-blocking.png",
      },
      {
        type: "scene",
        content: "燈",
        dialogue: "監査ログ：プロンプト/バージョン/データ由来を保存。",
        speaker: "燈",
        image: "/images/p11-3-audit-log.png",
      },
      {
        type: "scene",
        content: "氷室",
        dialogue: "これで胸張れる。",
        speaker: "氷室",
        image: "/images/p11-4-confidence.png",
      },
    ],
  },
  {
    id: 12,
    title: "負荷試験",
    panels: [
      {
        type: "scene",
        content: "深夜のオフィス",
        dialogue: "",
        speaker: "",
        image: "/images/p12-1-night-office.png",
      },
      {
        type: "scene",
        content: "紬",
        dialogue: "同時100セッション…",
        speaker: "紬",
        image: "/images/p12-2-load-test.png",
      },
      {
        type: "terminal",
        content: "MARIA",
        dialogue: "バックプレッシャーON、キュー監視OK。",
        speaker: "MARIA",
        image: "/images/p12-3-backpressure.png",
      },
      {
        type: "scene",
        content: "燈",
        dialogue: "リージョン選択自動化、遅延最小。",
        speaker: "燈",
        image: "/images/p12-4-region-optimization.png",
      },
      {
        type: "scene",
        content: "ミナ",
        dialogue: "明日、顧客同席の社内最終デモ。",
        speaker: "ミナ",
        image: "/images/p12-5-final-demo-prep.png",
      },
    ],
  },
  {
    id: 13,
    title: "危機",
    panels: [
      {
        type: "scene",
        content: "最終デモ直前、障害検知",
        dialogue: "",
        speaker: "",
        image: "/images/p13-1-alert-detection.png",
      },
      {
        type: "scene",
        content: "燈",
        dialogue: "RAGキャッシュ破損…！？",
        speaker: "燈",
        image: "/images/p13-2-cache-corruption.png",
      },
      {
        type: "scene",
        content: "氷室",
        dialogue: "フォールバックは？",
        speaker: "氷室",
        image: "/images/p13-3-fallback-question.png",
      },
      {
        type: "terminal",
        content: "MARIA",
        dialogue: "設計済。ナレッジ固定版へ降格、再学習は裏で。",
        speaker: "MARIA",
        image: "/images/p13-4-fallback-ready.png",
      },
      {
        type: "scene",
        content: "紬",
        dialogue: "ユーザー影響最小…間に合う！",
        speaker: "紬",
        image: "/images/p13-5-minimal-impact.png",
      },
    ],
  },
  {
    id: 14,
    title: "最終デモ",
    panels: [
      {
        type: "scene",
        content: "会議室、顧客担当者緊張",
        dialogue: "",
        speaker: "",
        image: "/images/p14-1-client-meeting.png",
      },
      {
        type: "scene",
        content: "面接官AIが丁寧に深掘り",
        dialogue: "",
        speaker: "",
        image: "/images/p14-2-ai-interview-demo.png",
      },
      {
        type: "scene",
        content: "スコア根拠＋改善提案",
        dialogue: "",
        speaker: "",
        image: "/images/p14-3-score-explanation.png",
      },
      {
        type: "scene",
        content: "顧客",
        dialogue: "属人化が消える…！",
        speaker: "顧客",
        image: "/images/p14-4-client-impressed.png",
      },
      {
        type: "scene",
        content: "天草、無言で頷く",
        dialogue: "",
        speaker: "",
        image: "/images/p14-5-ceo-approval.png",
      },
    ],
  },
  {
    id: 15,
    title: "合格",
    panels: [
      {
        type: "scene",
        content: "顧客",
        dialogue: "PoC発注。次は本番だ。",
        speaker: "顧客",
        image: "/images/p15-1-poc-approval.png",
      },
      {
        type: "scene",
        content: "歓声",
        dialogue: "",
        speaker: "",
        image: "/images/p15-2-team-celebration.png",
      },
      {
        type: "scene",
        content: "氷室、手を差し出す",
        dialogue: "認める。AIと君の仕組みだ。",
        speaker: "氷室",
        image: "/images/p15-3-himuro-handshake.png",
      },
      {
        type: "scene",
        content: "燈",
        dialogue: "仕組みで勝つ。",
        speaker: "燈",
        image: "/images/p15-4-akari-victory.png",
      },
    ],
  },
  {
    id: 16,
    title: "運用設計",
    panels: [
      {
        type: "scene",
        content: "運用Runbookを壁に",
        dialogue: "モデル更新はA/B、プロンプトはバージョン管理。",
        speaker: "燈",
        image: "/images/p16-1-runbook.png",
      },
      {
        type: "scene",
        content: "結城",
        dialogue: "告知・同意・ログ開示の動線。",
        speaker: "結城",
        image: "/images/p16-2-compliance-flow.png",
      },
      {
        type: "scene",
        content: "紬",
        dialogue: "回帰テスト自動。人間テストはサンプリング。",
        speaker: "紬",
        image: "/images/p16-3-regression-test.png",
      },
      {
        type: "terminal",
        content: "MARIA",
        dialogue: "異常検知ルール、週次で最適化。",
        speaker: "MARIA",
        image: "/images/p16-4-anomaly-detection.png",
      },
      {
        type: "scene",
        content: "ミナ",
        dialogue: "CSシナリオも生成で標準化。",
        speaker: "ミナ",
        image: "/images/p16-5-cs-automation.png",
      },
    ],
  },
  {
    id: 17,
    title: "新人の成長",
    panels: [
      {
        type: "scene",
        content: "白石",
        dialogue: "ぼくの素朴な質問って、役に立ってました？",
        speaker: "白石",
        image: "/images/p17-1-shiraishi-question.png",
      },
      {
        type: "scene",
        content: "燈",
        dialogue: "最高のユーザーテストだった。",
        speaker: "燈",
        image: "/images/p17-2-akari-praise.png",
      },
      {
        type: "terminal",
        content: '端末に"_"',
        dialogue: "前提を揺らす力、尊い。",
        speaker: "MARIA",
        image: "/images/p17-3-maria-wisdom.png",
      },
      {
        type: "scene",
        content: "白石、照れ笑い",
        dialogue: "",
        speaker: "",
        image: "/images/p17-4-shiraishi-smile.png",
      },
    ],
  },
  {
    id: 18,
    title: "静かな夜",
    panels: [
      {
        type: "scene",
        content: "帰りのエレベーター",
        dialogue: "",
        speaker: "",
        image: "/images/p18-1-elevator.png",
      },
      {
        type: "scene",
        content: "燈モノローグ",
        dialogue: "AIは置き換えじゃない。私たちを拡張する。",
        speaker: "燈（心の声）",
        image: "/images/p18-2-akari-reflection.png",
      },
      {
        type: "terminal",
        content: '端末に"_"',
        dialogue: "次は、何を作る？",
        speaker: "MARIA",
        image: "/images/p18-3-maria-cursor.png",
      },
    ],
  },
  {
    id: 19,
    title: "エピローグ",
    panels: [
      {
        type: "scene",
        content: "週次レポートが自動でPMに届く",
        dialogue: "",
        speaker: "",
        image: "/images/p19-1-auto-report.png",
      },
      {
        type: "scene",
        content: "顧客からのフィードバックが学習計画へ",
        dialogue: "",
        speaker: "",
        image: "/images/p19-2-feedback-loop.png",
      },
      {
        type: "scene",
        content: "コスト・品質・速度の三角が均衡のグラフ",
        dialogue: "",
        speaker: "",
        image: "/images/p19-3-balance-graph.png",
      },
      {
        type: "scene",
        content: "燈、笑う",
        dialogue: "プロダクトは、生き物だ。",
        speaker: "燈",
        image: "/images/p19-4-akari-smile-final.png",
      },
    ],
  },
  {
    id: 20,
    title: "ラスト",
    panels: [
      {
        type: "scene",
        content: "オフィス窓外の朝焼け",
        dialogue: "",
        speaker: "",
        image: "/images/p20-1-sunrise.png",
      },
      {
        type: "scene",
        content: "チーム集合カット",
        dialogue: "",
        speaker: "",
        image: "/images/p20-2-team-final.png",
      },
      {
        type: "terminal",
        content: "MARIAのカーソルが力強く点滅",
        dialogue: "ピッ",
        speaker: "SFX",
        image: "/images/p20-3-maria-strong-cursor.png",
      },
      {
        type: "scene",
        content: "タイトルロゴ再掲",
        dialogue: "",
        speaker: "",
        image: "/images/p20-4-title-logo.png",
      },
      {
        type: "scene",
        content: "締めのコピー",
        dialogue: "つくる人を、拡張する。",
        speaker: "メッセージ",
        image: "/images/p20-5-final-message.png",
      },
    ],
  },
]

export default function MangaReader() {
  const [currentPage, setCurrentPage] = useState(0)
  const [showMenu, setShowMenu] = useState(false)

  const nextPage = () => {
    if (currentPage < mangaPages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex)
    setShowMenu(false)
  }

  const currentMangaPage = mangaPages[currentPage]

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2">
            <Menu className="h-4 w-4" />
            <span className="hidden sm:inline">メニュー</span>
          </Button>

          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-primary">起動せよ、MARIA CODE！</h1>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {currentPage + 1} / {mangaPages.length}
            </span>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowMenu(false)}>
          <div className="absolute left-0 top-16 bottom-0 w-80 bg-card border-r border-border p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">ページ一覧</h2>
            <div className="space-y-2">
              {mangaPages.map((page, index) => (
                <Button
                  key={page.id}
                  variant={index === currentPage ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => goToPage(index)}
                >
                  <span className="mr-2">P{page.id}</span>
                  {page.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="manga-panel p-6">
          {/* Page Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary mb-2">
              P{currentMangaPage.id} - {currentMangaPage.title}
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded"></div>
          </div>

          {/* Panels */}
          <div className="space-y-6">
            {currentMangaPage.panels.map((panel, index) => (
              <div key={index} className="border border-border rounded-lg p-4 bg-muted/30">
                {/* Panel Content */}
                <div className="mb-4">
                  {panel.image ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-border">
                      <img
                        src={panel.image || "/placeholder.svg"}
                        alt={panel.content}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        [{panel.type === "terminal" ? "ターミナル画面" : "シーン"}]
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-gradient-to-br from-muted to-muted/50 rounded-lg border-2 border-dashed border-border">
                      <div className="text-muted-foreground text-sm mb-2">
                        [{panel.type === "terminal" ? "ターミナル画面" : "シーン"}]
                      </div>
                      <div className="text-foreground font-medium">{panel.content}</div>
                    </div>
                  )}
                </div>

                {/* Dialogue */}
                {panel.dialogue && (
                  <div className="flex justify-center">
                    <div
                      className={cn(
                        "manga-dialogue max-w-md text-center relative",
                        panel.type === "terminal" &&
                          "terminal-text text-green-400 bg-gray-900 border border-green-400/30",
                      )}
                    >
                      <div className="text-xs text-muted-foreground mb-1 font-semibold">{panel.speaker}</div>
                      <div
                        className={cn(
                          "text-sm leading-relaxed",
                          panel.type === "terminal" && "font-mono text-green-400",
                        )}
                      >
                        {panel.dialogue}
                      </div>
                      {/* Speech bubble tail */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            前のページ
          </Button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {mangaPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentPage ? "bg-primary" : "bg-muted-foreground/30",
                )}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === mangaPages.length - 1}
            className="flex items-center gap-2 bg-transparent"
          >
            次のページ
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>

      {/* Touch/Swipe Areas for Mobile */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute left-0 top-16 bottom-0 w-1/3 pointer-events-auto cursor-pointer" onClick={prevPage} />
        <div className="absolute right-0 top-16 bottom-0 w-1/3 pointer-events-auto cursor-pointer" onClick={nextPage} />
      </div>
    </div>
  )
}

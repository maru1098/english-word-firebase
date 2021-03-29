# 単語帳アプリ

https://english-word-firebase.vercel.app/

## 機能

- 日本語と英語をセットで登録
- スライド形式の閲覧モード
  - カードをタップで日本語と英語が反転
  - スワイプで次のカードへ
  - 音声再生ボタン
  - 苦手チェックマーク
- 問題形式で出題
  - タイピングで回答
  - 音声認識で回答
- メールで問題を解いた結果を送信
- 単語帳の共有
- 単語のフォルダ分け
- 単語検索
- 認証
  - 自分の ID は編集可
  - その他は閲覧のみ
  - メニューで自分の単語帳と他の人の単語帳を選ぶ

## 使いたい技術

- Next.js
- typescript
- tailwindcss

## DB への登録

| Collection | Document       | data                                    |
| ---------- | -------------- | --------------------------------------- |
| userId     | folder: string | {en: string, ja: string, flag: boolean} |

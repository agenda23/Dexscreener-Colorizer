## Dexscreener Colorizer 

Dexscreener Colorizer ブックマークレット配布ページをgithub pagesで公開するための仕様書です

最新の本体コード
```
javascript:(function(){const styles={buy:{whale:{bg:'#15803d',text:'#ffffff'},dolphin:{bg:'#22c55e',text:'#ffffff'},shrimp:{bg:'#86efac',text:'#166534'},fish:{bg:'#dcfce7',text:'#15803d'},plankton:{bg:'#f0fdf4',text:'#166534'}},sell:{whale:{bg:'#7f1d1d',text:'#ffffff'},dolphin:{bg:'#ef4444',text:'#ffffff'},shrimp:{bg:'#fca5a5',text:'#991b1b'},fish:{bg:'#fee2e2',text:'#b91c1c'},plankton:{bg:'#fef2f2',text:'#991b1b'}}};const applyColorsToRow=(row)=>{const typeDiv=row.querySelector('.custom-5sgvd2');const usdDiv=row.querySelector('.custom-ujwk84');if(!typeDiv||!usdDiv)return;const isBuy=typeDiv.textContent.trim().toLowerCase()==='buy';const usdAmount=parseFloat(usdDiv.textContent.replace(/[^0-9.]/g,''))||0;let rank="plankton";if(usdAmount>=10000){rank="whale"}else if(usdAmount>=1000){rank="dolphin"}else if(usdAmount>=250){rank="shrimp"}else if(usdAmount>=10){rank="fish"}else{rank="plankton"}const side=isBuy?'buy':'sell';const config=styles[side][rank];row.style.setProperty('background-color',config.bg,'important');const textElements=row.querySelectorAll('div, span, td, a');textElements.forEach(el=>{el.style.setProperty('color',config.text,'important');if(el.tagName==='TD'){el.style.setProperty('--ds-log-stream-volume-usd-bg','transparent','important')}})};const observer=new MutationObserver((mutations)=>{mutations.forEach((mutation)=>{if(mutation.type==='childList'){mutation.addedNodes.forEach(node=>{if(node.nodeType===1){const rows=node.tagName==='TR'?[node]:node.querySelectorAll('tr.custom-1jrcg3g');rows.forEach(applyColorsToRow)}})}else if(mutation.type==='characterData'||mutation.type==='subtree'){let target=mutation.target.parentElement;while(target&&target.tagName!=='TR'){target=target.parentElement}if(target&&target.classList.contains('custom-1jrcg3g')){applyColorsToRow(target)}}})});const targetNode=document.querySelector('tbody[data-testid="virtuoso-item-list"]');if(targetNode){document.querySelectorAll('tr.custom-1jrcg3g').forEach(applyColorsToRow);observer.observe(targetNode,{childList:true,subtree:true,characterData:true});alert("色分けツールを起動しました！");}else{alert("テーブルが見つかりません。Transactionsタブを開いているか確認してください。");}})();
```


### 1. ページ構成（ワイヤーフレーム案）

ページはスクロール不要な1ペイン、またはシンプルな構成にします。

- **ヘッダー**: ツール名と「完全無料・安全」のタグライン。
    
- **メインエリア**:
    
    - **「ブックマークバーにドラッグして登録」ボタン**: これがPC初心者への一番の親切ポイントです。
        
    - **デモ画像/GIF**: 導入前後のビフォーアフター。
        
- **ステップ解説**: 1. ドラッグする、2. Dexで開く、3. クリックする。
    
- **フッター**: GitHub Gistへのリンク、開発者のSNS。
    

---

### 2. コンテンツ詳細

#### A. 魔法のドラッグ＆ドロップボタン

PCに詳しくない人は「URLをコピーして編集」で脱落します。HTMLの仕組みを使い、**「このボタンをブックマークバーにドラッグするだけ」**で登録できるようにします。

#### B. 視覚的ビフォーアフター

金額ごとにパッと色が変わる様子を画像で比較。

> 「アイコンに惑わされず、クジラの買い（$10k〜）を逃さない」というベネフィットを強調。

#### C. セキュリティアピール

「APIキー不要」「外部へのデータ送信なし」であることを明記し、安心感を与えます。

---

### 3. HTML実装コード（そのままPagesに使えます）

GitHub Pagesの `index.html` として保存してください。

HTML

```
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dexscreener Colorizer | 高機能色分けツール</title>
    <style>
        :root { --primary: #22c55e; --bg: #0f172a; --card: #1e293b; --text: #f8fafc; }
        body { font-family: sans-serif; background: var(--bg); color: var(--text); text-align: center; padding: 50px 20px; }
        .container { max-width: 800px; margin: 0 auto; background: var(--card); padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        h1 { font-size: 2.5rem; color: var(--primary); margin-bottom: 10px; }
        .tagline { opacity: 0.8; margin-bottom: 30px; }
        
        /* 魔法のボタン */
        .bookmark-btn {
            display: inline-block;
            background: var(--primary);
            color: white;
            padding: 15px 30px;
            font-weight: bold;
            text-decoration: none;
            border-radius: 50px;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
            cursor: move;
            transition: transform 0.2s;
        }
        .bookmark-btn:hover { transform: scale(1.05); }
        
        .instructions { text-align: left; margin-top: 40px; background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px; }
        ol { line-height: 1.8; }
        .warning { font-size: 0.8rem; opacity: 0.6; margin-top: 20px; }
    </style>
</head>
<body>

<div class="container">
    <h1>Dex Colorizer</h1>
    <p class="tagline">取引金額を瞬時に視覚化。Dexscreener専用・高精度ブックマークレット</p>

    <div style="margin: 40px 0;">
        <p>👇 このボタンを<strong>ブックマークバー</strong>にドラッグして離してください</p>
        <a class="bookmark-btn" href="javascript:(function(){/* ここに最新のコードを1行にして貼り付け */})();">Dex色分けツール</a>
    </div>

    <div class="instructions">
        <h3>使いかた</h3>
        <ol>
            <li>上の緑色のボタンを、ブラウザのブックマークバー（お気に入り欄）にドラッグ＆ドロップします。</li>
            <li>Dexscreenerで気になるトークンの <strong>Transactions</strong> 画面を開きます。</li>
            <li>保存したブックマークをクリックすると、瞬時に色分けが始まります。</li>
        </ol>
    </div>

    <p class="warning">※ページをリロードするとリセットされます。再度クリックして起動してください。</p>
</div>

</body>
</html>
```

---

### 4. リリースまでの手順

1. **GitHubリポジトリ作成**: 名前は `dex-color` など。
    
2. **ファイルのアップロード**: 上記の `index.html` を作成してアップロード。
    
    - `href="javascript:..."` の中身には、改行を消して1行にした最新のコードを入れてください。
        
3. **Pages有効化**: 設定（Settings） > Pages から「Deploy from a branch」を選択して保存。
    
4. **URL共有**: 生成された `https://あなたの名前.github.io/dex-color/` を配布！
    

### 💡 差別化ポイント

Pagesに**「Whale = $10k+」といった色見本表**を載せておくと、「このツールを入れるとどう便利になるか」がさらに伝わりやすくなります。
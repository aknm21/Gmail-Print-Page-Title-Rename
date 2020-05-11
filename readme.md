## このツールは何か

Gsuiteのメールのタイトルを組織名から日付に変更する Chrome 拡張機能である。

メールのドキュメントをPDF形式で保存する際、titleタグの内容がファイル名となる。

「<組織名> メール - <件名>」

ファイル管理の都合上、日付をファイル名に含めた下記形式に変更する。

「<日付（yyyymmddhhmm）>_<件名>」

## 使い方

* 事前準備: Chrome の「拡張機能」から「パッケージ化されていない拡張機能を読み込む」を押下してフォルダを指定する
* 実使用:
  1. Gmail の個別メール画面の「その他」アイコン押下
  2. ドロップダウンメニュー「印刷」押下
  3. 別タブで印刷用ページ表示されると同時に変更されている

## 覚書

### アイコン素材

* [GitHub - adobe-fonts/source-han-code-jp: Source Han Code JP | 源ノ角ゴシック Code](https://github.com/adobe-fonts/source-han-code-jp)
* [Icons - Material Design](https://material.io/resources/icons/?style=baseline)
  * baseline-drafts-24px.svg ※検討使用のみ
  * baseline-email-24px.svg ※検討使用のみ
  * baseline-swap_horizontal_circle-24px.svg ※検討使用のみ
  * baseline-title-24px.svg ※検討使用のみ
  * subdirectory_arrow_right-black-48dp.svg

### URLパターン ※マニフェストファイル用

* トップページ：
    https://mail.google.com/mail/u/0/?tab=rm#inbox
* 個別ページの例：
    https://mail.google.com/mail/u/0/?tab=rm#sent/QgrcJHshbMDxsQphLGbTRDgmWrlrMVlPPRQ
* 印刷ページの例：
    https://mail.google.com/mail/u/0?ik=49b1d9d4d1&view=pt&search=all&permmsgid=msg-a%3Ar-3714380036552331487&simpl=msg-a%3Ar-3714380036552331487

-> `*://mail.google.com/mail/u/0?ik*`

### 試作動作確認ブックマークレット

```js
// 元
(function() {
  const titleTest = /(.+ - )?/;
  if (titleTest.test(document.title)) {
    const zeroPad = (match, p1) => p1.padStart(2, "0");
    const dateString = document
      .querySelector("table.message tbody tr td:nth-child(2) font")
      // 取得例 => <font size="-1">2019年3月30日 9:38</font>
      .innerHTML.replace(/年(\d{1,2})/, zeroPad)
      .replace(/月(\d{1,2})日 /, zeroPad)
      .replace(":", "");
    document.title = document.title.replace(titleTest, dateString + "_");
    document.body.offsetHeight;
    window.print();
  }
})();

// ブックマークレット化
javascript:(function(){const titleTest=/(.+ - )?/;if(titleTest.test(document.title)){const t=(t,e)=>e.padStart(2,"0"),e=document.querySelector("table.message tbody tr td:nth-child(2) font").innerHTML.replace(/年(\d{1,2})/,t).replace(/月(\d{1,2})日 /,t).replace(":","");document.title=document.title.replace(titleTest,e+"_"),document.body.offsetHeight,window.print()}})();
```

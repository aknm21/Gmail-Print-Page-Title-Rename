/**
 * 「＜組織名＞ メール - ＜メール件名＞」 のtitleタグ文字列検出パターン
 */
const titleTrimPattern = /(.+メール - )?/;

/**
 * 日付のゼロ埋め処理
 * @param {String} _match 未使用 ※ String.prototype.replace() のコールバックで渡される引数
 * @param {String} p1 一致部分
 * @return {String}
 */
const zeroPad = (_match, p1) => p1.padStart(2, "0");

/**
 * 日本語形式の日付の整形処理
 * @param {String} timestamp YYYY年m月d日 h:mm 形式の文字列
 * @return {String}
 *
 * @example
 * format("2019年3月30日 9:38") => "201903300938"
 * format("2018年12月4日 17:09") => "201812041709"
 * format("2018年11月30日 9:10") => "201811300910"
 */
const format = (timestamp) =>
  timestamp
    .replace(/年(\d{1,2})/, zeroPad)
    .replace(/月(\d{1,2})日/, zeroPad)
    .replace(/ (\d{1,2}):/, zeroPad);

const main = () => {
  if (
    !titleTrimPattern.test(document.title) &&
    !document.querySelector("html").lang === "ja"
  ) {
    return;
  }
  const timestampText = document.querySelector(
    "table.message tbody tr td:nth-child(2) font"
  ).innerHTML;
  const dateFormated = format(timestampText);
  const newTitle = document.title.replace(titleTrimPattern, dateFormated + "_");
  document.title = newTitle;
};
main();

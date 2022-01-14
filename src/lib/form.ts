/**
 * フォームの入力を数値に変換する
 */
export const transform = {
  input: (value: any) =>
    isNaN(value) || value === 0 ? "" : value.toString(),
  output: (e: any) => {
    const output = parseInt(e.target.value, 10);
    return isNaN(output) ? 0 : output;
  }
}
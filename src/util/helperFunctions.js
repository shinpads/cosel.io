export function parseQuery(queryString) {
  const query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

export function generateSID() {
  const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const length = 20;
  let sid = '';
  for (let i = 0; i < length; i++) {
    sid += values[Math.floor(Math.random() * (values.length - 1))];
  }
  return sid;
}

export async function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand('copy');
    document.body.removeChild(textArea);
    return;
  }
  await navigator.clipboard.writeText(text);
}

export function isValid(value) {
  return !(value === undefined || value === null);
}

(async function () {
  const res = await fetch('/hi', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ message: 'send post request' }),
  });
  // console.log(res, '>>>>>>>');
})();

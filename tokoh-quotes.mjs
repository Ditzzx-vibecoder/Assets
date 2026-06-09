const API = "https://raw.githubusercontent.com/Ditzzx-vibecoder/Assets/main/tokoh-quotes.json"

async function getQuotes() {
  const res = await fetch(API, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "application/json,text/plain,*/*"
    }
  })

  const text = await res.text()

  if (!res.ok) {
    return {
      ok: false,
      code: res.status,
      data: null
    }
  }

  try {
    return {
      ok: true,
      code: res.status,
      data: JSON.parse(text)
    }
  } catch {
    return {
      ok: false,
      code: res.status,
      data: null
    }
  }
}

function normalizeQuotes(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data.quotes)) return data.quotes
  if (Array.isArray(data.result)) return data.result
  if (Array.isArray(data.data)) return data.data
  return []
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

async function main() {
  const result = await getQuotes()

  if (!result.ok) {
    console.log(JSON.stringify({
      status: false,
      code: result.code,
      quote: null,
      figure: null
    }, null, 2))
    return
  }

  const quotes = normalizeQuotes(result.data)
  const selected = pickRandom(quotes)

  if (!selected) {
    console.log(JSON.stringify({
      status: false,
      code: 404,
      quote: null,
      figure: null
    }, null, 2))
    return
  }

  console.log(JSON.stringify({
    status: true,
    code: result.code,
    quote: selected.quote || selected.text || selected.kata || null,
    figure: selected.figure || selected.author || selected.name || selected.tokoh || null
  }, null, 2))
}

main()
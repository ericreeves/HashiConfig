export function makeTitle (slug) {
	if (slug === undefined) return ""
	let words = slug.split('-')
	for (var i = 0; i < words.length; i++) {
	  let word = words[i]
	  words[i] = word.charAt(0).toUpperCase() + word.slice(1)
	}
	return words.join(' ')
  }
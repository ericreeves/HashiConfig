<script setup>
  function makeTitle (slug) {
    if (slug === undefined) return ""
    let words = slug.split('-')
    for (var i = 0; i < words.length; i++) {
      let word = words[i]
      words[i] = word.charAt(0).toUpperCase() + word.slice(1)
    }
    return words.join(' ')
  };

	function AutoPropsFromIdPlugin (node) {
    const title = makeTitle(node.props.id)
	  node.name = node.props.id // auto set name to id
	  node.props.label = title // auto set label
	  if (!['button', 'submit'].includes(node.props.type)) {
		// automatically set help text, but exclude buttons
		node.props.help = 'Please enter your ' + title.toLowerCase() + '.'
	  }
	}
</script>
	
<template>
	<FormKit id="my-form" type="form" :plugins="[AutoPropsFromIdPlugin]" #default="{ value }">
	<FormKit id="email-address"/>
	<FormKit id="first-name"/>
	<FormKit id="last-name"/>
	<pre wrap>{{ value }}</pre>
	</FormKit>
</template>

<style>
#my-form pre {
	margin-bottom: 20px;
};
</style>
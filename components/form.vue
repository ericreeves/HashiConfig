<script setup>
	function AutoPropsFromIdPlugin (node) {
	  const title = 'Form Title'
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
	}
	</style>
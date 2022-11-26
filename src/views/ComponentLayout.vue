<template>
	<!-- 勿动 勿动 勿动 勿动 勿动 勿动 -->
	<router-view v-slot="{ Component }">
		<component :is="Component"/>
	</router-view>
</template>
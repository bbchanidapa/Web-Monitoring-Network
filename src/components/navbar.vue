<template>
	<nav class="nav is-mobile">
		<div class="container is-mobile">
			<div class="nav-left">
				<a class="nav-item">
					<p class="title is-3" style="color: #fff;">FITM Monitoring </p>
				</a>
			</div>
			<div class="nav-right nav-menu" >
				<a class="nav-item" >
					<p class="title is-6"><router-link to="/" style="color: #fff;">Dashboard</router-link></p>
				</a>
				<a class="nav-item">
					<p class="title is-6"><router-link to="/Device" style="color: #fff;">Device</router-link></p>
				</a>
				<a class="nav-item">
					<p class="title is-6"><router-link to="/Interface" style="color: #fff;">Interface</router-link></p>
				</a>
				<a class="nav-item">
					<p class="title is-6"><router-link to="/Top10Rank" style="color: #fff;">Top 10 Rank</router-link></p>
				</a>
				<a class="nav-item">
					<p class="title is-6"><router-link to="/Network" style="color: #fff;">Network</router-link></p>
				</a>
			</div>
		</div>
	</nav>
</template>

<script type="text/javascript"></script>
<style type="text/css">
	div { font-family: GillSans, Calibri, Trebuchet, sans-serif;} 
	.nav {
		background-color: #01579b ;
	}
</style>

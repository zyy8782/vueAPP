<template>
	<div class="tab">
		<ul class="tab-list">
			<li class="tab-item"><router-link to="/home/commodity">商品</router-link></li>
			<li class="tab-item"><router-link to="/home/evaluate">评论</router-link></li>
			<li class="tab-item"><router-link to="/home/merchant">商家</router-link></li>
		</ul>
	</div>
</template>
<script>
export default {
	name: "tab"
	
}
</script>
<style lang="stylus">
@import '../../common/stylus/index.styl'
	.tab{
      width: 100%
		  height: 40px
		  position: absolute
		  background: #FFF
			border-1px(rgba(7,17,27,0.1))
		  top: 0
		  left: 0
			z-index 100
			box-sizing: border-box
			font-size: 14px
			color: rgb(77,85,93)
			.tab-list{
					display: flex
					.tab-item{
							flex: 1
							display: inline-block
							line-height 40px
							width: 100%
							text-align: center
							&>.router-link-active{
								color: #ff0000								
							}
							&>a{
								display: block
							}
					}							
			}
	}
		
</style>

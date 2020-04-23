<template>
	<div>
		<div class="content">
			<div class="cartbox" v-if="total_count>0">
				<div class="order_msg" >
					<div class="biz_msg">
						<div class="mbxa" @click="checkAll">
							<image class="img" :src="(checkAllFlag ? '/static/client/checked.png' : '/static/client/uncheck.png')|domain" />

						</div>
						<img :src="shop_config.ShopLogo|domain" class="biz_logo" alt />
						<text class="biz_name">{{shop_config.ShopName}}</text>
					</div>
					<block  v-for="(pro,pro_id) in CartList" :key="pro_id">
						<block v-for="(attr,attr_id) in pro" :key="attr_id">
							<div class="pro">
								<div class="mbxa" @click="change(pro_id,attr_id)">
									<image class="img" :src="(attr.checked ? '/static/client/checked.png' : '/static/client/uncheck.png')|domain" />
								</div>
								<img class="pro-img" :src="attr.ImgPath" @click="gotoDetail(pro_id)"/>
								<div class="pro-msg">
									<div class="pro-name" @click="gotoDetail(pro_id)">{{attr.ProductsName}}</div>
									<div class="attr" v-if="attr.Productsattrstrval">
										<!-- <span v-for="(item,index) in attr.Productsattrstrval" :key="index">{{item}}</span> -->
										<span>{{attr.Productsattrstrval}}</span>
									</div>
									<div class="pro-price">
										<span class="span">￥</span>{{attr.ProductsPriceX}}
										<span class="amount">
									  <span class="plus" :class="attr.Qty == 1 ? 'disabled' : ''" @click="updateCart(pro_id,attr_id,-1)">-</span>
									  <input class="attr_num" v-model="attr.Qty" type="number" @focus="setActiveAttr(pro_id,attr_id)" @blur="setAttrNum" />
											<!-- <span class="num"></span> -->
									  <span class="plus" @click="updateCart(pro_id,attr_id,1)">+</span>
									</span>
									</div>
								</div>
							</div>
						</block>
					</block>
				</div>
			</div>
			<div v-else class="none">
				<image class="img" :src="'/static/client/box.png'|domain" />
				<div><span>购物车空空如也</span><span class="tobuy" @click="gotoBuy">去逛逛</span></div>
			</div>

	</div>
	</div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
	export default {
		mixins:[BaseMixin],
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>

</style>

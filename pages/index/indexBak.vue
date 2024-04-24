<template>
	<view>
		<button style="margin: 36px 36px;" @click="showModal"> 生成海报 </button>

		<view class="cu-modal" :class="modalName == 'Image' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog" v-if="goods && erweimapath && haibaoShow" @tap="hideModal">
				<view class="bg-img">
					<cc-poster @success="posterSuccess" :imgSrc="goods.itempic" :QrSrc="erweimapath"
						:Title="goods.itemtitle" :PriceTxt="goods.itemendprice" :OriginalTxt="goods.itemprice"
						:LineType="false"></cc-poster>
						</view>
			</view>
		</view>
	</view>
</template>
<script>
	//高德SDK
	export default {
		data() {
			return {
				haibaoImg: null,
				modalName: '',
				haibaoShow: false,

				erweimapath: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAT9UlEQVR4Xu2dYXvivA5E2///o/c+XWB7E3DOkWJTeDv71Y4kj2YkOQX28+Pj48/HD/7786fm/vPzc0q0Vb83p3v/ezu0PrLTPVTVv8WvarcbP+Fl4+36p+e+2FZjKFksrleJOguwqt8IZFuYuvjt6RGBgGCqQEcgW0Crld7iV7VbrIv/tkcgEchDBCxRiXhVIlu/VbsU52j97QRSregWmFFiKBF7+3Y/ncMSxZ7vts/GV7U72v9sfzaOriBoBBvhPAvPPS/u7iBErG4gEUgXuePnIpC5uEYgVzzTQeYSyxZWGqnSQXYIVCug3U8Ji0AikEcIlDtIl0hdIpO/rl1bmejOM5dW39aq5749SRW5ut49HxUkG6/Nk+UBnYfs4B2EEmcvbe96B7GJp0TQOuE8iqMqACIExWnz/exLOuFn404HKd5BIhAnGYsTCTod5M3uIDbxjkbjXVQB00G22M3qhGQnIxYwOwJx0rc4pYNc8SRl3mC3+6r7KWFUsUf+HF3quyiedJB0kL8IEFH21JtFHHuJI+pX47fCJ8FTXPbSvLowED62YNp9hAvZebsRKwKhlNfW7dvFmtV5dy0bHwnPFsC3f4sVgcyi6sWOJeAsr0Rkqui249p4yV86CCBZHW2IAN1KVo3DEiQC2X4d6u07CCm+O0N3iW2JuGofCYfOZe9wq+KnicAKmM7ZLUxv10EikG2qI5DjUZGETXyKQK4IdisQJWD1egQSgWw4RorPiLWVJAk/I9bJO8isCtidJc9WSDt7ds9JBJzl3/qhAkLrtsBU/yI+G1/ixSx/OGJ1He2fi0BqdweLX/WSG4EcM7r8FisCqQFq8apWwHSQcwXG5iUCuSJVJegIYEtcqvSUQOuHOgStZ8Ta/v7Xy/1wHM22tH5LMO2j9Vl2Zo2Wq+zYSzoJa5UdWxiowHTXIxDoKCSk6vqoQv+UnVXEXl1guoSvPheBRCAPOVMV7CqhpYPsfrz6VRKzugJWR5aMWNXaP2d/Okg6SDrIgZYikAgkAjkSyJ9Z7zvndDS0YmfSVSPMPkAbz6u+5rWvr7s0oZEZE/7DGz4jkEsG7IwfgdQYG4HU8Dq921bsdJDHwredYBaxZ9k5TZymgXSQK3DpIFsGzSL2LDtNfp9+DAXybOJUZ3Ubn+085L+a8K7fbmarndPeQaq4dOMnP7f1Vbje4Ud3EEvAWbO5BYiAIqLYBJIdGllWJXIU/9l4CdfbOvmx+NI++wdIsmPXIxCL1HUfESECeXzXKcI83B6BAJJdAhKxbQLJTjc+67+672y86SC7bxjSfwNNBBgB2n2OCGHtkp1VI2HV79mRhfCgEY+en53fqoBnjfj2nHe8iEDWjghWMEQce+eoCt8Sp/pywgqL7EYgn9svqBChbELJTpVIVXvV/RHIBTGLA/GAhGfzg5/FokBspRgFRCPA/jkbjwXAztxVe9X9lhhVPAhfi2eXcPRcdX00klLBs+e8s9N9zVslgB0RKKFVgsyK0xYCGz8Jwia0S7CzuNj4zvqxeHZ5gfhFILUUIqByZIxAHO4RCHxhimB8ViVLB9lm4lm4RyARyF/mUWeydzjqTFRw7PqvFYhVLAFkE07+yM+rEWfWLNy1M+uySvmjvNk7Zzde8m8LBe27+7AiOZ79FoH8RSAXxFfh8OwCQ+cgYY5GXSoo9u8p+30RiJ0pmvuIEN2E23As4aqVnApbOsju7lAF+KeJ0U2wJabttD+NQzoI/Lr7/jWvJQ5VRlu5yB/5eXaCI5ALApS3dJB0EKUVK3AinLXT7eTV5yje/4xAuh9WpA5hAawmnvwq1hZeq9I5qvHbkcqeg/bRWxob/yocKH7ya0fZ9iU9ArlAPCIKJcgSjCo0EaW7HoEcj4SET/vDilTJiVhW+USsWQSNQI4lSPns5oGET34tj9JBCOndOgncjkJdYtjEF491t50qpI2f4rV2quchvz8ukOqBbMCWgHv/lHDr3wJf9T+LKLMEXI3f5tue055j5NfmiXjRjRdHLAsYJeIsACPi29ZJo5o956xEkD9LLEugKn4UX5dw9rlqAZ2Vlz2eEQgxYbc+KxHkNgK5IGQLwKy8RCBXZlrgqTNaIpMgqMN1XyJU47dx2k5wFh+bp2UCob+kz0rMCHg6WDfBlMBnA0/Eo3joPHaEtXiTv7PEt/F2edM9510HiUCOqUtAE5FIGHbW7vohIs+6w3Xjo84ZgRS/MEWEHV1Gn5UIK4hqPF0CRiDHdxniE37cPSPW8ac9u8SNQB6XEho1RwVwViHAEauaONsCuzMnKdwStAsgdQTyb0cYio/iGI1q3fi6d7/qc5Rfyy/Cry28Vb9qQonpzt4EhBViNzFEAFtgyL/Fj/yRnTZxFv16y6x4CF8tvAjkeEalyt0lICWQ7HYLAQlKEycCWUucdJA1d5tqh51VsbvCokLx43bTQdYWgtxBaoVglmCnCS8CiUBojPxan0a43Wj28na7fygkUG0lIDvVS7F9m2NHEToHJXjWXaKK020/xWdHGLq7dP8cQPFZ/Kp5siN+++8glDAKmJ7vJi4C2SJHBOzi/GoFhvjWFXAEcmVIF0AioK2AVKFnFRQi0qjzUHw/jR+dqxtfBBKBPNQeCfvXdhBbqQggWrczYLdCVysK7bejiLXzUwSkTjD7nJZPZ+9M5IfwHj1/10HI0bvM+ERUEp7FoWuHEraqwEQgNrOXfRHIFS8S1OzKGoE8RrRbcIj2hHc6yA6BWYno2qGEpYNcK7j8SMsygdAPx9nKOat1kx0iFgE1rBSDRJA/6jzdtyf7OCmO7ujbxcsWBrtvdAex+SI/Ng93diKQ40pFxIxAavh18aoWzm4HjkAGJcl+ZooSZSs/EcXaoXiosqaDfP2wz/e/CCQC6WrimEhyRKXCQB27O0pOG7FmBWizcBYwet7GYfdVK/JqPOn8FK+Nr9qpLJ40CtnO3rVDnfruh+MsYBRQFyAKmBJl/Xb3EeGq8duKaC+r5H9V3ixvKH8WX9pH6yM8ccSyB10FNCWYAO4S3z5XBX41nukgl8wRHwmnW/4jEKuEwb4IxBHSwtwlNuWB1nUHoe+DaEOT/qBT7SA2EdR57CWO4rOVqhs3PWc7Ftmhc3QJSH6fvU7nwE/zRiDb14ARyAUBItazid71R+eIQK7IpoNsKZYOch0lM2I9rog3urwbUTJi1XpJOsgAL7ocRiDvNVrWZPG9OwKJQFrcebfO2TqkuEstu4N0W72t7FThyT8R4GafKkz30k7x0Vu3UXz0XNXviHg2TxZnex4bD+XF2olAoPREII8BikBOEqdbqSzw6SDHLxdG+HTz0u1M6SBX5KrEti2OEmo/zEYJHsWTDvLLO8j+C1NVQpwl1ix/1ZnTCpoqYDd+eo7Wz+JOMz/hQ+u2g5EdWwApTxavu0IagRyPKgT8KiKvsmsLSZW49g+tdC5a7748iUB2CFRHM5tgIhgJyibYEuVsPPbcFM8qO+kgxf/EE94d/FuOQC5QkGBXETsjVvEtlyX2rNZOl3ISkI2X9tkKuMpOFU+Ko7pOnYc6oPXXLQTEE/xGITnuznaj56oJtUQnuzYR1X0RyPF/oBOBFBlFRKb1rvCKYertEUgE8pAstrJTi6MWbf10haWVMNgYgfxSgRBxzxLr9jz5sQKZFQ+NnBTvrDi6+HQLBT1nCwHhNxsfskf8ad9BnkUE8kMHJICq65Rgirfqj/aTv+p6d0SNQHbIEfCUWLtOfiKQc/+LrMUvHeTKWCKkbe1WALSP4rEJJj92PR3kghTl5dk8sfnb7yP+ZMQqIhuBRCAbyvz0bEmViipAkf+4PQL55QKptqDbfppRkXmDDbPskh0ifndksAJeFd8eVnvOKg+6dslPt0BTYbV8vBuxKODuWw4bECXUEq5qxya4CryNNwKZ25mqeRrymv4DnVkJjkCOEYhAIpCWRog41ijZSQc5RpIKpcWP8mUrP+2jdYrj39Wh20GIcDTijGZ6+5w9oL07EAFm37UIP1q38Vg7hCfZ6d4VaKTv2u0K5O65CORxa19916oSbiTgWXYikMGIF4FEICSOr/WqEG3nTge5ImBbZUasCwJEyIxY5z5iMyoKdyMW/Xi1nc1NFTJ76LJnZ0u7z96FuiMXnWe2f4NxZw/xwJ6TOoaNzRaQUSGxHQ5/WZGAsQey+whoS3y7bzZBq35n+7c4V/cRDyhvtmLbuCKQAVKWgHbfbIJW/c72bwlW3ReBDO4KBEwVaNpPlcgS0O6bTdCq39n+Cd/uOvGA8va2HeSn32JRwrqJqRL1v/oalXCw5551d6B82/WnjVgRyCUllihdwlHiKeH2LWDVjj13BCJn/ts2SsTe3KoW3CWOTTidk9ZJGBbP7jm7gqZ8UWe35+7uq+Lexa/9ad5ZARJAlIjuwSOQWue0eFE+Z63P4h8VkLvXvN0DVAPuVk4SzCj+bkWkc5FdezmdZYfyN8sP4WLzS/HOyme3kEYg1wzYWZwqjk34KjvkPwLZIkR5iEAiENLUw5cY6SAKtu9NFjC6vJOiM2IdV0BKWzpIOshDjhAxMmIdS6tbuLqF86zQKd6bfdqXESsjFnHxd49Y9F+wdd8iKNQP/kBnn6fOYCtFt4NUR8bZ5yJ7NJLatzvdc1IHofxR/KO3ZYTLiBd354xALpBEILW7DRF/RFwaafYEjUB2/wWbVX61clBiIpAI5BH38KdHM2J9QfT9jyqaraxUCGj0oOf1CPG5PV/3uW6BoXMS3tVCWe1Q+IWpUSJs4JTIswDZGfqsH1soqFONCEjCsuckvO16Nx5r/yyvKJ82DspXBHJFsiv4LpEoMbRuK70lyn5f91xdf9XzRCCSuLayEqARyJbaEcgFj3QQKcSMWLX/a7DbSWyhooJn/VOnXiYQewALyOzLGFVICzDZsR2O/HXxtM+R/+rl1tpbFZ+NF/NHP/vTvUzZg0cgjkpdPO1zLorvXdW82Q5cjcPub79li0AuEHcTjhWo+RqVLs22cEUgx/nF/EUgEYitwv+/r1tQusLvxGjiRYF0P2pCB+0CiAHvKrL1U7V7Ox9d4sj/rDvIWYJUn692nu4IM4tHFC/laTgCRiAXaCyRSWiU8JHwqgRevZ8It/cfgUBGqsSxl7azFfzmh+KLQLYZiUCuhTMdJB3kUbGKQCKQDS/SQdJBHhaKdJB0kHSQ8f3haV+5tRWaLp90l7B3DvJj12kU6V5e7TnppUD3Dlf1b/PbxcvmY5T/0fOETwRSRX63v5twIiCtr37JUfUfgZx8i2UBJL7axNl95I/WI5BzI6p9XUx5oE6aDgKVvfuHIkpMBPLLBEIJJ8Lc1i0hz/qzMz5VqlUdrlu5KN7qrG3jmGXX+qNOvzov5TvIWcJGII+/402EJ9y7hYAK2iq7EQggnw5yDBBVLhLUrEofgRx/Eaz9haluZepepmxFssSxBLVCt35HHTYd5ILMs/NC/pb97A85ro5iJMjqOhFyFpGtn2r8q/Gr3g1sIVmNRxfHYb67f0mng0YgF8gJp9kJPWtv1AkpnxHIDnlKPAG6ugISUSj+dJDjH8yjDjPC3+JO+Vu1fsfbdJBjqK3Qu4I6m2hbuat+SAC0/p8RyP4rt1UgZ++vAm/fk1ft2lGDzm/jm2Wne869f6r0VphkZ+/X2n1WvNM+i0UJtuvVBFsCVu1GIMd/z7FEjkAs8+W+KpEjkOP3+JbIz6rIRINXizcdBDJWFawlWpUIqwuBjbv6cuXtO8j+kk4Kn71Ol+AqkWx81cTZSzidZ7YdOq+Np3oXOFs47Ag7qzBYO3eFIgIhim3XiXC0HoFs8SShWWLPshOBXBFIBzkuDNS5iZC27JCdCGT3X7ARYBZ42heBRCBfCGAhyIhFUsqI9QihWYWM7KSDpIP85V+XKCRveyfKJf0xku1P81Ji7GvDagKr+6uvJSluasn0fDeeZ42ENq8k6J+2Y/1TYYhAAMmzRLAjAiU0AjlGqItPBHJFoFr5b8BFIIPRo/kr+9RhZ+WJCs5ofdqneasB2EpKlSAjVg15wmsWIV/NTg2l791lgRBhtRKb/9MSVXArPKpcXUCxRQ/O/Sr+RsQm3Lt4kmBn4UJ5GfnZnxvvIBFILWXPJsBZfxHINr8RyBWPrvBJLmcJS/apMlbPFYFEIA85VyWSJW4EcozUs/G5RWPvSG/fQaiC2tny1QhPxOkmmM5pOwjhbgtO9Zz2jkn+u+d8uzsIJSoCcb/sSJW1SjjaP/JHLwMikN1HTapvR1ZVVptQqtB2vVpZZxWCbmWleEfx0XO03s1L95zpIMBgmzArhFnEiUCOv2psJw3qfC8nEArYEpb2reo81m5VUKtGDcK7K+hupbe4EM40ut380PkjEMgIAWgrlU18tTNQIaD4querEr8an8UpAhkgZQGnfQSwrTBEQJtw2pcOskWI8pcOcsWrSxwCOAI5liwVoGqnoQJRLUQRSATyFwFL1NmEtX7tvghEfliRZmILOO1LB7lQkvDOJf3jY/O+zBKnqng7CpHdbuskwVgirIqvOkJUL/OjDmLtEC9sfm3+uiPurDz+89/9dXciyn7dAkh2LcC0z1ZOIgads/sHqqpfSyhrl/Cjc9uRjuKxeSLekJ9hoYhAjqGtAmuJRYmv+o1A5uYxHUR+kalK1AhkS1QabQlfKiTUOaqj5V1nfLXfxaLWTYDbGdQCT/6q6zahhEM38VbA5J+IPbujUTxdXCl/d39J7zrqPkdAU0JnEb0rLAKYzmdxe/Ydjghpz0X5sXYoHovjfh/lLwIBZAnA6no3kRHIFjkSnsWZ8heBRCCKS9TJh2+B4K736h3kfxjb+rVYRAzmAAAAAElFTkSuQmCC",
				
				goods: {
					"product_id": "43092699",
					"itemid": "2nNozWXiotnRwxGUakBuXUD-0npyN5GSNmYDb0pgTxw",
					"xid": "",
					"seller_id": "15353",
					"itemtitle": "开丽产妇卫生巾产后专用刀纸月子安睡裤计量卫生巾孕妇用品安心裤",
					"itemshorttitle": "开丽产妇卫生巾月子安睡裤计量卫生",
					"itemdesc": "【开丽旗舰店】安心裤型亲肤面料，产后专用不勒刀口，免穿设计方便，超强吸收加长加大款，产妇的优质选择！【赠运费险】",
					"itemprice": "39.90",
					"itemsale": "400",
					"itemsale2": "0",
					"todaysale": "3",
					"itempic": "https://img.alicdn.com/imgextra/i1/2742920221/O1CN01nFqqJ41DVGNfjYMmu_!!2742920221.jpg",
					"itempic_copy": "0_530717334944_1689668877_tb.jpg",
					"fqcat": "9",
					"itemendprice": "29.91",
					"shoptype": "B",
					"tktype": "营销计划",
					"tkrates": "20.00",
					"cuntao": "0",
					"tkmoney": "5.98",
					"couponurl": "http://uland.taobao.com/quan/detail?sellerId=1136208359&activityId=678249e1242e4c808fe70d5c62a32c46",
					"couponmoney": "6",
					"couponsurplus": "99917",
					"couponreceive": "83",
					"couponreceive2": "0",
					"todaycouponreceive": "83",
					"couponnum": "10000",
					"couponexplain": "单笔满39元可用",
					"couponstarttime": "1690732800",
					"couponendtime": "1690991999",
					"start_time": "2023-7-31",
					"end_time": "2023-8-2",
					"starttime": "1690732800",
					"isquality": "",
					"report_status": "0",
					"is_brand": "0",
					"is_live": "0",
					"guide_article": "【开丽旗舰店】安心裤型亲肤面料，产后专用不勒刀口，免穿设计方便，超强吸收加长加大款，产妇的优质选择！【赠运费险】",
					"videoid": "329522912147",
					"activity_type": "普通活动",
					"general_index": "0",
					"planlink": "",
					"seller_name": "推神电商",
					"userid": "1136208359",
					"sellernick": "开丽旗舰店",
					"shopname": "开丽旗舰店",
					"online_users": "0",
					"original_img": "",
					"original_article": "",
					"discount": "7.50",
					"is_explosion": "0",
					"me": "",
					"activityid": "678249e1242e4c808fe70d5c62a32c46",
					"coupon_condition": "39.00",
					"taobao_image": "https://img.alicdn.com/i4/1136208359/O1CN01TktQe12BcTTwO4sd5_!!1136208359.jpg,https://img.alicdn.com/i3/1136208359/O1CN019KbVy22BcTTy5X6iy_!!1136208359.jpg,https://img.alicdn.com/i4/1136208359/O1CN01rFDDJM2BcTU2p0LsH_!!1136208359.jpg,https://img.alicdn.com/i2/1136208359/O1CN01qe5Okb2BcTU4r9Rt6_!!1136208359.jpg,https://img.alicdn.com/imgextra/i1/2742920221/O1CN01nFqqJ41DVGNfjYMmu_!!2742920221.jpg",
					"shopid": "102097986",
					"son_category": "121414004",
					"down_type": "0",
					"deposit": "0.00",
					"deposit_deduct": "0.00",
					"is_shipping": "-1",
					"is_mcoupon": "0",
					"min_buy": "1",
					"shop_score": {
						"desc_score": 4.8,
						"desc_level": 1,
						"serv_score": 4.8,
						"serv_level": 0,
						"post_score": 4.8,
						"post_level": 0
					},
					"shopicon": "https:https://img.alicdn.com/imgextra/i2/1136208359/O1CN01mA6Lvr2BcTXxYlVY6_!!1136208359-0-shopmanager.jpg",
					"brand_name": "开丽",
					"item_from": "haodanku",
					"surplus_num": "20000",
					"total_num": "20000",
					"couponinfo": "满39元减6元",
					"images": ["https://img.alicdn.com/i4/1136208359/O1CN01TktQe12BcTTwO4sd5_!!1136208359.jpg",
						"https://img.alicdn.com/i3/1136208359/O1CN019KbVy22BcTTy5X6iy_!!1136208359.jpg",
						"https://img.alicdn.com/i4/1136208359/O1CN01rFDDJM2BcTU2p0LsH_!!1136208359.jpg",
						"https://img.alicdn.com/i2/1136208359/O1CN01qe5Okb2BcTU4r9Rt6_!!1136208359.jpg",
						"https://img.alicdn.com/imgextra/i1/2742920221/O1CN01nFqqJ41DVGNfjYMmu_!!2742920221.jpg"
					]
				}

			};
		},

		onLoad() {

		},
		methods: {
			posterSuccess(haibaoImg) {
				this.haibaoImg = haibaoImg;
				this.modalName = 'Image';
			},
			showModal() {
				if (!this.haibaoImg) {
					this.haibaoShow = true;
					
					uni.showLoading({
						title: '海报生成中...'
					});
					
				} else {
					this.modalName = 'Image';
				}
			},
			hideModal() {
				this.modalName = null;
			}

		}
	};
</script>
<style lang="scss">
	.cu-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}

	.cu-modal::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}

	.cu-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}

	.cu-dialog {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 680upx;
		max-width: 100%;
		background-color: #f8f8f8;
		border-radius: 10upx;
		overflow: hidden;
	}

	.cu-modal.bottom-modal::before {
		vertical-align: bottom;
	}

	.cu-modal.bottom-modal .cu-dialog {
		width: 100%;
		border-radius: 0;
	}

	.cu-modal.bottom-modal {
		margin-bottom: -1000upx;
	}

	.cu-modal.bottom-modal.show {
		margin-bottom: 0;
	}

	.cu-modal.drawer-modal {
		transform: scale(1);
		display: flex;
	}

	.cu-modal.drawer-modal .cu-dialog {
		height: 100%;
		min-width: 200upx;
		border-radius: 0;
		margin: initial;
		transition-duration: 0.3s;
	}

	.cu-modal.drawer-modal.justify-start .cu-dialog {
		transform: translateX(-100%);
	}

	.cu-modal.drawer-modal.justify-end .cu-dialog {
		transform: translateX(100%);
	}

	.cu-modal.drawer-modal.show .cu-dialog {
		transform: translateX(0%);
	}

	.cu-modal .cu-dialog>.cu-bar:first-child .action {
		min-width: 100rpx;
		margin-right: 0;
		min-height: 100rpx;
	}
</style>
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';
import $ from "jquery";
import { useRouter } from 'next/router'

export const useStyles = makeStyles(theme => ({
	root: {
		background: '#E1D6C6',
		textAlign: 'center',
		fontWeight: '500',
		height: '83px',
		lineHeight: '80px',
		position: 'fixed',
		left: '0',
		bottom: '0',
		width: '100%',
		zIndex: '9',
		'@media (max-width: 767px)': {
			lineHeight: '30px',
		},
		'& span': {
			fontSize: '26px',
			color: '#12303c',
			'@media (max-width: 767px)': {
				fontSize: '18px',
			},
		},
		'& em': {
			fontStyle: 'normal',
			marginLeft: '23px',
		},
		'& a': {
			background: '#12303c',
			maxWidth: '248px',
			height: '56px',
			lineHeight: '56px',
			textAlign: 'center',
			width: '100%',
			border: 'none',
			borderRadius: '10px',
			fontSize: '26px',
			color: '#fff',
			position: 'absolute',
			right: '0',
			top: '14px',
			padding: '0',
			'@media (max-width: 1439px)': {
				right: '15px',
			},
			'&[class*="mobile"]': {
				display: 'none',
			},
			'@media (max-width: 767px)': {
				'&[class*="mobile"]': {
					display: 'block',
				},
				'&[class*="desktop"]': {
					display: 'none',
				},
				top: '34px',
				width: '140px',
				height: '42px',
				padding: '8px 42px',
				fontSize: '22px',
				lineHeight: '26px',
				left: '50%',
    			transform: 'translateX(-50%)',
			},
			'&:hover': {
				background: '#295666',
			},
		},
		'& [class*="container"]': {
			position: 'relative',
		},
	},
	container: {
        maxWidth: '1440px',
        padding: '0',
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
		position: 'relative',
    },
}))

export const BoatConfiguratorFooter = props => {
	const classes = useStyles()
	const [nextTabval, setNextTabVal] = useState(1);
    const router = useRouter()
	const [cookies, setCookie] = useCookies([
		'BoatColor',
		'BoatColorPrice',
		'i1',
		'i2',
		'captainsWatch',
		'ap',
		'ad'
	]);
	var price = 249000

	if(cookies.BoatColorPrice) {
		price = price + parseInt(cookies.BoatColorPrice)
	}
	if(cookies.i1) {
		price = price + parseInt(cookies.i1)
	}
	if(cookies.i2) {
		price = price + parseInt(cookies.i2)
	}
	if(cookies.captainsWatch) {
		price = price + parseInt(cookies.captainsWatch)
	}
	if(cookies.ap) {
		price = price + parseInt(cookies.ap)
	}
	if(cookies.ad) {
		price = price + parseInt(cookies.ad)
	}

	setCookie('boatTotalPrice', price, { path: '/' });
	
	function handleNextTab(event) { 
		var activeTab = document.getElementsByClassName("nav-link active");
		[].forEach.call(activeTab, function(el) {
			var nextTab = parseInt(el.getAttribute("data-rb-event-key")) + 1;
			if(nextTab < 6) {
				document.getElementById("services-tabs-tab-" + nextTab).click();
			}
			setNextTabVal(nextTab)
		});
	}
	
	function handleWindowOnScroll() {
		var $window = $(window);
		
		var exterior, interior, technology, addons = 0

		if ($("#mobile-exterior").length)
			exterior = $('#mobile-exterior').offset().top;

		if ($("#mobile-interior").length)
			interior = $('#mobile-interior').offset().top;

		if ($("#mobile-technology").length)
			technology = $('#mobile-technology').offset().top;
		
		if ($("#mobile-addons").length)
			addons = $('#mobile-addons').offset().top;
		
		if ($window.scrollTop() >= exterior && $window.scrollTop() <= interior) {
			$('.next-btn.mobile').attr('data-nexttab', 'mobile-technology')
		}
		if ($window.scrollTop() >= interior && $window.scrollTop() <= technology) {
			$('.next-btn.mobile').attr('data-nexttab', 'mobile-addons')
		}
		if ($window.scrollTop() >= technology && $window.scrollTop() <= addons) {
			$('.next-btn.mobile').attr('href', '/boat-configurator-summary')
		}
	}

	function handleNextScreen() {
		var nextScreen = $('.next-btn.mobile').attr('data-nexttab');
		$('html, body').animate({
			scrollTop: $("#"+nextScreen).offset().top
		}, 1000);
	}

	function handleSend() {
		$('.payment-submit').click();
	}

	React.useEffect(() => {
		
		if(router.query?.e === 'c2') {
			setCookie('BoatColorPrice', '8500', { path: '/' });
			setCookie('BoatColor', 'Moss Green', { path: '/' });
		}
		if(router.query?.e === 'c3') {
			setCookie('BoatColorPrice', '15000', { path: '/' });
			setCookie('BoatColor', 'Coffee', { path: '/' });
		}
		if(router.query?.i2 === 'i2') {
			setCookie('i2', '10500', { path: '/' });
		}
		if(router.query?.i1 === 'i1') {
			setCookie('i1', '4500', { path: '/' });
		}
		if(router.query?.t === 't') {
			setCookie('captainsWatch', '15000', { path: '/' });
		}
		if(router.query?.ap === 'ap') {
			setCookie('ap', '4500', { path: '/' });
		}
		if(router.query?.ad === 'ad') {
			setCookie('ap', '4500', { path: '/' });
		}

		$('.show-more').click(function () {
			if($(".text").hasClass("show-more-height")) {
				$(this).text("Show Less");
			} else {
				$(this).text("Show More");
			}
	
			$(".text").toggleClass("show-more-height");
		});

		$('.nav-item .nav-link').click(function () {
			var thisTabID = parseInt($(this).attr('data-rb-event-key'))
			setNextTabVal(thisTabID)
		});

		window.addEventListener('scroll', handleWindowOnScroll);
    	window.addEventListener('resize', handleWindowOnScroll);
	}, []);
	

  	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<span>Price: <em>{price} €</em></span>
				{nextTabval === 5 ?
					<a className="next-btn desktop" href="JavaScript:void(0);" onClick={handleSend}>Send</a>
				:
					<a className="next-btn desktop" href="JavaScript:void(0);" onClick={handleNextTab}>Next</a>
				}
				{router.query?.slug === 'boat-configurator-summary' ?
					<a className="next-btn mobile" data-nexttab="mobile-interior" href="JavaScript:void(0);" onClick={handleSend}>Send</a>
				:
					<a className="next-btn mobile" data-nexttab="mobile-interior" href="JavaScript:void(0);" onClick={handleNextScreen}>Next</a>
				}
				
			</div>
		</div>
  	)
}

export default BoatConfiguratorFooter;

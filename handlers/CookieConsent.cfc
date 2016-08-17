/**
 * Handler providing front-end viewlets
 * and common actions for Stripe integration
 *
 */
component {

// VIEWLETS
	private string function _cookieConsent( event, rc, prc, arg={} ) {
		var args               = duplicate( arguments.args );
		var cookieConsentTheme = getSystemSetting( category="cookie-consent", setting="theme", default="dark-top" );

		event.include( assetId="cookieconsent-" & cookieConsentTheme & "-css", group="cookie-consent" )
			 .include( assetId="cookieconsent-js", group="cookie-consent" );

		return renderView( view="/general/_cookieConsent", args=args );
	}

}
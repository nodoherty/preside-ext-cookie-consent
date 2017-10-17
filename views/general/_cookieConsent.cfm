<cfscript>
	cookieConsentIsActive         = getSystemSetting( category="cookie-consent", setting="is_active"         , default=false                                                                            );
	cookieConsentTheme            = getSystemSetting( category="cookie-consent", setting="theme"             , default="dark-top"                                                                       );
	cookieConsentHeadline         = getSystemSetting( category="cookie-consent", setting="headline"          , default="This website uses cookies to ensure you get the best experience on our website" );
	cookieConsentAcceptButton     = getSystemSetting( category="cookie-consent", setting="accept_button"     , default="Got it!"                                                                        );
	cookieConsentReadmoreButton   = getSystemSetting( category="cookie-consent", setting="readmore_button"   , default="More info"                                                                      );
	cookieConsentCookiePolicyPage = getSystemSetting( category="cookie-consent", setting="cookie_policy_page", default="http://example.com/cookie-policy/"                                              );
	cookieConsentExpiryDay        = getSystemSetting( category="cookie-consent", setting="expiry_day"        , default="365"                                                                            );

	/* Precautionary just in case they exist but nothing has been set */
	if( !Len( Trim( cookieConsentTheme ) ) ){
		cookieConsentTheme = "dark-top";
	}
	if( !Len( Trim( cookieConsentHeadline ) ) ){
		cookieConsentHeadline = "This website uses cookies to ensure you get the best experience on our website";
	}
	if( !Len( Trim( cookieConsentAcceptButton ) ) ){
		cookieConsentAcceptButton = "Got it!";
	}
	if( !Len( Trim( cookieConsentReadmoreButton ) ) ){
		cookieConsentReadmoreButton = "More info";
	}
	if( !Len( Trim( cookieConsentCookiePolicyPage ) ) ){
		cookieConsentCookiePolicyPage = "http://example.com/cookie-policy/";
	} else {
		cookieConsentCookiePolicyPage = event.buildLink( page=cookieConsentCookiePolicyPage );
	}
	if( !Len( Trim( cookieConsentExpiryDay ) ) ){
		cookieConsentExpiryDay = "365";
	}
</cfscript>
<cfoutput>
	<cfif ( IsBoolean( cookieConsentIsActive ?: false ) && cookieConsentIsActive ) >
		<script type="text/javascript">
			window.cookieconsent_options = {
				  "theme"      : "#cookieConsentTheme#"
				, "message"    : "#cookieConsentHeadline#"
				, "dismiss"    : "#cookieConsentAcceptButton#"
				, "learnMore"  : "#cookieConsentReadmoreButton#"
				, "link"       : "#cookieConsentCookiePolicyPage#"
				, "expiryDays" : "#cookieConsentExpiryDay#"
				, "target"     : "_blank"
			};
		</script>
		<!---
		Derived from the original Cookie Consent utility by SilkTide
		Download: https://silktide.com/tools/cookie-consent/download/
		Source  : http:////cdnjs.cloudflare.com/ajax/libs/cookieconsent2/1.0.9/cookieconsent.min.js
		--->
		#event.renderIncludes( type="css", group="cookie-consent" )#
		#event.renderIncludes( type="js" , group="cookie-consent" )#
	</cfif>
</cfoutput>
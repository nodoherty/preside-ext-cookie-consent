component {

	public void function configure( bundle ) {
		bundle.addAsset( id="cookieconsent-dark-bottom-css"   , path="/css/specific/cookie-consent/dark-bottom.css"    );
		bundle.addAsset( id="cookieconsent-dark-floating-css" , path="/css/specific/cookie-consent/dark-floating.css"  );
		bundle.addAsset( id="cookieconsent-dark-top-css"      , path="/css/specific/cookie-consent/dark-top.css"       );
		bundle.addAsset( id="cookieconsent-light-bottom-css"  , path="/css/specific/cookie-consent/light-bottom.css"   );
		bundle.addAsset( id="cookieconsent-light-floating-css", path="/css/specific/cookie-consent/light-floating.css" );
		bundle.addAsset( id="cookieconsent-light-top-css"     , path="/css/specific/cookie-consent/light-top.css"      );

		bundle.addAsset( id="cookieconsent-js"                , path="/js/specific/cookie-consent/cookie-consent.js"   );
	}

}
# Preside Cookie Consent Extension
Extension to add functionality for displaying a cookie consent notification to site visitors.

## Installation
Install the extension to your application via either of the methods detailed below (Git submodule / CommandBox)

### Git Submodule method
From the root of your application, type the following command:

	git submodule add https://github.com/nodoherty/preside-ext-cookie-consent.git application/extensions/preside-ext-cookie-policy

### CommandBox (box.json) method
From the extensions folder of your application ( `/website/application/extensions` ), type the following command:

	box install nodoherty/preside-ext-cookie-consent#v1.2.1

From the Preside developer console reload the application:

	reload all

### Enabling the extension
Once the files are installed, enable the extension by opening up the Preside developer console (using the back tick `) and entering:

	extension enable preside-ext-cookie-consent
	reload all

## Usage
### Layouts
Add the following line below the closing </body> tag in your layout templates.

```
        ...
        #renderViewlet( event="CookieConsent._cookieConsent" )#
    </body>
</html>
```

### Custom CSS
To make it easier to customise the look and feel you can find the CSS files under `/assets/specific/cookie-consent/`

The main changes should only be to the background colours, button colours and text colours.
I'll leave that to you.

## Credits
Credit to the folk at SilkTide

https://silktide.com/tools/cookie-consent/

### License
Code released under the [MIT licence](http://opensource.org/licenses/MIT).

See [SilkTide licence](https://silktide.com/tools/cookie-consent/docs/license/) for details.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
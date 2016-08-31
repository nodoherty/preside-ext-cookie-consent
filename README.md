# Preside Cookie Consent Extension
Extension to add functionality for displaying a cookie consent notification to site visitors.

## Installation
Install the extension to your application via either of the methods detailed below (Git submodule / CommandBox + ForgeBox)

### Git Submodule method
From the root of your application, type the following command:

	git submodule add https://github.com/nodoherty/preside-ext-cookie-consent.git application/extensions/preside-ext-cookie-policy

### CommandBox (box.json) method
From the root of your application type the following command:

	box install nodoherty/preside-ext-cookie-consent#v1.3.0

From the Preside CMS developer console (using the back tick ` key) reload the application:

	reload all

### Enabling the extension
Once the files are installed, enable the extension by opening up the Preside CMS developer console and entering:

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

The main changes should only be to the background colours, button colours and text colours etc.
I'll leave that to you.

#### LESS CSS
If you are a fan of CSS pre-processors then you can take advantage of the LESS CSS files and inherent `grunt` task file for processing any changes.
The only changes required are to the global less files `colours.less` and `fonts.less`. Any changes to these files will result in the values being updates in the output CSS files.

From within the assets folder you can now install the node packages required to easily update the styles for all default stylesheets.

To do so you simply need to (from the terminal):
* Navigate to the `assets/` folder
* Run `npm install` which will download any dependencies defined in the `package.json` file

#### Grun tasks
To apply the changes you have made to the `.less` files you need to execute the task runner. To do so simply:
* The run the command `grunt` from within the `assets/` folder which will execute the default task

This will recompile any changes to the LESS variables / files and output the `.css` and `.min.css` version of each stylesheet required for the themes.

## Credits
Credit to the folk at SilkTide

https://silktide.com/tools/cookie-consent/

### License
Code released under the [MIT licence](http://opensource.org/licenses/MIT).

See [SilkTide licence](https://silktide.com/tools/cookie-consent/docs/license/) for details.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![ZenHub] (https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png)] (https://zenhub.io)
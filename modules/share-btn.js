const strDataName = 'share-btn';
const selector = {
  btns: '[data-share-btn]'
};

class ShareBtn {
  constructor () {
    this.init();
    this.registerExternalScripts();
  }

  init () {
    const $body = $('body');
    let strDataService;
    let strShareLink;

    $body.on('click', selector.btns ,(e) => {
      e.preventDefault();

      strDataService = $(e.currentTarget).data(strDataName);
      strShareLink = $(e.currentTarget).attr('href');
      if (strDataService && strDataService.trim()) {
        this.handleButton(strDataService, strShareLink);
      }
    });
  }

  handleButton (strService, strShareLink) {
    switch (strService) {
    case 'facebook':
      this.facebook(strShareLink);
      break;
    case 'twitter':
      this.twitter(strShareLink);
      break;
    case 'pinterest':
      this.pinterest(strShareLink);
      break;
    case 'linkedin':
      this.linkedIn(strShareLink);
      break;
    case 'email':
      this.email(strShareLink);
      break;
    default:
      console.log('Sorry, we are unable to handle service: ' + strService);
    }
  }

  facebook (strShareLink) {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(strShareLink), 'fb-share-dialog', 'width=626,height=436').focus();
  }

  twitter (strShareLink) {
    window.open('https://twitter.com/share?url=' + encodeURIComponent(strShareLink), 'twit-share-dialog', 'width=750,height=534').focus();
  }

  pinterest (strShareLink) {
    console.log(strShareLink);
    //window.open('https://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(strShareLink) + '&media=' + encodeURIComponent(strShareLink), 'pinterest-share-dialog', 'width=750,height=534').focus();
    PinUtils.pinAny();
  }

  linkedIn (strShareLink) {
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(strShareLink), 'linkedin-share-dialog', 'width=750,height=534').focus();
  }

  email (strShareLink) {
    document.location.href = 'mailto:?&subject=&body=' + encodeURIComponent(strShareLink);
  }

  /**
   * Register external scripts for social services
   * @method: registerExternalScripts
   */
  registerExternalScripts () {
    const $btns = $(selector.btns);
    let $arrServices = [];
    let tmpData;

    const services = {
      'pinterest': () => {
        this.loadExternalScript('//assets.pinterest.com/js/pinit.js');
      },
      'facebook': () => {
        this.loadExternalScript('//connect.facebook.net/en_US/sdk.js#xfbml=1', 'facebook-jssdk');
      },
      'twitter': () => {
        this.loadExternalScript('//platform.twitter.com/widgets.js');
      },
      'linkedin': () => {
        this.loadExternalScript('//platform.linkedin.com/in.js');
      }
    }

    // Search for services to share
    $btns.each((i, el) => {
      tmpData = $(el).data(strDataName);

      if (tmpData) {
        tmpData = tmpData.trim().toLowerCase();

        if ($arrServices.indexOf(tmpData) === -1) {
          $arrServices.push(tmpData);
        }
      }
    });

    // Initialize scripts for services
    $arrServices.forEach((el) => {
      if(services[el] && typeof services[el] === 'function') {
        services[el]();
      }
    });
  }

  loadExternalScript (strScriptUrl, scriptId) {
    const d = document;
    let js, f = d.getElementsByTagName('SCRIPT')[0];

    if (scriptId && d.getElementById(scriptId)) {
      return;
    }

    js = d.createElement('SCRIPT');
    js.type = 'text/javascript';
    js.async = true;
    js.src = strScriptUrl;
    f.parentNode.insertBefore(js, f);
  }
}

export default ShareBtn;

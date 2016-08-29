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
    case 'tweeter':
      this.tweeter(strShareLink);
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
    console.log(strShareLink);
    //window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(strShareLink), 'fb-share-dialog', 'width=626,height=436');
    FB.ui({
      method: 'share',
      href: strShareLink
    }, function(response){
      console.log(response);
    });
  }

  tweeter (strShareLink) {
    window.open('https://twitter.com/share?url=' + encodeURIComponent(strShareLink), 'tweet-share-dialog', 'width=750,height=534');
  }

  pinterest (strShareLink) {
    console.log(strShareLink);
    //window.open('https://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(strShareLink) + '&media=' + encodeURIComponent(strShareLink), 'pinterest-share-dialog', 'width=750,height=534');
    PinUtils.pinAny();
  }

  linkedIn (strShareLink) {
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(strShareLink), 'linkedin-share-dialog', 'width=750,height=534');
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
    const d = document;
    let $arrServices = [];
    let tmpData;

    const services = {
      'pinterest': () => {
        let f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
        p.type = 'text/javascript';
        p.async = true;
        p.src = '//assets.pinterest.com/js/pinit.js';
        f.parentNode.insertBefore(p, f);
      },
      'facebook': () => {
        const s = 'script';
        const id = 'facebook-jssdk';

        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return
        }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1";
        fjs.parentNode.insertBefore(js, fjs);

        js.onload = () => {
          FB.init({
            appId      : '609802965867405',
            status     : true,
            xfbml      : true,
            version    : 'v2.7' // or v2.6, v2.5, v2.4, v2.3
          });
        }
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
}

export default ShareBtn;

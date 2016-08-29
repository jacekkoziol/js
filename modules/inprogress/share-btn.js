const strDataName = 'share-btn';
const selector = {
  btns: '[data-share-btn]'
};

const servicesScripts = {
  'pinterest': () => {
    const d = document;
    let f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
    p.type = 'text/javascript';
    p.async = true;
    p.src = '//assets.pinterest.com/js/pinit.js';
    f.parentNode.insertBefore(p, f);
  }
};

class ShareBtn {
  constructor (initServicesScripts) {
    this.init();

    if (initServicesScripts) {
      this.initializeServicesScripts();
    }
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
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(strShareLink), 'fb-share-dialog', 'width=626,height=436');
  }

  tweeter (strShareLink) {
    window.open('https://twitter.com/share?url=' + encodeURIComponent(strShareLink), 'tweet-share-dialog', 'width=750,height=534');
  }

  pinterest (strShareLink) {
    window.open('https://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(strShareLink), 'pinterest-share-dialog', 'width=750,height=534');
  }

  linkedIn (strShareLink) {
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(strShareLink), 'linkedin-share-dialog', 'width=750,height=534');
  }

  email (strShareLink) {
    document.location.href = 'mailto:?&subject=&body=' + encodeURIComponent(strShareLink);
  }

  initializeServicesScripts () {
    const $btns = $(selector.btns);
    let $arrServices = [];
    let tmpData;

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
      if(servicesScripts[el] && typeof servicesScripts[el] === 'function') {
        servicesScripts[el]();
      }
    });
  }
}

export default ShareBtn;

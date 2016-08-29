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
  constructor () {
    //this.initializeServicesScripts();
    this.init();
  }

  /*
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
  */

/*
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
    default:
      console.log('Sorry, we are unable to handle service: ' + strService);
    }
  }
  */

  init () {
    const $btns = $(selector.btns);
    let $arrServices = [];
    let tmpData;

    // Search for services to share
    $btns.each((i, el) => {
      tmpData = $(el).data(strDataName);

      if (tmpData) {
        tmpData = tmpData.trim().toLowerCase();
        this.initButtons(tmpData, $(el));

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

  initButtons (strService, $btn) {
    console.log(strService, $btn);

    switch (strService) {
    case 'facebook':
      this.facebook($btn);
      break;
    case 'tweeter':
      this.tweeter($btn);
      break;
    case 'pinterest':
      this.pinterest($btn);
      break;
    case 'linkedin':
      this.linkedIn($btn);
      break;
    case 'email':
      this.email($btn);
      break;
    default:
      console.log('Sorry, we are unable to handle service: ' + strService);
    }
  }

  facebook ($btn) {
    $btn.on('click', (e) => {
      e.preventDefault();
      let strUrl = $btn.attr('href').trim();

      if (strUrl) {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($btn.attr('href')), 'fb-share-dialog', 'width=626,height=436');
      } else {
        console.log('No URL to share');
      }
    });
  }

  tweeter ($btn) {
    $btn.on('click', (e) => {
      e.preventDefault();
      let strUrl = $btn.attr('href').trim();

      if (strUrl) {
        window.open('https://twitter.com/share?url=' + encodeURIComponent($btn.attr('href')), 'tweet-share-dialog', 'width=750,height=534');
      } else {
        console.log('No URL to share');
      }
    });
  }

  pinterest ($btn) {
    $btn.on('click', (e) => {
      e.preventDefault();
      let strUrl = $btn.attr('href').trim();

      if (strUrl) {
        window.open('https://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent($btn.attr('href')), 'pinterest-share-dialog', 'width=750,height=534');
      } else {
        console.log('No URL to share');
      }
    });
  }

  linkedIn ($btn) {
    $btn.on('click', (e) => {
      e.preventDefault();
      let strUrl = $btn.attr('href').trim();

      if (strUrl) {
        window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent($btn.attr('href')), 'linkedin-share-dialog', 'width=750,height=534');
      } else {
        console.log('No URL to share');
      }
    });
  }

  email ($btn) {
    $btn.attr('href', 'mailto:test@test.pl?&subject=&body=' + encodeURIComponent($btn.attr('href')));
    /*
    $btn.on('click', (e) => {
      e.preventDefault();
      let strUrl = $btn.attr('href').trim();

      if (strUrl) {
        //window.open('mailto:?&subject=&body' + encodeURIComponent($btn.attr('href')), 'mailto-share-dialog', 'width=750,height=534');
        $btn.attr('href', 'mailto:test@test.pl?&subject=subject&body' + encodeURIComponent($btn.attr('href')));
      } else {
        console.log('No URL to share');
      }
    });*/
  }
}

export default ShareBtn;

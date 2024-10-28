export const isAssignedNumber = (channels: any[], number: string) => {
  return channels.filter(channel => channel?.number === number?.trim())?.length > 0;
};

export const getAllUrlParams = (url: string) => {
  // get query string from url (optional) or window
  const queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  const obj: any = {};

  // if query string exists
  if (queryString) {
    // split our query string into its component parts
    const arr = queryString.split('#')[0].split('&');

    for (let i = 0; i < arr.length; i += 1) {
      // separate the keys and the values
      const a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      // eslint-disable-next-line
      let paramNum = undefined;
      // eslint-disable-next-line
      let paramName: any = a[0].replace(/\[\d*\]/, function (v) {
        paramNum = v.slice(1, -1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      let paramValue: any = typeof a[1] === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName?.toLowerCase();
      paramValue = typeof paramValue === 'string' ? paramValue?.toLowerCase() : paramValue;

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }

        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }

        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }

      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
};

export const isMobileDevice = () => {
  if (/Android|iPhone|webOS|iPad|BlackBerry|Windows Phone/i.test(navigator.userAgent)) {
    // This checks if the current device is in fact mobile
    return true;
  }
  const isGoogle = navigator.vendor.indexOf('Google') === 0; // Also true for Opera Mobile and maybe others
  const androidDesktopMode =
    isGoogle &&
    navigator.platform.indexOf('Linux a') === 0 &&
    'ontouchstart' in document.documentElement;
  if (androidDesktopMode) return true; // Check if android browser is opened in desktop mode
  const iOSPlatform =
    window.navigator.platform && window.navigator.platform.match(/iPhone|iPod|iPad/);
  if (iOSPlatform) return true; // Check if ios device browser is opened in desktop mode
  return false;
};

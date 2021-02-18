import React from 'react';
import { useRouter } from 'next/router'

const configuratorHelper = {
    addParamToUrl: function(paramName, paramVal) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set(paramName, paramVal)
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlParams.toString();
        return window.history.pushState({path:newurl},'',newurl);
    },
    removeParamFromUrl: function(paramName) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete(paramName)
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlParams.toString();
        window.history.pushState({path:newurl},'',newurl);
    },
    getParamStringOnLoad: function(router) {
        var paramString = ''
        if(router.query?.e) {
            paramString += router.query?.e
        }
        if(router.query?.i1) {
            paramString += router.query?.i1
        }
        if(router.query?.i2) {
            paramString += router.query?.i2
        }
        return paramString;
    },
    getParamStringOnChange: function(urlParams) {
        var paramString = ''
        if(urlParams.has('e')) {
            paramString += urlParams.get('e')
        }
        if(urlParams.has('i1')) {
            paramString += urlParams.get('i1')
        }
        if(urlParams.has('i2')) {
            paramString += urlParams.get('i2')
        }
        return paramString;
    }
}

export default configuratorHelper;
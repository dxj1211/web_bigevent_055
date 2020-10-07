var baseURL = "http://ajax.frontend.itheima.net"
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url;
});
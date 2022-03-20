exports.getStandardResponse = function(status,message,data){
    return {
        status: status,
        message : message
    }
}

exports.errorResponse = function() {
    return {
        status : 500,
        message : `Something Error, Try Later..`
    }
}

exports.GtResponse = function (ip) {
    return {
        status : 500,
        message : `${ip} Cannot get readed...`
    }
}

exports.getApi = function() {
    const apilist = [
        "MTY5NjY6QVFvUWUxRUFNWjkxT05oaFg2eXNsdzhKWnc4OEZjWjg=",
        "MTY5Njc6ZTloc1N4ekJ3Y01hbXRHZU85Skd5ZXpmaU8yczV5SGs=",
        "MTY5Njg6bmZVcDNub001QmhTVU5qbFFsc1JGWUNaaldoeER0ZFQ=",
        "MTY5Njk6a2R1aE1OR1B1cVl2eW43NWlyVzdVNWluSmdPRHJxbFI=",
        "MTY5NzA6R2tESEdtZDV0eWk5Sk1hYzZ4ZE9ZZ1ZZUFhOMDVna24=",
        "MTY5NzM6WXhBbmJtUGE4bUhEYTJZZXdQWmliYUd2TmdMTE1MM0w=",
        "MTY5NzQ6RnVCT2E2THZQMDdhVENxaEhUZlI1N0dadlB4WDh0b1E=",
        "MTY5NzU6OXg3RmpWUGRhM1BoZTdJdUdSVWwyTDJJS0o2ZmowOEI=",
        "MTY5NzY6aG52YnhMVDNic2M4dVRLSzBEbDIwVDBocFNtRlJmNEY=",
        "MTY5Nzc6VU01T1F0N3NZWEt5akhtMW11Yjk0dXBhcGRSenNEck4="
    ];
    
    const choosen = apilist[Math.floor(Math.random() * apilist.length)]

    return choosen;
}

exports.getV2 = function() {
    const apilist = ["ebe7b7c0-9e7c-11ec-93c3-4f54e59a1b51", "68467d40-9e7d-11ec-90b6-a35a5cf24165", "7c5246c0-9e7d-11ec-98d2-e7973b1017d0"];
    
    const choosen = apilist[Math.floor(Math.random() * apilist.length)]
    
    return choosen;
}

/*
Jangan di hapus, nanti di butuhin

exports.checkChar = function (charnya) {
    return !!charnya.trim() && !isNaN(+charnya);
}
*/